from rest_framework import viewsets, status, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db.models import Count
from .models import Comment, Reply
from .serializers import (
    CommentListSerializer,
    CommentDetailSerializer,
    CommentCreateSerializer,
    ReplySerializer,
)


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100


class CommentViewSet(viewsets.ModelViewSet):
    """
    ViewSet for comments. Allows listing, creating, retrieving, and deleting comments.
    No editing allowed.
    """
    pagination_class = StandardResultsSetPagination
    http_method_names = ['get', 'post', 'delete', 'head', 'options']

    def get_queryset(self):
        queryset = Comment.objects.all()
        district_id = self.request.query_params.get('district_id')
        if district_id:
            queryset = queryset.filter(district_id=district_id)
        return queryset

    def get_serializer_class(self):
        if self.action == 'create':
            return CommentCreateSerializer
        elif self.action == 'retrieve':
            return CommentDetailSerializer
        return CommentListSerializer

    def create(self, request, *args, **kwargs):
        """Create a new comment."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        serializer.save()

    @action(detail=True, methods=['post'])
    def add_reply(self, request, pk=None):
        """Add a reply to a comment."""
        comment = self.get_object()
        serializer = ReplySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(comment=comment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'])
    def by_district(self, request):
        """Get comments by district."""
        district_id = request.query_params.get('district_id')
        if not district_id:
            return Response({'error': 'district_id is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            district_id = int(district_id)
        except ValueError:
            return Response({'error': 'district_id must be an integer'}, status=status.HTTP_400_BAD_REQUEST)

        comments = Comment.objects.filter(district_id=district_id)
        page = self.paginate_queryset(comments)
        if page is not None:
            serializer = CommentListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = CommentListSerializer(comments, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def counts(self, request):
        """Total comment count per district (comments + their replies)."""
        counts = {
            row['district_id']: row['count']
            for row in Comment.objects.values('district_id').annotate(count=Count('id'))
        }
        reply_rows = (
            Reply.objects.values('comment__district_id')
            .annotate(count=Count('id'))
        )
        for row in reply_rows:
            district_id = row['comment__district_id']
            counts[district_id] = counts.get(district_id, 0) + row['count']
        return Response({str(k): v for k, v in counts.items()})


class ReplyViewSet(mixins.DestroyModelMixin, viewsets.GenericViewSet):
    """ViewSet for replies. Allows deleting a reply only."""
    queryset = Reply.objects.all()
    serializer_class = ReplySerializer
    http_method_names = ['delete', 'head', 'options']
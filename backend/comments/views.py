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
        location_key = self.request.query_params.get('location_key')
        if location_key:
            queryset = queryset.filter(location_key=location_key)
        elif district_id:
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
        """Total comment count per district (comments + their replies).

        Location comments (district_id is null) are excluded; they belong to a
        specific searched place, not a district.
        """
        counts = {
            row['district_id']: row['count']
            for row in Comment.objects.filter(district_id__isnull=False)
            .values('district_id').annotate(count=Count('id'))
        }
        reply_rows = (
            Reply.objects.filter(comment__district_id__isnull=False)
            .values('comment__district_id')
            .annotate(count=Count('id'))
        )
        for row in reply_rows:
            district_id = row['comment__district_id']
            counts[district_id] = counts.get(district_id, 0) + row['count']
        return Response({str(k): v for k, v in counts.items()})

    @action(detail=False, methods=['get'])
    def location_markers(self, request):
        """Comment counts per searched (non-district) location.

        Returns a flat list of { location_key, location_type, location_name,
        location_lat, location_lng, count } so the map can render tiny markers
        wherever someone has left a comment on a searched place.
        """
        markers: dict = {}
        for row in (
            Comment.objects.filter(location_key__isnull=False)
            .values('location_key', 'location_type', 'location_name', 'location_lat', 'location_lng')
            .annotate(count=Count('id'))
        ):
            key = row['location_key']
            markers[key] = {
                'location_key': key,
                'location_type': row['location_type'],
                'location_name': row['location_name'],
                'location_lat': row['location_lat'],
                'location_lng': row['location_lng'],
                'count': row['count'],
            }
        for row in (
            Reply.objects.filter(comment__location_key__isnull=False)
            .values('comment__location_key')
            .annotate(count=Count('id'))
        ):
            key = row['comment__location_key']
            if key in markers:
                markers[key]['count'] += row['count']
        return Response({'markers': sorted(markers.values(), key=lambda m: -m['count'])})


class ReplyViewSet(mixins.DestroyModelMixin, viewsets.GenericViewSet):
    """ViewSet for replies. Allows deleting a reply only."""
    queryset = Reply.objects.all()
    serializer_class = ReplySerializer
    http_method_names = ['delete', 'head', 'options']
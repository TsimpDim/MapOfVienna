from rest_framework import serializers
from .models import Comment, Reply


class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        fields = ['id', 'content', 'created_at']
        read_only_fields = ['id', 'created_at']


class CommentDetailSerializer(serializers.ModelSerializer):
    replies = ReplySerializer(many=True, read_only=True)
    reply_count = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'content', 'district_id', 'created_at', 'replies', 'reply_count']
        read_only_fields = ['id', 'created_at']

    def get_reply_count(self, obj):
        return obj.replies.count()


class CommentListSerializer(serializers.ModelSerializer):
    reply_count = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'content', 'district_id', 'created_at', 'reply_count']
        read_only_fields = ['id', 'created_at']

    def get_reply_count(self, obj):
        return obj.replies.count()


class CommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'content', 'district_id', 'created_at']
        read_only_fields = ['id', 'created_at']
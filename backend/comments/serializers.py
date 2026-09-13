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
        fields = [
            'id', 'content', 'district_id', 'created_at', 'replies', 'reply_count',
            'location_key', 'location_type', 'location_name', 'location_lat', 'location_lng',
        ]
        read_only_fields = ['id', 'created_at']

    def get_reply_count(self, obj):
        return obj.replies.count()


class CommentListSerializer(serializers.ModelSerializer):
    reply_count = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = [
            'id', 'content', 'district_id', 'created_at', 'reply_count',
            'location_key', 'location_type', 'location_name', 'location_lat', 'location_lng',
        ]
        read_only_fields = ['id', 'created_at']

    def get_reply_count(self, obj):
        return obj.replies.count()


class CommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = [
            'id', 'content', 'district_id', 'created_at',
            'location_key', 'location_type', 'location_name', 'location_lat', 'location_lng',
        ]
        read_only_fields = ['id', 'created_at']

    def validate(self, attrs):
        district_id = attrs.get('district_id')
        location_key = attrs.get('location_key')
        has_district = district_id is not None
        has_location = location_key is not None

        if has_district == has_location:
            raise serializers.ValidationError(
                'Provide either district_id or a location (location_key), not both and not neither.'
            )

        if has_location:
            required = ['location_type', 'location_name', 'location_lat', 'location_lng']
            missing = [field for field in required if attrs.get(field) in (None, '')]
            if missing:
                raise serializers.ValidationError(
                    {field: 'This field is required for location comments.' for field in missing}
                )

        if has_district and not (1 <= district_id <= 23):
            raise serializers.ValidationError({'district_id': 'Must be a Vienna district number (1-23).'})

        return attrs

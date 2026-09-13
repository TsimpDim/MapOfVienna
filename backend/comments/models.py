from django.db import models
from django.utils import timezone

class Comment(models.Model):
    """Comment left by a user on a district or on a searched location.

    District comments carry ``district_id`` (Vienna district 1-23).
    Location comments (landmarks, stations, geocoded places) carry a
    ``location_key`` plus display metadata and coordinates instead.
    """
    content = models.TextField()
    district_id = models.IntegerField(null=True, blank=True)  # Vienna district 1-23
    location_key = models.CharField(max_length=80, null=True, blank=True, db_index=True)
    location_type = models.CharField(max_length=20, null=True, blank=True)  # landmark | station | place
    location_name = models.CharField(max_length=255, null=True, blank=True)
    location_lat = models.FloatField(null=True, blank=True)
    location_lng = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        if self.district_id is not None:
            return f"Comment (District {self.district_id})"
        return f"Comment ({self.location_name or self.location_key})"


class Reply(models.Model):
    """Reply to a comment."""
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='replies')
    content = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"Reply on comment {self.comment_id}"

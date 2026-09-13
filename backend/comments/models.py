from django.db import models
from django.utils import timezone

class Comment(models.Model):
    """Comment left by a user in a specific district."""
    content = models.TextField()
    district_id = models.IntegerField()  # Vienna district 1-23
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Comment (District {self.district_id})"


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
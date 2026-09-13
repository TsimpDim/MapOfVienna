from django.contrib import admin
from .models import Comment, Reply


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('district_id', 'created_at')
    list_filter = ('district_id', 'created_at')
    search_fields = ('content',)
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Reply)
class ReplyAdmin(admin.ModelAdmin):
    list_display = ('comment', 'created_at')
    list_filter = ('created_at', 'comment')
    search_fields = ('content',)
    readonly_fields = ('created_at', 'updated_at')
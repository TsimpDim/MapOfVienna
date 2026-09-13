from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CommentViewSet, ReplyViewSet

router = DefaultRouter()
router.register(r'comments', CommentViewSet, basename='comment')
router.register(r'replies', ReplyViewSet, basename='reply')

urlpatterns = [
    path('', include(router.urls)),
]
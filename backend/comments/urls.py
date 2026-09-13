from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CommentViewSet, ReplyViewSet
from .geocode import geocode_view

router = DefaultRouter()
router.register(r'comments', CommentViewSet, basename='comment')
router.register(r'replies', ReplyViewSet, basename='reply')

urlpatterns = [
    path('geocode/', geocode_view, name='geocode'),
    path('', include(router.urls)),
]
""" Post ViewSet """

# Django REST framework
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

# Models
from api.models import Post, Comment

# Serializers
from api.serializers import PostModelSerializer, PostRegisterSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.filter(is_active=True, is_accepted=True)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return PostModelSerializer
        else:
            return PostRegisterSerializer

    def perform_destroy(self, post):
        """ Desactivate a post when it is deleted """
        post.is_active = False
        post.save()
        Comment.objects.filter(post=post).update(is_active=False)

    
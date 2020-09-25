""" Comment ViewSet """

# Django REST framework
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

# Models
from api.models import Comment

# Serializers
from api.serializers import CommentModelSerializer, CommentRegisterSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.filter(is_active=True)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return CommentModelSerializer
        else:
            return CommentRegisterSerializer

    def perform_destroy(self, comment):
        """ Desactivate a comment when it is deleted """
        comment.is_active = False
        comment.save()

    @action(detail=False, methods=['get'])
    def filterPost(self, request):
        
        print(request.GET)
        query = Comment.objects.filter(post=request.GET.get('id'))
        page = self.paginate_queryset(query)
        serializer = CommentModelSerializer(page, many=True)

        return self.get_paginated_response(serializer.data)
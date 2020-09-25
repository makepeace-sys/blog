""" Report ViewSet """

# Django REST framework
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

# Utils
from django.db.models import Sum, Count, Avg

# Models
from api.models import Post, Comment

# Serializers
from api.serializers import CommentModelSerializer, PostModelSerializer

class ManagementPostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.filter(is_active=True, is_accepted=False)
    serializer_class = PostModelSerializer

    @action(detail=False, methods=['post'])
    def approved(self, request):
        
        Post.objects.filter(pk=request.data).update(is_accepted=True)

        return Response({
            'Post Aprobado'
        }, status=status.HTTP_200_OK)
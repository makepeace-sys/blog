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

class ReportPostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.filter(is_active=True)
    serializer_class = PostModelSerializer

    @action(detail=False, methods=['get'])
    def filterUser(self, request):
        
        query = Post.objects.filter(author=request.GET.get('Id'), is_active=True)

        page = self.paginate_queryset(query)
        serializer = PostModelSerializer(page, many=True)

        return self.get_paginated_response(serializer.data)
    
    @action(detail=False, methods=['post'])
    def stats(self, request):
        

        query = Post.objects.filter(author=request.data.get('Id'), is_active=True)

        total_posts = query.aggregate(count=Count('id'))
        approved_posts = query.filter(is_accepted=True).aggregate(approved=Count('id'))
        rejected_posts = query.filter(is_accepted=False).aggregate(rejected=Count('id'))
        
        if(total_posts['count'] != 0):
            approved_percentage = round((approved_posts['approved'] / total_posts['count']) * 100, 2)
        else:
            approved_percentage = 0


        return Response({
            'approved_posts': approved_posts['approved'],
            'rejected_posts': rejected_posts['rejected'],
            'approved_percentage': approved_percentage
        }, status=status.HTTP_200_OK)


class ReportCommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.filter(is_active=True)
    serializer_class = CommentModelSerializer

    @action(detail=False, methods=['post'])
    def stats(self, request):

        authorId = request.data.get('Id')
        data = []
        for t in  Post.objects.filter(is_active=True):
            comments_counts = Comment.objects.filter(
                    post=t.id,author=authorId, 
                    is_active=True).aggregate(total=Count('id'))
            
            comments_total = Comment.objects.filter(post=t.id).aggregate(total=Count('id'))

            if(comments_total['total'] != 0):
                average = round((comments_counts['total'] / comments_total['total']) * 100, 2)
            else:
                average = 0

            data.append({
                'post': t.title,
                'comments': comments_counts['total'],
                'average': average
            })
        print(data)
    
        return Response({
            'posts': data
        }, status=status.HTTP_200_OK)
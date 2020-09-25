"""Serializer Post"""

# Django REST Framework
from rest_framework import serializers
from rest_framework.validators import UniqueValidator 

# Models
from api.models import Post

class PostModelSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField("getAuthor")
    comments = serializers.SerializerMethodField(source="comments")

    class Meta:
        model = Post
        fields = '__all__'

    def getAuthor(self, obj):
        return {'value': obj.author.id, 'label': obj.author.username}

    def get_comments(self, obj):
        query = obj.comments.filter(is_active=True).values(
            'id', 'content')
        
        if query.exists():
            return query

        data = []
        return data

class PostRegisterSerializer(serializers.ModelSerializer):

    title = serializers.CharField(
        validators=[
            UniqueValidator(queryset=Post.objects.filter(is_active=True), message='The name must be unique')]
    )

    class Meta:
        model = Post
        fields = '__all__'
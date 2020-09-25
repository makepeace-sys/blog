"""Serializer Comment"""

# Django REST Framework
from rest_framework import serializers

# Model
from api.models import Comment

class CommentModelSerializer(serializers.ModelSerializer):
    post = serializers.SerializerMethodField("getPost")
    author = serializers.SerializerMethodField("getAuthor")
    
    class Meta:
        model = Comment
        fields = '__all__'

    def getPost(self, obj):
        return {'value': obj.post.id, 'label': obj.post.title}
        
    def getAuthor(self, obj):
        return {'value': obj.author.id, 'label': obj.author.username}

class CommentRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
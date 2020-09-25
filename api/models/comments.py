from django.db import models
from django.contrib.auth.models import User
from api.utils import BaseModel

class Comment(BaseModel):
    content = models.TextField()

    # Relationships
    post = models.ForeignKey('Post', on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
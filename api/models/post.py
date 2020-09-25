from django.db import models
from django.contrib.auth.models import User
from api.utils import BaseModel


class Post(BaseModel):
    title = models.CharField(max_length=200)
    content = models.TextField()

    # Relationships
    author = models.ForeignKey(User, on_delete=models.CASCADE)
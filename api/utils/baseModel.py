""" Model base """

from django.db import models

class BaseModel(models.Model):

    created   = models.DateTimeField(auto_now_add=True)
    modified  = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_accepted = models.BooleanField(default=False)

    class Meta:
        abstract = True
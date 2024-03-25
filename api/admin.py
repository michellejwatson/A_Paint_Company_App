"""
Module containing Django admin configurations for the 'api' app.
"""

from django.contrib import admin
from .models import Paint

# Define PaintAdmin class
class PaintAdmin(admin.ModelAdmin):
    """
    Admin configuration for the Paint model.
    """
    list_display = ('colour', 'status', 'inventory')

# Register Paint model
admin.site.register(Paint, PaintAdmin)

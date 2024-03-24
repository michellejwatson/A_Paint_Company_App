from django.contrib import admin
from .models import Paint

# Define PaintAdmin class
class PaintAdmin(admin.ModelAdmin):
    list_display = ('colour', 'status', 'inventory')

# Register Paint model
admin.site.register(Paint, PaintAdmin)
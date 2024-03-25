"""
Module containing serializers for the 'api' app models.
"""

from rest_framework import serializers
from .models import Paint

class PaintSerializer(serializers.ModelSerializer):
    """
    Serializer for the Paint model.
    """
    class Meta:
        model=Paint
        fields=('colour','status', 'inventory')
        read_only_fields = ['colour'] # Paint colour should never be changed

    # pylint: disable=too-few-public-methods

from rest_framework import serializers
from .models import Paint

class PaintSerializer(serializers.ModelSerializer):
    class Meta:
        model=Paint
        fields=('colour','status', 'inventory')
        read_only_fields = ['colour'] # Paint colour should never be changed 
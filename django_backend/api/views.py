from django.shortcuts import render, get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Paint
from .serializer import PaintSerializer

# Create your views here.

# GET view to get all paint info
@api_view(['GET'])
def getData(request):
    try:
        paint_instances = get_list_or_404(Paint)
        serializer = PaintSerializer(paint_instances, many=True)
        return Response(serializer.data)
    # Error handling 
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# POST view to update a paint status or inventory
@api_view(['POST'])
def postData(request, colour):
    try:
        # Retrieve the Paint instance to update
        paint_instance = get_object_or_404(Paint, colour=colour)
        
        # Serialize the request data and update the Paint instance
        serializer = PaintSerializer(paint_instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # Error handling 
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
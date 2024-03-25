"""
Module containing views for the 'api' app.
"""

from django.shortcuts import render, get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_jwt.settings import api_settings
from django.contrib.auth import authenticate
from .models import Paint
from .serializer import PaintSerializer

# Define handlers for login
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

# Create your views here.

@api_view(['GET'])
def get_data(request):
    """
    Retrieve all paint information.
    """
    try:
        paint_instances = get_list_or_404(Paint)
        serializer = PaintSerializer(paint_instances, many=True)
        return Response(serializer.data)
    # Error handling
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def post_data(request, colour):
    """
    Update a paint's status or inventory.
    """
    try:
        # Retrieve the Paint instance to update
        paint_instance = get_object_or_404(Paint, colour=colour)

        # Serialize the request data and update the Paint instance
        serializer = PaintSerializer(paint_instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # Error handling
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def login(request):
    """
    User login with JSON web token authentication.
    """
    try:
        # Extract username and password from request data
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate user
        user = authenticate(username=username, password=password)
        if user is not None:
            # If user is authenticated, generate JWT token
            payload = jwt_payload_handler(user)
            token = jwt_encode_handler(payload)
            response = Response()
            response.set_cookie(
                key='access_token',
                value=token,
                httponly=True,
                secure=True,
                samesite='Strict'
            )
            response.data = token
            return response
        else:
            # If authentication fails, return error response
            return Response(
                {'error': 'Invalid username or password'},
                status=status.HTTP_401_UNAUTHORIZED
            )
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def logout(request):
    """
    User logout with JSON web token authentication.
    """
    try:
        # Check if access token is in cookeis (otherwise already logged out)
        user_token = request.COOKIES.get('access_token', None)
        if user_token:
            response = Response()
            response.delete_cookie(key='access_token')
            response.message('Logout successful')
            return response
        else:
            return Response({'message': 'Already logged out'})
    # Error handling
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

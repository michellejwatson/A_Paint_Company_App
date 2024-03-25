"""
Module containing tests for the 'api' app.
"""

from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Paint
from .views import get_data, post_data

# Paint tests
class PaintTests(APITestCase):
    """
    Test cases for the Paint model and related views.
    """

    def setUp(self):
        self.paint1 = Paint.objects.create(colour='Blue', status='available', inventory=10)
        self.paint2 = Paint.objects.create(colour='Red', status='running_low', inventory=5)

    def test_get_data(self):
        url = reverse(get_data)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Ensure all paint instances are returned
        self.assertEqual(len(response.data), 2)

    def test_post_data(self):
        url = reverse(post_data, kwargs={'colour': 'Blue'})
        data = {'status': 'running_low', 'inventory': 8}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Assert status field is updated
        self.assertEqual(response.data['status'], 'running_low')
        # Assert inventory field is updated
        self.assertEqual(response.data['inventory'], 8)

    def test_invalid_post_data(self):
        url = reverse(post_data, kwargs={'colour': 'Blue'})
        data = {'status': 'invalid_status'}
        response = self.client.post(url, data, format='json')
        # Assert error status was returned
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST) 

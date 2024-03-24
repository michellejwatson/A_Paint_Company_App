from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Paint
from .views import getData, postData

# Paint tests
class PaintTests(APITestCase):
    def setUp(self):
        self.paint1 = Paint.objects.create(colour='Blue', status='available', inventory=10)
        self.paint2 = Paint.objects.create(colour='Red', status='running_low', inventory=5)

    def test_get_data(self):
        url = reverse(getData)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)  # Ensure all paint instances are returned

    def test_post_data(self):
        url = reverse(postData, kwargs={'colour': 'Blue'})
        data = {'status': 'running_low', 'inventory': 8}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'running_low') # Assert status field is updated 
        self.assertEqual(response.data['inventory'], 8) # Assert inventory field is updated 

    def test_invalid_post_data(self):
        url = reverse(postData, kwargs={'colour': 'Blue'})
        data = {'status': 'invalid_status'}  # Invalid status value
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST) # Assert error status was returned
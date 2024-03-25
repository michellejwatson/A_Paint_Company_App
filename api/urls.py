"""
Module containing URL configurations for the 'api' app.
"""

from django.urls import path
from . import views

# Configure API URLs
urlpatterns = [
    # Pattern to view info of all paints (/api/)
    path('', views.get_data, name='getData'),
    # Pattern to update inventory / status (ex: /api/post/Blue/)
    path('post/<str:colour>/', views.post_data, name='postData'),
    # Login
    path('account/login/', views.login, name='login'),
    # Logout
    path('account/logout/', views.logout, name='logout'),
]

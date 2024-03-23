from django.urls import path
from . import views

# Configure API URLs
urlpatterns = [
    # Pattern to view info of all paints (/api/)
    path('', views.getData),
    # Pattern to update inventory / status (/api/post/)
    path('post/<str:colour>/', views.postData),
]
from django.urls import path
from . import views

# Configure API URLs
urlpatterns = [
    # Pattern to view info of all paints (/api/)
    path('', views.getData, name='getData'),
    # Pattern to update inventory / status (ex: /api/post/Blue/)
    path('post/<str:colour>/', views.postData, name='postData'),
    # Login 
    path('account/login/', views.login, name='login'),
    # Logout 
    path('account/logout/', views.logout, name='logout'),
]
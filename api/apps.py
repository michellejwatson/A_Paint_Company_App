"""
Module containing the configuration for the 'api' Django app.
"""

from django.apps import AppConfig


class ApiConfig(AppConfig):
    """
    Configuration class for the 'api' Django app.
    """
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

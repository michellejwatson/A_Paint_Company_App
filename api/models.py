"""
Module containing Django models for the Paint application.
"""

from django.db import models

# Create Paint Model
class Paint(models.Model):
    """
    Model representing a paint color.
    """
    STATUS_CHOICES = [
        ('running_low', 'Running Low'),
        ('available', 'Available'),
        ('out_of_stock', 'Out of Stock'),
    ]

    colour = models.CharField(max_length=6)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')
    inventory = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.colour}"

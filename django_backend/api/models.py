from django.db import models

# Create Paint Model
class Paint(models.Model):
    STATUS_CHOICES = [
        ('running_low', 'Running Low'),
        ('available', 'Available'),
        ('out_of_stock', 'Out of Stock'),
    ]

    colour = models.CharField(max_length=6)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')
    inventory = models.PositiveIntegerField()

    def _str_(self):
        return self.colour
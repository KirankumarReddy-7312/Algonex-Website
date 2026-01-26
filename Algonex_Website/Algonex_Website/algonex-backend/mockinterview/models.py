from django.db import models

class MockInterview(models.Model):
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    category = models.CharField(max_length=50) # Fresher or Experienced
    booked_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} ({self.category})"

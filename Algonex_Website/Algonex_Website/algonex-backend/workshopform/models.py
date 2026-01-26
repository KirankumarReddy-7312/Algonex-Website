from django.db import models

class WorkshopRequest(models.Model):
    college_name = models.CharField(max_length=255)
    contact_person = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    department = models.CharField(max_length=100, blank=True)
    expected_students = models.CharField(max_length=50, blank=True)
    preferred_date = models.DateField(null=True, blank=True)
    message = models.TextField(blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.college_name} - {self.contact_person}"

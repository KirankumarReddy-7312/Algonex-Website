from django.db import models
import datetime

class JobApplication(models.Model):
    full_name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    job_title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    linkedin_profile = models.URLField(blank=True, null=True)
    resume_link = models.URLField(blank=True, null=True)
    applied_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} - {self.job_title} ({self.company})"

class JobPosting(models.Model):
    JOB_TYPES = [
        ('Full-Time', 'Full-Time'),
        ('Internship', 'Internship'),
        ('Off-Campus Drive', 'Off-Campus Drive'),
        ('Hiring Challenge', 'Hiring Challenge'),
    ]

    company = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    posted_date = models.DateField(default=datetime.date.today)
    deadline = models.DateField(blank=True, null=True)
    tags = models.TextField(help_text="Comma-separated tags e.g. 'Java, Spring Boot'")
    type = models.CharField(max_length=50, choices=JOB_TYPES)
    batch_year = models.CharField(max_length=100) # Increased length for multiple years
    experience = models.CharField(max_length=100, default="Fresher")
    salary_range = models.CharField(max_length=100, blank=True, null=True, help_text="e.g. 5-8 LPA")
    logo_url = models.URLField(default="https://cdn-icons-png.flaticon.com/512/732/732221.png")
    apply_link = models.URLField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.role} at {self.company}"

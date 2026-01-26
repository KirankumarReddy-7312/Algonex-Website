from django.contrib import admin
from .models import JobApplication

@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'job_title', 'company', 'email', 'applied_at')
    search_fields = ('full_name', 'email', 'job_title', 'company')
    list_filter = ('company', 'applied_at')

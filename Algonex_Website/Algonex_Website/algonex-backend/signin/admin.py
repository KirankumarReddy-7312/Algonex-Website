from django.contrib import admin
from .models import SigninProfile

@admin.register(SigninProfile)
class SigninProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'employment_status', 'course_interested', 'location', 'submitted_at')
    search_fields = ('name', 'email', 'phone', 'college', 'company')
    list_filter = ('employment_status', 'course_interested', 'submitted_at')

from django.contrib import admin
from .models import MockInterview

@admin.register(MockInterview)
class MockInterviewAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'category', 'booked_at')
    search_fields = ('full_name', 'email')
    list_filter = ('category', 'booked_at')

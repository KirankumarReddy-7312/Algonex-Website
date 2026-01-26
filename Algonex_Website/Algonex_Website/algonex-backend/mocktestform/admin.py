from django.contrib import admin
from .models import MockTestResult

@admin.register(MockTestResult)
class MockTestResultAdmin(admin.ModelAdmin):
    list_display = ('name', 'course', 'level', 'score', 'total_questions', 'passed', 'submitted_at')
    search_fields = ('name', 'course')
    list_filter = ('course', 'level', 'passed', 'submitted_at')

from django.contrib import admin
from .models import DemoRequest

@admin.register(DemoRequest)
class DemoRequestAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'phone', 'institution', 'requested_at')
    search_fields = ('full_name', 'email', 'institution')
    list_filter = ('requested_at',)

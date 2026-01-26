from django.contrib import admin
from .models import WorkshopRequest

@admin.register(WorkshopRequest)
class WorkshopRequestAdmin(admin.ModelAdmin):
    list_display = ('college_name', 'contact_person', 'email', 'phone', 'submitted_at')
    search_fields = ('college_name', 'contact_person', 'email')
    list_filter = ('submitted_at',)

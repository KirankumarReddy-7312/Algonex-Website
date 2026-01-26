from django.contrib import admin
from .models import EventRegistration

@admin.register(EventRegistration)
class EventRegistrationAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'mode', 'amount', 'created_at')
    search_fields = ('name', 'email', 'paymentId')
    list_filter = ('mode', 'created_at')

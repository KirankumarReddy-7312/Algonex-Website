from rest_framework import serializers
from .models import WorkshopRequest

class WorkshopRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkshopRequest
        fields = '__all__'

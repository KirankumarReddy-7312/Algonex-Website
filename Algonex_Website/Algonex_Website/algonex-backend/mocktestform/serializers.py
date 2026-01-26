from rest_framework import serializers
from .models import MockTestResult

class MockTestResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = MockTestResult
        fields = '__all__'

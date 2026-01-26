from rest_framework import serializers
from .models import ResumeDownload

class ResumeDownloadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeDownload
        fields = ['email', 'template_id', 'template_title']

from django.urls import path
from .views import ResumeDownloadView

urlpatterns = [
    path('download-resume/', ResumeDownloadView.as_view(), name='download-resume'),
]

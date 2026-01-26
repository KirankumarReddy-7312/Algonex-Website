from django.urls import path
from .views import MockTestResultView, DownloadCertificateView

urlpatterns = [
    path('submit-result/', MockTestResultView.as_view(), name='submit-result'),
    path('download-certificate/', DownloadCertificateView.as_view(), name='download-certificate'),
]

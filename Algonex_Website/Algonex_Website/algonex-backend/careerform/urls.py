from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ApplyJobView, JobPostingViewSet, VerifyAdminView

router = DefaultRouter()
router.register(r'jobs', JobPostingViewSet, basename='jobposting')

urlpatterns = [
    path('apply/', ApplyJobView.as_view(), name='apply'),
    path('verify-admin/', VerifyAdminView.as_view(), name='verify-admin'),
    path('', include(router.urls)),
]

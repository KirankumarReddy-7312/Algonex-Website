from django.urls import path
from .views import WorkshopRequestView

urlpatterns = [
    path('submit-workshop/', WorkshopRequestView.as_view(), name='submit-workshop'),
]

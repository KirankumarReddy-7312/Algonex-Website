from django.urls import path
from .views import MockInterviewBookingView

urlpatterns = [
    path('book/', MockInterviewBookingView.as_view(), name='book-mock-interview'),
]

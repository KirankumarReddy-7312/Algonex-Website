from django.urls import path
from .views import DemoRequestView

urlpatterns = [
    path('book/', DemoRequestView.as_view(), name='book-demo'),
]

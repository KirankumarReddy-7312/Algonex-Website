from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from django.contrib.auth import authenticate
from .models import JobApplication, JobPosting
from .serializers import JobApplicationSerializer, JobPostingSerializer

class ApplyJobView(APIView):
    def post(self, request):
        serializer = JobApplicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Application submitted successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class JobPostingViewSet(viewsets.ModelViewSet):
    queryset = JobPosting.objects.filter(is_active=True).order_by('-created_at')
    serializer_class = JobPostingSerializer

    def get_queryset(self):
        # Allow checking all if needed, but default to active
        return JobPosting.objects.all().order_by('-created_at')

class VerifyAdminView(APIView):
    def post(self, request):
        password = request.data.get('password')
        # Hardcoded check for 'Algonex' user or just generic check if we don't want to assume username
        # But better to use the actual auth system
        user = authenticate(username='Algonex', password=password)
        if user is not None and user.is_staff:
            return Response({'success': True})
        return Response({'success': False}, status=status.HTTP_401_UNAUTHORIZED)
 

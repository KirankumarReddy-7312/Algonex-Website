from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse
from .serializers import MockTestResultSerializer
from .utils import trigger_certificate_email, generate_certificate_pdf
from datetime import datetime

class MockTestResultView(APIView):
    def post(self, request):
        serializer = MockTestResultSerializer(data=request.data)
        if serializer.is_valid():
            instance = serializer.save()
            
            # If passed, send certificate email
            if instance.passed:
                trigger_certificate_email(
                    instance.email,
                    instance.name,
                    instance.course,
                    instance.level
                )
            
            return Response({'message': 'Test result saved successfully', 'id': instance.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DownloadCertificateView(APIView):
    def post(self, request):
        """
        Generate and return certificate PDF on demand.
        Expects: name, course, level
        """
        name = request.data.get('name')
        course = request.data.get('course')
        level = request.data.get('level')
        
        if not all([name, course, level]):
            return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)
            
        date_str = datetime.now().strftime("%B %d, %Y")
        pdf_buffer = generate_certificate_pdf(name, course, level, date_str)
        
        response = HttpResponse(pdf_buffer.getvalue(), content_type='application/pdf')
        filename = f"{name.replace(' ', '_')}_Certificate.pdf"
        response['Content-Disposition'] = f'attachment; filename="{filename}"'
        return response

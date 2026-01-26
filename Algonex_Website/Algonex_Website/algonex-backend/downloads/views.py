from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ResumeDownloadSerializer

class ResumeDownloadView(APIView):
    def post(self, request):
        serializer = ResumeDownloadSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Download authorized", "status": "success"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

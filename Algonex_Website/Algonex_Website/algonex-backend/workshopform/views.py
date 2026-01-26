from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import WorkshopRequestSerializer

class WorkshopRequestView(APIView):
    def post(self, request):
        serializer = WorkshopRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Workshop request submitted successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

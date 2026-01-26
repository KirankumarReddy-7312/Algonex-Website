from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import MockInterviewSerializer

class MockInterviewBookingView(APIView):
    def post(self, request):
        serializer = MockInterviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Mock interview booked successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

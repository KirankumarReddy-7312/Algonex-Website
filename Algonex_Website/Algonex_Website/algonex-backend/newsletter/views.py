from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import SubscriptionSerializer
from .models import Subscription

class SubscribeView(APIView):
    def post(self, request):
        email = request.data.get('email')
        if Subscription.objects.filter(email=email).exists():
            return Response({'message': 'You are already subscribed!'}, status=status.HTTP_200_OK)
        
        serializer = SubscriptionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Successfully subscribed to newsletter!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

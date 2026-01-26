from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import SigninProfileSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import logging

logger = logging.getLogger(__name__)

from .models import SigninProfile

@method_decorator(csrf_exempt, name='dispatch')
class SigninFormView(APIView):
    def post(self, request):
        try:
            email = request.data.get('email')
            existing_user = SigninProfile.objects.filter(email=email).first()

            if existing_user:
                # Update existing user
                serializer = SigninProfileSerializer(existing_user, data=request.data, partial=True)
            else:
                # Create new user
                serializer = SigninProfileSerializer(data=request.data)

            if serializer.is_valid():
                instance = serializer.save()
                
                # Automation: Send Syllabus PDF via Email & WhatsApp
                try:
                    from .utils import send_syllabus_email, send_whatsapp_message
                    import threading
                    
                    logger.info(f"Queuing automation for {instance.email}")
                    
                    # Use threading to keep response fast
                    threading.Thread(target=send_syllabus_email, args=(
                        instance.email, instance.name, instance.course_interested
                    )).start()
                    
                    threading.Thread(target=send_whatsapp_message, args=(
                        instance.phone, instance.name, instance.course_interested
                    )).start()
                    
                except Exception as email_error:
                    logger.error(f"Error queuing automation: {str(email_error)}", exc_info=True)
                    
                except Exception as email_error:
                    logger.error(f"Error in automation: {str(email_error)}", exc_info=True)
                
                return Response({'message': 'Sign-in data saved and syllabus sent!'}, status=status.HTTP_201_CREATED)
            else:
                logger.warning("Validation failed: %s", serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error("Unexpected error: %s", str(e))
            return Response({'error': 'Internal server error', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

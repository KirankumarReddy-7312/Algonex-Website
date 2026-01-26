import os
import sys
import django

# Add the project directory to the Python path
sys.path.append(r'c:\Users\kiran\OneDrive\Desktop\algo\Algonex_Website\Algonex_Website\algonex-backend')

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

# Now test the email functionality
from signin.utils import send_syllabus_email

# Test with your email
test_email = "samanwaysm7@gmail.com"
test_name = "Test User"
test_course = "Python + DSA with AI"

print(f"Testing email send to: {test_email}")
print(f"Course: {test_course}")

result = send_syllabus_email(test_email, test_name, test_course)

if result:
    print("✓ Email sent successfully!")
else:
    print("✗ Email sending failed!")

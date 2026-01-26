import os
import sys
import django

# Add the project directory to the Python path
sys.path.append(r'c:\Users\kiran\OneDrive\Desktop\algo\Algonex_Website\Algonex_Website\algonex-backend')

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from signin.utils import send_syllabus_email, send_whatsapp_message

# Test configuration
TEST_EMAIL = "kiranreddy.algonex@gmail.com"  # Replace with your actual email
TEST_PHONE = "9959789424"  # Replace with your actual WhatsApp number
TEST_NAME = "Kiran Kumar"
TEST_COURSE = "Python + DSA with AI"

print("=" * 60)
print("ALGONEX SYLLABUS AUTOMATION TEST")
print("=" * 60)
print(f"\nTest Details:")
print(f"  Name: {TEST_NAME}")
print(f"  Email: {TEST_EMAIL}")
print(f"  Phone: {TEST_PHONE}")
print(f"  Course: {TEST_COURSE}")
print("\n" + "=" * 60)

# Test Email
print("\n[1/2] Testing Email Delivery...")
try:
    email_result = send_syllabus_email(TEST_EMAIL, TEST_NAME, TEST_COURSE)
    if email_result:
        print("✓ Email sent successfully!")
        print(f"  → Check your inbox at: {TEST_EMAIL}")
    else:
        print("✗ Email sending failed!")
except Exception as e:
    print(f"✗ Email error: {str(e)}")

# Test WhatsApp
print("\n[2/2] Testing WhatsApp Notification...")
try:
    whatsapp_result = send_whatsapp_message(TEST_PHONE, TEST_NAME, TEST_COURSE)
    if whatsapp_result:
        print("✓ WhatsApp notification logged!")
        print("  → Note: Actual WhatsApp sending requires API setup")
    else:
        print("✗ WhatsApp notification failed!")
except Exception as e:
    print(f"✗ WhatsApp error: {str(e)}")

print("\n" + "=" * 60)
print("TEST COMPLETE")
print("=" * 60)
print("\nNext Steps:")
print("1. Check your email inbox for the PDF syllabus")
print("2. To enable WhatsApp, configure a provider (Twilio/Meta)")
print("3. Test the full flow by submitting a form on the website")

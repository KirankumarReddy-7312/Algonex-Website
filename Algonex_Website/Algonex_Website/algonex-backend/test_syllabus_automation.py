"""
Test script to verify PDF generation and email sending
"""
import os
import sys
import django

# Setup Django
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from signin.utils import send_syllabus_email, generate_syllabus_pdf

def test_pdf_generation():
    print("\n" + "="*60)
    print("TESTING PDF GENERATION")
    print("="*60)
    
    test_courses = ['Python + DSA with AI', 'Java Full Stack with AI', 'MERN Stack', 'Data Science with AI']
    
    for course in test_courses:
        try:
            print(f"\n✓ Testing: {course}")
            pdf_buffer = generate_syllabus_pdf(course)
            print(f"  → PDF generated successfully ({len(pdf_buffer.getvalue())} bytes)")
        except Exception as e:
            print(f"  ✗ Error: {str(e)}")

def test_email_sending():
    print("\n" + "="*60)
    print("TESTING EMAIL SENDING")
    print("="*60)
    
    test_email = "solutions@algonex.co.in"
    test_name = "Test User"
    test_course = "Python + DSA with AI"
    
    print(f"\nSending test email to: {test_email}")
    print(f"Course: {test_course}")
    
    result = send_syllabus_email(test_email, test_name, test_course)
    
    if result:
        print("\n✓ Email sent successfully!")
        print("  → Check your inbox at solutions@algonex.co.in")
    else:
        print("\n✗ Email sending failed!")
        print("  → Check the error messages above")

if __name__ == "__main__":
    print("\n🚀 ALGONEX SYLLABUS AUTOMATION TEST")
    
    # Test PDF generation
    test_pdf_generation()
    
    # Test email sending
    test_email_sending()
    
    print("\n" + "="*60)
    print("TEST COMPLETE")
    print("="*60 + "\n")

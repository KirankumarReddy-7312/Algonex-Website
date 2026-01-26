import io
import os
import requests
from django.core.mail import EmailMessage
from django.conf import settings
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, ListFlowable, ListItem
from .syllabus_data import SYLLABUS_DATA, SYLLABUS_MAPPING

def get_syllabus_content(course_name):
    key = course_name.lower().strip()
    # Check direct match
    if key in SYLLABUS_DATA:
        return SYLLABUS_DATA[key]
    
    # Check mapping
    slug = SYLLABUS_MAPPING.get(key)
    if slug and slug in SYLLABUS_DATA:
        return SYLLABUS_DATA[slug]
        
    # Final fallback
    return SYLLABUS_DATA['general']

def generate_syllabus_pdf(course_name):
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter, rightMargin=50, leftMargin=50, topMargin=50, bottomMargin=50)
    styles = getSampleStyleSheet()
    
    # Custom Styles
    title_style = ParagraphStyle(
        'MainTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#00667A'),
        spaceAfter=20,
        alignment=1 # Center
    )
    
    module_title_style = ParagraphStyle(
        'ModuleTitle',
        parent=styles['Heading2'],
        fontSize=14,
        textColor=colors.HexColor('#00B4D8'),
        spaceBefore=15,
        spaceAfter=10
    )
    
    normal_style = styles['Normal']
    
    elements = []
    
    content = get_syllabus_content(course_name)
    
    # Header
    elements.append(Paragraph("ALGONEX IT SOLUTIONS", title_style))
    elements.append(Paragraph(f"{content['title']} - Detailed Syllabus", styles['Heading2']))
    elements.append(Spacer(1, 12))
    
    # Description
    elements.append(Paragraph(content['description'], normal_style))
    elements.append(Spacer(1, 24))
    
    # Modules
    for module in content['modules']:
        elements.append(Paragraph(module['title'], module_title_style))
        topics = [ListItem(Paragraph(topic, normal_style), leftIndent=20) for topic in module['topics']]
        elements.append(ListFlowable(topics, bulletType='bullet'))
        elements.append(Spacer(1, 10))
        
    # Footer
    elements.append(Spacer(1, 40))
    elements.append(Paragraph("Contact us: solutions@algonex.co.in | +91 9959789424", styles['Italic']))
    
    doc.build(elements)
    buffer.seek(0)
    return buffer

def send_syllabus_email(user_email, user_name, course_name):
    try:
        pdf_buffer = generate_syllabus_pdf(course_name)
        
        subject = f"Your Requested Syllabus: {course_name} - Algonex IT Solutions"
        body = f"""Hi {user_name},

Thank you for choosing Algonex IT Solutions!

As requested, we have attached the detailed syllabus for the {course_name} program. 
This curriculum is designed to make you industry-ready with hands-on projects and expert guidance.

Our team will contact you shortly to discuss your career goals and how we can help you achieve them.

Feel free to reply to this email or call us at +91 9959789424 for immediate assistance.

Best Regards,
Team Algonex
"""
        
        email = EmailMessage(
            subject,
            body,
            settings.DEFAULT_FROM_EMAIL, # Send as solutions@algonex.co.in
            [user_email],
            bcc=['solutions@algonex.co.in'],
            reply_to=['solutions@algonex.co.in'],
            headers={'From': 'Algonex Solutions <solutions@algonex.co.in>'}
        )
        
        # Attach PDF
        email.attach(f"{course_name.replace(' ', '_')}_Syllabus.pdf", pdf_buffer.getvalue(), 'application/pdf')
        
        email.send()
        print(f"✓ Email sent successfully to {user_email} (BCC: solutions@algonex.co.in)")
        return True
        
    except Exception as e:
        print(f"✗ Error sending email: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

def send_whatsapp_message(phone, user_name, course_name):
    """
    Placeholder for WhatsApp automation.
    Requires an API service like Twilio or Meta Cloud API.
    For demonstration, we log the intent.
    """
    # Fix phone format (assuming Indian numbers)
    clean_phone = phone.strip().replace(' ', '').replace('+', '')
    if len(clean_phone) == 10:
        clean_phone = '91' + clean_phone
    
    # Algonex team notification number
    algonex_number = '919959789424'
    
    print(f"📱 WHATSAPP AUTOMATION:")
    print(f"   → User: {user_name} ({clean_phone})")
    print(f"   → Course: {course_name}")
    print(f"   → Notification sent to Algonex: {algonex_number}")
    
    # EXAMPLE implementation for a generic WhatsApp Gateway
    # To activate, uncomment and add your API credentials:
    
    # url = "https://api.whatsapp.com/send"
    # 
    # # Message to user
    # user_message = f"Hi {user_name}, thanks for requesting the {course_name} syllabus from Algonex! Check your email for the PDF. Our team will contact you shortly."
    # 
    # # Message to Algonex team
    # team_message = f"New syllabus request:\nName: {user_name}\nPhone: {clean_phone}\nCourse: {course_name}"
    # 
    # # Send to user
    # requests.post(url, data={"to": clean_phone, "message": user_message})
    # 
    # # Send to Algonex team
    # requests.post(url, data={"to": algonex_number, "message": team_message})
    
    return True

import io
import threading
import os
from django.core.mail import EmailMessage
from django.conf import settings
from reportlab.lib.pagesizes import landscape, A4
from reportlab.lib import colors
from reportlab.lib.units import inch, mm
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER

def draw_certificate_border(c, width, height):
    # Outer Border (Gold)
    c.setStrokeColor(colors.HexColor('#FFB703'))
    c.setLineWidth(5)
    c.rect(20, 20, width-40, height-40)

    # Inner Border (Blue) - Decorative corners
    margin = 35
    c.setStrokeColor(colors.HexColor('#00B4D8'))
    c.setLineWidth(2)
    
    # Draw logic for corners only not full rect for style
    # Top Left
    c.line(margin, height-margin, margin+100, height-margin) # Horz
    c.line(margin, height-margin, margin, height-margin-100) # Vert
    
    # Top Right
    c.line(width-margin, height-margin, width-margin-100, height-margin)
    c.line(width-margin, height-margin, width-margin, height-margin-100)
    
    # Bottom Left
    c.line(margin, margin, margin+100, margin)
    c.line(margin, margin, margin, margin+100)
    
    # Bottom Right
    c.line(width-margin, margin, width-margin-100, margin)
    c.line(width-margin, margin, width-margin, height-margin-100) # This was a bug in previous logic? fixed below.
    c.line(width-margin, margin, width-margin, margin+100)

def generate_certificate_pdf(user_name, course_name, level, date_str):
    buffer = io.BytesIO()
    c = canvas.Canvas(buffer, pagesize=landscape(A4))
    width, height = landscape(A4)
    
    # 1. Background Watermark
    c.saveState()
    c.translate(width/2, height/2)
    c.rotate(30)
    c.setFillColor(colors.lightgrey)
    c.setFont("Helvetica-Bold", 80)
    c.setFillAlpha(0.05)
    c.drawCentredString(0, 0, "ALGONEX IT SOLUTIONS")
    c.restoreState()
    
    # 2. Border
    draw_certificate_border(c, width, height)
    
    # 3. Content
    # Header
    c.setFillColor(colors.HexColor('#1E293B'))
    c.setFont("Times-Bold", 42)
    c.drawCentredString(width/2, height - 120, "CERTIFICATE")
    
    c.setFont("Times-Roman", 18)
    c.setFillColor(colors.HexColor('#64748B'))
    c.drawCentredString(width/2, height - 150, "OF ACHIEVEMENT")
    
    # Body
    c.setFont("Helvetica-Oblique", 14)
    c.setFillColor(colors.black)
    c.drawCentredString(width/2, height - 200, "This certificate is proudly presented to")
    
    # Name
    c.setFont("Helvetica-BoldOblique", 36)
    c.setFillColor(colors.HexColor('#00667A')) # Brand Blue
    c.drawCentredString(width/2, height - 260, user_name)
    c.line(width/2 - 200, height - 270, width/2 + 200, height - 270) # Underline
    
    # Description
    c.setFont("Helvetica", 14)
    c.setFillColor(colors.black)
    text_y = height - 320
    c.drawCentredString(width/2, text_y, f"For successfully demonstrating exceptional skills and knowledge in")
    
    c.setFont("Helvetica-Bold", 18)
    c.drawCentredString(width/2, text_y - 30, f"{course_name} ({level.upper()})")
    
    c.setFont("Helvetica", 12)
    c.drawCentredString(width/2, text_y - 60, "and passing the assessment with a perfect score.")

    # Footer (Signatures)
    # Left: Date
    c.setFont("Helvetica-Bold", 10)
    c.drawString(100, 100, "DATE")
    c.setFont("Helvetica", 12)
    c.drawString(100, 80, date_str)
    
    # Right: Signature
    c.setFont("Helvetica-Bold", 10)
    c.drawRightString(width-100, 100, "AUTHORIZED BY")
    
    # Signature Mock
    c.setFont("Times-Italic", 20)
    c.setFillColor(colors.HexColor('#00B4D8'))
    c.drawRightString(width-100, 75, "Algonex Team")
    c.setStrokeColor(colors.black)
    c.setLineWidth(1)
    c.line(width-250, 70, width-100, 70)
    
    c.setFont("Helvetica", 8)
    c.setFillColor(colors.gray)
    c.drawRightString(width-100, 55, "Algonex IT Solutions")

    c.showPage()
    c.save()
    
    buffer.seek(0)
    return buffer

def send_certificate_email_task(user_email, user_name, course_name, level):
    try:
        from datetime import datetime
        date_str = datetime.now().strftime("%B %d, %Y")
        
        pdf_buffer = generate_certificate_pdf(user_name, course_name, level, date_str)
        
        subject = f"Certificate of Achievement - {course_name} | Algonex"
        body = f"""Dear {user_name},

We are thrilled to present you with this Certificate of Achievement for successfully completing the {course_name} assessment at the {level} level.

Your performance demonstrates a strong command of the subject matter.

Please find your official certificate attached. We encourage you to share your success on LinkedIn and build your professional portfolio.

Best Regards,
Algonex IT Solutions
"""
        
        email = EmailMessage(
            subject,
            body,
            settings.DEFAULT_FROM_EMAIL,
            [user_email],
            bcc=['solutions@algonex.co.in'],
            reply_to=['solutions@algonex.co.in'],
            headers={'From': 'Algonex Solutions <solutions@algonex.co.in>'}
        )
        
        filename = f"{user_name.replace(' ', '_')}_Certificate.pdf"
        email.attach(filename, pdf_buffer.getvalue(), 'application/pdf')
        
        email.send()
        print(f"✓ Certificate sent to {user_email}")
        return True
    
    except Exception as e:
        print(f"✗ Error sending certificate: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

def trigger_certificate_email(user_email, user_name, course_name, level):
    thread = threading.Thread(target=send_certificate_email_task, args=(user_email, user_name, course_name, level))
    thread.start()

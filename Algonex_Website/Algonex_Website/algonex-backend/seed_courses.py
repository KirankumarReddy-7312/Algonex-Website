import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from courses.models import Course

def add_courses():
    courses_to_add = [
        {
            "title": "Generative AI Masterclass",
            "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
            "level": "Intermediate",
            "duration": "8 Weeks",
            "modules": "24",
            "gradient": "linear-gradient(to bottom, #7F00FF, #E100FF)",
            "category": "Gen AI",
            "rating": "4.9",
            "students": "1,250",
            "trending": True
        },
        {
            "title": "Data Science with Python Pro",
            "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
            "level": "Advanced",
            "duration": "6 Months",
            "modules": "48",
            "gradient": "linear-gradient(to bottom, #00C9FF, #92FE9D)",
            "category": "Data Science",
            "rating": "4.8",
            "students": "3,400",
            "trending": True
        },
        {
            "title": "Advanced Excel for Data Analysis",
            "image": "https://images.unsplash.com/photo-1543286386-713bcd534a77?w=800&auto=format&fit=crop",
            "level": "Beginner",
            "duration": "4 Weeks",
            "modules": "16",
            "gradient": "linear-gradient(to bottom, #1D976C, #93F9B9)",
            "category": "Excel",
            "rating": "4.7",
            "students": "2,100",
            "trending": True
        }
    ]

    for course_data in courses_to_add:
        course, created = Course.objects.get_or_create(
            title=course_data["title"],
            defaults=course_data
        )
        if created:
            print(f"Created course: {course.title}")
        else:
            print(f"Course already exists: {course.title}")

if __name__ == "__main__":
    add_courses()

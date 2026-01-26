import os
import django
from django.contrib.auth import get_user_model

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

User = get_user_model()
username = 'Algonex'
password = 'Algonex@7312'

# Delete if exists to be clean
User.objects.filter(username=username).delete()

# Create new superuser
user = User.objects.create_superuser(username=username, email='admin@algonex.co.in', password=password)
user.is_staff = True
user.is_superuser = True
user.is_active = True
user.save()

with open('status.txt', 'w') as f:
    f.write(f"Successfully created/updated superuser: {username}")

print(f"Successfully created/updated superuser: {username}")

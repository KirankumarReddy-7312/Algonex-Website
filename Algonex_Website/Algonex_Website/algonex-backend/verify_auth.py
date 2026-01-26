import os
import django
from django.contrib.auth import get_user_model, authenticate

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

User = get_user_model()
username = 'Algonex'
password = 'Algonex@7312'

# Reset user
User.objects.filter(username=username).delete()
user = User.objects.create_superuser(username=username, email='admin@algonex.co.in', password=password)
user.is_active = True
user.is_staff = True
user.is_superuser = True
user.save()

# Verify authentication
authenticated_user = authenticate(username=username, password=password)

with open('auth_verify.txt', 'w') as f:
    if authenticated_user:
        f.write(f"Authentication SUCCESS for {username}\n")
        f.write(f"User flags: Staff={authenticated_user.is_staff}, Super={authenticated_user.is_superuser}, Active={authenticated_user.is_active}")
    else:
        f.write(f"Authentication FAILED for {username}")

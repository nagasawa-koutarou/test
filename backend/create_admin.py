import os
import sys
import django

print("🔧 Starting create_admin.py")

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

try:
    django.setup()
    from django.contrib.auth import get_user_model
    from django.db.utils import OperationalError

    User = get_user_model()

    if not User.objects.filter(username="admin").exists():
        user = User(username="admin", email="admin@example.com", is_staff=True, is_superuser=True)
        user.set_password("yourpassword123")
        user.save()
        print("✅ Superuser created.")
    else:
        print("ℹ️ Superuser already exists.")

except OperationalError as e:
    print("⚠️ Database not ready yet:", str(e))
except Exception as e:
    print("❌ Unexpected error:", str(e))
    sys.exit(1)


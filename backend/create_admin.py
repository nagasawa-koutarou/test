# backend/create_admin.py

import os
import django

# Django設定を明示的に読み込む
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from django.contrib.auth import get_user_model
from django.db.utils import OperationalError

User = get_user_model()

try:
    if not User.objects.filter(username="admin").exists():
        User.objects.create_superuser("admin", "admin@example.com", "yourpassword123")
        print("✅ Superuser created.")
    else:
        print("ℹ️ Superuser already exists.")
except OperationalError:
    print("⚠️ Database not ready yet.")

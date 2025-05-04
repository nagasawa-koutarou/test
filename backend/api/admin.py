from django.contrib import admin
from .models import Memo

@admin.register(Memo)
class MemoAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'user')
    search_fields = ('title', 'content')
    list_filter = ('created_at',)

# Register your models here.

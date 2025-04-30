from rest_framework import serializers
from .models import Memo

class MemoSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Memo
        fields = ['id', 'title', 'content', 'created_at', 'username']

    # 🔽 タイトルのバリデーション
    def validate_title(self, value):
        if not value.strip():
            raise serializers.ValidationError("タイトルは必須です。")
        return value

    # 🔽 内容のバリデーション
    def validate_content(self, value):
        if not value.strip():
            raise serializers.ValidationError("内容は必須です。")
        return value

from rest_framework import viewsets
from .models import Memo
from .serializers import MemoSerializer
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_info(request):
    return Response({'username': request.user.username})

@api_view(['POST'])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'ユーザー名とパスワードは必須です'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'このユーザー名はすでに使われています'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password)
    return Response({'message': 'ユーザー登録成功！'}, status=status.HTTP_201_CREATED)

def perform_create(self, serializer):
    serializer.save(user=self.request.user)


class MemoViewSet(viewsets.ModelViewSet):
    queryset = Memo.objects.all().order_by('-created_at')
    serializer_class = MemoSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
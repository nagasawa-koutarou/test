from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from .models import Memo

class TestMemoAPI(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.client = APIClient()
        # ログインしてトークンを取得
        response = self.client.post('/api/token/', {'username': 'testuser', 'password': 'testpass'}, format='json')
        self.token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)

    def test_create_memo(self):
        response = self.client.post('/api/memos/', {
            'title': 'テストタイトル',
            'content': 'テスト内容'
        }, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Memo.objects.count(), 1)
        self.assertEqual(Memo.objects.first().title, 'テストタイトル')

    def test_get_memo_list(self):
        Memo.objects.create(user=self.user, title='メモ1', content='内容1')
        Memo.objects.create(user=self.user, title='メモ2', content='内容2')
        response = self.client.get('/api/memos/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

    def test_validation_error(self):
        response = self.client.post('/api/memos/', {
            'title': '',
            'content': ''
        }, format='json')
        self.assertEqual(response.status_code, 400)
        self.assertIn('This field may not be blank.', str(response.data))

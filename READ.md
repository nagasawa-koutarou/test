ログイン・認証付きのメモ管理アプリです。Django REST + React の構成で、シンプルなUIながら機能も充実。

# メモ管理アプリ（Django + React）

ログイン機能付きのメモ管理アプリです。  
React（フロントエンド） + Django REST Framework（バックエンド）で構築されています。

---

## 🔧 主な機能

- ユーザー登録・ログイン／ログアウト
- メモの作成・一覧表示・編集・削除
- 作成者と作成日時の表示
- 入力バリデーション（React側 + Django側）
- テストコードによる動作確認（Django）

---

## 🖥 使用技術

- Django 5.x
- Django REST Framework
- React 18
- Axios
- JWT認証
- SQLite（開発用DB）

---

## 🚀 ローカルでの起動方法

### バックエンド（Django）

```bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windowsの場合
# または
source venv/bin/activate       # Mac/Linuxの場合

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### フロントエンド（React）
別ターミナルを開いて以下を実行：

```bash
cd frontend
npm install
npm start
```

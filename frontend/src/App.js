import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './Login';
import SignUp from './SignUp';

function App() {
  const [memos, setMemos] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingContent, setEditingContent] = useState('');
  const [username, setUsername] = useState('');

  const fetchMemos = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    axios.get('http://localhost:8000/api/memos/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => setMemos(response.data))
    .catch(error => console.error('取得エラー:', error));
  };

  const fetchUsername = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    axios.get('http://localhost:8000/api/user/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => setUsername(response.data.username))
    .catch(error => console.error('ユーザー名取得エラー:', error));
  };

  // ✅ バリデーション付きメモ追加
  const addMemo = () => {
    if (!title.trim() || !content.trim()) {
      alert('タイトルと内容は必須です。');
      return;
    }

    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('ログインしてください');
      return;
    }

    axios.post('http://localhost:8000/api/memos/', { title, content }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      setTitle('');
      setContent('');
      fetchMemos();
    })
    .catch(error => console.error('追加エラー:', error));
  };

  const deleteMemo = (id) => {
    if (!window.confirm('このメモを本当に削除しますか？')) return;

    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('ログインしてください');
      return;
    }

    axios.delete(`http://localhost:8000/api/memos/${id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => fetchMemos())
    .catch(error => console.error('削除エラー:', error));
  };

  // ✅ バリデーション付きメモ更新
  const updateMemo = () => {
    if (!editingTitle.trim() || !editingContent.trim()) {
      alert('タイトルと内容は必須です。');
      return;
    }

    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('ログインしてください');
      return;
    }

    axios.put(`http://localhost:8000/api/memos/${editingId}/`, {
      title: editingTitle,
      content: editingContent
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      setEditingId(null);
      setEditingTitle('');
      setEditingContent('');
      fetchMemos();
    })
    .catch(error => console.error('更新エラー:', error));
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    setUsername('');
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
      fetchUsername();
      fetchMemos();
    }
  }, []);

  if (!isLoggedIn) {
    if (isSigningUp) {
      return (
        <SignUp
          onSignUp={() => setIsSigningUp(false)}
          onBack={() => setIsSigningUp(false)}
        />
      );
    }
    return (
      <div>
        <Login onLogin={() => {
          setIsLoggedIn(true);
          fetchUsername();
          fetchMemos();
        }} />
        <p>アカウントを持っていない？ <button onClick={() => setIsSigningUp(true)}>新規登録</button></p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <p>こんにちは、{username} さん！</p>
        <button onClick={handleLogout}>ログアウト</button>
      </div>

      <h1>メモ一覧（ログイン済み）</h1>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '300px', marginRight: '1rem' }}
        />
        <input
          type="text"
          placeholder="内容"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: '500px', marginRight: '1rem' }}
        />
        <button onClick={addMemo}>追加</button>
      </div>

      {memos.length === 0 ? (
        <p>メモがありません。</p>
      ) : (
        <ul>
          {memos.map((memo) => (
            <li key={memo.id} style={{ marginBottom: '1.5rem' }}>
              {editingId === memo.id ? (
                <>
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    style={{ width: '300px', marginBottom: '0.5rem' }}
                  /><br />
                  <input
                    type="text"
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    style={{ width: '500px', marginBottom: '0.5rem' }}
                  /><br />
                  <button onClick={updateMemo}>保存</button>{' '}
                  <button onClick={() => setEditingId(null)}>キャンセル</button>
                </>
              ) : (
                <>
                  <strong>{memo.title}</strong><br />
                  {memo.content}<br />
                  👤 投稿者: {memo.username || '不明'}<br />
                  🕒 作成日時: {new Date(memo.created_at).toLocaleString()}<br />
                  <button onClick={() => {
                    setEditingId(memo.id);
                    setEditingTitle(memo.title);
                    setEditingContent(memo.content);
                  }}>編集</button>{' '}
                  <button onClick={() => deleteMemo(memo.id)}>削除</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

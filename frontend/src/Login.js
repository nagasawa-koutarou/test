import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios.post('http://localhost:8000/api/token/', {
      username: username,
      password: password
    })
    .then(response => {
      const accessToken = response.data.access;
      localStorage.setItem('accessToken', accessToken); // トークン保存
      onLogin(); // ログイン後の処理（App.js側に渡す）
      alert('ログイン成功！');
    })
    .catch(error => {
      console.error('ログイン失敗:', error);
      alert('ログインに失敗しました');
    });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>ログイン</h2>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="ユーザー名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <button onClick={handleLogin}>ログイン</button>
      </div>
    </div>
  );
}

export default Login;
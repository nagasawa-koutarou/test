import React, { useState } from 'react';
import axios from 'axios';

function SignUp({ onSignUp, onBack }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    axios.post('http://localhost:8000/api/signup/', {
      username: username,
      password: password
    })
    .then(response => {
      alert('ユーザー登録成功！ログインしてください');
      onSignUp();  // 登録後にログイン画面へ戻す
    })
    .catch(error => {
      console.error('登録失敗:', error);
      alert('ユーザー登録に失敗しました');
    });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>新規登録</h2>
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
        <button onClick={handleSignUp}>登録</button>
        <button onClick={onBack}>戻る</button> {/* ← ここ追加！ */}
      </div>
    </div>
  );
}

export default SignUp;
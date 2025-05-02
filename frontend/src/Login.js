import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/token/`,
        { username, password }
      );
      localStorage.setItem('accessToken', response.data.access);
      onLogin();
    } catch (error) {
      alert('ログインに失敗しました。');
    }
  };

  return (
    <div>
      <h2>ログイン</h2>
      <input
        type="text"
        placeholder="ユーザー名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={handleLogin}>ログイン</button>
    </div>
  );
};

export default Login;
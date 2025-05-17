import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // ローディング状態
  const [errorMsg, setErrorMsg] = useState('');   // エラーメッセージ

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/token/`,
        { username, password }
      );
      localStorage.setItem('accessToken', response.data.access);
      onLogin();
    } catch (error) {
      setErrorMsg('ログインに失敗しました。初回アクセスは数十秒かかることがあります。');
    } finally {
      setLoading(false);
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
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'ログイン中...' : 'ログイン'}
      </button>

      {/* ローディング中の説明 */}
      {loading && <p>初回アクセス時はサーバーの起動により、30秒ほどかかることがあります。</p>}

      {/* エラーメッセージの表示 */}
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
    </div>
  );
};

export default Login;
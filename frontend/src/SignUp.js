import React, { useState } from 'react';
import axios from 'axios';

const SignUp = ({ onSignUp, onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/signup/`,
        { username, password }
      );
      alert('登録に成功しました！');
      onSignUp();
    } catch (error) {
      alert('登録に失敗しました。');
    }
  };

  return (
    <div>
      <h2>新規登録</h2>
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
      <button onClick={handleSignUp}>登録</button>
      <button onClick={onBack}>戻る</button>
    </div>
  );
};

export default SignUp;
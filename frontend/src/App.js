import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [memos, setMemos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/memos/')
      .then(response => {
        setMemos(response.data);
      })
      .catch(error => {
        console.error('データ取得エラー:', error);
      });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>メモ一覧</h1>
      {memos.length === 0 ? (
        <p>メモがありません。</p>
      ) : (
        <ul>
          {memos.map((memo) => (
            <li key={memo.id}>
              <strong>{memo.title}</strong><br />
              {memo.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [memos, setMemos] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // メモ一覧取得
  useEffect(() => {
    fetchMemos();
  }, []);

  const fetchMemos = () => {
    axios.get('http://localhost:8000/api/memos/')
      .then(response => setMemos(response.data))
      .catch(error => console.error('取得エラー:', error));
  };

  // メモ追加
  const addMemo = () => {
    if (title.trim() === '' || content.trim() === '') {
      alert('タイトルと内容を入力してください');
      return;
    }

    axios.post('http://localhost:8000/api/memos/', {
      title,
      content
    })
      .then(() => {
        setTitle('');
        setContent('');
        fetchMemos(); // 再取得
      })
      .catch(error => console.error('追加エラー:', error));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>メモ一覧</h1>

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

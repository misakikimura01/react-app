import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5001');

const ChatWindow: React.FC<{ userId: string }> = ({ userId }) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<{ userId: string; message: string }[]>([]);

  useEffect(() => {
    // サーバーからメッセージを受信
    socket.on('chatMessage', (msg: { userId: string, message: string }) => {
      setChat((prevChat) => [...prevChat, msg]);  // チャット履歴に追加
    });

    return () => {
      socket.off('chatMessage');
    };
  }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('chatMessage', { userId, message }); 
      setMessage('');
    }
  };

  return (
    <div style={{ padding: '20px', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <h1>Chat Window (User {userId})</h1>
      <div style={{ flex: 1, overflowY: 'auto', marginBottom: '20px', border: '1px solid #ddd', padding: '10px' }}>
        {/* チャット履歴を表示 */}
        {chat.map((msg, index) => (
          <div
            key={index}
            style={{
              marginBottom: '10px',
              padding: '10px',
              border: '1px solid #ddd',
              backgroundColor: msg.userId === userId ? '#e1f7d5' : '#f7d5d5',
            }}
          >
            <strong>User {msg.userId}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message"
          style={{ padding: '10px', marginBottom: '10px' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;

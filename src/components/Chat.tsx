import React from 'react';
import ChatWindow from './ChatWindow.tsx'; 

const Chat: React.FC = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* 左側のチャット */}
      <div style={{ flex: 1, borderRight: '1px solid #ddd' }}>
        <ChatWindow userId="1" />
      </div>

      {/* 右側のチャット */}
      <div style={{ flex: 1 }}>
        <ChatWindow userId="2" />
      </div>
    </div>
  );
};

export default Chat;


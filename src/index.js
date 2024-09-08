import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx'; // 拡張子 .tsx を明示的に追加
import reportWebVitals from './reportWebVitals.ts'; // 拡張子 .ts を明示的に追加

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

import React, {useState} from "react";
// Counterのコンポーネント作る
const Counter: React.FC = () => {
  // ステートの定義
  const [count, setCount] = useState(0);

  // イベントの定義
  const increment = () => {
    setCount(count + 1);
  }
  const decrement = () => {
    setCount(count - 1);
  }
// JSXを返す
  return (
    <div style={{ textAlign: 'center', marginRight: '20px' }}>
      <h1>Counter</h1>
      <h1>{count}</h1>
      <button onClick={increment} style={{ marginRight: '10px' }}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}
// コンポーネント閉じたらexportする
export default Counter;

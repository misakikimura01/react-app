
import React, { useState } from "react";
// コンポーネント外の型定義
interface Todo {
  id: number;
  task: string;
}

const Todo : React.FC = () => {
  // 現在入力中のタスク
  const [task, setTask] = useState('');
  // リスト
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');

  // 入力されたら値が更新される
  // イベントの型定義
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setTask(e.target.value);
  };


  const handleAddTask = () => {
    // タスク名が空ならエラー
    if (task.trim().length === 0){
      setError('タスク名を入力してください')
      // エラーならここで終了
      return
    }
    // エラーをクリア
    setError('');
    // newTodoのオブジェクト作成
    const newTodo: Todo = {
      id:Date.now(),
      task: task.trim(),
    };
    // 現在のタスクリスト（todos)に新しいタスク（newTodo）を追加する
    setTodos([...todos, newTodo]);
    // 入力フィールドクリア
    setTask('');
  }
  const handleDeleteTask = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          {/* タイトルとフォームとaddボタン */}
          <h1>TODO List</h1>
          <input
            type="text"
            value={task}
            onChange={handleInputChange}
            placeholder="Enter a task"
            style={{ padding: '10px', fontSize: '16px', width: '200px' }}
          />
          <button onClick={handleAddTask} style={{ marginLeft: '10px', padding: '10px 20px', fontSize: '16px' }}>
            Add
          </button>
          {/* エラー表示と登録済みリストと削除ボタン */}
            {/* タグの中にonchangeとstyle記入 */}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {todos.map(todo => (
              <li key={todo.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                <span style={{ marginRight: '10px' }}>{todo.task}</span>
                <button onClick={() => handleDeleteTask(todo.id)} style={{ padding: '5px 10px', fontSize: '14px' }}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
    };
    export default Todo;
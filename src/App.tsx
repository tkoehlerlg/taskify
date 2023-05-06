import React, {useState} from 'react';
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import {Todo} from "./models/Todo"
import './App.css';

function App() {
  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (todo) {
      setTodos([...todos, {
        id: Date.now(),
        todo,
        isCompleted: false
      }])
      setTodo("")
    }
  }

  return <div className="App">
    <span className="heading">Taskify</span>
    <p>Die <b>Erinnerungs-App</b> – Erinnere dich an das Unvergessliche. Entwickelt mit <b>React</b> !</p>
    <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
    <TodoList todos={todos} setTodos={setTodos}/>
  </div>
}

export default App;

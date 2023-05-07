import React, {useState} from 'react';
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import {Todo} from "./models/Todo"
import {Configuration, OpenAIApi} from "openai";
import './App.css';


function App() {
  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const [loading, setLoading] = useState(false);

  async function generateFunnyText(todo: string): Promise<string> {
    setLoading(true);
    try {
      const result = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Schreibe einen lustigen oder interessanten Satz auf Deutsch mit maximal 5 Wörtern ohne Zeilenumbrüche zu einer Aufgabe aus einer Todo Listen App.\n\nTodo: ${todo}\nTipp/ Witz: `,
        temperature: 0.48,
        max_tokens: 150,
      });
      //console.log("response", result.data.choices[0].text);
      setLoading(false);
      return (result.data.choices[0].text ?? "Text nicht lesbar").replace(/(\r\n|\n|\r)/gm, "")
    } catch (e) {
      console.log(e);
      setLoading(false);
      return "Fehler"
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (todo) {
      const id = Date.now()
      setTodos([...todos, {
        id: id,
        todo,
        detailsText: await generateFunnyText(todo),
        isCompleted: false
      }])
      setTodo("")
    }
  }

  return <div className="App">
    <span className="heading">Taskify</span>
    <p>Die <b>Erinnerungs-App</b> – Erinnere dich an das Unvergessliche. Entwickelt mit <b>React</b> !</p>
    <InputField todo={todo} loading={loading} setTodo={setTodo} handleAdd={handleAdd}/>
    <TodoList todos={todos} setTodos={setTodos}/>
  </div>
}

export default App;

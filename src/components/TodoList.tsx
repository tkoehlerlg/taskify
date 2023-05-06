import React from "react";
import {Todo} from "../models/Todo";
import "./styles.css"

interface Props {
    todos: Todo[]
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Props> = ({todos, setTodos}) => {
    return <div className="todos">
        {todos.map((todo) => (
            <div className="todo_cell" key={todo.id}>
                <p>{todo.todo}</p>
            </div>
        ))}
    </div>
}

export default TodoList

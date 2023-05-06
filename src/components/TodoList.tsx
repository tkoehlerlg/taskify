import React from "react";
import {Todo} from "../models/Todo";
import TodoCard from "./TodoCard";
import "./styles.css"

interface Props {
    todos: Todo[]
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Props> = ({todos, setTodos}) => {

    function updateTodo(editedTodo: Todo) {
        setTodos(todos.map((todo): Todo => {
            if (todo.id === editedTodo.id) {
                return editedTodo
            } else { return todo }
        }))
    }

    function deleteTodo(id: number) {
        setTodos(todos.filter(function (todo) {
            return todo.id !== id
        }))
    }

    return <div className="todos">
        {todos.map((todo) => (
            <TodoCard todo={todo} key={todo.id} updateTodo={updateTodo} deleteTodo={deleteTodo}/>
        ))}
        
    </div>
}

export default TodoList

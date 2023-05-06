import React from "react";
import { FaTrashAlt, FaRegCircle, FaRegCheckCircle } from "react-icons/fa";
import {Todo} from "../models/Todo";

interface Props {
    todo: Todo
    updateTodo: (todo: Todo) => void
    deleteTodo: (id: number) => void
}

const TodoCard: React.FC<Props> = ({todo, updateTodo, deleteTodo}) => {
    return <div className="todo_card" onClick={(e) => {
        todo.isCompleted = !todo.isCompleted
        updateTodo(todo)
    }}>
        <span className="checkmark">{todo.isCompleted ? <FaRegCheckCircle/> : <FaRegCircle/>}</span>
        <p>{todo.todo}</p>
        <span className="icon" onClick={(e) => {
            e.stopPropagation()
            deleteTodo(todo.id)
        }}><FaTrashAlt/></span>
    </div>
}

export default TodoCard

'use client'

import { Todo } from '@/types/todos'
import { useCallback, useEffect, useState } from 'react'
import { getTodos } from '@/queries/todos'
import { AddTodoTextField } from '@/components/AddTodoTextField'

export function TodosGrid() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getTodos().then((todos) => {
            setTodos(todos)
            setLoading(false)
        })
    }, [])

    const optimisticAddTodo = useCallback((todo: Todo) => {
        setTodos((prevTodos) => [todo, ...prevTodos])
    }, [])

    return (
        <div>
            <AddTodoTextField />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {todos.map((todo) => (
                        <li key={todo.uuid}>{todo.title}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}

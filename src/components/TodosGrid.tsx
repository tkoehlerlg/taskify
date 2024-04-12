'use client'

import { useEffect, useOptimistic, useState } from 'react'
import { Todo } from '@/types/todos'
import { AddTodoTextField } from '@/components/AddTodoTextField'
import { createTodo, deleteTodoByUuid } from '@/queries/todos'
import { cn } from '@/utils/cn'
import { revalidatePath } from '@/actions/revalidatePath'
import { uuid } from 'uuidv4'

interface TodosGridProps {
    todos: Todo[]
    className?: string
}

export function TodosGrid({ todos, className }: TodosGridProps) {
    const [_todos, setTodos] = useState<Todo[]>(todos)
    const revalidatePage = revalidatePath.bind(null, '/todos')
    const [optimisticTodos, addOptimisticTodo] = useOptimistic<Todo[], string>(
        _todos,
        (state, newTodo) => [
            ...state,
            {
                title: newTodo,
                uuid: uuid(),
                ai_comment: null,
                completed: false,
                userId: -1,
            },
        ]
    )

    async function addTodo(title: string) {
        addOptimisticTodo(title)
        console.log('added optimistic todo')
        console.log(optimisticTodos)
        createTodo({
            title: title,
            ai_comment: null,
            completed: false,
        }).then(revalidatePage)
    }

    async function deleteTodo(todo: Todo) {
        setTodos((todos) => todos.filter((t) => t.uuid !== todo.uuid))
        deleteTodoByUuid(todo.uuid).then(revalidatePage)
    }

    useEffect(() => {
        setTodos(todos)
    }, [todos])

    return (
        <div className={cn('flex min-h-[80vh] w-full flex-col', className)}>
            <AddTodoTextField addTodo={addTodo} />
            <div className='flex items-center justify-center'>
                {optimisticTodos.length < 1 ? (
                    <div className='self-center'>
                        <p className='text-lg text-gray-800'>
                            ☑️️ No todos found.
                        </p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 gap-4'>
                        {todos.map((todo) => (
                            <li key={todo.uuid}>
                                {todo.title}{' '}
                                <button
                                    onClick={() => deleteTodo(todo)}
                                    className='bg-red-500'
                                >
                                    [-]
                                </button>
                            </li>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

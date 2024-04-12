'use client'

import { useOptimistic } from 'react'
import { Todo } from '@/types/todos'
import { AddTodoTextField } from '@/components/AddTodoTextField'
import { createTodo } from '@/queries/todos'
import { cn } from '@/utils/cn'
import { revalidatePath } from '@/actions/revalidatePath'
import { uuid } from 'uuidv4'

interface TodosGridProps {
    todos: Todo[]
    className?: string
}

export function TodosGrid({ todos, className }: TodosGridProps) {
    const revalidatePage = revalidatePath.bind(null, '/todos')
    const [optimisticTodos, addOptimisticTodo] = useOptimistic<Todo[], string>(
        todos,
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
                            <li key={todo.uuid}>{todo.title}</li>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

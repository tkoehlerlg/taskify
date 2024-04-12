'use client'

import { FormEvent, useState } from 'react'

interface AddTodoTextFieldProps {
    addTodo: (title: string) => void
    className?: string
}

export function AddTodoTextField({
    addTodo: baseAddTodo,
    className,
}: AddTodoTextFieldProps) {
    const [text, setText] = useState('')

    const addTodo = async (e: FormEvent) => {
        e.preventDefault()
        if (!text) return
        baseAddTodo(text)
        setText('')
    }

    return (
        <form onSubmit={addTodo} className={className}>
            <div className='w-fit'>
                <div className='flex flex-row rounded-lg bg-white px-4 py-2'>
                    <input
                        type='text'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder='Add a todo'
                        className='w-36 border-none bg-transparent outline-none'
                    />

                    <button
                        type='submit'
                        className='font-semibold text-logo-red'
                    >
                        Add
                    </button>
                </div>
            </div>
        </form>
    )
}

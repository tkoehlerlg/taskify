import { cn } from '@/utils/cn'
import { shrikhand } from '@/utils/fonts'
import { getUser } from '@/queries/user'
import { Suspense } from 'react'
import { useSecurePage } from '@/hooks/useSecurePage'
import { AddTodoTextField } from '@/components/AddTodoTextField'
import { getTodos } from '@/queries/todos'

export default async function TodosPage() {
    await useSecurePage()
    const user = getUser()
    const todos = getTodos()

    return (
        <main className='px-8 pt-6'>
            <h1
                className={cn(
                    'text-logo-red text-4xl font-bold',
                    shrikhand.className
                )}
            >
                Deine Todos
            </h1>
            <Suspense>
                <p className='text-1xl font-semibold'>
                    Hey {(await user)?.firstName}, hier sind deine Todos!
                </p>
            </Suspense>

            <AddTodoTextField className='mt-2' />
        </main>
    )
}

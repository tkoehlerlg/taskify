import { cn } from '@/utils/cn'
import { shrikhand } from '@/utils/fonts'
import { getUser } from '@/queries/user'
import { Suspense } from 'react'
import { useSecurePage } from '@/hooks/useSecurePage'
import { getTodos } from '@/queries/todos'
import { TodosGrid } from '@/components/TodosGrid'

export default async function TodosPage() {
    await useSecurePage()
    const user = getUser()
    const todos = getTodos()

    return (
        <main className='px-8 pt-6'>
            <h1
                className={cn(
                    'text-4xl font-bold text-logo-red',
                    shrikhand.className
                )}
            >
                Your Todos
            </h1>
            <Suspense>
                <p className='text-1xl font-semibold'>
                    Hey {(await user)?.firstName}, here are your todos!
                </p>
            </Suspense>

            <Suspense fallback={<p>Loading...</p>}>
                <TodosGrid todos={await todos} className='mt-4' />
            </Suspense>
        </main>
    )
}

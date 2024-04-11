import {
    RegisterLink,
    LoginLink,
} from '@kinde-oss/kinde-auth-nextjs/components'
import { cn } from '@/utils/cn'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Link from 'next/link'
import { shrikhand } from '@/utils/fonts'

export default async function Home() {
    const { isAuthenticated } = getKindeServerSession()
    return (
        <main className='flex min-h-screen flex-col items-center justify-center gap-1 p-24'>
            <h1
                className={cn(
                    'text-logo-red text-6xl font-bold',
                    shrikhand.className
                )}
            >
                Welcome to Taskify
            </h1>
            <p className='text-1xl font-semibold'>
                Taskify is your personal task manager. It helps you not only
                with keeping track of your tasks but also motivates you!
            </p>

            <div className='mt-4 flex flex-row gap-4'>
                {(await isAuthenticated()) ? (
                    <Link href={'/todos'}>
                        <div className='rounded-lg border-2 border-gray-600 bg-white px-[39px] py-[10px]'>
                            Go to Todos!
                        </div>
                    </Link>
                ) : (
                    <>
                        <LoginLink>
                            <div className='rounded-lg border-2 border-gray-600 bg-white px-[39px] py-[10px]'>
                                Sign in
                            </div>
                        </LoginLink>
                        <RegisterLink>
                            <div className='bg-logo-red rounded-lg px-10 py-3'>
                                Create Account
                            </div>
                        </RegisterLink>
                    </>
                )}
            </div>
        </main>
    )
}

import {
    RegisterLink,
    LoginLink,
} from '@kinde-oss/kinde-auth-nextjs/components'
import { cn } from '@/utils/cn'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Link from 'next/link'
import { shrikhand } from '@/utils/fonts'
import css from 'styled-jsx/css'

export default async function Home() {
    const { isAuthenticated } = getKindeServerSession()
    return (
        <main className='flex min-h-screen flex-col items-center justify-center gap-1 p-24'>
            <h1 className='text-7xl font-bold'>
                Welcome to{' '}
                <span className={cn('text-accent', shrikhand.className)}>
                    Taskify
                </span>
                !
            </h1>
            <p className='w-[670px] text-center text-xl font-normal text-gray-800'>
                Streamline Your Projects: The Ultimate Project and Task Manager
                Designed Exclusively for Entrepreneurs. Simple, Effective,
                Essential.
            </p>

            <div className='mt-3 flex flex-row gap-6 pt-8'>
                {(await isAuthenticated()) ? (
                    <Link href={'/dashboard'}>
                        <div className='rounded-lg border-2 border-gray-600 bg-white px-[39px] py-[10px]'>
                            Go to Todos!
                        </div>
                    </Link>
                ) : (
                    <>
                        <LoginLink>
                            <div className='rounded-lg border-2 border-black px-8 py-[10px] text-center text-xl font-medium'>
                                Sign in
                            </div>
                        </LoginLink>
                        <RegisterLink>
                            <div className='rounded-lg bg-accent px-8 py-[12px] text-center text-xl font-medium text-white'>
                                Create Account
                            </div>
                        </RegisterLink>
                    </>
                )}
            </div>
        </main>
    )
}

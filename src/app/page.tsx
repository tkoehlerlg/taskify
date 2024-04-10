import { Shrikhand } from 'next/font/google'
import {
    RegisterLink,
    LoginLink,
} from '@kinde-oss/kinde-auth-nextjs/components'
import { cn } from '@/utils/cn'

const shrikhand = Shrikhand({ weight: '400', subsets: ['latin'] })

export default function Home() {
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
            </div>
        </main>
    )
}

/*
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

<LoginLink>Sign in</LoginLink>

<RegisterLink>Sign up</RegisterLink>
 */

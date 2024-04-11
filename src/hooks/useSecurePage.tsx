'use server'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'

export async function useSecurePage() {
    const { isAuthenticated } = getKindeServerSession()
    if (!(await isAuthenticated())) {
        redirect('/')
    }
}

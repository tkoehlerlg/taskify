import { prismaWrite } from '@/utils/prisma'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextResponse } from 'next/server'
import { env } from '@/utils/env'

export const GET = async () => {
    const { getUser, isAuthenticated } = getKindeServerSession()
    try {
        const user = await getUser()
    } catch (e) {
        console.log(e)
    }

    const user = await getUser()

    if (!user) {
        return NextResponse.redirect(env.KINDE_SITE_URL)
    }

    let dbUser = await prismaWrite.user.findUnique({
        where: { kindeId: user.id },
    })

    if (!dbUser) {
        await prismaWrite.user.create({
            data: {
                kindeId: user.id,
                firstName: user.given_name ?? '',
                lastName: user.family_name ?? '',
                email: user.email ?? '',
            },
        })
        return NextResponse.redirect(env.INTERN_POST_REGISTER_REDIRECT_URL)
    }

    return NextResponse.redirect(env.INTERN_POST_LOGIN_REDIRECT_URL)
}

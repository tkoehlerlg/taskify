'use server'

import { prismaRead } from '@/utils/prisma'
import { User, userPrismaSelect } from '@/types/user'
import { getKindeId } from '@/utils/kinde/getKindeId'

export async function getUser(): Promise<User | null> {
    const kindeId = await getKindeId()
    if (!kindeId) return null
    return prismaRead.user.findUnique({
        where: {
            kindeId: kindeId,
        },
        select: userPrismaSelect,
    })
}

// Never give this function or its return value to the client!
export async function getUserId(): Promise<number | null> {
    const kindeId = await getKindeId()
    if (!kindeId) return null
    const user = await prismaRead.user.findUnique({
        where: {
            kindeId: kindeId,
        },
        select: {
            id: true,
        },
    })
    return user?.id ?? null
}

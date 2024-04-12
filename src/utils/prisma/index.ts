import { PrismaClient } from '@prisma/client'

export type { PrismaOmit } from './prismaOmit'
export type { PrismaSelect } from './prismaSelect'

const prismaClientSingleton = () => {
    return new PrismaClient()
}

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export const prismaWrite = prisma
export const prismaRead = prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

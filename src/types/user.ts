import { PrismaOmit, PrismaSelect } from '@/utils/prisma'
import { User as PrismaUser } from '.prisma/client'

export type User = PrismaOmit<PrismaUser, 'kindeId'>

export const userPrismaSelect: PrismaSelect<User> = {
    firstName: true,
    lastName: true,
    email: true,
}

import { PrismaOmit } from '@/utils/prisma/prismaOmit'
import { User as PrismaUser } from '.prisma/client'

export type User = PrismaOmit<PrismaUser, 'kindeId'>

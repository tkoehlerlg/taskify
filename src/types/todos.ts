import { PrismaOmit } from '@/utils/prisma/prismaOmit'
import { Todo as PrismaTodo } from '.prisma/client'

export type Todo = PrismaOmit<PrismaTodo>

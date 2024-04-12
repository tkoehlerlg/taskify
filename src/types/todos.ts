import { Todo as PrismaTodo } from '.prisma/client'
import { PrismaOmit, PrismaSelect } from '@/utils/prisma'

export type Todo = PrismaOmit<PrismaTodo>

export type CreateTodo = Omit<Todo, 'uuid' | 'userId'>

export const todoPrismaSelect: PrismaSelect<Todo> = {
    title: true,
    uuid: true,
    ai_comment: true,
    completed: true,
    userId: true,
}

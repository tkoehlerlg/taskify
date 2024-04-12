'use server'

import { CreateTodo, Todo, todoPrismaSelect } from '@/types/todos'
import { prismaRead, prismaWrite } from '@/utils/prisma'
import { getKindeId } from '@/utils/kinde/getKindeId'
import { getUserId } from '@/queries/user'

export async function getTodos(count?: number): Promise<Todo[]> {
    return prismaRead.todo.findMany({
        take: count,
        select: todoPrismaSelect,
    })
}

export async function createTodo(data: CreateTodo): Promise<Todo> {
    const kindeId = await getKindeId()
    if (!kindeId) throw new Error('No kindeId found')
    return prismaWrite.todo.create({
        data: {
            ...data,
            user: {
                connect: {
                    kindeId,
                },
            },
        },
        select: todoPrismaSelect,
    })
}

export async function batchCreateTodos(data: CreateTodo[]) {
    const userId = await getUserId()
    if (!userId) throw new Error('No user found')
    await prismaWrite.todo.createMany({
        data: data.map((todo) => ({
            ...todo,
            userId: userId,
        })),
    })
}

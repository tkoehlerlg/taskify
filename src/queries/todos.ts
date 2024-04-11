'use server'

import { Todo } from '@/types/todos'
import { prismaRead, prismaWrite } from '@/utils/prisma'
import { getKindeId } from '@/utils/kinde/getKindeId'
import { getUserId } from '@/queries/user'

export async function getTodos(count?: number): Promise<Todo[]> {
    return prismaRead.todo.findMany({
        take: count,
    })
}

export async function createTodo(
    data: Omit<Todo, 'uuid' | 'userId' | 'ai_comment' | 'completed'>
): Promise<Todo> {
    const kindeId = await getKindeId()
    if (!kindeId) throw new Error('No kindeId found')
    return prismaWrite.todo.create({
        data: {
            ...data,
            user: {
                connect: {
                    kindeId: kindeId,
                },
            },
        },
    })
}

export async function batchCreateTodos(
    data: Omit<Todo, 'uuid' | 'userId' | 'ai_comment' | 'completed'>[]
) {
    const userId = await getUserId()
    if (!userId) throw new Error('No user found')
    await prismaWrite.todo.createMany({
        data: data.map((todo) => ({
            ...todo,
            userId: userId,
        })),
    })
}

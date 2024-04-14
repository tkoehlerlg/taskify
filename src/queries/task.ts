'use server'

import { Task, CreateTask } from '@/types/task'
import { prismaRead, prismaWrite } from '@/utils/prisma'
import { getUserId } from '@/queries/user'

export async function getTasks(
    forProjectId?: number,
    count?: number
): Promise<Task[]> {
    return prismaRead.task.findMany({
        where: {
            projectId: forProjectId,
        },
        take: count,
    })
}

export async function createTask(data: CreateTask): Promise<Task> {
    const userId = await getUserId()
    if (!userId) throw new Error('No user found')
    return prismaWrite.task.create({
        data: {
            ...data,
            userId,
        },
    })
}

export async function deleteTodo(id: number) {
    return prismaWrite.task.delete({
        where: {
            id,
        },
    })
}

export async function batchCreateTodos(data: CreateTask[]) {
    const userId = await getUserId()
    if (!userId) throw new Error('No user found')
    await prismaWrite.task.createMany({
        data: data.map((todo) => ({
            ...todo,
            userId,
        })),
    })
}

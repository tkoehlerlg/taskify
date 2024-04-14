import { Task as PrismaTask } from '.prisma/client'

export type Task = PrismaTask

export type CreateTask = Omit<
    Task,
    'id' | 'createdAt' | 'updatedAt' | 'uuid' | 'userId'
>

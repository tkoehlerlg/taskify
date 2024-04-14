import { Project as PrismaProject } from '.prisma/client'

export type Project = PrismaProject

export type CreateProject = Omit<
    Project,
    'id' | 'createdAt' | 'updatedAt' | 'uuid' | 'userId'
>

export function generateSlug(name: string): string {
    return name.toLowerCase().replace(/\s/g, '-')
}

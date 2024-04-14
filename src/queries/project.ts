'use server'

import { prismaWrite } from '@/utils/prisma'
import { CreateProject, Project } from '@/types/project'
import { getKindeId } from '@/utils/kinde/getKindeId'

export async function getProjects(): Promise<Project[]> {
    return prismaWrite.project.findMany()
}

export async function createProject(data: CreateProject): Promise<Project> {
    const kindeId = await getKindeId()
    if (!kindeId) throw new Error('No user found')
    return prismaWrite.project.create({
        data: {
            ...data,
            user: {
                connect: {
                    kindeId,
                },
            },
        },
    })
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
    return prismaWrite.project.findUnique({
        where: {
            slug,
        },
    })
}

export async function testIfProjectSlugExists(slug: string): Promise<boolean> {
    return prismaWrite.project
        .findUnique({
            where: {
                slug,
            },
        })
        .then((project) => Boolean(project))
}

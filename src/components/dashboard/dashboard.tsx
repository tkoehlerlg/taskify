import { Project } from '@/types/project'
import { ProjectsSelector } from '@/components/dashboard/projectsSelector'
import { getProjects } from '@/queries/project'
import { redirect } from 'next/navigation'
import { revalidatePath } from '@/actions/revalidatePath'

interface DashboardProps {
    selectedProject?: Project
}

export async function Dashboard({ selectedProject }: DashboardProps) {
    const projects = await getProjects()
    const revalidate = revalidatePath.bind(null, '/dashboard')

    async function handleSelectProject(project?: Project) {
        'use server'
        if (project) {
            redirect(`/dashboard/${project.slug}`)
        } else {
            redirect('/dashboard')
        }
    }

    return (
        <main className='flex flex-col items-center pl-20 pr-4 pt-12'>
            <ProjectsSelector
                projects={projects}
                selectedProject={selectedProject}
                onSelectProject={handleSelectProject}
            />
        </main>
    )
}

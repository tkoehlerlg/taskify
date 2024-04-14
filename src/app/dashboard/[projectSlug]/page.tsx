import { useSecurePage } from '@/hooks/useSecurePage'
import { Dashboard } from '@/components/dashboard/dashboard'
import { getProjectBySlug } from '@/queries/project'
import { redirect } from 'next/navigation'

export default async function ProjectDashboardPage({
    params,
}: {
    params: { projectSlug: string }
}) {
    await useSecurePage()
    const selectedProject = await getProjectBySlug(params.projectSlug)

    if (selectedProject) {
        return <Dashboard selectedProject={selectedProject} />
    } else {
        return redirect('/dashboard')
    }
}

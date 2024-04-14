import { useSecurePage } from '@/hooks/useSecurePage'
import { Dashboard } from '@/components/dashboard/dashboard'

export default async function DashboardPage() {
    await useSecurePage()

    return <Dashboard />
}

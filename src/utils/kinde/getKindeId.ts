import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export async function getKindeId() {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    return user?.id
}

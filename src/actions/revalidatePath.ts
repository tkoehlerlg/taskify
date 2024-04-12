'use server'

import { revalidatePath as baseRevalidatePath } from 'next/cache'

export async function revalidatePath(path: string) {
    baseRevalidatePath(path)
}

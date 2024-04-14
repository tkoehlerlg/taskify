import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
    title: 'Taskify - Your Todos',
    description: 'All your todos in one place',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode
}>) {
    return children
}

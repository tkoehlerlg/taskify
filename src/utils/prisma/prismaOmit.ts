// Omit that omits the id, createdAt and updatedAt fields from any Prisma model.

export type PrismaOmit<T, K extends keyof T = never> = Pick<
    T,
    Exclude<keyof T, K | 'id' | 'createdAt' | 'updatedAt'>
>

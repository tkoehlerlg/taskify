import { cleanEnv, str } from 'envalid'

export const env = cleanEnv(process.env, {
    SUPABASE_DATABASE_URL: str(),
    SUPABASE_DIRECT_URL: str(),
})

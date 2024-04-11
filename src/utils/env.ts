import { cleanEnv, str, url } from 'envalid'

export const env = cleanEnv(process.env, {
    MISTRAL_API_KEY: str(),
    OPENAI_API_KEY: str(),
    SUPABASE_DATABASE_URL: str(),
    SUPABASE_DIRECT_URL: str(),
    KINDE_CLIENT_ID: str(),
    KINDE_CLIENT_SECRET: str(),
    KINDE_ISSUER_URL: url(),
    KINDE_SITE_URL: url(),
    KINDE_POST_LOGOUT_REDIRECT_URL: url(),
    KINDE_POST_LOGIN_REDIRECT_URL: url(),
    INTERN_POST_LOGIN_REDIRECT_URL: url(),
    INTERN_POST_REGISTER_REDIRECT_URL: url(),
})

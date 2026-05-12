import { createClient } from '@insforge/sdk'

const INSFORGE_URL = import.meta.env.VITE_INSFORGE_URL as string
const INSFORGE_ANON_KEY = import.meta.env.VITE_INSFORGE_ANON_KEY as string

if (!INSFORGE_URL || !INSFORGE_ANON_KEY) {
  console.warn('⚠️ InsForge env vars missing. Check your .env file.')
}

export const insforge = createClient({
  baseUrl: INSFORGE_URL,
  anonKey: INSFORGE_ANON_KEY,
})

export type InsforgeClient = typeof insforge

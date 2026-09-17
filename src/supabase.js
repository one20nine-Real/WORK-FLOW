// Supabase connection seam. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable persistence.
export const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL || '',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || ''
}

export const isSupabaseConfigured = Boolean(supabaseConfig.url && supabaseConfig.anonKey)

let clientPromise
async function getClient() {
  if (!isSupabaseConfigured) return null
  if (!clientPromise) clientPromise = import('https://esm.sh/@supabase/supabase-js@2').then(({ createClient }) => createClient(supabaseConfig.url, supabaseConfig.anonKey))
  return clientPromise
}

export async function signIn(email, password) {
  const client = await getClient()
  if (!client) return email === 'demo@dealflow.local' && password === 'demo1234' ? { data: { user: { email } }, error: null, demo: true } : { data: null, error: { message: '데모 계정은 demo@dealflow.local / demo1234 입니다.' } }
  return client.auth.signInWithPassword({ email, password })
}

export async function signUp({ email, password, name, title, team }) {
  const client = await getClient()
  if (!client) return { data: { user: { email, user_metadata: { name, title, team } } }, error: null, demo: true }
  return client.auth.signUp({ email, password, options: { data: { name, title, team } } })
}

export async function createSupportRequest(payload) {
  if (!isSupabaseConfigured) return { data: { ...payload, id: `demo-${Date.now()}` }, error: null, demo: true }
  const client = await getClient()
  return client.from('support_requests').insert(payload).select().single()
}

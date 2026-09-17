// Supabase connection seam. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable persistence.
export const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL || '',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || ''
}

export const isSupabaseConfigured = Boolean(supabaseConfig.url && supabaseConfig.anonKey)

export async function createSupportRequest(payload) {
  if (!isSupabaseConfigured) return { data: { ...payload, id: `demo-${Date.now()}` }, error: null, demo: true }
  const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2')
  const client = createClient(supabaseConfig.url, supabaseConfig.anonKey)
  return client.from('support_requests').insert(payload).select().single()
}

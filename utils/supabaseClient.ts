import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  // Supabase CLI'nin otomatik oluşturduğu değişken isimleri
  (process.env as Record<string, string | undefined>)[
    'sytknc_SUPABASE_URL'
  ]

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  (process.env as Record<string, string | undefined>)[
    'sytknc_SUPABASE_ANON_KEY'
  ]

const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

function createSupabaseClient(useServiceRole = false) {
  if (!supabaseUrl) {
    throw new Error('Supabase URL tanımlı değil')
  }

  const keyToUse = useServiceRole ? supabaseServiceRoleKey || supabaseAnonKey : supabaseAnonKey

  if (!keyToUse) {
    throw new Error('Supabase anahtarı tanımlı değil')
  }

  return createClient(supabaseUrl, keyToUse, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

export function getSupabaseServiceRoleClient() {
  return createSupabaseClient(true)
}

export function getSupabasePublicClient() {
  return createSupabaseClient(false)
}


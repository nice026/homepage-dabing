'use client'

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // 检查环境变量是否已配置
  const isConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && 
                      process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://abcdefgh.supabase.co' &&
                      process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_project_url' &&
                      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && 
                      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes('placeholder_anon_key') &&
                      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'your_supabase_anon_key'

  // 如果环境变量未配置，返回null
  if (!isConfigured) {
    return null
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
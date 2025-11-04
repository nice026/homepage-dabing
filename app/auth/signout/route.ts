import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST() {
  const supabase = await createClient()
  
  // 注销用户
  await supabase.auth.signOut()
  
  // 重定向到首页
  return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:3000'))
}
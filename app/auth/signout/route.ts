import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST() {
  const supabase = await createClient()
  
  // 如果Supabase未配置，直接重定向到首页
  if (!supabase) {
    return NextResponse.redirect(new URL('/', 'http://localhost:3000'))
  }
  
  // 注销用户
  await supabase.auth.signOut()
  
  // 重定向到首页
  return NextResponse.redirect(new URL('/', 'http://localhost:3000'))
}
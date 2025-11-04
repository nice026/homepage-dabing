import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    
    // 如果Supabase未配置，重定向到错误页面
    if (!supabase) {
      return NextResponse.redirect(`${origin}/auth/auth-code-error`)
    }
    
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host') // 原始域名，在Vercel上使用
      const isLocalEnv = process.env.NODE_ENV === 'development'
      
      if (isLocalEnv) {
        // 本地开发环境，重定向到本地
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        // 生产环境，重定向到原始域名
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        // 回退到基本重定向
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // 如果出现错误，重定向到错误页面
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
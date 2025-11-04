import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // 检查环境变量是否已配置
  const isConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && 
                      process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://abcdefgh.supabase.co' &&
                      process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_project_url' &&
                      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && 
                      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes('placeholder_anon_key') &&
                      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'your_supabase_anon_key'

  // 如果环境变量未配置，跳过Supabase中间件
  if (!isConfigured) {
    return NextResponse.next({
      request,
    })
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 刷新会话如果过期
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // 可以在这里添加受保护路由的逻辑
  // 例如：如果用户未登录且尝试访问受保护路由，则重定向到登录页面

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * 匹配所有请求路径除了:
     * - _next/static (静态文件)
     * - _next/image (图片优化文件)
     * - favicon.ico (favicon文件)
     * - public文件夹中的文件
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
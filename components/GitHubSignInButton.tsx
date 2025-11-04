'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function GitHubSignInButton() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // 如果Supabase未配置，不执行任何操作
    if (!supabase) {
      return
    }

    // 获取初始用户状态
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        console.error('获取用户状态失败:', error)
      }
    }

    getUser()

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase])

  const handleGitHubSignIn = async () => {
    setLoading(true)
    
    try {
      // 如果Supabase未配置，显示错误提示
      if (!supabase) {
        alert('请先配置Supabase环境变量。请参考GITHUB_OAUTH_SETUP.md文件进行配置。')
        return
      }

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) {
        console.error('Error signing in with GitHub:', error.message)
        // 如果是配置错误，显示提示
        if (error.message.includes('Invalid') || error.message.includes('URL')) {
          alert('请先配置Supabase环境变量和GitHub OAuth应用。请参考GITHUB_OAUTH_SETUP.md文件进行配置。')
        }
        return
      }

      // 重定向到OAuth提供者
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Unexpected error during sign in:', error)
      alert('登录过程中发生错误，请检查控制台获取更多信息。')
    } finally {
      setLoading(false)
    }
  }

  // 检查环境变量是否已配置
  const isConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && 
                      process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://abcdefgh.supabase.co' &&
                      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && 
                      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes('placeholder_anon_key')

  // 如果用户已登录，不显示登录按钮
  if (user) {
    return null
  }

  // 如果环境变量未配置，显示配置提示
  if (!isConfigured) {
    return (
      <div className="text-sm text-gray-500 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
        请先配置Supabase环境变量
      </div>
    )
  }

  return (
    <button
      onClick={handleGitHubSignIn}
      disabled={loading}
      className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
      {loading ? '登录中...' : '使用 GitHub 登录'}
    </button>
  )
}
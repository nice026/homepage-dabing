'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // 获取初始用户状态
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        console.error('获取用户状态失败:', error)
        setError('获取用户状态失败')
      } finally {
        setLoading(false)
      }
    }

    getUser()

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          setUser(null)
        } else if (session) {
          setUser(session.user)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.refresh()
    } catch (error) {
      console.error('退出登录失败:', error)
      setError('退出登录失败')
    }
  }

  // 检查环境变量是否已配置
  const isConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && 
                      process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://abcdefgh.supabase.co' &&
                      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && 
                      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes('placeholder_anon_key')

  if (loading) {
    return <div className="animate-pulse bg-gray-200 h-8 w-24 rounded"></div>
  }

  if (error) {
    return (
      <div className="text-sm text-red-500 p-2 bg-red-50 border border-red-200 rounded-md">
        {error}
      </div>
    )
  }

  if (!user) {
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
    <div className="flex items-center gap-3 mr-4">
      <div className="flex items-center gap-2">
        {user.user_metadata?.avatar_url ? (
          <img
            src={user.user_metadata.avatar_url}
            alt="用户头像"
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600 text-sm">
              {user.email?.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <span className="text-sm text-gray-700 dark:text-gray-300 hidden md:block">
          {user.user_metadata?.full_name || user.email}
        </span>
      </div>
      <button
        onClick={handleSignOut}
        className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        登出
      </button>
    </div>
  )
}
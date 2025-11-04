# Google OAuth 登录功能配置指南

本项目已集成基于 Supabase 的 Google OAuth 登录功能，使用服务器端认证方式。

## 配置步骤

### 1. 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com) 并创建一个新项目
2. 在项目设置中，获取以下信息：
   - Project URL
   - anon public key
   - service_role key

### 2. 配置环境变量

在项目根目录的 `.env.local` 文件中，填入从 Supabase 获取的配置信息：

```env
# Supabase配置
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Google OAuth配置
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

### 3. 配置 Google OAuth

1. 在 Supabase 控制台中，导航到 Authentication > Providers
2. 启用 Google 提供商
3. 添加您的 Google OAuth 客户端 ID 和客户端密钥
4. 设置授权重定向 URI 为：`https://[your-project-url].supabase.co/auth/v1/callback`

### 4. 获取 Google OAuth 凭据

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建一个新项目或选择现有项目
3. 启用 Google+ API
4. 创建 OAuth 2.0 客户端 ID 凭据
5. 将授权重定向 URI 设置为：`https://[your-project-url].supabase.co/auth/v1/callback`

## 功能说明

### 登录流程

1. 用户点击导航栏中的"使用 Google 登录"按钮
2. 系统重定向到 Google OAuth 授权页面
3. 用户授权后，Google 重定向回 Supabase
4. Supabase 处理授权并创建用户会话
5. 用户被重定向回网站，显示已登录状态

### 用户状态管理

- 未登录用户：显示"使用 Google 登录"按钮
- 已登录用户：显示用户头像、用户名和"登出"按钮

### 安全性

- 使用服务器端认证，提高安全性
- 通过中间件自动刷新会话
- 安全的 cookie 处理

## 文件结构

```
├── lib/supabase/
│   ├── server.ts      # 服务器端 Supabase 客户端配置
│   └── client.ts      # 客户端 Supabase 客户端配置
├── app/auth/
│   ├── callback/
│   │   └── route.ts   # OAuth 回调处理
│   ├── signout/
│   │   └── route.ts   # 注销路由
│   └── auth-code-error/
│       └── page.tsx   # 认证错误页面
├── components/
│   ├── GoogleSignInButton.tsx  # Google 登录按钮组件
│   ├── UserProfile.tsx         # 用户信息组件
│   └── Navbar.tsx              # 已更新为包含登录功能的导航栏
└── middleware.ts               # 处理会话刷新的中间件
```

## 使用说明

1. 按照上述配置步骤完成设置
2. 运行 `npm run dev` 启动开发服务器
3. 访问网站，点击导航栏中的"使用 Google 登录"按钮
4. 完成 Google 授权流程
5. 登录成功后，导航栏将显示您的用户信息
6. 点击"登出"按钮可以注销登录

## 故障排除

### 登录失败

1. 检查环境变量是否正确配置
2. 确保 Google OAuth 设置中的重定向 URI 正确
3. 检查 Supabase 项目中的 Google 提供商是否已启用

### 会话问题

1. 检查中间件是否正确配置
2. 确保 cookie 设置正确
3. 检查浏览器控制台是否有错误信息

## 参考文档

- [Supabase Auth 文档](https://supabase.com/docs/guides/auth)
- [Supabase Google OAuth 文档](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Supabase 服务器端认证文档](https://supabase.com/docs/guides/auth/server-side/creating-a-client)
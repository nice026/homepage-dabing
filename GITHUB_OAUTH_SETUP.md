# GitHub OAuth 登录功能配置指南

本项目已集成基于 Supabase 的 GitHub OAuth 登录功能，使用服务器端认证方式。

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

# GitHub OAuth配置
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id
```

### 3. 配置 GitHub OAuth

1. 在 Supabase 控制台中，导航到 Authentication > Providers
2. 启用 GitHub 提供商
3. 添加您的 GitHub OAuth 客户端 ID 和客户端密钥
4. 设置授权重定向 URI 为：`https://[your-project-url].supabase.co/auth/v1/callback`

### 4. 获取 GitHub OAuth 凭据

1. 访问 [GitHub](https://github.com) 并登录您的账户
2. 点击右上角的头像，选择 Settings
3. 在左侧菜单中，选择 Developer settings
4. 点击 OAuth Apps，然后点击 New OAuth App
5. 填写应用信息：
   - Application name: 您的应用名称
   - Homepage URL: 您的网站首页URL
   - Authorization callback URL: `https://[your-project-url].supabase.co/auth/v1/callback`
6. 创建应用后，获取 Client ID 和生成 Client Secret

## 功能说明

### 登录流程

1. 用户点击导航栏中的"使用 GitHub 登录"按钮
2. 系统重定向到 GitHub OAuth 授权页面
3. 用户授权后，GitHub 重定向回 Supabase
4. Supabase 处理授权并创建用户会话
5. 用户被重定向回网站，显示已登录状态

### 用户状态管理

- 未登录用户：显示"使用 GitHub 登录"按钮
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
│   │   └── route.ts   # OAuth 回调处理（与Google登录共用）
│   ├── signout/
│   │   └── route.ts   # 注销路由（与Google登录共用）
│   └── auth-code-error/
│       └── page.tsx   # 认证错误页面（与Google登录共用）
├── components/
│   ├── GitHubSignInButton.tsx  # GitHub 登录按钮组件
│   ├── GoogleSignInButton.tsx  # Google 登录按钮组件
│   ├── UserProfile.tsx         # 用户信息组件
│   └── Navbar.tsx              # 已更新为包含GitHub登录功能的导航栏
└── middleware.ts               # 处理会话刷新的中间件（与Google登录共用）
```

## 使用说明

1. 按照上述配置步骤完成设置
2. 运行 `npm run dev` 启动开发服务器
3. 访问网站，点击导航栏中的"使用 GitHub 登录"按钮
4. 完成 GitHub 授权流程
5. 登录成功后，导航栏将显示您的用户信息
6. 点击"登出"按钮可以注销登录

## 故障排除

### 登录失败

1. 检查环境变量是否正确配置
2. 确保 GitHub OAuth 设置中的重定向 URI 正确
3. 检查 Supabase 项目中的 GitHub 提供商是否已启用

### 会话问题

1. 检查中间件是否正确配置
2. 确保 cookie 设置正确
3. 检查浏览器控制台是否有错误信息

## 参考文档

- [Supabase Auth 文档](https://supabase.com/docs/guides/auth)
- [Supabase GitHub OAuth 文档](https://supabase.com/docs/guides/auth/social-login/auth-github)
- [Supabase 服务器端认证文档](https://supabase.com/docs/guides/auth/server-side/creating-a-client)
- [GitHub OAuth 文档](https://docs.github.com/en/developers/apps/building-oauth-apps)
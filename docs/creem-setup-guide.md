# Creem支付系统配置指南

## 1. 环境变量配置

在项目根目录的 `.env.local` 文件中，添加以下配置：

```env
# Creem支付系统配置
# 从Creem开发者控制台获取这些值
CREEM_API_KEY=your_creem_api_key_here
CREEM_WEBHOOKS_SECRET=your_creem_webhooks_secret_here

# 网站配置
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 配置说明：

1. **CREEM_API_KEY**: 
   - 从Creem开发者控制台获取
   - 用于API请求的身份验证
   - 生产环境请使用生产环境的API密钥

2. **CREEM_WEBHOOKS_SECRET**:
   - 从Creem开发者控制台获取
   - 用于验证Webhook请求的签名
   - 确保只有来自Creem的请求被接受

3. **NEXT_PUBLIC_SITE_URL**:
   - 您的网站基础URL
   - 用于生成支付成功/失败后的重定向URL
   - 生产环境请替换为实际域名

## 2. Creem控制台配置

### 2.1 Webhook设置

在Creem开发者控制台中，配置Webhook端点：

- **Webhook URL**: `https://yourdomain.com/api/webhooks/creem`
- **事件**: 选择以下事件
  - `payment.succeeded` - 支付成功
  - `payment.failed` - 支付失败

### 2.2 重定向URL设置

在Creem控制台中设置以下URL：

- **成功重定向URL**: `https://yourdomain.com/payment/success`
- **取消重定向URL**: `https://yourdomain.com/payment/cancel`

## 3. 支付流程说明

1. 用户选择会员计划并点击支付
2. 系统调用 `createPaymentSession` 创建支付会话
3. 用户被重定向到Creem支付页面
4. 用户完成支付
5. Creem发送Webhook通知到您的服务器
6. 系统验证Webhook并更新用户会员状态
7. 用户被重定向回成功/失败页面

## 4. 测试支付流程

### 4.1 使用测试环境

在开发阶段，使用Creem的测试环境：

1. 使用测试API密钥
2. 使用测试信用卡号（由Creem提供）
3. 模拟各种支付场景（成功、失败、退款等）

### 4.2 本地测试Webhook

由于Webhook需要公网可访问的URL，本地开发时可以使用以下工具：

- **ngrok**: `ngrok http 3000`
- **localtunnel**: `lt --port 3000`
- **cloudflared**: `cloudflared tunnel --url http://localhost:3000`

然后使用生成的URL配置Webhook：
`https://your-ngrok-url.ngrok.io/api/webhooks/creem`

## 5. 安全注意事项

1. **保护API密钥**: 
   - 永远不要在前端代码中暴露API密钥
   - 使用环境变量存储敏感信息

2. **验证Webhook签名**:
   - 始终验证Webhook请求的签名
   - 拒绝未经验证的请求

3. **使用HTTPS**:
   - 生产环境必须使用HTTPS
   - 确保所有敏感数据传输加密

4. **记录支付日志**:
   - 记录所有支付相关事件
   - 便于问题排查和审计

## 6. 故障排除

### 6.1 常见问题

1. **支付创建失败**
   - 检查API密钥是否正确
   - 确认请求参数格式符合Creem API要求

2. **Webhook未接收**
   - 检查Webhook URL是否可访问
   - 确认Webhook密钥配置正确
   - 查看服务器日志了解错误详情

3. **签名验证失败**
   - 确认Webhook密钥与控制台配置一致
   - 检查签名验证算法实现

### 6.2 日志查看

查看以下位置的日志：

- 应用服务器日志
- Creem控制台中的Webhook日志
- 浏览器控制台错误信息

## 7. 生产环境部署

1. 更新环境变量为生产环境值
2. 配置正确的域名和HTTPS
3. 设置监控和告警
4. 进行充分的支付测试

---

如有任何问题，请参考Creem官方文档或联系技术支持。
# Creem支付系统快速配置指南

## 步骤1：配置环境变量

在项目根目录的 `.env.local` 文件中，将以下占位符替换为您的实际Creem凭证：

```env
# 将 your_creem_api_key_here 替换为您的实际API密钥
CREEM_API_KEY=your_creem_api_key_here

# 将 your_creem_webhooks_secret_here 替换为您的实际Webhook密钥
CREEM_WEBHOOKS_SECRET=your_creem_webhooks_secret_here
```

## 步骤2：配置Creem控制台

1. 登录到您的Creem开发者控制台
2. 导航到Webhook设置部分
3. 添加以下Webhook端点URL：
   - 开发环境：`https://your-ngrok-url.ngrok.io/api/webhooks/creem`
   - 生产环境：`https://yourdomain.com/api/webhooks/creem`
4. 选择以下事件类型：
   - `payment.succeeded` - 支付成功
   - `payment.failed` - 支付失败

## 步骤3：测试支付流程

1. 启动开发服务器：`npm run dev`
2. 访问会员页面：`http://localhost:3000/membership`
3. 选择一个付费会员计划
4. 点击"立即开通"按钮
5. 完成测试支付流程

## 步骤4：验证Webhook（可选）

如果您想测试Webhook功能：

1. 使用ngrok等工具创建公网隧道：
   ```bash
   ngrok http 3000
   ```
2. 将生成的ngrok URL配置到Creem控制台的Webhook设置中
3. 在Creem控制台发送测试Webhook事件
4. 检查服务器日志确认Webhook接收和处理正常

## 注意事项

- 确保您的 `.env.local` 文件不会被提交到版本控制系统
- 生产环境部署时，请使用生产环境的API密钥
- 定期检查和更新您的支付配置，确保安全性

## 故障排除

如果遇到问题，请检查：

1. API密钥是否正确配置
2. Webhook URL是否可访问
3. 服务器日志中的错误信息
4. Creem控制台中的支付记录

需要更多帮助，请参考 `docs/creem-setup-guide.md` 中的详细配置指南。
const sharp = require('sharp');
const fs = require('fs');

// 读取头像文件并创建多个尺寸的favicon
async function createFavicons() {
  try {
    // 创建32x32的favicon.ico
    await sharp('public/profile.jpg')
      .resize(32, 32)
      .toFile('public/favicon.ico');
    
    // 创建16x16的favicon
    await sharp('public/profile.jpg')
      .resize(16, 16)
      .toFile('public/favicon-16x16.png');
    
    // 创建32x32的PNG格式favicon
    await sharp('public/profile.jpg')
      .resize(32, 32)
      .toFile('public/favicon-32x32.png');
    
    // 创建192x192的图标（用于PWA）
    await sharp('public/profile.jpg')
      .resize(192, 192)
      .toFile('public/icon-192x192.png');
    
    // 创建512x512的图标（用于PWA）
    await sharp('public/profile.jpg')
      .resize(512, 512)
      .toFile('public/icon-512x512.png');
    
    // 复制到app目录
    fs.copyFileSync('public/favicon.ico', 'app/favicon.ico');
    
    console.log('All favicons created successfully!');
  } catch (error) {
    console.error('Error creating favicons:', error);
  }
}

createFavicons();
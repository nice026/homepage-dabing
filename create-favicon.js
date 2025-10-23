const sharp = require('sharp');
const fs = require('fs');

// 读取头像文件
sharp('public/profile.jpg')
  .resize(32, 32) // 调整大小为32x32像素，这是favicon的标准尺寸
  .toFile('public/favicon.ico')
  .then(() => {
    console.log('Favicon created successfully!');
  })
  .catch(err => {
    console.error('Error creating favicon:', err);
  });
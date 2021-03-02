const fs = require('fs'); // 文件操作
const path = require('path'); // 路径操作
const { exit } = require('process');

// __dirname: 当前目录 path.resolve 拼接目录
const fileName = path.resolve(__dirname, 'data.txt');

// // 读取文件内容(异步)
// fs.readFile(fileName, (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   // data获取后是二进制类型，需要转换为字符串
//   console.log(data.toString());
// })

// 写入文件
// const content = 'this is new data';
// const opt = {
//   flag: 'a' // 追加写入 覆盖用 'w'
// }

// fs.writeFile(fileName, content, opt, (err) => {
//   if (err) {
//     console.error(err);
//   }
// });

// 判断文件是否存在
fs.exists(fileName+'1', (exits) => {
  console.log('exits', exits);
})
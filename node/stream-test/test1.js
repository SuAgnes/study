// // 标准输入输出 stdin输入
// process.stdin.pipe(process.stdout);
// // 通过标准输入输入，一旦输入成功就会流动到标准输出中

// const http = require('http');
// const server = http.createServer((req, res) => {
//   if (req.method === 'POST') {
//     req.pipe(res); // 最主要
//   }
// })

// server.listen(8000)

// 通过 stream 复制文件
// const fs = require('fs');
// const path = require('path');

// const fileName1 = path.resolve(__dirname, 'data.txt');
// const fileName2 = path.resolve(__dirname, 'data-bak.txt');

// const readStream = fs.createReadStream(fileName1);
// const writeStream = fs.createWriteStream(fileName2);

// readStream.pipe(writeStream);

// // fs.readFile 是一次性读取 stream是流式读取，可以从readStream.on('data')看出来
// readStream.on('data', chunk => {
//   // 监听每次读取的内容
//   console.log(chunk.toString());
// })
// // 监听写入完成
// readStream.on('end', () => {
//   console.log('copy done');
// })

// 例子3

const http = require('http');
const fs = require('fs');
const path = require('path');
const fileName = path.resolve(__dirname, 'data.txt');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    const readStream = fs.createReadStream(fileName);
    readStream.pipe(res);
  }
})

server.listen(8000)
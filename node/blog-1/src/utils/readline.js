const fs = require('fs');
const path = require('path');
const readline = require('readline');

// 文件路径
const fileName = path.join(__dirname, '../', '../', 'logs', 'access.log');

// 创建 read stream
const readStream = fs.createReadStream(fileName);

// 创建 readline 对象
const rl = readline.createInterface({
  input: readStream
})

let chromeNum = 0;
let sum = 0;

// 逐行读取 on('line')与on('data) 类似，data是一块数据，line是一条数据读完后触发
rl.on('line', (lineData) => {
  // 排除空行
  if (!lineData) {
    return;
  }
  // 记录总行数
  sum++;

  const arr = lineData.split(' -- ');
  if (arr[2] && arr[2].indexOf('Chrome') > 0) {
    chromeNum++;
  }
})

// 监听读取完成
rl.on('close', () => {
  console.log(`chrome 占比：${ chromeNum / sum }`);
})
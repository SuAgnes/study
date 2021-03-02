const fs = require('fs');
const path = require('path');

// 写日志
function writeLog(writeStream, log) {
  writeStream.write(log + '\n'); // 写入日志，关键代码
}

// 生成writeStream
function createWriteStream(fileName) {
   const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName);
   const writeStream = fs.createWriteStream(fullFileName, {
     flags: 'a' // append 追加
   })
   return writeStream;
}

const accessWriteStream = createWriteStream('access.log');

// // 写访问日志
function access(log) {
  writeLog(accessWriteStream, log);
}

module.exports = {
  access
}
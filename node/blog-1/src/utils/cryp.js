const crypto = require('crypto'); // nodejs提供加密库

// 秘钥
const SECRET_KEY = 'Ws3$';

// md5加密

function md5(content) {
  let md5 = crypto.createHash('md5');
  return md5.update(content).digest('hex'); //把输出变成16进制
}

// 加密函数
function genPassword(password) {
  const str = `password=${password}&key=${SECRET_KEY}`;
  return md5(str);
}

module.exports = {
  genPassword
}
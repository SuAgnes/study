const { exec, escape } = require('../db/mysql');
const { genPassword } = require('../utils/cryp');

const login = (username, password) => {
  // if (username === 'rachel ' && password === '123') {
  //   return true;
  // }
  // return false;
  // const sql = `
  //   select username, realname from users where username='${username}' and password='${password}'
  // `
  // 生成加密密码
  password = genPassword(password);
  
  // 预防sql注入写法
  username = escape(username);
  password = escape(password);

  const sql = `
    select username, realname from users where username=${username} and password=${password}
  `
  return exec(sql).then(rows => {
    return rows[0] || {};
  })
}

module.exports = {
  login
}
const {
  login
} = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set } = require('../db/redis');

// // 过期时间
// const getCookieExpires = () => {
//   const d = new Date();
//   d.setTime(d.getTime() + (24 * 60 * 60 * 1000)); //当前时间加一天过期
//   console.log(d.toGMTString());
//   return d.toGMTString();
// }

const handleUserRouter = (req, res) => {
  const { method } =  req;

  // 登录
  if (method === 'GET' && req.path === '/api/user/login') {
    // if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.query;
    // const { username, password } = req.body;
    const result = login(username, password);
    // console.log(username, password);
    return result.then(data => {
      if(data.username) {
        // 操作cookie

        /*
        path=/ 登录操作的cookie需要适用于根目录，不写的话默认为/api/user/login，其他页面就不生效了
        httpOnly 只允许后端修改
        */
        // res.setHeader('Set-cookie', `username=${data.username};path=/; httpOnly; expires=${getCookieExpires()}`)

        // 设置session
        req.session.username = data.username;
        req.session.realname = data.realname;
        // console.log('req.session is', req.session);
        // 同步到 redis 中, 这样下次访问登录验证时就可以从redis直接拿session用
        set(req.sessionId, req.session);
        return new SuccessModel();
      }
      return new ErrorModel('login fail');
    })
    // if (result) {
    //   return new SuccessModel();
    // }
    // return new ErrorModel('login fail');
  }

  //登录验证测试

  if (method === 'GET' && req.path === '/api/user/login-test') {
    // if(req.cookie.username) {
      console.log(req.session, req.session.username);
    if(req.session.username) {
      return Promise.resolve(new SuccessModel({
        // username: req.cookie.username
        session: req.session
      }));
    }
      return Promise.resolve(new ErrorModel('尚未登录'));
  }
}

module.exports = handleUserRouter;
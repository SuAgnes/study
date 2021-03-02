// const serverHandle = (req, res) => {
//   // 设置返回格式 JSON
//   res.setHeader('Content-type', 'application/json');

//   const resData = {
//     name: 'rachell',
//     age: 24,
//     env: process.env.NODE_ENV
//   }

//   res.end(
//     JSON.stringify(resData)
//   )
// }

const { reject } = require('lodash');
const { resolve } = require('path');
const { get, set } = require('./src/db/redis');
const { access } = require('./src/utils/log');
const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

// 过期时间
const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000)); //当前时间加一天过期
  // console.log(d.toGMTString());
  return d.toGMTString();
}

// // session 数据
// const SESSION_DATA =  {};

// 用于处理postData
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
      if(req.method !== 'POST') {
        resolve({});
        return;
      }
      if(req.headers['content-type'] !== 'application/json') {
        resolve({});
        return;
      }
      let postData = '';
      req.on('data', chunk => {
        postData += chunk.toString();
      })
      req.on('end', () => {
        if (!postData) {
          resolve({});
          return;
        }
        resolve(
          JSON.parse(postData)
        )
      })
    })
    return promise;
}
const serverHandle = (req, res) => {
  
  // 记录access log
  access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`);
  // 设置返回格式 JSON
  res.setHeader('Content-type', 'application/json');
  const { url } =  req;
  req.path = url.split('?')[0];

  // 解析query
  req.query = querystring.parse(url.split('?')[1]);

  // 解析cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || '';
  cookieStr.split(';').forEach(item => {
    // 异常处理
    if(!item) {
      return;
    }
    const arr = item.split('=');
    const key = arr[0].trim(); // 避免空格
    const value = arr[1];
    // console.log(key, value);
    req.cookie[key] = value;
  })
  // console.log('cookie is', req.cookie);

  // 注释掉换用redis
  // // 解析session
  // let { userid } = req.cookie;
  // let needSetCookie = false; 
  // if (userid) {
  //   // if (SESSION_DATA[userid]) {
  //   //   req.session = SESSION_DATA[userid];
  //   // } else {
  //   //   SESSION_DATA[userid] = {};
  //   //   req.session = SESSION_DATA[userid];
  //   // }
    
  //   // 简化
  //   if (!SESSION_DATA[userid]) {
  //     SESSION_DATA[userid] = {};
  //   }
  // } else {
  //   needSetCookie = true;
  //   userid = `${Date.now()}_${Math.random()}`;
  //   SESSION_DATA[userid] = {};
  // }
  // req.session = SESSION_DATA[userid];

  // 使用redis解析session
  let { userid } = req.cookie;
  let needSetCookie = false; 
  if (!userid) {
    needSetCookie = true;
    userid = `${Date.now()}_${Math.random()}`;
    // 初始化 redis 中的session值
    set(userid, {});
  }
  // 获取 session
  req.sessionId = userid;
  get(req.sessionId).then(sessionData => {
    if (sessionData == null) {
      // 初始化 redis 中的session
      set(req.sessionId, {});
      // 设置session
      req.session = {};
    } else {
      req.session = sessionData;
    }
    console.log('req.session', req.session);
    // 处理postData
    return getPostData(req);
  }).then(postData => {
  // 处理postData
  // getPostData(req).then(postData => {
    req.body = postData;
    // 处理blog路由
    // const blogData = handleBlogRouter(req, res);
    
    // if (blogData) {
    //   res.end(
    //     JSON.stringify(blogData)
    //   )
    //   return; // 防止继续执行
    // }
    const blogResult =  handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then(blogData => {
        if (needSetCookie) {
          res.setHeader('Set-cookie', `userid=${userid};path=/; httpOnly; expires=${getCookieExpires()}`);
        }
        res.end(
          JSON.stringify(blogData)
        )
      })
      return;
    }
    // 处理user路由
    // const userData = handleUserRouter(req, res);
    // if (userData) {
    //   res.end(
    //     JSON.stringify(userData)
    //   )
    //   return;
    // }

    const userResult = handleUserRouter(req, res);
    if (userResult) {
      userResult.then(userData => {
        if (needSetCookie) {
          res.setHeader('Set-cookie', `userid=${userid};path=/; httpOnly; expires=${getCookieExpires()}`);
        }
        res.end(
          JSON.stringify(userData)
        )
      })
      return;
    }

    // 未命中返回404
    res.writeHead(404, { 'Content-type': 'text/plain' });
    res.write('404 Not Found\n');
    res.end();
  })
}
module.exports = serverHandle
const redis = require('redis');
const { REDIS_CONF } = require('../conf/db');

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on('error', err => {
  console.log(err);
})

function set(key, val) {
  if (typeof val === 'object') {
    // 解析成json格式，因为key, val必须是字符串, 如果不转换会自动进行toString, toString不符合预期
    val = JSON.stringify(val);
  }
  redisClient.set(key, val, redis.print); //Reply: OK 

}

function get(key, val) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err);
        ReadableStreamDefaultController;
      }
      if (val == null) {
        resolve(null);
        return;
      }
      try {
        // 如果是json返回一个json对象 如果不是就直接返回
        // try catch不是为了抛出异常 而是为了兼容JSON转换
        resolve(
          JSON.parse(val)
        )
      } catch (ex) {
        resolve(val);
      }
    })
  })
  return promise; 
}

module.exports = {
  set,
  get
}
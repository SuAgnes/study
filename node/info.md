nvm nodejs版本管理工具，可切换多个nodeb版本
mac 推荐使用 brew install nvm

js ECMAScript + Web API
nodejs ECMAScript + Nodejs AP

输入url到展示网页
DNS解析域名为IP → 建立TCP连接 三次握手 → 发送http请求 （客户端）
server接收到http请求 → 处理 → 返回 （server端）
客户端接收到返回数据，处理数据（渲染页面、执行JS等）

http:
Remote Address: 远端地址 xxx.xx.xxx.xx: 443
443为https的默认端口 http默认端口为80
DNS解析：浏览器本身有缓存，如果没有缓存第一次会去运营商用域名换取IP地址

装 nodemon 和 cross-env

npm install nodemon cross-env --save-dev

POST 相较 GET 更安全，GET更容易访问，同时POST还能预防一些跨域的问题
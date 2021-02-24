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

涉及登录联调，因为有cookie声音不能用postman联调，只能用浏览器。
cookie跨域不共享，前端和server必须同域。
需要nginx做代理，让前后端同域。

全局安装server服务 npm install http-server -g

nginx:
高性能的web服务器 开源免费
一般用于做静态服务（CND等，服务端吧需要解析直接返回的文件），负载均衡（一台主机器，其他的均分流量，以至于整个集群的负载可以做最高，NGINX内部有一个模块可以做负载均衡的配置，可以做一个入口，流量来了可以分配到不同的机器上去，平均流量）
反向代理

浏览器->localhost/index.html->nginx
到NGINX会匹配，如果请求是/..的形式，直接访问->html
如果请求是/api/的形式，访问->nodejs

反向代理：客户端无法控制的代理，就是反向代理（对客户端来说server端是一个黑盒）
正向代理：类似vpn, 客户端可控制的代理

通过nginx可以访问同一个域，域下面无论是静态网页还是接口都可以通过这个域访问。

brew install nginx

nginx命令
测试配置文件格式是否正确 nginx-t
启动nginx; 重启nginx -s reload
停止nginx -s stop

打开配置文件 sudo vi /usr/local/etc/nginx/nginx.conf

执行nginx`nginx`
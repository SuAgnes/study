用cookie存username会暴露，很危险。且cookie只有5kb。
解决：用sever存username，cookie存userId。
sever端安全、且无5kb限制。
server端解决存储问题的方式很多：放数据库中等等。
这个解决方案就叫session, 即server端储存用户信息。

session的问题

目前session是直接js变量 放在node进程中
问题：进程内存有限，访问量过大，内存暴增怎么办；正式线上是多线程，进程之间无法共享

解决方案 redis
webserver 最常用的缓存数据库，数据存放在内存中
缺点：内存略贵 空间较小 内存断电丢失
比mysql访问数据快（内存和硬盘不是一个等级，硬盘速度干不过内存, mysql是硬盘数据库）
所以一般即用mysql 又用redis

将web server 和 redis拆分成2个单独的服务
双方都是独立可扩展的（例如都扩展成集群）
mysql也是单独的服务可扩展

最初的问题就是session在内存中 导致如果session过大会挤爆内存 第二是多进程之间数据无法共享

有redis就可以解决 把session 放到redis中就可以解决

为何session适用redis？
session 访问频繁 对性能要求高（mysql是硬盘数据库）
session 可不考虑断电丢失的问题（内存硬伤）
session 数据量相比mysql不会太大

为何网站数据不适用redis
相比session 操作频率不高
断电不能丢失，必须保留
数据量太大，内存成本太高
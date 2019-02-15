const http = require('http');
const fs = require('fs');
http.createServer(function(request,response){
    console.log('request come',request.url);

    if(request.url === '/'){
        const html = fs.readFileSync('test.html','utf8');
        response.writeHead(200,{
            'Content-Type':'text/html',
            'Set-Cookie': ['id=123;max-age=2','paw=abc;HttpOnly'],//过期时间,设置了HttpOnly后paw不会通过js打印出来
            // domain下面的域名表示在下面这个域名的范围内都可以访问到这个cookie
        })
        response.end(html);
    }
}).listen(8891);
console.log('server listening on 8891');
//cookie如果没有设置过期时间,浏览器关闭后就没有了

// session概念
// 在用户登录后把session或者一个key设置到cookie里,在下一个用户请求过来的时候可以读cookie的值,可以通过读取cookie里的值拿到这个用户对应的key,通过key去定义一个用户的信息,把用户信息拿出来做一些针对这个用户的一些操作
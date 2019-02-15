const http = require('http');
const fs = require('fs');
http.createServer(function(request,response){
    console.log('request come',request.url);
    
    //根路径
    if(request.url === '/'){
        //只有302的头才代表说他要去进行一个跳转:临时跳转
        response.writeHead(302,{
            'Location': '/new' //如果不写host和端口那么默认就是在同域的情况下
        })
        response.end('');
    }
    // 如果可以确定永久跳转 可以用301
    // 使用301的话 第二次访问的时候直接在浏览器就变成了新的路径,不需要服务器重新指定新的location
    // 而302 每次访问都会是/→/new
    // 301会从缓存中找路径 301会尽可能长时间缓存(除非清缓存)
    // 301要慎重 因为如果做完了想反悔,就不是自己可以决定的事了(已经存在了客户端缓存中,因为它尽可能长时间存储的特性,即使从服务器做更改,客户端还是默认取缓存)
    if(request.url === '/new'){
        response.writeHead(200,{
            'Content-Type':'text/html',
        })
        response.end('<div>this is Content</div>');
    }
}).listen(8895);
console.log('server listening on 8895');

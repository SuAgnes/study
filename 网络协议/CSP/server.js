const http = require('http');
const fs = require('fs');
http.createServer(function(request,response){
    console.log('request come',request.url);
    if(request.url === '/'){
        const html = fs.readFileSync('test.html','utf8');
        response.writeHead(200,{
            'Content-Type':'text/html',
            // <!-- 为了让嵌入在网页内部的script防止XSS攻击,可以在服务里写入 -->
            // 'Content-Security-Policy': 'default-src http: https:',
            // 'Content-Security-Policy': 'default-src \'self\'', //限制它去加载本站提供的外链脚本
            // 'Content-Security-Policy': 'default-src \'self\' https://code.jquery.com' //允许这个连接加载
            // 'Content-Security-Policy': 'default-src \'self\';form-action \'self\'', //禁止表单跳转
            // 'Content-Security-Policy': 'script-src \'self\'' //只限制script，不限制img外链等
            // 'Content-Security-Policy': 'default-src \'self\'; report-uri /report', //如果有情况 浏览器通知(Network的report)
            // 'Content-Security-Policy-Report-Only': 'default-src \'self\'; report-uri /report', //虽然检测到资源是不想加载的但是还是会加载,只做一个report的工作不强制不加载;检测到每个限制范围内工作的时候都会加载一个report请求
        })
        response.end(html);
    } else {
        response.writeHead(200,{
            'Content-Type':'application/javascript',
        })
        response.end('console.log("loaded script")')
    }
}).listen(8896);
console.log('server listening on 8896');
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
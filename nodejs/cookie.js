var http = require('http');
var cookie = require('cookie');
//쿠키란? 이전에 웹에 접속한 사용자의 정보를 기억하는 것
http.createServer(function(request,response){
    console.log(request.headers.cookie);
    var cookies = {};
    if(request.headers.cookie !== undefined)
    {
        var cookies = cookie.parse(request.headers.cookie);
    }
    
    console.log(cookies.yummy_cookie);
    response.writeHead(200,{
        'Set-Cookie':['yummy_cookie=choco',
        'tasty_cookie=strawberry',
        `Permanent=cookies; Max-Age=${60*60*24*30}`,//언제 쿠키를 삭제할지 Max-Age는 설정이가능하고 Expires는 설정을 못함
        'Secure=Secure; Secure',//https를 통해서 가야지만 쿠키를 전송함
        'HttpOnly=HttpOnly; HttpOnly',//웹 콘솔을 통해 접근하지 못하도록함
        'Path=Path; Path=/cookie',//cookie path를 이용하거나 그 하위에서만 접근할 수 있음
        'Domain=Domain; Domain=o2.org'//내 컴퓨터에서 Domain을 통해 접속 할 수 있게 하는 건데 이유는 모르겠지만 작동하지 않음
    ]
    });

    response.end('Cookie!!!');
}).listen(3000);
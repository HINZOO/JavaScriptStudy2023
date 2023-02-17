const http = require("http");
//nodejs에서 라이브러리(모듈)를 임폴트 하는 방법

//http: http 서버를 생성하고 클라이언트의 요청을 처리할 수 있다.(웹앱서버)
//console.log(http);

/////👉서버
http.createServer(function (req, res){
    let url = req.url.split("?")[0];//🍒요청한 리소스의 주소;
    let queryString = req.url.split("?")[1];//🍒요청한 파라미터들;
    console.log(url);// / /favicon.ico 뜨는데 이때 첫번째 들어오는 '/ '이 동적 index페이지이다.
    ///////👉서블릿에 해당(톰캣은 서블릿만 구현함.)////////////////
    res.setHeader("content-type", "text/html;charset=UTF-8");
    if (url=="/") {//index동적 페이지
        res.write("<h1>node js의 http 모듈 안녕!</h1>");
        res.write("<h2>npm으로 nodemon설치!</h2>");
        res.write("<p>npm은 노드 패키지 매니저로 라이브러리 의존성 주입을 한다!</p>");
        res.write(`<p>
                    <a href="power.do?a=3&b=6">파라미터 a,b를 넘기면 두 값을 거듭제곱한 결과물을 반환하는 동적페이지</a>    
                    </p>`);
        res.end(); // 꼭 꺼줘야함..
    }else if(url=="/power.do"){// ?을 기준으로 왼쪽이 url 오른쪽이 queryString이다.=>🍒 이동
        //JAVA의 req.getParameter(key) retun val 와 똑같은 기능
        //? key=val & key2=val2 & key3=val3...
        //🔎 split() 메서드는 String 객체를 지정한 구분자를 이용하여 여러 개의 문자열로 나눕니다.
        const params = queryString.split("&");//["key=val","key2=val2",...]
        const paramObj={};
        params.forEach((param)=>{ // param 1개는 // key=val로 출력된다. =을 기준으로 분리하여 key값 value값으로 분류후 대입.
            let key =param.split("=")[0];
            let value =param.split("=")[1];
            paramObj[key]=value;
        }); //{key:val,key2:val,...}
        console.log(paramObj)
        res.write(`<h1>${paramObj.a} 거듭제곱 ${paramObj.b}의 결과는 : ${Math.pow(paramObj.a,paramObj.b)}</h1>`);
        res.end();
    }
    else{//찾는 리소스가 없을 때
        req.statusCode=404;
        res.write("<h1>404 찾는 리소스가 없습니다.</h1>");
        res.end();
    }
}).listen(7070); // ip주소 :7070 =>서버에 접속
//👉 톰캣은 이 과정을 다 자동으로 한다.

//port 번호 0~2000까지는 컴퓨터가 사용함.(=os가 시스템 어플을 위해 사용 중)
//          3306 : mysql이 설치되면 무조건 씀.
//          80 : 해당 컴퓨터가 서버컴퓨터가 되면 서버를 서비스하기 위한 기본 포트가 됨.
//모듈 : 프로그램을 구성하는 구성 요소로, 관련된 데이터와 함수를 하나로 묶은 단위
//      어플리케이션이나 라이브러리 등.. (개발자에 의해 생상된 가장 작은 단위)
//라이브러리 : 필요에 의해서 사용되는 객체
//어플리케이션 : 유저에게 서비스 되는 것
//패키지 : 유사한 사용을 위해 모인 객체의 집단 (Ex) Collection FrameWork : List, Map, Set, Date..)
//프레임워크 : 모듈을 제어하고 프로그래밍 시 프레임워크의 규칙에 따를 때 프레임워크라 한다.
//          여러 라이브러리의 집단으로 특정 서비스가 가진 한계를 벗어나기 위해 그 서비스 전체를 제어하는 단위
//🖱️) 프레임워크는 어떠한 목적을 달성하기 위해 복잡하게 얽혀있는 문제를 해결하기 위한 구조며, 소프트웨어 개발에 있어 하나의 뼈대 역할을 한다.
//spring :  톰캣이 가진 불안성과 객체지향의 한계를 벗어나기 위해 관점지향을 적용하는 프레임워크
//expressjs : node js가 갖는 불편함(모든 걸 다 구현해야함)을 해소하고 미들웨어를 적용하는 프레임워크
//spring 안에는 톰캣이 포함되어있고 express 안에 node 가 있지만 문법은 다름.
//프레임워크의 단점 : 배우기 어렵다. 작은 서비스에 적용하기 어렵다.

//node js : 자바스크립트로 서버에서 실행되는 언어,nodejs는 NodejsPackageManager(NPM:) 을 제공하고 있다.
//        : nodejs는 명확하게 말하면 서버가 아니다. (서버언어: 동적페이지에 적용되는 언어 (서블릿=>자바)
//         서버언어이기도 하고 서버를 구현할 수도 있다.

const http=require("http");
const url=require("url");// url에서 path와 queryString을 분리
const querySting =require("querystring");//queryString을 Object로 변환
const fs =require("fs");// java의 FileReader+Writer와 유사 (파일을 문자열로 불러오는것)
const fsPromise=require("fs/promises"); // fs을 프라미스화 한 것.

const server=http.createServer();//nodejs로 구현한 서버 (=톰캣이 하는일)
server.listen(8888);//클라이언트에서 해당 서버에 요청이 들어올 때마다 요청 이벤트를 실행

//😎 암기!
//  url는 서버주소+패스+쿼리스트링 으로 구성되어있다.
//  www.naver.com  :서버주소(=도메인) 127.3.0.13:80 ip(internet protocol:인테넷상에서 컴퓨터가갖는 고유주소)+port 를 맵핑하는 주소
//  /book/detail.do : 패스 or pathname: 해당서버에서 공개되고 있는 리소스의 주소
//  ?bid=12313k1 : 쿼리스트링 : 해당 동적 리스소에 제공하는 파라미터들 (&로 연결)

server.on("request",async (req, res)=>{//on(request,()=>{}) 요청이벤트 실행


    const urlObj=url.parse(req.url);// const urlParse 라고 해도됨.
    const params=querySting.parse(urlObj.query);//파라미터 분리
    const urlSplits=urlObj.pathname.split("/");//🍒
    console.log(urlSplits);//c를 클릭시 [ '', 'public', 'html', 'c.html' ] 가뜬다.
    //🍒 url에 패스에 /public/ 이 포함되면 모두 정적 리소스다 라고 약속! (public으로 보낸다)
    //예를들어 /public/css/a.css를 요청한다하면 /를 잘라내어 1번째가 public 이면 정적리소스이기 때문에 public으로 보낸다.
    //        /public/html/c.html
    if(urlSplits[1]==="public") {//🍒정적 리소스를 요청함
        if(urlSplits[2]==="html"){
            res.setHeader("content-type","text/html;charset=UTF-8");
        }else if(urlSplits[2]==="css"){
            res.setHeader("content-type","text/css;");
        }else if(urlSplits[2]==="img"){
            res.setHeader("content-type","image/jpeg;");//png도 jpeg로 불러올수있음.
        }else if(urlSplits[2]==="js"){
            res.setHeader("content-type","application/javascript;");
        }


/*   //서버 내부에서 / 로 최상위 상대주소를 쓰면 c://(window) or user(mac) 하위로 찾아간다. 때문에 상대주소로 써야한다.
       fs.readFile("."+urlObj.pathname,(err,data)=>{
            if(err) {
                console.error(err);
                res.write("<h1>500 파일 요청을 실패하였습니다.</h1>");
                res.end();
                //return;
            }
            res.write(data);
            res.end();
        });

 */

        try{//위의 주석처리한 콜백함수를 프라미스화 함수로 변환.
            let data = await fsPromise.readFile("."+urlObj.pathname,);//가장 인접한 함수가 async 함수여야 await를 쓸수있다.
            res.write(data);
            res.end();
        }catch (e) {
            console.error(e);
            res.statusCode=500;
            res.write("<h1>500 파일 요청을 실패하였습니다.</h1>");
            res.end();
        }

    }else{//🍒 동적 리소스만
        res.setHeader("content-type","text/html;charset=UTF-8");
        if(req.url =="/"){// 동적리소스(==서블릿) //리소스: 누군가가 찾을 수있는 자료
            res.write("<h1>index 페이지입니다.</h1>");
            res.write("<h2>서버의 리소스 목록</h2>");
            res.write(`
            <ul>
                <li><a href="/a.do">a.do 동적페이지</a></li>
                <li><a href="a.do?a=11.3&b=30.333">
                      a+b를 연산하는 a.do 동적페이지</a></li>
                <li><a href="b.html">b.html 정적페이지</a></li>
                <li><a href="/public/html/c.html">c.html 정적 페이지</a></li>
                <li><a href="/public/html/d.html">d.html 정적 페이지</a></li>
                <li><a href="/public/css/d.css">d.css 스타일시트</a></li>
                <li><a href="/public/img/d.jpeg">참새이미지</a></li>
            </ul>
        `);
            res.end();
        }else if (urlObj.pathname=="/a.do"){//a.do 동적리소스
            let a = parseFloat(params.a);//문자열이기 때문에 숫자로 변환
            let b = parseFloat(params.b);
            res.write(`<h1>a.do 페이지 입니다.</h1>`);
            res.write(`<h2>받아온 파라미터 a와 b를 + 연산 : ${a+b}</h2>`);
            res.end();//응답을 완료함.(end를 안쓰면 클라이언트 서버가 응답하는 것을 무한 대기 할 수 있다)

        }else if(urlObj.pathname=="/b.html"){
            fs.readFile('b.html',(err,data)=>{
                if(err) {
                    console.error(err);
                    //return;
                }
                res.write(data);
                res.end();
            });

            //여기에 res.end();를 쓰지 않는다.
            //readFile이 멀티스레드를 생성하기 때문에 비동기 코드이기 때문이다.(콜백함수가 다 끝나기 전 우선실행이 될 수있다.)
        }
        else{
            res.statusCode=404;
            res.write("<h2>404 존재하지 않는 페이지입니다.</h2>");
            res.end();
        }

    }


});

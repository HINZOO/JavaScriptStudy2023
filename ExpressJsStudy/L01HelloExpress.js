const express=require('express');
const app=express();
app.use(express.static('public'));
    // 확장자가 정적리소스(html,js,css,jpeg,png...)이면, 무조건 public 폴더에서 리소스를 찾아 반환한다.
    //app.use : 미들웨어로 요청을 처리하기 전 (중간에) 가로채서 무언가를 하는 것.

//동적페이지 '/'(=인덱스) 페이지를 불러오면 콜백함수를 실행하겠다는 의미
// nodejs에서
// if(req.url==="/"&&req.method==="GET") 와 아래 코드는 같다.
app.get("/",(req, res)=>{
    let html="<h1>안녕 Express.js </h1>";//res.write 보다 send를 많이 쓴다,
    //res.send() : content-type 타입을 자동으로 맵핑하고 res.end()를 자동으로 한다.
    //안 써 줘 도 됨 😎 // res.setHeader("content-type","text/html;charset=UTF-8");
    //send()는 JSON 파일도 자동 파싱 -> JSON.stringify(jsonParsTest) 도 포함되어있다.
        //const jsonParsTest={checkId:true};
        //res.send(jsonParsTest);
    //404 에러 처리가 되어있다.
    html+="<h2>Express.js는  node.js의 웹앱 프레임워크 입니다.</h2>";
    //프레임워크 : 다수의 라이브러리에 의해서 웹앱이 지배당하고 있을 때, 프레임워크라고 한다.
    //라이브러리 : 그냥 끌어다 쓰는 것.
    html+=`<ul>
                <li>nodejs 에서 동적페이지의 구분이 안되는 것을 express 가 요청메소드(get/post/put/delete)와 동일한 이름의 함수(Routing)를 제공하여 해결한다.</li>
                <li>한 페이지에 너무 많은 동적 리소스를 작성하는 것을 router 라는 것으로 해결한다.</li>
                <li>middleware(미들웨어)를 이용해서 특정 요청의 중간처리를 할 수 있다.</li>
                <li>middleware 를 이용해서 편리하게 라이브러리를 적용할 수 있다.</li>
                <li>node.js의 모든 기능을 사용할 수 있다.</li>
          </ul>
           <h2>📕 Routing(라우팅)과 res.send()</h2>
           <ul>
               <li><a href="/checkIdJson.do">JSON 페이지 요청</a></li>
               <li><a href="/sum.do?a=10&b=20&c=30">파라미터 처리로 더하기 구현(html 페이지)</a></li>
               <li><a href="/img/참새.jpeg">정적 페이지 요청(참새이미지)</a></li>
                        <!-- public의 주소가 app.use(express.static('public'));으로 입력된다-->
           </ul>
    `;
    res.send(html);//send는 1번만 사용가능
})

//👉JSON 페이지 요청=======================================================================
app.get("/checkIdJson.do",(req,res)=>{
    const o={checkId:true,emp:{empno:7777,ename:"이현주"}};
    //🍒nodeJS에서..
     //   res.setHeader("content-type","application/json;charset=UTF-8;")
     //   res.write(JSON.stringify(o));
     //   res.end();
    //🍒expressJS에서
    res.send(o);
});

app.get("/sum.do",(req, res)=>{
    //🍒Nodejs에서
        //const urlObj=url.parse(req,url)
        //const params=querystring.parse(urlObj.query)
    console.log (req.query);        //이때 params 와 같다
    let a = Number(req.query.a);
    let b = Number(req.query.b);
    let c = Number(req.query.c);
    res.send(`<h1>a+b+c=${a+b+c}</h1>
                    <h3>파라미터는 req.query에 처리되어있다.</h3>
             `);
});

app.listen(7777,()=>{
    console.log("http://localhost:7777 에서 express web app 생성!")
});
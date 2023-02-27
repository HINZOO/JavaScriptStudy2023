const express=require('express');
const fs = require('fs/promises');
const pug=require('pug');
const app = express();


//app.set('views','./views') //default 로  pug 의 경로를 views 로 설정
//변경을 원하면 app.set('views', 폴더명); 으로 작성.
app.set('view engine','pug');
/*참고사이트 https://expressjs.com/en/guide/using-template-engines.html*/
app.use(express.static("public")); //urlEncoding 처리가 되어있음.
/*app.get("/public/!*",async (req, res)=> {
    let data = await fs.readFile("."+req.path);
    res.send(data);
})*/
//🍓참고) url 문자는 아스키코드만 참조 : 1byte 로 표현할 수 있는 문자표
        //1byte 가 중요한 이유? 데이터 전송과 저장하는 주소의 기본단위이기 때문에 최초의 문자표를 아스키코드로 생성.
        //참 새 => %EC%B0%B8 %EC%83%88 // 3byte 3byte 를 1byte 형태로 표현(16진수사용해서 영어가 있음..E-8..이런거)
        //(한글은 유니코드 문자표(utf-8)을 참고하기 때문에 유니코드 문자표를 아스키코드로 표현한 형태이다.)
        // urlEncoding (유니코드->아스키코드) 참새 => %EC%B0%B8%EC%83%88
        // urlDecoding (아스키코드->유니코드) %EC%B0%B8%EC%83%88 => 참새
        //참고사이트 : https://it-eldorado.tistory.com/143

app.get("/",(req, res)=>{
    /*과거 pug 사용 예시*/
/* let html = pug.renderFile("./views/index.pug");
    res.write(html);
    res.end();                                  */
    res.render('index',{a:10,b:20});
})
const querystring =require("querystring");
app.post("/signup.do",(req, res)=>{
    console.log(req.query.id);//url 에 포함된 id 파라미터
    //res.send(req.query.id+"님 회원가입 완료!");//post 방식의 경우 url 의 쿼리를 숨기기 떄문에 undefinded 가 뜸.
    //req.on("data",()=>{}) : 요청헤더의 쿼리스트링을 읽어오겠다.
    let bodyQueryString="";
    req.on("data",(data)=>{
        bodyQueryString+=data;
    });
    req.on("end",()=>{
        //res.send(bodyQueryString);
        const params=querystring.parse(bodyQueryString);
        res.send(JSON.stringify(params));
    })
})

/////////////
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
//req.body 필드가 추가되고 body의 쿼리스트링이 object로 들어간다.(파싱하고 있다)
//extended:false : nodejs에서 제공하는 queryString을 사용해서 파싱하겠다.
//extended:true : 확장모듈(외부모듈)인 qs를 사용해서 파싱하겠다.
app.post("/signup2.do",(req, res)=>{
    res.send(JSON.stringify((req.body)))
})
app.listen(8888,()=>{
    console.log("http://localhost:8888 미들웨어로 bodyParser 적용");
})
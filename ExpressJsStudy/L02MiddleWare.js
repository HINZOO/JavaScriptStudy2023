const express=require('express');
const fs=require('fs/promises');
const app=express();
//🍒 app.use: 미들웨어의 기본형
    //app.use("*",(req,res,next)=>{});
    // * : 내가 가로챌 패턴을 의미; * 모든이라는 의미의 와일드카드
    // next : /a.do 요청을 미들웨어가 중간에 가로챘는데 a.do로 계속 가려면 next()를 호출하면 된다.
app.use("*",(req, res,next)=>{
    console.log("* 미들웨어가 가로챔");
    next();
});

app.get("/",async (req, res)=>{
    let data=await fs.readFile("L02Index.html");
    res.write(data);
    res.end();//send()로 하면 다운로드가 되어서... 예전방식을 차용해옴!
});

app.use("/user/*",(req, res, next)=>{
    if(req.query.id){
        next();
    }else{
        res.redirect("/");
            //위의 페이지는
            // res.writeHead(302,{location:"/"};
            //res.end() 와 같다.
    }
})
app.get("/a.do",(req, res)=>{
    res.send("<h1> * 미들웨어가 모든 페이지를 감시합니다.</h1>");
});
app.get("/user/b.do",(req, res)=>{
    res.send("<h1>/user/b.do 페이지 (/user/* 모든리소스는 파라미터 id가 꼭 필요합니다.)</h1>");
});

app.get("/user/c.do",(req, res)=>{
    res.send("<h1>/user/c.do 페이지 (/user/* 모든리소스는 파라미터 id가 꼭 필요합니다.)</h1>");
});

app.listen(7777,()=>{
    console.log("http://localhost:7777 에 미들웨어수업");
});
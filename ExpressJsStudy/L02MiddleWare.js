const express=require('express');
const fs=require('fs/promises');
const app=express();
//๐ app.use: ๋ฏธ๋ค์จ์ด์ ๊ธฐ๋ณธํ
    //app.use("*",(req,res,next)=>{});
    // * : ๋ด๊ฐ ๊ฐ๋ก์ฑ ํจํด์ ์๋ฏธ; * ๋ชจ๋ ์ด๋ผ๋ ์๋ฏธ์ ์์ผ๋์นด๋
    // next : /a.do ์์ฒญ์ ๋ฏธ๋ค์จ์ด๊ฐ ์ค๊ฐ์ ๊ฐ๋ก์ฑ๋๋ฐ a.do๋ก ๊ณ์ ๊ฐ๋ ค๋ฉด next()๋ฅผ ํธ์ถํ๋ฉด ๋๋ค.
app.use("*",(req, res,next)=>{
    console.log("* ๋ฏธ๋ค์จ์ด๊ฐ ๊ฐ๋ก์ฑ"+req.originalUrl);
    next();
});

app.get("/",async (req, res)=>{
    let data=await fs.readFile("L02Index.html");
    res.write(data);
    res.end();//send()๋ก ํ๋ฉด ๋ค์ด๋ก๋๊ฐ ๋์ด์... ์์ ๋ฐฉ์์ ์ฐจ์ฉํด์ด!
});

app.use("/user/*",(req, res, next)=>{//ํน์ ์์ธ๊ฐ ์๋์ง ๊ฐ์ํ๋ ค๊ณ  ์์ฑ.
    console.log("/user/* ๋ฏธ๋ค์จ์ด๊ฐ ๊ฐ๋ก์ฑ"+req.originalUrl);//user๋ก ์ค๋ ๋ชจ๋  ์์ฒญ์ ๋ฏธ๋ค์จ์ด๊ฐ ๊ฐ๋ก์ฑ
    if(req.query.id){//1.id๋ผ๋ ํ๋ผ๋ฏธํฐ๊ฐ ์์ด์ผ userํ์ด์ง๋ก ๊ฐ์ ์๊ณ 
        next();//์๋ ์์ฒญํ๋ url๋ก ์ด๋
    }else{
        res.redirect("/");//2. ์์ผ๋ฉด ๋ฉ์ธํ์ด์ง๋ก ์ด๋ํ๋ค.
            //์์ ํ์ด์ง๋
            // res.writeHead(302,{location:"/"};
            //res.end() ์ ๊ฐ๋ค.
    }
})
app.get("/a.do",(req, res)=>{
    res.send("<h1> * ๋ฏธ๋ค์จ์ด๊ฐ ๋ชจ๋  ํ์ด์ง๋ฅผ ๊ฐ์ํฉ๋๋ค.</h1>");
});
app.get("/user/b.do",(req, res)=>{
    res.send("<h1>/user/b.do ํ์ด์ง (/user/* ๋ชจ๋ ๋ฆฌ์์ค๋ ํ๋ผ๋ฏธํฐ id๊ฐ ๊ผญ ํ์ํฉ๋๋ค.)</h1>");
});

app.get("/user/c.do",(req, res)=>{
    res.send("<h1>/user/c.do ํ์ด์ง (/user/* ๋ชจ๋ ๋ฆฌ์์ค๋ ํ๋ผ๋ฏธํฐ id๊ฐ ๊ผญ ํ์ํฉ๋๋ค.)</h1>");
});

app.listen(7777,()=>{
    console.log("http://localhost:7777 ์ ๋ฏธ๋ค์จ์ด์์");
});
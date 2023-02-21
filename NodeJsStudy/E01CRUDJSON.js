const http=require("http");
const url=require("url");
const querystring=require("querystring");
const fs=require("fs/promises");
const mysql=require("mysql2");
const pug=require("pug");
const server=http.createServer();

server.listen(6118,()=>{
    console.log("http://localhost:6118 SCOTT DEPT CRUD를 제공하는 서버")
});

const mysqlConInfo={
    host:"localhost",
    port:3306,
    user:"root",
    password:"mysql123",
    database:"scott"
}
const createPool=mysql.createPool(mysqlConInfo);
const pool=createPool.promise();

server.on("request",async (req,res)=>{
    const urlObj=url.parse(req.url);
    const params=querystring.parse(urlObj.query);
    const urlSplits=urlObj.pathname.split("/");
    const err400 = function (){
        res.statusCode=404;
        res.end();
    }
    if(urlSplits[1]==="public"){
        if(urlSplits[2]==="js"){
            res.setHeader("content-type","application/javascript");
        }else if (urlSplits[2]==="css"){
            res.setHeader("content-type","text/css");
        }else if(urlSplits[2]==="image"){
            res.setHeader("content-type","image/jpeg");
        }
        try{
            let data = await fs.readFile("."+urlObj.pathname);
            res.write(data);
            res.end()
        }catch (e) {
            err400();
        }
    }else{
        if(urlObj.pathname==="/"){
            let html=pug.renderFile("./view/index.pug")
            res.write(html);
            res.end();
        }
    }
})
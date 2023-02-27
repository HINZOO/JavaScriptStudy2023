const express=require('express');
const bodyParser=require('body-parser');//파라미터를 오브젝트로 반환
const app=express();
app.set("views","./templates");
app.set("view engine","pug");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:false}));//()안의 내용 생략가능

//app.[get|post|put|patch|delete].("경로",(req,res)=>{}); //라우팅
//app.[get|post|put|patch|delete|use].("경로",(req,res,next)=>{}); //미들웨어 or 미들웨어라우팅

app.get("/",(req, res)=>{
    res.render("index");
})

//라우터를 이용하여 간단하게 만들어주었다.============================
const empRouter=require("./L05EmpRouter");
app.use("/emp",empRouter);

//==============================================================
/*const scott=require("./mysqlScottPool");
app.get("/emp/list.do",async (req, res)=>{
    const [rows,f]=await scott.query("SELECT * FROM EMP");
    res.render("empList",{empList:rows});
})
app.get("/emp/insert.do",async (req, res)=>{
    res.render("empInsert");
})*/
//위의 코드를 페이지마다 계속 써야하는 길어지는 현상을 막기위해.. 라우터를 배운다.
//=====================================================================
app.listen(8888,()=>{
    console.log("http://localhost:8888 라우터로 라우팅을 분리해보자.")
})

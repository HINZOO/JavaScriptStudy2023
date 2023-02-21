const http=require("http");
const url = require("url");
const querystring = require("querystring");
const fs=require("fs/promises");
const mysql=require("mysql");
const mysql2=require("mysql2/promise");//mysql을 프라미스화한 라이브러리 (await로 동기화할 수 있음)
const pug=require("pug");//플러그인-pug(ex-jade) 검색후 설치(자동완성지원)
const mysqlConnInfo = {
    host:"localhost",
    port:3306,
    database:"SCOTT",
    user:"root",
    password:"mysql123",
}


//node js: 실무에서 사용하지 않는다(공부용)
//expressjs : nodejs 프레임워크를 실무에서 사용함.
const server = http.createServer();
server.listen(8888,()=>{
    console.log("http://localhost:8888 에 서버가 열림")
});
server.on("request",async (req,res)=>{
    const urlObj=url.parse(req.url);
    const params=querystring.parse(urlObj.query);
    //public없이 해보자.
    if(urlObj.pathname==="/"){
        let data=await fs.readFile("L05Index.html");
        res.write(data);
        res.end();
    }else if (urlObj.pathname==="/deptListModel1.do"){
        try{
           const conn=mysql.createConnection(mysqlConnInfo);
           conn.query("SELECT * FROM DEPT",(err,rows)=>{
               if(err) console.error(err);
               let html="<table>";
               html+="<thead><tr><td>부서번호</td><td>부서이름</td><td>부서위치</td></tr></thead>";
               for(const low of rows){
                   html+="<tr>";
                   html+="<td>"+low["DEPTNO"]+"</td>";
                   html+="<td>"+low["DNAME"]+"</td>";
                   html+="<td>"+low["LOC"]+"</td>";
                   html+="</tr>";
               }

               html+="</table>";
               res.write(html);
               res.end();
           })
        }catch(e){
            console.error(e)
        }
        res.setHeader("content-type","text/html;charset=UTF-8");
        res.write("<h1>mode1은 한페이지를 3명의 개발자가 다 같이 작업함</h1>");
        res.write("<h2>동적페이지에서 html을 랜더하면 프론트엔드 개발자가 회사를 그만둘 수 있다.</h2>");
    }else if(urlObj.pathname==="/deptList.do"){
        let data=await fs.readFile("L05DeptList.html");//문자열로 파일을 읽어오겠다.
        const conn=await mysql2.createConnection(mysqlConnInfo);
        const[rows,fields]=await conn.query("SELECT * FROM DEPT");
            // fields 테이블의 구조(desc deptno와 유사)
        //res.write("const deptList="+JSON.stringify(rows)+";");// JSON.stringify(Obj) Object를 json으로 변환
        res.write(`<script> const deptList=${JSON.stringify(rows)};</script>`);
        res.write(data);
        res.end();
    }else if(urlObj.pathname==="/deptListPug.do"){//서버:node(pug사용),express(pug사용),톰캣(jsp사용),spring(thymeleaf 사용)
        //👀 pugjs.org // npm 인스톨 해야한다.//npm i --save pug//--save:프로젝트내에서만설치
        try{
            const conn=await mysql2.createConnection(mysqlConnInfo);
            const[rows,fields]=await conn.query("SELECT * FROM DEPT");
            let html=pug.renderFile("L05DeptList.pug",{deptList:rows});
            //pug 문서에서 html 을 렌더링할때 Object 를 참조할 수 있다.

            res.write(html);
            res.end();
        }catch (e) {
            console.error(e)
            res.statusCode=500;
            res.write("<h1>db나 렌더링에서 오류가 발생했습니다. 다시시도 500</h1>");
            res.end();
        }

    } else if(urlObj.pathname==="/empListPug.do") {
        try {
            const conn = await mysql2.createConnection(mysqlConnInfo);
            const [rows, fields] = await conn.query("SELECT * ,DATE_FORMAT(HIREDATE,'%Y/%m/%d')HIREDATE FROM EMP");
            let html = pug.renderFile("L05EmpLIst.pug", {empList: rows});
            res.write(html);
            res.end();
        } catch (e) {
            console.error(e)
            res.statusCode = 500;
            res.write("<h1>에러코드 500</h1>");
            res.end();
        }
    }else if (urlObj.pathname==="/L05EmpDetail.do"){
        const conn = await mysql2.createConnection(mysqlConnInfo);
        const [rows, fields] = await conn.query("SELECT * FROM EMP WHERE EMPNO="+[params.empno]);
        res.write(html);
        res.end();
    }

    else{
        res.setHeader("content-type","text/html;charset=UTF-8");
        res.statusCode=404;
        res.write("<h1>404 존재하지 않는 리소스입니다.</h1>");
        res.end();
    }
})
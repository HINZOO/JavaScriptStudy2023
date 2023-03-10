//๐ CRUD Create Read Update Delete
//  ์ ์ ์๊ฒ db๋ฅผ ์ ์ดํ  ์ ์๋ ์ธํฐํ์ด์ค (๋ชจ๋ธ,์๋น์ค๋ผ๊ณ ๋ ๋ถ๋ฅธ๋ค.)
//  ๐ค ์ ์ ๊ฐ ์ง์  db์ ์ ์ํ์ฌ ๋ฐ์ดํฐ๋ฅผ ์กฐ์ํ๋ฉด ์๋๋๊ฑธ๊น? [ใใ์๋จ๐]
//      >> 1.๋ฐ์ดํฐ๋ฅผ ์กฐ์์ ์ธํฐํ์ด์ค๋ฅผ ์ ํํ  ์ ์๋ค.(๋ถ๋ถ๊ถํ์ค์  ๋ถ๊ฐ->๋ณด์)
//      >> 2.๋ถํ์ํ ์ ๋ณด๊ฐ ๋ง์์ ์ ์ ๊ฐ ์ด์ฉ์ ์ด๋ ค์์ ๊ฒช๋๋ค.(์๋น์ค)
//      >> 3.์กฐ์ํ๋ ค๋ฉด ์ ์ ๊ฐ sql ์ ๋ฐฐ์์ผํ๋ค 'V')...ใ

//๐ create,alter,drop :
//      table ์ ์์ฑํ๊ฑฐ๋ ๊ตฌ์กฐ๋ฅผ ๋ฐ๊พธ๊ฑฐ๋ ์ญ์ ํ๋ ๋ช๋ น์ด(DDL)
//๐ update,delete,insert(DML),select(DQL)
//      table ์ ๋ฐ์ดํฐ๋ฅผ ์ถ๊ฐํ๊ฑฐ๋ ์ญ์  ๋๋ ์์  ์กฐํํ๋ ๋ช๋ น์ด

// es6 ๋ฌธ๋ฒ๋ถํฐ var๋ฅผ ์ฌ์ฉํ์ง ์๋๊ฒ์ ๊ถ์ฅํ๋ค. (๋ณ์๋ผ๋๊ฒ ์ง์ญ ์ ์ญ์ ๊ตฌ๋ถ์ด ์๋๋ฐ var ๋ ๊ทธ ๊ตฌ๋ถ ์ด ์๋ค)

const http = require("http");
const url = require("url");
const querystring = require("querystring");
const fs = require("fs/promises");
const mysql = require("mysql2");
const pug = require("pug");
//v8 ๋๋ jvm ์ด ์คํ๋  ๋ ๋ฉ๋ชจ๋ฆฌ์ ๋ฑ๋กํ๋ ๊ฒ : ๋ฐฑ๊ทธ๋ผ์ด๋
//java java.lang*,java.util.* ํจํค์ง๊ฐ ๊ฐ์ง๊ณ  ์๋ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๊ฐ ๋ง์ ํธ
//nodejs ๋ ๋ฐฑ๊ทธ๋ผ์ด๋์์ ๊ฐ์ง๊ณ  ์๋ ๋ชจ๋์ด ์ ์ํธ์ด๋ผ ๋น ๋ฅด์ง๋ง ๋ชจ๋ ๋ฑ๋ก์ด ๊ท์ฐฎ๋ค.

const server = http.createServer();
server.listen(8888, () => {
    console.log("http://localhost:8888 SCOTT CRUD๋ฅผ ์ ๊ณตํ๋ ์๋ฒ")
});
const mysqlConInfo = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mysql123",
    database: "scott"
}
const createPool = mysql.createPool(mysqlConInfo);//์๋ฒ ์ ์์ ๊ณ์ ์ ์ง (์ต์์ ์ค์๋ ์๋ค npm์ฐธ๊ณ )
const pool = createPool.promise(); //ํ๋ผ๋ฏธ์ค ๊ฐ์ฒด๋ฅผ ์ฌ์ฉํ  ์ ์๋ค.

function postDataPromise(request){
    let postQuery="";
    return new Promise((resolve,reject)=>{
        request.on("data",(param)=>{
            postQuery+=param;
        });
        request.on("end",()=>{
            resolve(postQuery);
        })
    });
}
server.on("request", async (req, res) => {
    const urlObj = url.parse(req.url);
    const params = querystring.parse(urlObj.query);
    const urlSplits = urlObj.pathname.split("/");

    if (urlSplits[1] === "public") {//์ ์ ๋ฆฌ์์ค
        if (urlSplits[2] === "js") {
            res.setHeader("content-type", "application/javascript");
        } else if (urlSplits[2] === "css") {
            res.setHeader("content-type", "text/css");
        } else if (urlSplits[2] === "image") {
            res.setHeader("content-type", "image/jpeg");
        }
        try {
            //fs : ์๋ฒ๊ฐ ์คํ๋๊ณ  ์๋ ์ปดํจํฐ๋ฅผ ๊ธฐ์ค์ผ๋ก ํ์ผ์ ๊ฒ์
            //"์ ๋๊ฒฝ๋ก / " : ์ปดํจํฐ์ root ๊ฒฝ๋ก(c๋๋ผ์ด๋ฒ,D๋๋ผ์ด๋ฒ) ๋ฅผ ๊ธฐ์ค์ผ๋ก ํ์ผ์ ๊ฒ์
            //"์๋๊ฒฝ๋ก . ๋๋ ./" : ์๋ฒ๊ฐ ์คํ๋๊ณ  ์๋ ์์น๋ฅผ ๊ธฐ์ค์ผ๋ก ํ์ผ์ ๊ฒ์
            let data = await fs.readFile("." + urlObj.pathname);
            res.write(data);
            res.end()
        } catch (e) {//์ฃผ์๊ฐ ์๋ชป ๋์์ ๋, ๋ฆฌ์์ค ์์ฒญ์ ์๋ชปํ ๊ฒ
            res.statusCode = 404;
            res.end();
        }
    } else {//๋์  ๋ฆฌ์์ค
        if (urlObj.pathname === "/") {
            let html = pug.renderFile("./templates/index.pug");
            res.write(html);
            res.end();
        } else if (urlObj.pathname === "/empList.do") {
            try {
                //๐ const conn = await mysql2.createConnection(mysqlConnInfo);
                //   ๋งค๋ฒํด์ผํ๋ ์ด๊ณผ์ ์ด connection pool ๋ก ์๋ต๊ฐ๋ฅํด์ง
                const [rows, f] = await pool.query("SELECT * FROM EMP");
                let html = pug.renderFile("./templates/empList.pug", {empList: rows});//๐
                res.write(html);//๐
                //res.write(JSON.stringify(rows));// write ๋ ๋ฌธ์์ด๋ง ์ถ๋ ฅ๊ฐ๋ฅ
                res.end()
            } catch (e) {
                console.error(e);
            }
        } else if (urlObj.pathname === "/empDetail.do") {
            let empno = Number(params.empno); //undefined ๋๋ ์) 7786์->NaN
            //๋ง์ฝ์ empno๊ฐ ์์ผ๋ฉด ์ด ํ์ด์ง๋ ๋์ํ  ์ ์๋ค.
            // ์ด๋ 400 ์๋ฌ๊ฐ ๋ธ -> ์์ฒญํ  ๋ ๊ผญ ํ์ํ ํ๋ผ๋ฏธํฐ๋ฅผ ๋ณด๋ด์ง ์์๋ค๋ ์๋ฏธ
            if (Number.isNaN(empno)) {
                res.statusCode = 400;
                res.write("<h1>์๋ฌ์ฝ๋ 400 : ํด๋ผ์ด์ธํธ๊ฐ ์ฌ๋ฐ๋ฅธ ์์ฒญ์ ํ์ง์์๋ค." +
                    " ์ฆ, ํด๋น ํ์ด์ง์ ๊ผญ ํ์ํ ํ๋ผ๋ฏธํฐ๋ฅผ ๋ณด๋ด์ง ์์์ต๋๋ค!</h1>");
                res.end();
                return; //์๋ต์ด ์๋ฃ๋์ด๋ ๋ฐ์ ์ฝ๋๊ฐ ์คํ๋  ์๋ ์์ด์ ์ฝ๋ฐฑ์ ์ข๋ฃํจ.// ๊ฐ์ฅ ์ธ์ ํ ํจ์๋ฅผ ์ข๋ฃ.
            }
            let sql = "SELECT * FROM EMP WHERE EMPNO=?"; //preparedStatement : ๋ฌผ์ํ์ ํ๋ผ๋ฏธํฐ๋ฅผ ์ํํ๋ ๊ฒ์ ๋งํ๋ค.(๊ณตํต์ฉ์ด:node,JDBC..)
            const [rows, f] = await pool.query(sql, [empno]);
            // query ์์ preparedStatement ๊ฐ ํฌํจ๋์ด์์ด์ sql,๋ค์ "?" ์ ์์๋๋ก ํด๋น key ๊ฐ์ ์์ฑํ๋ค.[ empno ,job,...]
            // ์ง๊ธ์ ? ๊ฐ ํ๋๊ธฐ ๋๋ฌธ์ [empno] ๋ง ์์ฑ
            let html = pug.renderFile("./templates/empDetail.pug", {emp: rows[0]});//pugํ์ผ์ ๋ฌธ์์ด๋ก ๋ฐํ
            //res.write(JSON.stringify(rows[0]));// ๋ฌด์กฐ๊ฑด SELECT ์ ๊ฒฐ๊ณผ๋ ๋ฐฐ์ด์ด๋ค. ๋ฐ๋ผ์ ๋ฌธ์์ด๋ก ๋ฐ๊ฟ์ค๋ค.
            //JSON.stringify() :: JavaScript ๊ฐ์ JSON ๋ฌธ์์ด๋ก ๋ณํ

            res.write(html);
            res.end();
        }else if(urlObj.pathname==="/empUpdate.do"&&req.method==="GET"){//๐์์ form
            let empno = Number(params.empno);
            if (Number.isNaN(empno)) {
                res.statusCode = 400;
                res.write("<h1>์๋ฌ์ฝ๋ 400 : ํด๋น ํ์ด์ง์ ๊ผญ ํ์ํ ํ๋ผ๋ฏธํฐ๋ฅผ ๋ณด๋ด์ง ์์์ต๋๋ค!</h1>");
                res.end();
                return;
            }
            let sql = "SELECT * FROM EMP WHERE EMPNO=?";
            const [rows, f] = await pool.query(sql, [empno]);
            let html=pug.renderFile("./templates/empUpdate.pug",{emp:rows[0]});
            res.write(html);
            function empnoCheck(){

            }
            res.end();
        } else if(urlObj.pathname==="/empUpdate.do"&&req.method==="POST"){//๋ฐ์ดํฐ๋ฅผ ์์ ํ๋ ๋์ ๋ฆฌ์์ค-> '์ก์ํ์ด์ง' ๋ผ ๋ถ๋ฅธ๋ค.//๐์์ action
            //dml ์ ์คํํ ๋๋ ์ค๋ฅ๊ฐ ์ข์ข ๋ฐ์ํ๊ธฐ ๋๋ฌธ์ ๊ผญ ์์ธ์ฒ๋ฆฌ๋ฅผ ํ์ธ์.
            //querystring ์ url ์ ์ค๋ ํ๋ผ๋ฏธํฐ๋ง ๊ฐ์ฒด๋ก ํ์ฑ์ค
            //post ๋ฐฉ์์ ํ๋ผ๋ฏธํฐ๋ก ๋ณด๋ด์ง ์๊ธฐ ๋๋ฌธ์
            //post ๋ก ์ค๋ ํ๋ผ๋ฏธํฐ๋ ์์ฒญ Header ์ ๋ณธ๋ฌธ์ ํด์ํด์ ๋ฐ์์์ผํ๋ค.
            let postquery="";
            let update=0; // 0์ด๋ฉด ์คํจ, 1์ด๋ฉด ์ฑ๊ณต
            req.on("data",(param)=>{
                postquery+=param;//์ฟผ๋ฆฌ์คํธ๋ง์ด ๋ค์ด๊ฐ.
            });//์์ฒญํด๋์ ๋ฌธ์๋ฅผ ์ฝ๋ ์ด๋ฒคํธ(post ๋ก ๋๊ธด querystring ๋ถ๋ฌ์ค๊ธฐ)
            req.on("end",async ()=>{// ์์ฒญํด๋์ ๋ฌธ์๋ฅผ ๋ชจ๋ ๋ค ์ฝ์์ ๋ ์ข๋ฃ.(๋น๋๊ธฐ์ฝ๋๊ธฐ๋๋ฌธ์ ์ข๋ฃํด์ฃผ๊ธฐ)
                //์์ฒญํค๋์ ๋ฌธ์๋ฅผ ๋ชจ๋ ๋ค ์ฝ์ผ๋ฉด ๋ฐ์ํ๋ ์ด๋ฒคํธ
                const postPs=querystring.parse(postquery);//postPs:postParams
                console.log(postquery);//์ ๋ค์ด์๋์ง ์ฒดํฌ
                try{
                    let sql=`UPDATE EMP SET 
                                ENAME=?,SAL=?,COMM=?,
                                JOB=?,MGR=?,DEPTNO=?,HIREDATE=? 
                                WHERE EMPNO=?`;
                    const[result]=await pool.execute(sql,[
                        postPs.ename,
                        (!postPs.sal.trim())?null:Number(postPs.sal),
                        (!postPs.comm.trim())?null:Number(postPs.comm),
                        postPs.job,
                        (!postPs.mgr.trim())?null:Number(postPs.mgr),
                        (!postPs.deptno.trim())?null:Number(postPs.deptno),
                        postPs.hiredate,
                        Number(postPs.empno)]);//execute ;์คํํ๋ค: DML(๋ฐ์ดํฐ ์กฐ์์ด)ํ  ๋ ์ฌ์ฉ
                    update=result.affectedRows;//changedRows ๋ฅผ ์จ๋ ๋๋ค.
                   // console.log(result);//affectedRows ์ฒดํฌ
                }catch (e) {
                    console.error(e);
                }
                //์ค๋ฅ์์ด ์ ์คํ๋๊ณ  update ๋ ์ ๋๋ฉด update=1
                if(update>0){
                    res.writeHead(302,{location:"/empDetail.do?empno="+postPs.empno});//res.writeHead(302,{location: ์ฃผ์(ํ๋ผ๋ฏธํฐ๊ผญ)});์๋ตํด๋๋ฅผ ์ ์
                    //๐ 302: redirect ์ด ํ์ด์ง๊ฐ ์๋ตํ์ง ์๊ณ  ๋ค๋ฅธ ํ์ด์ง๊ฐ ์๋ตํ๋๋ก ์๋ฒ ๋ด๋ถ์์ ์์ฒญ
                    res.end();
                }else{
                    res.writeHead(302,{location:"/empUpdate.do?empno="+postPs.empno});
                    res.end();
                }
            });

        }else if(urlObj.pathname==="/empInsert.do"&&req.method==="GET"){//๐๋ฑ๋ก form
            let html=pug.renderFile("./templates/empInsert.pug");
            res.write(html);
            res.end();
        }else if(urlObj.pathname==="/empnoCheck.do"){//๐๐๐๐๐๐๐๐AJAX/////////////////////////////////////////
            //empno๊ฐ ๋์ผํ ์ฌ์์ด ์์ผ๋ฉด true, ์์ผ๋ฉด false;
            if(!params.empno||isNaN(params.empno)){//empno๊ฐ null ๋๋ undefined ๋๋ "" -> boolean ์์๋ ๋ชจ๋ false ๋ก ๋ฐํ
                                                    // ("0"๋ false ์ง๋ง ์ฌ๊ธฐ์์  0์ด์์ ์๋ฅผ ๋ค๋ฃจ๊ธฐ ๋๋ฌธ์ ์กฐ๊ฑด์์ ์ ์ธ)
                res.statusCode=400; //ํด๋น ๋์ ํ์ด์ง์ ์์ฒญ์ ์๋ชปํ๋ค. (๊ผญ ํ์ํ ํ๋ผ๋ฏธํฐ๊ฐ ์๋ค)
                res.end(); return;
            }
            let empno=parseInt(params.empno);
            const resObj={CheckId:false,emp:null};//Object๋ฅผ ๋ฌธ์์ด๋ก ์๋ตํ๋ ๊ฒ์ JSON์ด๋ผ ๋ถ๋ฅธ๋ค.
            let sql="SELECT * FROM EMP WHERE EMPNO=?";
            try{
                const [rows,f]=await pool.query(sql,[empno]);
                if(rows.length>0){
                    resObj.checkId=true;
                    resObj.emp=rows[0];
                }
            }catch (e) {
                console.error(e);
                res.statusCode=500; //์๋ฒ์์ ๋ฐ์ํ๋ ์ค๋ฅ
                res.end(); return;
            }
            res.setHeader("content-type","application/json;charset=UTF-8;");//์๋ตํ๋ ๋ฌธ์ ํ์
            res.write(JSON.stringify(resObj));
            res.end();
        }
        else if(urlObj.pathname==="/deptnoCheck.do"){//๐๐๐๐๐๐๐๐AJAX/////////////////////////////////////////
           if(!params.deptno||isNaN(params.deptno)){
                res.statusCode=400;
                res.end(); return;
            }
            let deptno=parseInt(params.deptno);
            const resObj={CheckId:false,emp:null};//Object๋ฅผ ๋ฌธ์์ด๋ก ์๋ตํ๋ ๊ฒ์ JSON์ด๋ผ ๋ถ๋ฅธ๋ค.
            let sql="SELECT * FROM EMP WHERE DEPTNO=?";
            try{
                const [rows,f]=await pool.query(sql,[deptno]);
                if(rows.length>0){
                    resObj.checkId=true;
                    resObj.emp=rows[0];
                }
            }catch (e) {
                console.error(e);
                res.statusCode=500; //์๋ฒ์์ ๋ฐ์ํ๋ ์ค๋ฅ
                res.end(); return;
            }
            res.setHeader("content-type","application/json;charset=UTF-8;");//์๋ตํ๋ ๋ฌธ์ ํ์
            res.write(JSON.stringify(resObj));
            res.end();
        }
        else if(urlObj.pathname==="/empInsert.do"&&req.method==="POST"){//๐๋ฑ๋ก action
            let postQuery=""
            req.on("data",(p)=>{
                postQuery+=p;
            });
            req.on("end",async ()=>{
                const postPs=querystring.parse(postQuery);
                for(let key in postPs){//input value=""-> null ๊ฐ์ ๊ธฐ๋ํ์ง๋ง ๋ฌธ์์ด ๊ณต๋ฐฑ์ด ์จ๋ค.(mgr,deptno,comm=>null)
                    if(postPs[key].trim()==="") postPs[key]=null;
                    //trim() ๋ฉ์๋๋ ๋ฌธ์์ด ์ ๋์ ๊ณต๋ฐฑ์ ์ ๊ฑฐํ๊ณ  ์๋ณธ ๋ฌธ์์ด์ ์์ ํ์ง ์๊ณ  ์๋ก์ด ๋ฌธ์์ด์ ๋ฐํํฉ๋๋ค.
                    //๋ณธ๋ Line170์์ ํด์ผํจ.
                }
                let sql=`INSERT INTO EMP(EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO) 
                                    VALUE(?,?,?,?,?,?,?,?)`;
                let insert=0;
                try{
                    const [result]=await pool.execute(sql,[postPs.empno,postPs.ename,postPs.job,postPs.mgr,postPs.hiredate,postPs.sal,postPs.comm,postPs.deptno]);
                    insert=result.affectedRows;
                }catch (e) {
                    console.error(e);
                }
                if(insert>0){
                    res.writeHead(302,{location:"/empList.do"});
                    res.end();
                }else{
                    res.writeHead(302,{location:"/empInsert.do"});
                    res.end();
                }
            })
        }else if(urlObj.pathname==="/empDelete.do"){//๐ ์ญ์  action page
            //์ฑ๊ณตํ๋ฉด๋ฆฌ์คํธ ์คํจํ๋ฉด ์์ ํผ
            try{
                let empno=Number(params.empno);
                let sql="DELETE FROM EMP WHERE EMPNO=?";
                let del =0;//delete ๋ ํ๋๋ฅผ ์ญ์ ํ๋ ์ฐ์ฐ์ ์์ฝ์ด๋ผ ๋ณ์๋ก ์ฌ์ฉํ  ์ ์๋ค.
                try {
                    const [result]=await pool.execute(sql,[empno]);
                    del=result.affectedRows;
                }catch (e) {
                    console.error(e)
                }

                if(del>0){
                    res.writeHead(302,{location:"/empList.do"});
                    res.end();
                }else{
                    res.writeHead(302,{location:"/empUpdate.do?empno="+params.empno});
                    res.end();
                }

            }catch (e) {
                console.error(e);
                res.write("<h1>์กด์ฌํ์ง ์๋ ํ์ด์ง ์๋๋ค. 404 ๐</h1>");
                res.end();
            }
        }else if (urlObj.pathname==="/deptList.do"){
            try {
                const [rows, f] = await pool.query("SELECT * FROM DEPT");
                let html = pug.renderFile("./templates/deptList.pug", {deptList:rows});
                res.write(html);
                res.end();
            } catch (e) {
                console.error(e);
                res.end();
            }
        }else if(urlObj.pathname==="/deptDetail.do"){
             let deptno=Number(params.deptno);
             if(Number.isNaN(deptno)){
                 res.statusCode=400;
                 res.write("<h1>์๋ฌ์ฝ๋400: ํ์ํ ํ๋ผ๋ฏธํฐ๋ฅผ ๋ณด๋ด์ง ์์</h1>")
                 res.end();
                 return;
             }
             let sql="SELECT * FROM DEPT WHERE DEPTNO=?";
             const[rows,f]=await pool.query(sql,[deptno]);
             let html=pug.renderFile("./templates/deptDetail.pug",{dept:rows[0]});
             res.write(html);
             res.end();
        }else if(urlObj.pathname==="/deptInsert.do"&&req.method==="GET"){
            let html=pug.renderFile("./templates/deptInsert.pug");
            res.write(html);
            res.end();
        }else if(urlObj.pathname==="/deptInsert.do"&&req.method==="POST"){
            let postQuery="";
            req.on("data",(p)=>{
                postQuery+=p;
            });
            req.on("end",async ()=>{
                const postPs=querystring.parse(postQuery);
                for(let key in postPs){
                    if(postPs[key].trim()==="") postPs[key]=null;
                }
                let sql=`INSERT INTO DEPT(DEPTNO, DNAME, LOC)VALUE(?,?,?)`;
                let insert=0;
                try{
                    const [result]=await pool.execute(sql,[postPs.deptno,postPs.dname,postPs.loc]);
                    insert=result.affectedRows;
                }catch (e) {
                    console.error(e);
                }
                if(insert>0){
                    res.writeHead(302,{location:"/deptList.do"});
                    res.end();
                }else{
                    res.writeHead(302,{location:"/deptInsert.do"});
                    res.end();
                }
            })
        }else if(urlObj.pathname==="/deptUpdate.do"&&req.method==="GET"){
            let deptno=Number(params.deptno);
            if(Number.isNaN(deptno)){
                res.statusCode=400;
                res.write("<h1>์๋ฌ์ฝ๋ 400: ํด๋นํ์ด์ง์ ๊ผญ ํ์ํ ํ๋ผ๋ฏธํฐ๋ฅผ ๋ณด๋ด์ง ์์์ต๋๋ค.!</h1>");
                res.end();
                return;
            }
            let sql="SELECT * FROM DEPT WHERE DEPTNO=?";
            const [rows,f]=await pool.query(sql,[deptno]);
            let html=pug.renderFile("./templates/deptUpdate.pug",{dept:rows[0]});
            res.write(html);
            res.end();
        }else if(urlObj.pathname==="/deptUpdate.do"&&req.method==="POST"){
            let postquery="";
            let update=0;
            req.on("data",(p)=>{
                postquery+=p;
            });
            req.on("end",async ()=>{
                const postPs=querystring.parse(postquery);
                try{
                    let sql=`UPDATE DEPT SET DNAME=?,LOC=? WHERE DEPTNO=?`;
                    const[result] = await pool.execute(sql,[postPs.dname,postPs.loc,postPs.deptno]);
                    update=result.affectedRows;
                }catch (e) {
                    console.error(e);
                }
                if(update>0){
                    res.writeHead(302,{location:"/deptDetail.do?deptno="+postPs.deptno});
                    res.end();
                }else{
                    res.writeHead(302,{location:"/deptUpdate.do?deptno="+postPs.deptno});
                    res.end();
                }
            });
        }else if(urlObj.pathname==="/deptDelete.do"){
            try{
                let deptno = Number(params.deptno)
                let sql="DELETE FROM DEPT WHERE DEPTNO=?";
                let del=0;
                try{
                    const [result] = await pool.execute(sql,[deptno]);
                    del=result.affectedRows;
                }catch (e) {
                    console.error(e);
                }
                if(del>0){
                    res.writeHead(302,{location:"/deptList.do"});
                    res.end();
                }else{
                    res.writeHead(302,{location:"/deptUpdate.do?deptno="+params.deptno});
                    res.end();
                }
            }catch (e) {
                console.error(e);
                res.write("<h1>์๋ฌ์ฝ๋ 400: ์กด์ฌํ์ง ์๋ ํ์ด์ง ์๋๋ค.</h1>");
                res.end();
            }
        }else {
            res.statusCode = 404;
            res.setHeader("content-type", "text/html;charset=UTF-8");
            res.write("<h1>์กด์ฌํ์ง ์๋ ํ์ด์ง ์๋๋ค. 404 ๐</h1>");
            res.end();
        }
    }
});

//๐
// ์น์ฑ์๋ฒ๋ฅผ ๋ฐฐ์ฐ๋ฉด, ๋ค๋ฅธ ์น์ฑ์๋ฒ๋ฅผ ์ฌ์ฉ๋ฒ๋ง ์ตํ๋ฉด ๋ฐ๋ก ํ  ์ ์๋๋ก ํ๋๊ฒ ๋ชฉํ
// ์น์ฑ ์๋ฒ์ ์๋ฆฌ๋ฅผ ์๋ฉด ๋ค๋ฅธ ์น์ฑ ์๋ฒ ๊ณต๋ถ๊ฐ ์ฌ๋ฐ๋..3_3).. ๋ธ๋ JS๋ ์์์ ์ธ ์น์ฑ์๋ฒ, ์๋์ผ๋ก ํด์ฃผ๋ ๊ฒ์ด ์๋ค.
// ์์ฆ ๋์ค๋ ์น์ฑ์๋ฒ๋ ๋ค ์๋์ผ๋ก ํ๋ค!! nodejs ๋ฅผ ๋ชปํ๋ค๊ณ  ํด์ ๊ฐ๋ฐ์๊ฐ ์๋๋๊ฑด ์๋์ง๋ง ์ด๊ฑธ ์ํ๋ฉด ๋ค๋ฅธ๊ฑธ ๋ฐฐ์ฐ๋๊ฒ ์ฝ๋ค:)



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
    const err404 = function (){
        res.setHeader("content-type","text/html;charset=UTF-8");
        res.statusCode=404;
        res.write("<h1>존재하지 않는 페이지 입니다. 404 😂</h1>");
        res.end();
    }
    const err400 = function (){
        res.setHeader("content-type","text/html;charset=UTF-8");
        res.statusCode=400;
        res.write("<h1>에러코드 400: 해당페이지에 꼭 필요한 파라미터를 보내지 않았습니다.! 😂</h1>");
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
            err404();
        }
    }else{
        if(urlObj.pathname==="/"){
            let html=pug.renderFile("./view/index.pug")
            res.write(html);
            res.end();
        } else if(urlObj.pathname==="/deptList.do"){
            try{
                const[rows,f]=await pool.query("SELECT * FROM DEPT");
                let html=pug.renderFile("./view/deptList.pug",{deptList:rows})
                res.write(html);
                res.end();
            }catch (e) {
                console.error(e);
                err400();
            }
        }else if(urlObj.pathname==="/deptDetail.do"){
            let deptno=Number(params.deptno);
            if(Number.isNaN(deptno)){
                err404();
                //return; 애매해짐..
            }
            let sql="SELECT * FROM DEPT WHERE DEPTNO=?";
            const [rows,f]=await pool.query(sql,[deptno]);
            let html=pug.renderFile("./view/deptDetail.pug",{dept:rows[0]});
            res.write(html);
            res.end();
        }else if(urlObj.pathname==="/deptInsert.do"&&req.method==="GET"){
            let html=pug.renderFile("./view/deptInsert.pug");
            res.write(html);
            res.end();
        }else if(urlObj.pathname==="/deptInsert.do"&&req.method==="POST"){
            let postQuery="";
            req.on("data",(param)=>{
                postQuery+=param;
            });
            req.on("end",async ()=>{
                const postPs=querystring.parse(postQuery);
                for(let key in postPs){
                    if(postPs[key].trim()==="") postPs[key]=null;
                }
                let sql=`INSERT INTO DEPT(DEPTNO,DNAME,LOC) VALUE(?,?,?)`;
                let insert=0;
                try{
                    const [result]=await pool.execute(sql,[postPs.deptno,postPs.dname,postPs.loc]);
                    insert=result.affectedRows;
                }catch (e) {
                    console.error(e);//등록이 실패했을때, 어느에러인지 체크
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
                err400();
            }
            let sql="SELECT * FROM DEPT WHERE DEPTNO=?";
            const[rows,f]=await pool.query(sql,[deptno]);
            let html=pug.renderFile("./view/deptUpdate.pug",{dept:rows[0]});
            res.write(html);
            res.end();
        }else if(urlObj.pathname==="/deptUpdate.do"&&req.method==="POST"){
            let postQuery="";
            let update=0;
            req.on("data",(param)=>{
                postQuery+=param;
            });
            req.on("end",async ()=>{
                const postPs=querystring.parse(postQuery);
                try{
                    let sql=`UPDATE DEPT SET DNAME=?,LOC=? WHERE DEPTNO=?`;
                    const[result]=await pool.execute(sql,[postPs.dname,postPs.loc,postPs.deptno]);
                    update=result.affectedRows;
                }catch (e) {
                    console.error(e);
                    //무슨에러인지 보자.
                }
                if(update>0){
                    res.writeHead(302,{location:"/deptDetail.do?deptno="+postPs.deptno});
                    res.end();
                }else {
                    res.writeHead(302,{location:"/deptUpdate.do?deptno="+postPs.deptno});
                    res.end();
                }
            });
        }else if(urlObj.pathname==="/deptDelete.do"){
            try{
                let deptno=Number(params.deptno);
                let sql="DELETE FROM DEPT WHERE DEPTNO=?";
                let del=0;
                try{
                    const [result]=await pool.execute(sql,[deptno]);
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
                err400();
            }
        }
        else{
            err404();
        }
    }
})
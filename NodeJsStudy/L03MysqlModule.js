
/*// 🍒 node js에서 제공하는 기본모듈
const http=require("http");
const url=require("url");
 */

const http=require("http2");
const url=require("url");
const queryStr = require("querystring");
const mysql=require("mysql");
const mysqlConnInfo = {
    host:"localhost",
    port:3306,
    database:"SCOTT",
    user:"root",
    password:"mysql123",
}

http.createServer((req, resp)=>{
    resp.setHeader("content-type","text/html;charset=UTF-8");
    console.log(req.url);
    const urlObj=url.parse(req.url);
    console.log(urlObj);
    if(urlObj.pathname=="/"){
        resp.write("<h1>url모듈과 mysql 사용해보기</h1>");
        resp.write(`<p>
                        <a href="power.do?a=3&b=6">
                        파라미터 a,b 로 거듭제곱한 결과물을 반환하는 동적페이지
                        </a>
                   </p>`);
        resp.write(`<p>
                    <a href="deptList.do?a=3&b=6">
                        부서리스트
                    </a>
                  </p>`);
        resp.end();
    }else if(urlObj.pathname=="/power.do"){
       const params= queryStr.parse(urlObj.query);//{ a: '3', b: '6' }
        console.log(params);
        resp.write("<h1>a, b 파라미터를 거듭제곱하는 동적 페이지(내용)</h1>");
        resp.write(`<h2>${params.a}의 거듭제곱 ${params.b} = ${Math.pow(params.a,params.b)}</h2>`);
                        //문자열이지만 자동형변환 해준다~
        resp.end();

    }else if(urlObj.pathname=="/deptList.do"){
        resp.write("<h1>부서리스트 동적페이지(mysql 모듈사용)</h1>");
        try{
            const conn=mysql.createConnection(mysqlConnInfo);
            console.log(conn);
            conn.query("SELECT * FROM DEPT",(err,rows,fields)=>{
                console.log(rows);//이미데이터가 object로 파싱되어있다.
                let html=`<table><tr><th>번호</th><th>이름</th><th>위치</th></tr>`;
                rows.forEach((row)=>{
                    html+=`<tr>
                        <td>${row.DEPTNO}</td>
                        <td>${row.DNAME}</td>
                        <td>${row.LOC}</td>
                        </tr>`;
                })
                html+=`</table>`;
                resp.write(html);
                resp.end();
        }); //.query( 실행할쿼리,쿼리가실행되어 값이 반환되면 실행되는 콜백함수(==onload) )
        }catch (e){
            console.error(e);
        }
    }else{
        resp.write("<h1>404 없는 주소 입니다 ㅠㅠ</h1>");
        resp.end();
    }
}).listen(7070);
//📁 CRUD Create Read Update Delete
//  유저에게 db를 제어할 수 있는 인터페이스 (모델,서비스라고도 부른다.)
//  🤔 유저가 직접 db에 접속하여 데이터를 조작하면 안되는걸까? [ㅇㅇ안됨😎]
//      >> 1.데이터를 조작의 인터페이스를 제한할 수 없다.(부분권한설정 불가->보안)
//      >> 2.불필요한 정보가 많아서 유저가 이용의 어려움을 겪는다.(서비스)
//      >> 3.조작하려면 유저가 sql 을 배워야한다 'V')...ㅋ

//👉 create,alter,drop :
//      table 을 생성하거나 구조를 바꾸거나 삭제하는 명령어(DDL)
//👉 update,delete,insert(DML),select(DQL)
//      table 의 데이터를 추가하거나 삭제 또는 수정 조회하는 명령어

// es6 문법부터 var를 사용하지 않는것을 권장한다. (변수라는게 지역 전역의 구분이 있는데 var 는 그 구분 이 없다)

const http = require("http");
const url = require("url");
const querystring = require("querystring");
const fs = require("fs/promises");
const mysql = require("mysql2");
const pug = require("pug");
const {stringify} = require("nodemon/lib/utils");
//v8 또는 jvm 이 실행될 때 메모리에 등록하는 것 : 백그라운드
//java java.lang*,java.util.* 패키지가 가지고 있는 라이브러리가 많은 편
//nodejs 는 백그라운드에서 가지고 있는 모듈이 적은편이라 빠르지만 모듈 등록이 귀찮다.

const server = http.createServer();
server.listen(8888, () => {
    console.log("http://localhost:8888 SCOTT CRUD를 제공하는 서버")
});
const mysqlConInfo = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mysql123",
    database: "scott"
}
const createPool = mysql.createPool(mysqlConInfo);//서버 접속을 계속 유지 (옵션을 줄수도 있다 npm참고)
const pool = createPool.promise(); //프라미스 객체를 사용할 수 있다.
server.on("request", async (req, res) => {
    const urlObj = url.parse(req.url);
    const params = querystring.parse(urlObj.query);
    const urlSplits = urlObj.pathname.split("/");

    if (urlSplits[1] === "public") {//정적리소스
        if (urlSplits[2] === "js") {
            res.setHeader("content-type", "application/javascript");
        } else if (urlSplits[2] === "css") {
            res.setHeader("content-type", "text/css");
        } else if (urlSplits[2] === "image") {
            res.setHeader("content-type", "image/jpeg");
        }
        try {
            //fs : 서버가 실행되고 있는 컴퓨터를 기준으로 파일을 검색
            //"절대경로 / " : 컴퓨터의 root 경로(c드라이버,D드라이버) 를 기준으로 파일을 검색
            //"상대경로 . 또는 ./" : 서버가 실행되고 있는 위치를 기준으로 파일을 검색
            let data = await fs.readFile("." + urlObj.pathname);
            res.write(data);
            res.end()
        } catch (e) {//주소가 잘못 되었을 때, 리소스 요청을 잘못한 것
            res.statusCode = 404;
            res.end();
        }
    } else {//동적 리소스
        if (urlObj.pathname === "/") {
            let html = pug.renderFile("./templates/index.pug");
            res.write(html);
            res.end();
        } else if (urlObj.pathname === "/empList.do") {
            try {
                //📗 const conn = await mysql2.createConnection(mysqlConnInfo);
                //   매번해야했던 이과정이 connection pool 로 생략가능해짐
                const [rows, f] = await pool.query("SELECT * FROM EMP");
                let html = pug.renderFile("./templates/empList.pug", {empList: rows});//🍓
                res.write(html);//🍓
                //res.write(JSON.stringify(rows));// write 는 문자열만 출력가능
                res.end()
            } catch (e) {
                console.error(e);
            }
        } else if (urlObj.pathname === "/empDetail.do") {
            let empno = Number(params.empno); //undefined 또는 예) 7786아->NaN
            //만약에 empno가 없으면 이 페이지는 동작할 수 없다.
            // 이때 400 에러가 뜸 -> 요청할 때 꼭 필요한 파라미터를 보내지 않았다는 의미
            if (Number.isNaN(empno)) {
                res.statusCode = 400;
                res.write("<h1>에러코드 400 : 클라이언트가 올바른 요청을 하지않았다." +
                    " 즉, 해당 페이지에 꼭 필요한 파라미터를 보내지 않았습니다!</h1>");
                res.end();
                return; //응답이 완료되어도 밑의 코드가 실행될 수도 있어서 콜백을 종료함.// 가장 인접한 함수를 종료.
            }
            let sql = "SELECT * FROM EMP WHERE EMPNO=?"; //preparedStatement : 물음표에 파라미터를 셋팅하는 것을 말한다.(공통용어:node,JDBC..)
            const [rows, f] = await pool.query(sql, [empno]);
            // query 안에 preparedStatement 가 포함되어있어서 sql,뒤에 "?" 의 순서대로 해당 key 값을 작성한다.[ empno ,job,...]
            // 지금은 ? 가 하나기 떄문에 [empno] 만 작성
            let html = pug.renderFile("./templates/empDetail.pug", {emp: rows[0]});//pug파일을 문자열로 반환
            //res.write(JSON.stringify(rows[0]));// 무조건 SELECT 의 결과는 배열이다. 따라서 문자열로 바꿔준다.
            //JSON.stringify() :: JavaScript 값을 JSON 문자열로 변환

            res.write(html);
            res.end();
        }else if(urlObj.pathname==="/empUpdate.do"&&req.method==="GET"){//🍒수정form
            let empno = Number(params.empno);
            if (Number.isNaN(empno)) {
                res.statusCode = 400;
                res.write("<h1>에러코드 400 : 해당 페이지에 꼭 필요한 파라미터를 보내지 않았습니다!</h1>");
                res.end();
                return;
            }
            let sql = "SELECT * FROM EMP WHERE EMPNO=?";
            const [rows, f] = await pool.query(sql, [empno]);
            let html=pug.renderFile("./templates/empUpdate.pug",{emp:rows[0]});
            res.write(html);
            res.end();
        } else if(urlObj.pathname==="/empUpdate.do"&&req.method==="POST"){//데이터를 수정하는 동적리소스-> '액션페이지' 라 부른다.//🍒수정action
            //dml 을 실행할때는 오류가 종종 발생하기 때문에 꼭 예외처리를 하세요.
            //querystring 은 url 에 오는 파라미터만 객체로 파싱중
            //post 방식은 파라미터로 보내지 않기 때문에
            //post 로 오는 파라미터는 요청 Header 의 본문을 해석해서 받아와야한다.
            let postquery="";
            let update=0; // 0이면 실패, 1이면 성공
            req.on("data",(param)=>{
                postquery+=param;//쿼리스트링이 들어감.
            });//요청해더의 문서를 읽는 이벤트(post 로 넘긴 querystring 불러오기)
            req.on("end",async ()=>{// 요청해더의 문서를 모두 다 읽었을 때 종료.(비동기코드기때문에 종료해주기)
                //요청헤더의 문서를 모두 다 읽으면 발생하는 이벤트
                const postPs=querystring.parse(postquery);//postPs:postParams
                console.log(postquery);//잘 들어왔는지 체크
                try{
                    let sql=`UPDATE EMP SET 
                                ENAME=?,SAL=?,COMM=?,
                                JOB=?,MGR=?,DEPTNO=? 
                                WHERE EMPNO=?`;
                    const[result]=await pool.execute(sql,[postPs.ename,postPs.sal,postPs.comm,postPs.job,postPs.mgr,postPs.deptno,postPs.empno]);//execute ;실행하다: DML(데이터 조작어)할 때 사용
                        update=result.affectedRows;//changedRows 를 써도 된다.
                        console.log(result);//affectedRows 체크
                }catch (e) {
                    console.error(e);
                }
                //오류없이 잘 실행되고 update 도 잘 되면 update=1
                if(update>0){
                    res.writeHead(302,{location:"/empDetail.do?empno="+postPs.empno});//res.writeHead(302,{location: 주소(파라미터꼭)});응답해더를 정의
                    //👉 302: redirect 이 페이지가 응답하지 않고 다른 페이지가 응답하도록 서버 내부에서 요청
                    res.end();
                }else{
                    res.writeHead(302,{location:"/empUpdate.do?empno="+postPs.empno});
                    res.end();
                }
            });

        }else if(urlObj.pathname==="/empInsert.do"&&req.method==="GET"){//🍒등록 form
            let html=pug.renderFile("./templates/empInsert.pug");
            res.write(html);
            res.end();
        }else if(urlObj.pathname==="/empInsert.do"&&req.method==="POST"){//🍒등록 action
            let postQuery=""
            req.on("data",(p)=>{
                postQuery+=p;
            });
            req.on("end",async ()=>{
                const postPs=querystring.parse(postQuery);
                for(let key in postPs){//input value=""-> null 값을 기대하지만 문자열 공백이 온다.(mgr,deptno,comm=>null)
                    if(postPs[key].trim()==="") postPs[key]=null;
                    //trim() 메서드는 문자열 양 끝의 공백을 제거하고 원본 문자열을 수정하지 않고 새로운 문자열을 반환합니다.
                    //본래 Line170에서 해야함.
                }
                let sql=`INSERT INTO EMP(EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO) 
                                    VALUE(?,?,?,?,NOW(),?,?,?)`;
                let insert=0;
                try{
                    const [result]=await pool.execute(sql,[postPs.empno,postPs.ename,postPs.job,postPs.mgr,postPs.sal,postPs.comm,postPs.deptno]);
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
        }else if(urlObj.pathname==="/empDelete.do"){//🍒 삭제 action page
            //성공하면리스트 실패하면 수정폼
            try{
                let empno=Number(params.empno);
                let sql="DELETE FROM EMP WHERE EMPNO=?";
                let del =0;//delete는 필드를 삭제하는 연산자 예약어라 변수로 사용할 수 없다.
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
                res.write("<h1>존재하지 않는 페이지 입니다. 404 😂</h1>");
                res.end();
            }
        }
        else {
            res.statusCode = 404;
            res.setHeader("content-type", "text/html;charset=UTF-8");
            res.write("<h1>존재하지 않는 페이지 입니다. 404 😂</h1>");
            res.end();
        }
    }
});

//🍓
// 웹앱서버를 배우면, 다른 웹앱서버를 사용법만 익히면 바로 할 수 있도록 하는게 목표
// 웹앱 서버의 원리를 알면 다른 웹앱 서버 공부가 재밌대..3_3).. 노드 JS는 원시적인 웹앱서버, 자동으로 해주는 것이 없다.
// 요즘 나오는 웹앱서버는 다 자동으로 한다!! nodejs 를 못한다고 해서 개발자가 안되는건 아니지만 이걸 잘하면 다른걸 배우는게 쉽다:)



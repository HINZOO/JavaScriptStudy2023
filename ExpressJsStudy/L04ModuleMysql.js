//NODE 모듈 (다른js에서는 export import 를 쓴다)
//외부에서 모듈을 가져오는 방법을 배워보자
// 본래 아래처럼 코드를 작성해야 하지만 mysqlScottPool.js 처럼 외부파일을 만든 뒤 불러올 수 있다!!

//이전엔 이렇게 했다 🔽
/*const mysql=require("mysql2");
const scottConnInfo={
    user:"root",
    password:"mysql123",
    host:"localhost",
    port:3306,
    database:"scott"
}
const pool=mysql.createPool(scottConnInfo);
const poolPromise= pool.promise();
(async ()=>{
    const [rows, f] = await poolPromise.query("SELECT * FROM EMP");
    console.log(rows);
})();*/


//////외부에서 모듈 불러오기.//////////////////////////////////////////////////////////////////////////
const scott=require("./mysqlScottPool");
//(async ()=>{내용 })();//함수를 생성하자마자 실행 (await를 쓰기 위해 작성했다..)
(async ()=>{
    const [rows,f]=await scott.query("SELECT * FROM DEPT");
    console.log(rows);
})();

const mysql=require('mysql2');//pool을 쓰려면 promise를 제외해야한다.
const scottConnInfo={
    user:"root",
    password:"mysql123",
    host:"localhost",
    port:3306,
    database:"scott"
}
const pool=mysql.createPool(scottConnInfo);
const poolPromise=pool.promise();

//console.log(pool); //실행되는지 체크 (마우스오른쪽클릭실행)
module.exports=poolPromise; // 모듈로 반환이됨.

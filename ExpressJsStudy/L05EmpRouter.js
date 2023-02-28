//보통은 Router 폴더를  만들어서 그안에 파일을 넣지만 연습이니까 그냥 여기에 작성했음.

const express=require("express");
const scott=require("./mysqlScottPool");
const router=express.Router();

router.get("/list.do",async (req, res)=>{
    const[rows,f]= await scott.query("SELECT * FROM EMP");
    res.render("empList",{empList:rows});
});
router.get("/insert.do",(req, res)=>{
    res.render("empInsert");
});

router.post("/insert.do",async (req,res)=>{
    //요청 처리 : 사원 파라미터 처리 후 db의 사원을 등록,
    //이때 db에 사원을 등록하는 행위를 서비스 또는 모델(Model) 이라하고 사원의 파라미터 처리를 하는 과정을 Controller 라고한다.
    //응답 처리 : 등록에 성공하면 성공 페이지(View)를 랜더링해서 응답한다. 또는 (성공페이지로 이동하기도 한다.=>redirect)
    //ModelViewController -> MVC가 다 있으면 model1 이라한다.
    for(let key in req.body) {
        if (!req.body[key]) {
            req.body[key] = null;
            //공백으로 보내는 파라미터 null 처리
        }else{
            if(key==="comm" || key==="sal"){
                req.body[key]=parseFloat(req.body[key]);
            }else if(key==="empno"|| key==="deptno" || key==="mgr"){
                req.body[key]=parseInt(req.body[key]);
            }
            if(Number.isNaN(req.body[key])) {    //🤔NaN 처리법..
                res.status(500).send(`<h1>${key} 이(가) 수가 아닌 값을 입력하셨습니다.</h1>`);
                return;
            }
        }
    }
    let insert=0; //등록 성공여부
    try{
        let sql="INSERT INTO EMP (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO) VALUE(?,?,?,?,?,?,?,?)";
        const [result]=await scott.execute(sql,[req.body.empno,req.body.ename,req.body.job,req.body.mgr,
                        req.body.hiredate,req.body.sal,req.body.comm,req.body.deptno]);
        insert=result.affectedRows;
    } catch (e) {
        console.error(e)
        res.status(500).send(`<h1>DB 등록을 실패했습니다. 다시 시도하세요!</h1>`);
        return;
    }
    if(insert>0){
        res.redirect("/emp/list.do");
    }else{
        res.redirect("/emp/insert.do");
    }
})

router.get("/detail.do",async (req,res)=>{
    if(!req.query.empno) res.sendStatus(400);//만약 파라미터를 보내지 않으면 에러가 뜬다.//Bad Request
        //res.status(400).send("<h1>잘못된 요청 ERROR CODE : 400</h1>")
    const [rows,f]=await scott.query("SELECT * FROM EMP WHERE empno=?",[req.query.empno]);
    //검색된 사원이 없을때 ??
    if(rows.length>0){
        res.render("empDetail",{emp:rows[0]})
    }else{
        //해당 사원(레코드)가 존재하지않습니다.(이미 삭제된 레코드입니다.) 페이지를 반환 또는 사원 리스트로 이동
        res.redirect("./list.do");
    }
});

//===============================================================================================
//REST: Representational State Transfer//참고사이트: https://namu.wiki/w/REST
//REST Api : 웹 서비스요청을 구체화시키기 위한 노력의 일부 (url,메서드 사용)
//pathVariable : RESTFull Api 의 일부로 url 에 파라미터를 포함해서 보내는 방법
//             : 쿼리스트링이 파라미터를 파악하기 어렵고, 해당 파라미터가 리소스에 꼭 필요한 것을 명시하기 위해 등장.
//method 분할: (get,post),put,delete,patch
//express가 파라미터를 path에서 받을 수 있도록 지원.
router.get("/:empno/update.do",async (req, res)=>{
                //:empno사이(=path사이)에 파라미터를 포함해서 보냄//http://localhost:8888/emp/사원번호/update.do
    //empno가 존재하지 않는 페이지는 없는 페이지 이기 떄문에 400에러 설정은 필요없다.
    const[rows,f]= await scott.query("SELECT * FROM EMP WHERE EMPNO=?",[req.params.empno]);
    if(rows.length>0) res.render("empUpdate",{emp:rows[0]});
    else res.redirect("list.do");
});
router.post("/update.do",async(req, res)=>{
   let sql="UPDATE EMP SET ENAME=?,JOB=?,HIREDATE=?,SAL=?,COMM=?,DEPTNO=?,MGR=? WHERE EMPNO=?"
    for(let key in req.body){
        if(!req.body[key]){req.body[key]=null;} //미리 null처리를 다 하는 코드
    }
    const values=
        [   req.body.ename,
            req.body.job,
            req.body.hiredate,
            (req.body.sal)&&parseFloat(req.body.sal),
            (req.body.comm)&&parseFloat(req.body.comm),
            (req.body.deptno)&&parseInt(req.body.deptno),
            (req.body.mgr)&&parseInt(req.body.mgr),//()&&() 모두가 true가 될때까지 실행,만약 false면 멈추고 반환
            parseInt(req.body.empno)
        ];
    let update=0;
    try{
       const [result]= await scott.execute(sql,values);
       update=result.affectedRows; //dml 실행시 성공한 row 수

    }catch(e){
        console.error(e)
    }
    if(update>0){
        res.redirect("./detail.do?empno="+req.body.empno);
    }else{
        res.redirect(`./${req.body.empno}/update.do`);
    }

    //console.log(values)
    //res.send(values); //send가 NaN을 Null 로 변환
    //json 의 value는 NaN과 undefined 가 없다.
});


router.get("/delete.do",async (req, res) => {
    if (!req.query.empno || isNaN(req.query.empno)) {
        res.status(400).send("<h1> 에러코드 400: 잘못된 요청입니다.</h1>")
        return;
    }
    let empno = parseInt(req.query.empno);
    // 요청처리 🔼//응답처리🔽
    let del = 0;
    try {
        let sql = "DELETE FROM EMP WHERE EMPNO=?";
        const [result] = await scott.execute(sql, [empno])
        del = result.affectedRows;
    } catch (e) {
        console.error(e)
    }
    if (del > 0) {
        res.redirect("/emp/list.do");
    } else {
        res.redirect(`/emp/${empno}/update.do`);
    }
})

router.get("/empnoCheck.do",async (req, res)=>{
    if(!req.query.empno||isNaN(req.query.empno)) {
        res.sendStatus(400);
        return;
    }
    let empno=parseInt(req.query.empno);
    const resObj={check:false,emp:null};
    try{
        let sql="SELECT * FROM EMP WHERE EMPNO=?";
        const[rows,f]=await scott.query(sql,[empno]);
        if(rows.length>0){
            resObj.check=true;
            resObj.emp=rows[0]
        }
    }catch (e) {
        console.error(e)
        res.sendStatus(500);
        return;
    }
    res.send(resObj);
})
//=================================================================================================
module.exports=router;
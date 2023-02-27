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
            parseFloat(req.body.sal),
            parseFloat(req.body.comm),
            parseInt(req.body.deptno),
            parseInt(req.body.mgr),
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

//=================================================================================================
module.exports=router;

const empInsertForm=document.forms["empInsertForm"];
empInsertForm.empno.onchange= empnoCheck;
empInsertForm.mgr.onblur= mgrCheck;
empInsertForm.deptno.onblur=deptnoCheck;
empInsertForm.ename.onchange=enameCheck;
empInsertForm.job.onchange=jobCheck;

async function empnoCheck (){
    //AJAX (XMLHttpRequest,fetch)
    let val=empInsertForm.empno.value;
    const parentNode=(empInsertForm.empno.closest(".inputCont"));
    //🍓 사번은 3글자 이상 수만 입력가능(아니면 false)
    if(val.length<2 || isNaN(val)) {
        empnoMsg.innerText = "사번은 3글자 이상의 숫자만 입력가능합니다."
        parentNode.classList.add("error");
        parentNode.classList.remove("success");
        return false;
    }
    let url="/empnoCheck.do?empno="+val;
    const res=await fetch(url); //.then((res)=>{return res.json()})
    if(res.status==200){
        const obj=await res.json(); //.then((obj)=>{...})
        //console.log(obj)
        if(obj.checkId){
            empnoMsg.innerText=obj.emp.ENAME+"님이 사용 중인 사번입니다."
            parentNode.classList.add("error");
            parentNode.classList.remove("success");

        }else{
            empnoMsg.innerText="사용 가능한 사번입니다."
            parentNode.classList.add("success");
            parentNode.classList.remove("error");
            return true;//옳으면 등록~🚨
        }
    }else if(res.status===400){
        this.value="";
        alert("정수만 입력하세요!");
    }else {
        alert(res.status+" 오류입니다. 다시 시도!");
    }
}


async function mgrCheck (e){
    let val=empInsertForm.mgr.value;
    if(val===""){
        mgrMsg.innerText="상사가 null 처리 됩니다."
        return true; //🚨 상사가 없는 경우 null 처리
    }
    const parentNode=(empInsertForm.mgr.closest(".inputCont"));
    let url="/empnoCheck.do?empno="+val;
    const res=await fetch(url);
    if(res.status===200){
        const obj=await res.json();
        if(obj.checkId){
            mgrMsg.innerText=obj.emp.ENAME+"님이 상사로 지정됩니다."
            parentNode.classList.remove("error");
            parentNode.classList.add("success");
            return true; //🚨
        }else{
            mgrMsg.innerText="존재하지 않는 사원입니다."
            parentNode.classList.remove("success");
            parentNode.classList.add("error");
        }
    }else if(res.status===400){
        this.value="";
        mgrMsg.innerText="정수만 입력하세요!"
        parentNode.classList.remove("success");
        parentNode.classList.add("error");
    }else {
        this.value="";
        mgrMsg.innerText=res.status+" 오류입니다. 다시 시도!"
        parentNode.classList.remove("success");
        parentNode.classList.add("error");
    }
}



async function deptnoCheck(e){
    let val=empInsertForm.deptno.value;//this를 바꿔준 이유는 submit 하는 과정에서 this가 window를 가리킨다.
    if(!val){
        deptnoMsg.innerText="부서가 null처리 됩니다.";
        return true;
    }
    const parentNode=(empInsertForm.deptno.closest(".inputCont"));
    let url="/deptnoCheck.do?deptno="+val;
    const res=await fetch(url);
    if(res.status===200){
        const obj=await res.json();
        if(obj.checkId){
            deptnoMsg.innerText=`해당 부서로 배치됩니다.`
            parentNode.classList.remove("error");
            parentNode.classList.add("success");
        }else{
            deptnoMsg.innerText="존재하지 않는 부서입니다."
            parentNode.classList.remove("success");
            parentNode.classList.add("error");
        }
    }else if(res.status===400){
        this.value="";
        deptnoMsg.innerText="정수만 입력하세요!"
        parentNode.classList.remove("success");
        parentNode.classList.add("error");
    }else {
        this.value="";
        deptnoMsg.innerText=res.status+" 오류입니다. 다시 시도!"
        parentNode.classList.remove("success");
        parentNode.classList.add("error");
    }
}
async function enameCheck(e){
    let val=empInsertForm.ename.value;
    const parentNode=empInsertForm.ename.closest(".inputCont");//가장 근접한 부모를 찾겠다.
    if(val.length<2) {
        enameMsg.innerText="이름을 두글자 이상 작성하세요."
        parentNode.classList.add("error");
        parentNode.classList.remove("success");
        return false;
    }else{
        enameMsg.innerText="이름을 사용해도 좋습니다.."
        parentNode.classList.add("success");
        parentNode.classList.remove("error");
        return true;
    }
}

async function jobCheck(e){
    let val=empInsertForm.job.value;
    const parentNode=empInsertForm.job.closest(".inputCont");//가장 근접한 부모를 찾겠다.
    if(val.length<2) {
        jobMsg.innerText="직책을 두글자 이상 작성하세요."
        parentNode.classList.add("error");
        parentNode.classList.remove("success");
        return false;
    }else{
        jobMsg.innerText="직책을 사용해도 좋습니다.."
        parentNode.classList.add("success");
        parentNode.classList.remove("error");
        return true;
    }
}

empInsertForm.sal.onchange=salCheck;
function salCheck(){
    let val=empInsertForm.sal.value;
    const parentNode=empInsertForm.sal.closest(".inputCont")
    if( val.trim() && !isNaN(val)) {
        parentNode.classList.add("success");
        parentNode.classList.remove("error");
        return true;
    }else{
        salMsg.innerText="급여는 수만 입력 가능합니다."
        parentNode.classList.add("error");
        parentNode.classList.remove("success");
        return false;
    }
}
empInsertForm.comm.onblur=commCheck;
function commCheck(){
    let val=empInsertForm.comm.value;
    const parentNode=empInsertForm.comm.closest(".inputCont")
    if(!val){
        commMsg.innerText="상여금이 null 처리 됩니다."
        return true;
    }
    if( val.trim() && !isNaN(val)) {//val.trim() 없어도 되지 않을까..
        parentNode.classList.add("success");
        parentNode.classList.remove("error");
        return true;
    }else{
        commMsg.innerText="상여금은 수만 입력 가능합니다."
        parentNode.classList.add("error");
        parentNode.classList.remove("success");
        return false;
    }
}

//form submit 버튼을 누르면 form.onsubmit 이벤트가 발생하면서
//form 양식(input)에 작성한 내역을 action 에 작성한 동적 페이지에 제출
//유효성 검사 : 액션페이지에서 처리하지 못하는 값을 미리 검출하고 경고하는 일
//1.양식의 제출을 막아야한다.
empInsertForm.onsubmit= async function (e){
    e.preventDefault(); //이벤트를 막는다.
    //async 함수에서 반환하는 값은 무조건 프라미스화가 된다.
    //return true ==> return new Promise((res)=>{res(true)});
    //해결: async/await 를 사용하여 반환값을 그대로 받는다.
    let empnoState= await empnoCheck();
    let mgrState=await mgrCheck();
    let deptnoState=await deptnoCheck();
    let enameState=await enameCheck();
    let jobState=await jobCheck();
    let salState=await salCheck();
    let commState=await commCheck();
    console.log(empnoState,mgrState,deptnoState)
    if(empnoState && mgrState && deptnoState && enameState && jobState && salState &&commState){
        empInsertForm.submit();//만족하는 결과가 나왔을때 제출가능상태로 만듦.

    }

    // 😎 this를 유지하고 싶다면..?
    // const deptnoCheck2=deptnoCheck.bind(empInsertForm.deptno);
    // deptnoCheck2();
}
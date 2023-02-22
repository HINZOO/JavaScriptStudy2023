//window.onload : 브라우저 document 를 모두 load하고 image와 스타일적용까지 완료한 시점
window.onload=function (e){
    const empInsertForm=document.forms["empInsertForm"];
    console.log(empInsertForm);
    //undefined => 스크립트가 dom node 보다 먼저 실행되서
    //해결법 -> 스크립트를 body 보다 밑에서 받으면 된다.
    //해결법2-> window.onload를 사용한다. (단점: ✨ node 에 이벤트의 콜백함수를 직접 적용하면 마지막 콜백함수만 실행된다.=>해결 :addEventListener)
}
window.onload=function (e){
    const empInsertForm=document.forms["empInsertForm"];
    console.log("두번째 콜백함수");
}
//✨
window.addEventListener("load",()=>{
    console.log("addEventListener로 정의한 콜백함수 ")
})
//해결법3 -> document.DOMContentLoaded : 브라우저가 document 를 모두 load 한 시점 (addEventListener 로만 작성가능)
document.addEventListener("DOMContentLoaded",(e)=>{
    console.log("DOMContentLoaded 로 정의한 콜백함수")
})
//항의!! 콜백함수에 정의하는 것이 너무 보기 싫고 코드도 복잡하다
//해결법4-> script 에 defer(boolean) 라는 속성을 제공 : DOMContentLoaded 시점까지 기다렸다가 script 문서를 실행!
const empInsertForm=document.forms["empInsertForm"];
// console.log(empInsertForm);
empInsertForm.empno.onchange= async function (e) {//empno에 onchange 가 발생하면 콜백 함수실행.
    //AJAX (XMLHttpRequest,fetch)
    let val = this.value;
    let url="/empnoCheck.do?empno="+val;
    const res=await fetch(url);//.then((res)=>{return res.json()}) await가 then을 실행하고 반환되는 resp를 받는다.
    if(res.status===200){//통신에 성공
        const obj=await res.json();//.then((obj)=>{...})
        //console.log(obj)
        if(obj.checkId){//true
            empnoMsg.innerText= " "+obj.emp.ENAME+"이 사용중인 사번입니다."
        }else{
            empnoMsg.innerText=" 사용가능한 사번입니다."
        }
    }else if(res.status===400){
        this.value="";//잘못된 값 입력 후 초기화 됨.
        alert(res.status+"오류입니다. 정수만 입력하세요.");
    }else{
        alert(res.status+"오류입니다. 다시시도!");
    }

}
empInsertForm.mgr.onchange= async function (e) {//empno에 onchange 가 발생하면 콜백 함수실행.
    //AJAX (XMLHttpRequest,fetch)
    let val = this.value;
    let url="/empnoCheck.do?empno="+val;
    const res=await fetch(url);//.then((res)=>{return res.json()}) await가 then을 실행하고 반환되는 resp를 받는다.
    if(res.status===200){//통신에 성공
        const obj=await res.json();//.then((obj)=>{...})
        //console.log(obj)
        if(obj.checkId){//true
            mgrMsg.innerText= " "+obj.emp.ENAME+"의 상사번호 입니다."
        }else{
            mgrMsg.innerText="해당 번호의 상사가 없습니다."
        }
    }else if(res.status===400){
        this.value="";//잘못된 값 입력 후 초기화 됨.
        alert(res.status+"오류입니다. 정수만 입력하세요.");
    }else{
        alert(res.status+"오류입니다. 다시시도!");
    }
}

empInsertForm.deptno.onchange= async function (e) {
    //AJAX (XMLHttpRequest,fetch)
    let val = this.value;
    let url="/deptnoCheck.do?deptno="+val;
    const res=await fetch(url);
    if(res.status===200){//통신에 성공
        const obj=await res.json();//.then((obj)=>{...})
        //console.log(obj)
        if(obj.checkId){//true
            deptnoMsg.innerText=" 이미 존재하는 부서 입니다."
        }else{
            deptnoMsg.innerText="해당 번호의 부서가 없습니다.."
        }
    }else if(res.status===400){
        this.value="";//잘못된 값 입력 후 초기화 됨.
        alert(res.status+"오류입니다. 정수만 입력하세요.");
    }else{
        alert(res.status+"오류입니다. 다시시도!");
    }
}
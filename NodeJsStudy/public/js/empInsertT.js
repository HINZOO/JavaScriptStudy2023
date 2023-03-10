
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
    //π μ¬λ²μ 3κΈμ μ΄μ μλ§ μλ ₯κ°λ₯(μλλ©΄ false)
    if(val.length<2 || isNaN(val)) {
        empnoMsg.innerText = "μ¬λ²μ 3κΈμ μ΄μμ μ«μλ§ μλ ₯κ°λ₯ν©λλ€."
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
            empnoMsg.innerText=obj.emp.ENAME+"λμ΄ μ¬μ© μ€μΈ μ¬λ²μλλ€."
            parentNode.classList.add("error");
            parentNode.classList.remove("success");

        }else{
            empnoMsg.innerText="μ¬μ© κ°λ₯ν μ¬λ²μλλ€."
            parentNode.classList.add("success");
            parentNode.classList.remove("error");
            return true;//μ³μΌλ©΄ λ±λ‘~π¨
        }
    }else if(res.status===400){
        this.value="";
        alert("μ μλ§ μλ ₯νμΈμ!");
    }else {
        alert(res.status+" μ€λ₯μλλ€. λ€μ μλ!");
    }
}


async function mgrCheck (e){
    let val=empInsertForm.mgr.value;
    if(val===""){
        mgrMsg.innerText="μμ¬κ° null μ²λ¦¬ λ©λλ€."
        return true; //π¨ μμ¬κ° μλ κ²½μ° null μ²λ¦¬
    }
    const parentNode=(empInsertForm.mgr.closest(".inputCont"));
    let url="/empnoCheck.do?empno="+val;
    const res=await fetch(url);
    if(res.status===200){
        const obj=await res.json();
        if(obj.checkId){
            mgrMsg.innerText=obj.emp.ENAME+"λμ΄ μμ¬λ‘ μ§μ λ©λλ€."
            parentNode.classList.remove("error");
            parentNode.classList.add("success");
            return true; //π¨
        }else{
            mgrMsg.innerText="μ‘΄μ¬νμ§ μλ μ¬μμλλ€."
            parentNode.classList.remove("success");
            parentNode.classList.add("error");
        }
    }else if(res.status===400){
        this.value="";
        mgrMsg.innerText="μ μλ§ μλ ₯νμΈμ!"
        parentNode.classList.remove("success");
        parentNode.classList.add("error");
    }else {
        this.value="";
        mgrMsg.innerText=res.status+" μ€λ₯μλλ€. λ€μ μλ!"
        parentNode.classList.remove("success");
        parentNode.classList.add("error");
    }
}



async function deptnoCheck(e){
    let val=empInsertForm.deptno.value;//thisλ₯Ό λ°κΏμ€ μ΄μ λ submit νλ κ³Όμ μμ thisκ° windowλ₯Ό κ°λ¦¬ν¨λ€.
    if(!val){
        deptnoMsg.innerText="λΆμκ° nullμ²λ¦¬ λ©λλ€.";
        return true;
    }
    const parentNode=(empInsertForm.deptno.closest(".inputCont"));
    let url="/deptnoCheck.do?deptno="+val;
    const res=await fetch(url);
    if(res.status===200){
        const obj=await res.json();
        if(obj.checkId){
            deptnoMsg.innerText=`ν΄λΉ λΆμλ‘ λ°°μΉλ©λλ€.`
            parentNode.classList.remove("error");
            parentNode.classList.add("success");
        }else{
            deptnoMsg.innerText="μ‘΄μ¬νμ§ μλ λΆμμλλ€."
            parentNode.classList.remove("success");
            parentNode.classList.add("error");
        }
    }else if(res.status===400){
        this.value="";
        deptnoMsg.innerText="μ μλ§ μλ ₯νμΈμ!"
        parentNode.classList.remove("success");
        parentNode.classList.add("error");
    }else {
        this.value="";
        deptnoMsg.innerText=res.status+" μ€λ₯μλλ€. λ€μ μλ!"
        parentNode.classList.remove("success");
        parentNode.classList.add("error");
    }
}
async function enameCheck(e){
    let val=empInsertForm.ename.value;
    const parentNode=empInsertForm.ename.closest(".inputCont");//κ°μ₯ κ·Όμ ν λΆλͺ¨λ₯Ό μ°Ύκ² λ€.
    if(val.length<2) {
        enameMsg.innerText="μ΄λ¦μ λκΈμ μ΄μ μμ±νμΈμ."
        parentNode.classList.add("error");
        parentNode.classList.remove("success");
        return false;
    }else{
        enameMsg.innerText="μ΄λ¦μ μ¬μ©ν΄λ μ’μ΅λλ€.."
        parentNode.classList.add("success");
        parentNode.classList.remove("error");
        return true;
    }
}

async function jobCheck(e){
    let val=empInsertForm.job.value;
    const parentNode=empInsertForm.job.closest(".inputCont");//κ°μ₯ κ·Όμ ν λΆλͺ¨λ₯Ό μ°Ύκ² λ€.
    if(val.length<2) {
        jobMsg.innerText="μ§μ±μ λκΈμ μ΄μ μμ±νμΈμ."
        parentNode.classList.add("error");
        parentNode.classList.remove("success");
        return false;
    }else{
        jobMsg.innerText="μ§μ±μ μ¬μ©ν΄λ μ’μ΅λλ€.."
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
        salMsg.innerText="κΈμ¬λ μλ§ μλ ₯ κ°λ₯ν©λλ€."
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
        commMsg.innerText="μμ¬κΈμ΄ null μ²λ¦¬ λ©λλ€."
        return true;
    }
    if( val.trim() && !isNaN(val)) {//val.trim() μμ΄λ λμ§ μμκΉ..
        parentNode.classList.add("success");
        parentNode.classList.remove("error");
        return true;
    }else{
        commMsg.innerText="μμ¬κΈμ μλ§ μλ ₯ κ°λ₯ν©λλ€."
        parentNode.classList.add("error");
        parentNode.classList.remove("success");
        return false;
    }
}

//form submit λ²νΌμ λλ₯΄λ©΄ form.onsubmit μ΄λ²€νΈκ° λ°μνλ©΄μ
//form μμ(input)μ μμ±ν λ΄μ­μ action μ μμ±ν λμ  νμ΄μ§μ μ μΆ
//μ ν¨μ± κ²μ¬ : μ‘μνμ΄μ§μμ μ²λ¦¬νμ§ λͺ»νλ κ°μ λ―Έλ¦¬ κ²μΆνκ³  κ²½κ³ νλ μΌ
//1.μμμ μ μΆμ λ§μμΌνλ€.
empInsertForm.onsubmit= async function (e){
    e.preventDefault(); //μ΄λ²€νΈλ₯Ό λ§λλ€.
    //async ν¨μμμ λ°ννλ κ°μ λ¬΄μ‘°κ±΄ νλΌλ―Έμ€νκ° λλ€.
    //return true ==> return new Promise((res)=>{res(true)});
    //ν΄κ²°: async/await λ₯Ό μ¬μ©νμ¬ λ°νκ°μ κ·Έλλ‘ λ°λλ€.
    let empnoState= await empnoCheck();
    let mgrState=await mgrCheck();
    let deptnoState=await deptnoCheck();
    let enameState=await enameCheck();
    let jobState=await jobCheck();
    let salState=await salCheck();
    let commState=await commCheck();
    console.log(empnoState,mgrState,deptnoState)
    if(empnoState && mgrState && deptnoState && enameState && jobState && salState &&commState){
        empInsertForm.submit();//λ§μ‘±νλ κ²°κ³Όκ° λμμλ μ μΆκ°λ₯μνλ‘ λ§λ¦.

    }

    // π thisλ₯Ό μ μ§νκ³  μΆλ€λ©΄..?
    // const deptnoCheck2=deptnoCheck.bind(empInsertForm.deptno);
    // deptnoCheck2();
}
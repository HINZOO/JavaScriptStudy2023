<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>JSP - Hello World</title>
</head>
<body>
<h1>JavaScript 에 대해 배워보자</h1>
<p>js의 역사 : 브라우저를 동적(브라우저가 이벤트에 반응)으로 만들기 위해 개발된 언어로
    JAVA 가 굉장히 인기있는 언어라 이름에 JAVA 을 붙여서 JavaScript 가 되었다.
    java 에서 이름사용을 못하게 하여 ECMAScript es로 불린다. es06는 표준화된 버전을 의미한다.
</p>
<p>바닐라 js: js로 된 라이브러리나 프레임워크(jquery,react,view,.....)을 사용하지않고 순수한 js 문법만 사용.</p>
<p>옛날옛날 10년전에는 바닐라 js로 개발이 불가능 했다. es6로 표준화 되면서 가능해 졌다.(크로스 브라우징)</p>
<nav>
    <ul>
        <li><a href="l00_variable_const.html">0.변수와 상수(var,let,const)</a></li>
        <li><a href="l01_var_hoisting.html">1.window 필드 var 변수의 hoisting 현상(*)</a></li>
        <li><a href="l02_primitive_type.html">2.기본데이터타입(number,bigint,string,boolean,symbol,null,undefined)</a></li>
        <li><a href="l03_object_type.html">3.자료형 (Object {},ProtoType)</a></li>
        <li><a href="l04_array_list.html">4.배열 (ArrayList [])</a></li>
        <li><a href="l05_function.html">5.함수 </a></li>
        <li><a href="l06_for.html">6.반복문 (for,내부반복문,iterator for)</a></li>
        <li><a href="l07_if.html">7.if,switch</a></li>
        <li><a href="l08_array_iteration.html">8.배열의 내부 반복문(Iteration)과 정렬(const)</a></li> <%--https://www.w3schools.com/js/js_array_const.asp--%>
        <li><a href="l09_document_traveling.html">9.document DOMTree 와 node 객체</a></li>
        <li><a href="l10_event.html">10.event</a></li>
        <li><a href="l11_image_slide.html">11.이미지 슬라이드 만들기</a></li>
        <li><a href="l12_class.html">12.자바스크립트의 클래스 문법(static sugar)</a></li>
        <li><a href="l13_getter_setter.html">13.class 의 getter setter 와 캡슐화</a></li>
        <li><a href="l14_emp_list.do">14.자바에서 DTO 사용해보기(Emp.List) </a></li>
        <li><a href="">15.prototype 의 상속</a></li>
        <li><a href="">16.함수의 binding과 this와 화살표 함수</a></li>
        <li><a href="">17.타이밍 함수 setTimeout 과 setInterval (멀티스레드 new Thread)</a></li>
        <li><a href="">18.Promise 와 Promise 화로 멀티스레드 동기화</a></li>
        <li><a href="">19.async 함수와 Promise </a></li>
        <li><a href="">20.Ajax 와 XMLHttpRequest 객체 </a></li>
        <li><a href="">21.Ajax 와 fetch api와 Promise</a></li>
        <li><a href="">22.Ajax 와 async 함수 </a></li>
    </ul>

</nav>
<script>
    //HTML 에서 js의 실행 순서는 DOMTree 와 연관있다~
    //html 문서가 브라우저에서 로딩되면서 스크립트 태그가 있거나 실행한다.
    //만약 스크립트 문서가 참조되고 있으면 다운받고 실행한다.
    //alert("안녕하세요 스크립트로 경고창을 생성했습니다!.");
    console.log("안녕하세요 스크립트로 경고창을 생성했습니다!.");
</script>
</body>
</html>
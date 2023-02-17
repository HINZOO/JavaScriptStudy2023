console.log("안녕하세요");
// node js 파일명: v8엔진으로 js 파일을 실행한다. (html문서가 없다)
// 크롬 브라우저에서 js 실행 : html 문서에 script 태그가 있으면 v8 엔진이 실행된다.
// java class 파일명 : jvm class 파일의 main 메소드를 실행

//console.log(window);// 브라우저에서 자바스크립트가 실행되었을때 제공하는 전역필드이나 node js에는 없다. 따라서 document도 없다
//console.log(document);

console.log(this);//node js에서 정의한 전역필드
//문법은 바닐라 js를 그대로 따른다.
//window.setInterval(), window.setTimeout() : window 필드 말고 전역에 존재함
setInterval(()=>{
    console.log(new Date());
},1000);
//node js는 자바스크립트를 서버단에서 사용하기 위한 언어이다.
//node js에서 제공하는 필드 중에 서버 모듈(http)이 존재한다.(즉, 서버이다)
//node js는 maven처럼 프로젝트 빌드와 라이브러리 의존성 주입을 할 수 있다.(npm)

//😎
//https://www.npmjs.com/
//에서 nodemon을 검색하여 다운 자동재시작하게 해줌.
//npm install -g nodemon  컴퓨터 전체에 까는 코드
//npm install --save-dev nodemon 프로젝트에만 까는 코드
//npx nodemon .\L02HttpModule.js    으로 로딩하면 수정할때마다 재시작을 안해줘도 됨.



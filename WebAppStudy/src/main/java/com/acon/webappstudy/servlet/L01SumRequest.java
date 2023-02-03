package com.acon.webappstudy.servlet;

import com.acon.webappstudy.HelloServlet;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

//자바 파일이 동적 리소스가 되려면 HttpServlet 타입이어야 한다.
//톰캣이 동적리소스를 실행할때 HttpServlet 객체만 실행가능
//해당 서블릿을 DD에 등록해야 동적리소스로 배포가능해진다.
public class L01SumRequest  extends HttpServlet{
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        //해당 동적 페이지를 브라우저에서 url로 호출하면 doGet이 실행된다.
        //실행의 결과는 매개변수인 HttpServletResponse response의 out필드에서 작성하면 문서로 반환된다.
        // >> response.out
        // Reader 문자열을 입력하는 , Writer 문자열을 출력하는 객체
        //Request : 요청에 대한 정보를 담는 객체 url,파라미터,요청하는 브라우저 정보,..
        String paramA = request.getParameter("a");
        String paramB = request.getParameter("b");
        response.setContentType("text/html;charset=utf-8");// html 문서형식으로타입을 설정하겠다.
        PrintWriter out = response.getWriter();//.getWriter()는  PrintWriter 로 반환됨
        out.append("<h1>안녕!!</h1>");
        out.append("a+b="+(Double.parseDouble(paramA)+Double.parseDouble(paramB)));
        out.append("<p>파라미터 a와 b의 값을 변경하면 출력되는 결과가 바뀌는 동적 페이지 입니다.</p>");
    }
}

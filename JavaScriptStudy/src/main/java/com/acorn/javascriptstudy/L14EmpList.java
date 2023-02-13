package com.acorn.javascriptstudy;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

//톰캣에서 동적페이지를 생성하기 위한 두가지 약속
//서블릿으로 정의할 타입을 HttpServlet 으로 정의
//서블릿을 리소스로 등록하기 위해 DD(web.xml)에 주소를 등록(@WebServlet)
@WebServlet("/l14_emp_list.do")
public class L14EmpList extends HttpServlet {
    // 클라이언트에서 리소스를 요청하는 두가지 방식 (GET : url, POST: 양식제출)
    // doGet 클라이언트(브라우저) 가 /l14_emp_list.do를 url 호출하면 톰캣이 해당 리소스의 doGet()함수를 실행.
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        super.doGet(req, resp);
        PrintWriter out = resp.getWriter();//  resp.getWriter() : 리소스로 반환될 문자열 작성
        out.println("<h1>Scott.emp list 출력</h1>");
    }


}

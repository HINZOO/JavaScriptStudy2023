package com.acorn.javascriptstudy;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;


@WebServlet("/l14_dept_list.do")
public class L14DeptList extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doGet(req, resp);
        String user = "root";
        String pw = "mysql123";

        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        String deptListStr = "";
        List<DeptDto> deptList = null;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection("jbc:mysql://localhost:3306/scott", user, pw);
            pstmt = conn.prepareStatement("SELECT * FROM DEPT");
            rs = pstmt.executeQuery();
            deptList = new ArrayList<DeptDto>();

            while (rs.next()) {
                DeptDto dept = new DeptDto();
                dept.setDname(rs.getString("dname"));
                dept.setDeptno(rs.getInt("deptno"));
                dept.setLoc(rs.getString("loc"));
                deptList.add(dept);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        resp.setContentType("text/html;charset=UTF-8;");
        PrintWriter out = resp.getWriter();

        deptListStr+="<table>";
        deptListStr+="<tr><th>부서이름</th><th>부서번호</th><th>지역</th></tr>";
        for(DeptDto dept : deptList){
            deptListStr+="<tr>";
            deptListStr+="<td>"+dept.getDname()+"</td>";
            deptListStr+="<td>"+dept.getDeptno()+"</td>";
            deptListStr+="<td>"+dept.getLoc()+"</td>";
            deptListStr+="</tr>";
        }
        deptListStr+="</table>";
        out.println(deptListStr);

    }
}

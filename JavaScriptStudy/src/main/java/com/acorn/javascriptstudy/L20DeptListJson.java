package com.acorn.javascriptstudy;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/deptListJson.do")
public class L20DeptListJson extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws  IOException {
        resp.setContentType("application/json;charset=UTF-8;");
        PrintWriter out = resp.getWriter();
        String url="jdbc:mysql://localhost:3306/SCOTT";
        String user = "root";
        String pw = "mysql123";
        String driver = "com.mysql.cj.jdbc.Driver";

        Connection conn=null;
        PreparedStatement pstmt=null;
        ResultSet rs= null;
        List<DeptDto> deptList=null;
        try{
            Class.forName(driver);
            conn= DriverManager.getConnection(url,user,pw);
            String sql = "SELECT * FROM DEPT";
            pstmt=conn.prepareStatement(sql);
            rs= pstmt.executeQuery();
            deptList = new ArrayList<>();
            while(rs.next()) {
                DeptDto dept=new DeptDto();
                dept.setDeptno(rs.getInt("deptno"));
                dept.setDname(rs.getString("dname"));
                dept.setLoc(rs.getString("loc"));
                deptList.add(dept);
            }
        }catch(Exception e){
            e.printStackTrace();
        }


        String deptJson="[";
        if(deptList!=null){
            for(int i=0;i<deptList.size();i++){
                DeptDto dept= deptList.get(i);
                deptJson+="{";
                deptJson+="\"deptno\":"+dept.getDeptno()+",";
                deptJson+="\"dname\":\""+dept.getDname()+"\",";
                deptJson+="\"loc\":\""+dept.getLoc()+"\"";
                deptJson+="}";
                deptJson+=(i!=deptList.size()-1)?",":"";
            }
        }
        deptJson+="]";
        out.println(deptJson);
    }
}

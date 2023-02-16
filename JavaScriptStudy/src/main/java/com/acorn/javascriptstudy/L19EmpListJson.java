package com.acorn.javascriptstudy;

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

@WebServlet("/empListJson.do")
public class L19EmpListJson extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        //동적 페이지는 서버에 한번 실행하는 문서
        //동적 페이지는 호출할 때 마다 내용(DB)이 갱신될 수 있다.
        //동적 페이지는 호출할 때 내용을 바꿀 수 있는 파라미터(쿼리스트링)를 전달받을 수 있어야한다.
        //url?queryString 의 형태
            //url?key=value&key=value&..)
        //queryString의 요청정보는 request 에 존재하고 파라미터는 무조건 문자열이다.
        String deptnoStr=request.getParameter("deptno");//url의 파라미터 deptno = 뒤에오는 문자열.

        response.setContentType("application/json;charset=UTF-8;");
        PrintWriter out = response.getWriter();
        String url ="jdbc:mysql://localhost:3306/SCOTT";
        String user = "root";
        String pw="mysql123";
        String driver="com.mysql.cj.jdbc.Driver";
        Connection conn=null;
        PreparedStatement pstmt=null;// PreparedStatement sql injection을 막는다 (파라미터를 수정하면 수정이되는 해킹을 방지)
        ResultSet rs=null;
        List<EmpDto> empList = null;
        try{
            Class.forName(driver);
            conn= DriverManager.getConnection(url,user,pw);
            try {
                int deptno=Integer.parseInt(deptnoStr);//문자열이기 때문에 숫자로 변경
                String sql="SELECT * FROM EMP WHERE DEPTNO=?";
                pstmt=conn.prepareStatement(sql);
                pstmt.setInt(1,deptno);//첫번째 파라미터 인덱스에 값을 입력
            } catch (NumberFormatException e){
                e.printStackTrace();
                pstmt=conn.prepareStatement("SELECT * FROM EMP");
            }

            rs=pstmt.executeQuery();
            empList=new ArrayList<>();
            while(rs.next()){
                EmpDto emp= new EmpDto();
                emp.setEmpno(rs.getInt("empno"));
                emp.setEname(rs.getString("ename"));
                emp.setJob(rs.getString("job"));
                emp.setSal(rs.getDouble("sal"));
                emp.setDeptno(rs.getInt("deptno"));
                empList.add(emp);
            }
        }catch (Exception e){
            e.printStackTrace();
        }

        //😎 json 문자열로 만들어서 반환하세요
        String empJson="[";
        if(empList!=null){
            for (int i=0; i<empList.size(); i++){
                EmpDto emp=empList.get(i);
                empJson+="{";
                empJson+="\"empno\":"+emp.getEmpno()+",";
                empJson+="\"ename\":\""+emp.getEname()+"\",";
                empJson+="\"job\":\""+emp.getJob()+"\",";
                empJson+="\"sal\":"+emp.getSal()+",";
                empJson+="\"deptno\":"+emp.getDeptno()+"";
                empJson+="}";
                empJson+=(i!=empList.size()-1)?",":"";
            }
        }

        empJson+="]";
        out.println(empJson);
    }
}

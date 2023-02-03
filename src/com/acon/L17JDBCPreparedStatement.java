package com.acon;

import java.sql.*;

public class L17JDBCPreparedStatement {
    public static void main(String[] args) {
        //PreparedStatement : sql injection 해킹을 방어하기 위해 등장
        String mysqlDriver = "com.mysql.cj.jdbc.Driver";//DriverManager 가 동적로딩시 사용
        String url="jdbc:mysql://localhost:3306/scott";
        String user="root";
        String pw ="mysql123";

        Connection conn = null; // 접속하면 반환되는 객체
        PreparedStatement pstmt = null; // 쿼리를 실행하는 객체
        ResultSet rs = null; // 질의어를 실행하면 반환되는 table.
        //검색창에서 20수를 입력받아서 서비스를 제공하는 것이 목표!
        //해커가 검색창에 "20 OR 1=1; DROP TABLE EMP;"을 입력받아서 실행 => EMP 테이블 삭제
        // 1=1 은 항상 참이기 때문에 원하는대로 명령어를 기입할 수 있다.==>>sql injection 해킹

        ///sql injection 해킹을 막는법,>> 파라미터 타입검사만 하면 막을 수 있다.
//        String sql = "SELECT * FROM EMP WHERE DEPTNO=✨20 OR 1=1; DROP TABLE EMP✨"; //이 이후 값들을 지정

//        String sql = "SELECT * FROM EMP WHERE DEPTNO=20 ";
        String sql_injection = "SELECT * FROM EMP WHERE DEPTNO=20 OR 1=1; DROP TABLE EMP";
        String sql_prevent = "SELECT * FROM EMP WHERE DEPTNO='20 OR 1=1; DROP TABLE EMP'";
        String sql="SELECT * FROM EMP WHERE DEPTNO=? AND JOB=?";

        try {
            Class.forName(mysqlDriver); // 동적로딩을 할 수 있도록 준비.
            conn = DriverManager.getConnection(url,user,pw);
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1,20);//DEPTNO 값 정의 (20인사람만 뽑아요~)
            pstmt.setString(2,"clerk");//JOB 값 정의(clerk만뽑아요~)
            rs = pstmt.executeQuery();// 질의어를 실행하는 함수

            while(rs.next()){//rs 값이 있으면 true로 반환 없으면 false
                int empno = rs.getInt(1);//table 의 칼럼을 정의할때의 순서대로 반환.
                String ename = rs.getString(2);
                String job = rs.getString(3);
                int mgr = rs.getInt(4);
                System.out.println(empno+"|"+ename+"|"+job+"|"+mgr);
            }
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}

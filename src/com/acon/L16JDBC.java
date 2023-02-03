package com.acon;
//MYSQL에서 제공하는 외부 패키지.
import com.mysql.cj.jdbc.Driver;

//java.sql.* JBDC 라이브러리: JDK 에 포함되어있다.
import java.sql.*;

public class L16JDBC {
    public static void main(String[] args) {
        //📂 JDBC : Java DataBase Connect : JAVA 로 db 서버에 접속하는 것 (java.sql.* 객체를 제공)
        // JDBC 로 db 서버에 접속하려면 해당 db(mysql)에서 제공하는 커넥터 객체를 사용해야 한다.
            // (구글) Download Connector/J - MySQL :: Developer Zone 검색
            //  Select Operating System: Platform Independent 선택 (둘중아무거나 받아요)
            //  mysql-connector-j-8.0.32.jar 파일을 넣어줌.
            // 상위폴더 마우스 오른쪽 모듈설정열기->라이브러리-> +->자바-> 파일등록

        String url = "jdbc:mysql://localhost:3306/SCOTT";
        String user = "root";
        String pw = "mysql123";

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(url,user,pw);
            // 상식적으로는 .getConnection(url,user,pw,new Driver()) 이지만! Driver가 필요할때만 쓰도록 설정.(=>> 동적로딩)
            //🍒쿼리 실행(.createStatement())
            Statement stnt = conn.createStatement();// 쿼리를 실행하는 객체 (=statement) 반환
            ResultSet rs= stnt.executeQuery("SELECT * FROM EMP");// executeQuery : 질의어(Select,DQL)을 실행하는 함수
            // ResultSet : table 의 자료구조 (Iterator 로 출력확인 가능 next)

            while(rs.next()){
                int empno = rs.getInt("empno");
                String ename = rs.getString("ename");
                String job = rs.getString("job");
                int sal = rs.getInt("sal");
                System.out.println(empno+"\t"+ename+"\t\t"+job+"\t\t"+sal);
            }

            System.out.println(conn);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    //DriverManager : jdbc db 접속 객체, Connection(접속유지) 객체를 반환
    //DriverManager 가 mysql 에  접속할때 mysql 에서 제공하는 Driver 를  객체로 생성해서 사용하는데 이때, 동적로딩이라는 방식을 사용한다.

    }
}

import java.util.Date;

public class Main {
    public static void main(String[] args) {
        System.out.println("HelloWorld");//단축키: sout
        //자바에서 패키지란? (폴더)
        //패키지는 비슷한 기능의 클래스(배포하면 libary or app이 된다.)의 집합
        //자바에서 패키지는 클래스 이름의 일부 (클래스 이름을 유일하게 만들어준다.)
        Date d = new Date();
        java.sql.Date d2 = new java.sql.Date(d.getTime());//이렇게 쓰면 import를 할 필요가 없음.
        // 보통 패키지는 도메인명으로 지정한다. (이유: 도메인은 웹상에서 유일한 주소이기 때문에 중복을 방지해준다.)
        // 즉, 클래스 이름을 유일하게 만들어준다.
        // util 패키지: 컬렉션프레임워크(개발자에게 유용한 클래스 집합)
        // sql 패키지: jdbc 패키지





    }

}
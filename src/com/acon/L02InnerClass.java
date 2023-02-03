package com.acon;
// 작명규칙 (숫자로 시작하면 안됨, 연산을 사용하지 않는다(-+/%), $(필드를나타낼때),_,#(프라이빗한 이름),& 은 사용가능하나 잘 안씀,회사 규칙을 따르는 것이 좋다!)
// -파스칼 : 대명사, class, 프로젝트명
// -카멜 : 변수
// -스네이크(대문자) : 상수
// -스네이크(소문자) : 폴더명(운영체제중에 대소문자를 구분 못하는 운영체제일때 소문자로 사용), 패키지명(클래스를 꾸며주는 이름이기 때문에 무조건 소문자)

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

class BtnActionHandler implements ActionListener{
   int index;

    @Override
    public void actionPerformed(ActionEvent e) {// 버튼을 누를때 마다 해당 메소드 실행
        //📂 ActionEvent e : 이벤트와 관련된 정보가 포함되어 있다.
        Object btnObj = e.getSource();// 이벤트의 대상을 반환. (타입의 다형성을 위해 Object 로 받음)
        JButton btn = (JButton)btnObj;
        btn.setText(++index+"명");// 연산자 순서에 의해 ++index가 먼저 진행 + ""을 통해 문자열로 최종반환
    }



}

public class L02InnerClass {
    static int index =0;
/*
    class 1 implements ActionListener{
       @Override
            public void actionPerformed(ActionEvent e) {
                btn.setText(++index+"");
                //  😥자료형 btn의 내부 필드가 바뀌는 것을 상수가 허용한다.(여기서는 상수가 변할수 있다. 자료형이 아닌 기본형은 불가능하다)
                //  내부 클래스로 만들어졌기 때문에 main 함수의 지역변수 btn을 참조할 수 없는것이 정상이지만
                //  마치 부모 클래스의 필드처럼 접근할 수 있도록 컴파일러가 구현해 놓는다.(index) 하지만 상수로 정의되어짐.

            }
    }
*/


    public static void main(String[] args) {
        // GUI
        JFrame f= new JFrame("awt window 안녕!");//Frame 도 있고,발전된 형태의 JFrame 도 있다..
            //버튼넣기
        JButton btn = new JButton("안뇽!");
//        BtnActionHandler btnActionHandler = new BtnActionHandler();
//        btn.addActionListener(btnActionHandler);//버튼을 누를때 이벤트 발생
        //👀  BtnActionHandler 를 정의하는게 귀찮아~ 바로 넣어주자!
         btn.addActionListener(new ActionListener() {//ActionListener는 functional interface가 없어서 람다식은 못함.
//            int n=0;//👀1)필드 내 정의 해서 추가하는 방법
            @Override
            public void actionPerformed(ActionEvent e) {//눈에보이지 않지만 실제로는  L02InnerClass$1이 있고 그안에 있는함수.
                btn.setText(++L02InnerClass.index+"");//👀 2)필드밖 정수 정의 후 대입
            }
        });



        f.add(btn);
        f.setBounds(0,0,400,400);//화면에 띄워주는 역할
        f.setVisible(true);//눈에 보이게 함

        //하이레벨(사용자와 가까운)00 VS 로우레벨(컴퓨터에 가까운) 언어
        //플랫폼(OS)이 하는 일: 컴퓨터의 재원을 관리 및 동작 (HDD나 RAM 등~)
        //mac은 로우레벨에 가까움 안드로이드 개발도 mac이 빠름

        //GUI (마우스를 이용한 Mac 이 최초 -> 마이크로 소프트가 어플의 Mac을 따라서 만들기 시작.)
        //GUI 에서는 마우스 이벤트가 제일 중요하다.

        //  ❓  플랫폼에 독립적이다!
        //      window 나  mac 에서 자바를 실행시켜서 동작한다 (X)
        //      자바가(jvm)이 class 를 플랫폼 위에서 실행하면서 플랫폼의 자원으로 동작(O)

        //  ❓  자바가 유명하게 된 이유와 frame
        //      window 에서 GUI 앱을 개발하는 패키지를 제공했는데 , 어렵고 복잡해서 개발 난이도가 높았다.
        //      window 용 앱을 만들고 다시 mac 이나 리눅스용 앱을 만들려면 각 플랫폼에서 제공하는 GUI 패키지를 공부해야했다.
        //      java 가 통합 GUI 패키지를 제공 (java.awt.* 또는 frame) 하면서 엄청 유명해졌다.
        //      ==> 시간이 지날 수록 java.awt 에서 제고하는 컴포넌트가 플랫폼마다 다르게 동작하기 시작
        //      ==> java.swing 패키지로 업데이트
        //      ==>  현재는 javaFX : 컨포너트의 레이아웃이 제한적으로 배치되고 swing 패키지가 오래되어서 새롭게 등장한 GUI 패키지
        //                          (html 처럼 컴포넌트 배치 가능)

    }
}

package com.acon;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
// Swing gui Component
// Component>Container(레이아웃 메니저구성가능: 다른 컴포넌트 배치)>Window>Frame(종료버튼 메뉴가 있는 창)/ Dialog
//                                                          >panel>Applet(프레임에 포함되어야만 함)
// Component> JComponent> JList, JButton, JLabel, JTable,... (컨테이너에 포함 될 수 있는 컴포넌트)
// GUI 를 구성하는 컴포넌트는 상시 이벤트 발생을 대기한다.

class Counter extends JFrame{//Window  필드인 JFrame 이 모든 컴포넌트를 포함 할 수 있는 창이기 때문에 상속받아서 구현.
    //필드////////////////////////////////////////////////////////////////
    private JButton upBtn;//1씩 증가하는 버튼
    private JButton downBtn;//1씩 감소하는 버튼
    private JButton initBtn;//초기화 버튼
    private JLabel screen;// 카운터 화면
    private int count=0;
    //생성자//////////////////////////////////////////////////////////////
    public Counter(String title){
        //화면에 보이기 까지 설정
        super(title);//부모인 JFrame 의 생성자 // 생성자는 부모 자식을 명확하게 구분한다

        upBtn = new JButton("UP");
        downBtn = new JButton("DOWN");
        initBtn = new JButton("INIT");
        screen = new JLabel(count + "명");
        screen.setHorizontalAlignment(JLabel.CENTER);// 카운터 가운데 정렬

        //기본적으로 JFramelayout 은 중앙에 위치하므로 겹치지 않게 공간을 분리해준다.
        //BorderLayout 을 정의하지 않으면 기본 CENTER 중첩
        this.add(upBtn, BorderLayout.NORTH);
        this.add(downBtn,BorderLayout.SOUTH);
        this.add(initBtn,BorderLayout.EAST);
        this.add(screen,BorderLayout.CENTER );

        //.addWindowListener :window 의 테두리 버튼을 누르는 것을(이벤트) 재정의
        this.addWindowListener(new WindowHandler());
        upBtn.addActionListener(new UpBtnHandler());
        downBtn.addActionListener(new DownBtnHandler());
        initBtn.addActionListener(new InitBtnHandler());
        this.setBounds(0,0,300,300);//자식이 가지게 된 setBounds 구현
        this.setVisible(true);
    }

    ///CONTER 내부 클래스 중 Btn 제어 부분////////////////////////////////////////////////
    class UpBtnHandler implements ActionListener {
        @Override
        public void actionPerformed(ActionEvent e) {
            screen.setText(++count + " 명");
        }
    }
    class DownBtnHandler implements  ActionListener{
        @Override
        public void actionPerformed(ActionEvent e) {
            if(count>0)screen.setText(--count+" 명");
        }
    }
    class InitBtnHandler implements ActionListener{
        @Override
        public void actionPerformed(ActionEvent e) {
            screen.setText((count=0)+" 명");
        }
    }
    //Counter  내부클래스 중 : 시스템 종료 관련 클래스//////////////////////////////
    class WindowHandler implements WindowListener{
        @Override
        public void windowOpened(WindowEvent e) { }//열릴때
        @Override
        public void windowClosing(WindowEvent e) {// 닫힘버튼 누를때
           Counter.this.dispose();// frame 을 종료하는 함수(프레임이 여러개일때 해당프레임만 종료됨)
        }
        @Override
        public void windowClosed(WindowEvent e) {// 윈도우가 종료될때
            System.out.println("윈도우가 종료됩니다.");
            System.exit(0);//시스템종료
        }
        @Override
        public void windowIconified(WindowEvent e) { }//윈도우가 아이콘으로 바뀔 때
        @Override
        public void windowDeiconified(WindowEvent e) { }// 아이콘에서 창으로 바뀔 때
        @Override
        public void windowActivated(WindowEvent e) { }//창을 마우스로 누르고 있을 때
        @Override
        public void windowDeactivated(WindowEvent e) { }//누르고 있던 마우스를 놓을 때
    }

/////////////메인 (구동)///////////////////////////////////////////////
    public class L04Counter {
    public static void main(String[] args) {
        new Counter("카운터");

      }
    }
}

/*
    this:인스턴스객체의 필드 접근자(부모필드를 상속받았기 때문에 부모 핃드도 접근가능)
    super: 객체의 부모 필드 접근자
    this(): 해당 객체의 생성자 호출
    super():해당객체의 부모생성자 호출
    부모클래스이름.this : 중첩클래스에서 부모클래스의 필드접근자(자식과 부모가 같은 이름의 필드가 존재하지 않으면 굳이쓸필요없음)
*/
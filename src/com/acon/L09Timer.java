package com.acon;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

//외부클래스
class SwingTimer extends JFrame{
    int count =100;
    boolean start = false;
    JButton startBtn = new JButton("시작");
    JButton stopBtn = new JButton("멈춤");
    JButton initBtn = new JButton("초기화");

    Panel btnP = new Panel();
    JLabel screen = new JLabel(count/10.0+"");
    public SwingTimer(){

        this.add(screen);
        screen.setHorizontalAlignment(JLabel.CENTER);
        screen.setFont(new Font("Serif",Font.BOLD,30));
        btnP.setLayout(new GridLayout());
        btnP.add(startBtn);
        btnP.add(stopBtn);
        btnP.add(initBtn);
        this.add(btnP,BorderLayout.SOUTH);

        this.setBounds(0,0,300,300);
        this.setVisible(true);

        // 객체 지향 문법은 매개변수의 타입을 지정해야 한다.(Class가 타입)
        // 함수형 언어(=함수가 타입인언어)는 함수를 매개변수로 작성가능(함수가 타입,객체관련...?)
        // (e)->{}: 람다식은 타입의 생성을 컴파일러가 자동으로 해줌.(Static sugar; 함수형 언어인 척 한다.)
        startBtn.addActionListener(new StartBtnHandler());//버튼을 누를 때 행동을 재정의
        //>> StartBtnHandler 타입을 implements ActionListener 통해 ActionListener 타입이 되면서
        //   addActionListener()의 괄호 안에 넣어줄수 있게 되었다.
        //   ❕❕ public void addActionListener(     java.awt.event.ActionListener l )
//        stopBtn.addActionListener(new StopBtnHandler());
        stopBtn.addActionListener((e)->{start = false;});//볃도의 클래스 생성없이 람다식으로 표현가능
//        initBtn.addActionListener(new InitBtnHandler());
        initBtn.addActionListener((e)->{screen.setText(((count=100)/10.0)+"");}); //볃도의 클래스 생성없이 람다식으로 표현가능

        this.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);//창을 끄면 시스템종료
    }

    class StartBtnHandler implements ActionListener  {
        // ❓ Q) StartBtnHandler 가  ActionListener 타입이 될 수 있는 것은 어떤 다형성에 의해서 인가요?
        //      = StartBtnHandler 가  ActionListener 타입이 될 수 있는 것은 객체 지향의 어떤 특징 때문인가요?
        //    A) 상속받은 부모의 타입이 될 수 있는 타입의 다형성 때문이다.
        // addEventListener(ActionListener al) : ActionListener 를 구현하도록 강제해서 타입을 명확히 한다(오류를 줄인다)

        /*JS 에서 함수형 언어 (유연한 언어를 사용)
           1)
           document.getElementById("userId").addEventListener("change",function(e){});

           2)
           function FetchType(method,formData){ // type(함수가 아니라 타입이 된다.)
                this.method = method;
                this.data = new FormDate(formData);
           }
           fetch("www.naver.com", new FetchType("GET",form));

         */

        // JAVA 는 JS 처럼 멀티스레드가 아니다.
        // swing의 이벤트 리스너는 1개의 스레드가 모든 컴포넌트 이벤트를 감시한다.
        // 따라서 시작버튼을 누르게 되면 actionPerformed 가 스레드를 독점하고 있기 때문에
        // 그 움직임이 끝날때 까지 다른것을 할 수 없다. (즉,GUI가 바뀌지 않는다)
        // 화면에 표시가 안되는 이유 => 셋팅은 할수 있지만 보여주는 것은
        // 생성자쪽에서 이뤄지기 때문에 while 문이 끝날때까지 할 수 없다.

        @Override // 컴파일 할때 재정의 대상인지 검사.
        public void actionPerformed(ActionEvent e) {
            if(!start){
                start =true;
            }
            else{
                return;//public void actionPerformed 함수 종료
            }
            Runnable runnable = ()->{
                //익명 클래스 생성.
                // Runnable @FunctionalInterface(추상메소드가 1개인, 람다식으로 작성가능한 인터페이스) 이다.
                // run()을 override 하는 대신 람다식 집어넣어줌.
                // 버튼을 여러번 누르면 스레드가 여러개 생겨서 카운트를 여러번 증감시킨다.
                while(count>0 && start){
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException ex) {
                        throw new RuntimeException(ex);
                    }
                    count--;
                    screen.setText((count/10.0)+"");
                }
            };
            new Thread(runnable).start();//runnable 을 이용한 쓰레드생성
        }
    }
    class StopBtnHandler implements ActionListener{

        @Override
        public void actionPerformed(ActionEvent e) {
                start = false;
        }
    }

    class InitBtnHandler implements  ActionListener{

        @Override
        public void actionPerformed(ActionEvent e) {
            screen.setText((count=10)+"");
        }
    }

}
/* 📂람다식의 같은 표현.
    1)
    Runnable anonymousRunnable = new Runnable() {
        @Override
        public void run() {

        }
    };

    2)
    Runnable runnable=()->{};
*/
public class L09Timer {
    public static void main(String[] args) {
        // JVM 과 클래스 로더와 메소드 영역
        // main 이 실행되면  main 을 포함하는 패키지 내부의 모든 클래스를 로드해서 메서도 영역에 저장함.
        // import 하고 있는 클래스를 로드해서 메소드 영역에 저장!
         new SwingTimer();




    }
}

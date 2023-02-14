package com.acon;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.text.SimpleDateFormat;
import java.util.Date;



public class L18MultiThread {

    static L18MultiThread out = new L18MultiThread();
    static boolean isClock=true;
    static  JLabel l = new JLabel();

    class RunHandler implements Runnable{
        @Override
        public void run() {
            new Thread(()-> {
                while (isClock) {
                    Date now = new Date();
                    SimpleDateFormat nowsdf = new SimpleDateFormat("hh시 mm분 ss.SSS초");
                    l.setText(nowsdf.format(now));
                    try {  Thread.sleep(1000); } catch (InterruptedException e) {throw new RuntimeException(e);}
                }
            }).start();
        }
    }

    // 특정 매개변수로 추상클래스를 구현하고 객체로 만들어 사용하는 것이 불편해서
    // 추상클래스(Runnable)를 바로 객체로 만들 수 있게 자동완성(익명클래스 생성)을 지원한다.
    public static void main(String[] args) throws InterruptedException {
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy년 MM월 dd일");
        System.out.println(sdf.format(date));

        JFrame f = new JFrame("시계");

        JButton stopBtn=new JButton("멈춤");
        f.add(stopBtn,BorderLayout.SOUTH);
        f.add(l);
        f.setBounds(0,0,200,200);
        f.setVisible(true);

/* #1.       new Thread(()-> {
                while (true) {
                    Date now = new Date();
                    SimpleDateFormat nowsdf = new SimpleDateFormat("hh시 mm분 ss.SSS초");
                    System.out.println(nowsdf.format(now));
                    try {  Thread.sleep(1000); } catch (InterruptedException e) {throw new RuntimeException(e);}
                }
        }).start(); //js의 setInterval 과 같다.
*/

/* #2.       new Thread(()->{
                while (isClock) {
                    Date now = new Date();
                    SimpleDateFormat nowsdf = new SimpleDateFormat("hh시 mm분 ss.SSS초");
                    l.setText(nowsdf.format(now));
                    try {  Thread.sleep(1000); } catch (InterruptedException e) {throw new RuntimeException(e);}
                }
        }).start();*/

    Thread thread = new Thread(new Runnable() {
        //람다식: 익명클래스도 귀찮다. 함수만 매개변수로 쓰게 해달라. (함수형언어처럼)
        //람다식은 추상클래스인데 함수가 1개있는 것만 람다식으로 자동완성됨.
        //아래 예제에서는 run()이 생략되어져 바로 ()->{while~ 로 쓸 수 있다.)
        @Override
        public void run() {
            while (isClock) {
                //익명클래스인 내부클래스에서 지역변수를 참조하는 것은 무리가있다(핑크색표시)
                //조금 무리한 일이니 상수로 정의해달라.
                Date now = new Date();
                SimpleDateFormat nowsdf = new SimpleDateFormat("hh시 mm분 ss.SSS초");
                l.setText(nowsdf.format(now));
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }

            }
        }
    });

//        new Thread(out.new RunHandler()).start();


        stopBtn.addActionListener((e)-> { //버튼을 누르면 호출되는 콜백함수
            isClock=false; //전역에 선언한 변수만 올수 있다.
        });

//        stopBtn.addActionListener(new ActionListener() {
//            @Override
//            public void actionPerformed(ActionEvent e) {
//                isClock=false;
//            }
//        });
        //😎 위의 과정이 생략되면서 더 위의 값으로 정리(람다식)

        //System.out.println("다음일을 하고 싶다.");// 스레드가 1개이고 1개가 while을 실행하고 있기 때문이다.
//addActionListener 가 버튼에 이벤트가 발생하면 재정의된 이벤트 핸들러(콜백함수)를
// 실행하면서 이벤트에 대한 정보를 콜백함수의 매개변수로 전달


        //자바가 ActionListener 를 매개변수로 받는 이유는 타입이 명확한 언어라 함수를 매개변수로 사용할수 없어서.
        //JS가 함수를 매개변수로 사용하는 이유?
        //stopBtn.addEventListener("click",(e)=>{
        // })
        //e : 자바스크립트의 이벤트 리스너가 버튼에 이벤트가 발생하면 재정의된 콜백함수를 실행하면서
        //콜백함수의 매개변수로 이벤트 정보를 전달




    }


}


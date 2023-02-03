package com.acon;

import java.util.Scanner;

class ConsoleTimer implements Runnable{//멀티 스레드로 생성되려면 Runnable을 구현해야한다.
    int index =10;
    boolean start = true;
    @Override
    public void run() {
        while(index>0 && start){
            System.out.println(index--);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
        System.out.println("타이머 종료!");
    }

}

public class L08MultiThread {
    public static void main(String[] args) {
        ConsoleTimer consoleTimer = new ConsoleTimer();
        new Thread(consoleTimer).start();//구현한 run 메소드를 스레드 생성 후 실행 (나는 사실 이게 좀..어려워 생성자호출규칙이잇니?)

        Scanner sc = new Scanner(System.in);
        System.out.println("0을 입력하면 타이머가 종료");// 타이밍 잘 맞춰서 입력해야...되는데??ㅋㅋㅋㅋㅋㅋ
        String num = sc.next();
        System.out.println("입력한 번호: "+num);
        if(num.equals("0")) consoleTimer.start=false;


    }
}

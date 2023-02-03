package com.acon;

import java.util.Scanner;

public class L07Thread {
    public static void main(String[] args) throws InterruptedException {
        // Thread : 일의 단위
        // java.lang.Thread : 스레드를 생성할 수 있는 객체
        // main() : 실행하는 일의 집합으로 기본 1 스레드를 갖는다.
        // 순차적 언어 : main 에 작성한 코드가 한개의 스레드에 의해서 순서대로 실행된다는 의미.

        //💚 index 10을 0까지 1씩 줄이면서 콘솔에 출력하는 어플을 만들어보자.
        //   이때 카운트 구동 중간 0을 누르면 카운트를 멈추고 시스템을 종료하게 만들어보자.
        int index= 10;
        boolean start= true;
        Scanner scanner = new Scanner(System.in);
        System.out.println("0을 누르면 카운터가 종료됩니다.");
        String num = scanner.nextLine(); //console 창에서 입력하는 문자열과 JVM 이 통신해서 받아오는 결과는 무조건 문자열이다.
                                        //입력할때까지 구동하지않음.(쓰레드를 추가하지 않는 한 독점하고있음=>무한반복문)
        if(num.equals("0")) start= false;

        while(index>=0 && start ){
            System.out.println(index--);
            Thread.sleep(1000);//millis: 1/1000초
        }

        System.out.println("타이머 종료");

    }
}

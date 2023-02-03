package com.acon;

public class L06Casting {

    public static void main(String[] args) {
        byte b = 127;
        System.out.println(Byte.MAX_VALUE);
//        b=128;// 컴파일 오류 (해당 타입은 byte 보다 큰 값을 참조 할 수 없다)
        b=(byte)128; // 기본형은 수를 값으로 저장하기 때문에 더 큰 수를 더 작은 타입이 참조 할 수 없다.
        System.out.println(b); // loss of data(값손실이 발생 byte<short<int<long 간의 형변환)


        System.out.println(Integer.MAX_VALUE);//2147483647
        System.out.println(2147483648L);// 수를 리터럴하게 선언하면 무조건 int 가 정의된다. 따라서 그보다 큰 수인 L 로 정의해야한다.
        long l1 = 2147483648L;  //L을 적지않으면, 수는 기본적으로 리터럴하게 작성시 int를 받기 때문에 오른쪽 수는 int 값이다.
                                //따라서 오른쪽 수의 범위가 맞지 않게 되지않아서 컴파일 오류가 뜨게 된다.
        int i =(int)l1;
        System.out.println(i);//-2147483648 음수로 거꾸로 가면서 하나씩 줄어든다. ex) l1=2147483649 인경우 출력 -2147483647



        float f = 13.3f;    // 실수 끝에 f를 붙이고 리터럴하게 선언하면 float 가 된다.
                            //수를 리터럴 하게 선언하면 double 타입으로 정의되기 때문에 f로 명시하지 않으면 컴파일 오류(타입불일치+범위불일치).
        double d = 13.3;    // ❓ 그럼 왜 기본으로 double 을 정의할까?
        System.out.println(Double.MAX_VALUE);//1.7976931348623157E308
        d=1.7976931348623157*Math.pow(10,310);
        System.out.println(d);//double 이 표현할 수 있는 수 보다 큰 수 //Infinity

        System.out.println(Float.MAX_VALUE);
        f=(float) 3.4028235E50;
        System.out.println(f);// float 이 표현할 수 있는 수보다 큰 수 //Infinity
        //❗❗ 실수는 참조할 수 있는 수보다 큰 수를 무한대라고 한다.

        //정수 -> 실수 (😥부동소수점 찾아보자..)
        // 실수의 가수부가 정수로 정의하고 가수부로 표현할 수 있는 수보다 크면 지수부가 정의된다.(X)
        // 해당 정수를 지수표기법(부동소수점)으로 변경하고 가수가 표현할 수 있는 수만 가수부로 정의(O)
        // EX) 2147483647 => 2.14748365E9 지수부에 9, 가수가 21474 를 저장
        i=Integer.MAX_VALUE;
        f=i; //실수가 정수보다 큰 수를 정의할 수 있기 때문에 형변환 할 필요가 없다.
        System.out.println(f);
        // -> 엄청 큰수나 엄청 작은 수를 계산하기 위해

        //실수-> 정수
        //정수로 표현할 수 없ㄴ느 큰 실수가 정수로 변환: 정수타입이 정의할 수 있는 가장 큰 수를 정의
        d = 12345678901234567890.0;
        System.out.println(d);
        i= (int) d;
        System.out.println("(큰)실수를 정수로 변환: "+i);

    }
}

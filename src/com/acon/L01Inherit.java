package com.acon;
class A{//A.java 문서를 만드는 것과 같지만 배포할 수 없다.(public 클래스만 배포 가능)
    public void a(){
        System.out.println("A.a 입니다.");
    }
}
class B extends A{// A+B
    @Override // 어노테이션이 하는일? 컴파일 시 동작하며 검사 및 세팅을 한다. (종류 @Override 외에도 더 있음. 많이 알수록 개발이 편리)
    public void a() {
//        super.a();//부모재원을 나타냄. 얘를 주석처리하면 "A.a 입니다" 가 안뜸.
        super.a();
        System.out.println("B.a 로 재정의 합니다.");
    }
    public void b(){}
}
class C extends B{// C+B+A
    public void c(){}
    public void c(int a){}
    // 📌오버로드(Overload): 함수의 이름은 같은데 매개변수가 달라서(타입과, 인수) 다르게 동작
    // (주의: 반환타입으로는 명확하게 동작하지 않음)
}





public class L01Inherit {
    class A{}
    // 내부 클래스 (inner class)로 실제 이름은 L01Inherit$A.class 로 컴파일 된다.
    // 📍부모 클래스를 인스턴스로 생성해야 내부 클래스를 생성할 수 있다.
    // 자식 클래스가 부모클래스의 필드를 제어할 수 있다.

    public L01Inherit() {
        A a = new A();  // 내부 클래스를 정의하는 이유! (부모클래스가 내부 클래스를 정의해서 끌어다 쓰기 위함)
                        // 배포될 필요없고, 내부적으로만 정의하는 클래스 (장점: 이름짓기가 편리)
    }


    public static void main(String[] args) {
        //public class : import 가능(배포가능)한 클래스, java 문서의 주인.(발행되는)
        //java 컴파일( JDK 에 있는 javac 가 해줌): java 문서를 class 파일로 변환
        //JVM: class 파일을 플랫폼(OS)에 맞게 해석해서 실행하는 가상 머신(자바는 플랫홈에 독립적이다.)
        //❓ L01Inherit.java 를 컴파일 하면 생기는 .class 문서는 몇개일까? 3개..
//        L01Inherit.A inA = new A();//📍 ERROR
          L01Inherit.A inA = new L01Inherit().new A();// 보통 이렇게 사용하지 않고 부모 내부에서 내부클래스를 인스턴스로 생성해서 작업.

        //위의 생성자 호출과 같은 의미
//        L01Inherit innerA = new L01Inherit();
//          innerA = new A();
        //근데 대부분 위에처럼 정의한다기 보다는 부모클래스 내부의 생성자 호출로 꺼낸다.

        //🔎단축키)alt + insert : 생성자 생성

        //📂타입의 다형성: 객체가 부모의 타입이 될 수 있는 것
        C c = new C();
        B b = c;
        com.acon.A a = c;
        Object o = c;
        c=(C)o; // int i =(int)13.4; (이둘은 동작원리가 다르다)

        //❓ 객체지향 문법에서 상속이란 무엇일까요? : 부모클래스의 재원을 사용하거나 재정의(오버라이드) 하는것
        //❓ 객체 재사용의 전략? 모듈화 한것들을 추상화 하고 구현한다.
        // 📂객체지향 설계 5대 원칙 'SOILD' :(외우는것은 아니고 그냥 알고있으렴)
            // SRP(단일 책임 원칙=모듈화), OCP(개방-폐쇄 원칙=캡슐화), LSP(리스코프 치환 원칙),
            // DIP(의존 역전 원칙=최대한 추상적인 것에 의존할수록  변화하기 쉽다.), ISP(인터페이스 분리 원칙)을 말한다

        //❓ 객체 지향 문법에서 다형성(한개의 이름이 여러가지 일을 하는것)이란 무엇일까?
        //  다형성이란프로그램언어 각 요소들이 다양한 자료형에 속하는 것이 허가되는 성질을 가리킨다.
        //  이름 한개에 다양한 역할을 부여해서 코드 작성을 편리하게 하는 문법
        //  Overload, Override ,타입의 다형성이 잇다.
        //  Overload: 함수의 이름은 1개인데 매개변수를 다르게 지정해서 이름짓기를 편리하게 한것
        //  Override: (상속받은)자식이 부모의 메서드를 재정의 하므로써 자식메서드가 동작하게 하는 것.
        //  타입의 다형성: 객체를 부모의 타입으로 참조할 수 있어서 변수의 타입을 복잡하게 정의할 필요가 없다.
        //  -> 캐스팅 형변환시 오류를 야기할 수 있다. -> 제네릭 등장.
            Object iObj = "13";
            int i = (int)iObj;//  컴파일이 발견 못하는 오류




    }
}

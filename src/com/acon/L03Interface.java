package com.acon;
interface InterTest01{
     void a();
}
@FunctionalInterface    //1)추상메서드가 오직 1개 있는 인터페이스에 정의가능.
                        //2)람다식으로 구현을 대신 할 수 있다.(대신 익명클래스는 별도로 만들어야함, 자동생성 X)
interface InterTest02{
    void a();
}

class InterTestImpl implements InterTest01, InterTest02{
    @Override
    public void a(){//무조건 public 만 추상메서드로 사용가능.
         System.out.println("구현부(body)가 없기 때문에 인터페이스의 메소드명이 같아도 문제되지 않는다.");
     }

}
public class L03Interface {
    public static void main(String[] args) {
        // 인터페이스 : 엄청 추상화 된 설계도
        // 설계도를 추상화 하는 이유 : 1) 설계도가 모두 구체화 되어있으면 파악하기 어렵다.
        //                         2) 추상화된 설계도를 재사용하기가 용이하다. (유지보수가 용이)
        //  다른 설계도와 중복되도 크게 문제가 되지 않는다.

        // 인터페이스는 모든 메서드가 추상이어야 한다.
        // 클래스 는 모든 메서드가 추상일 수 없다.
        // 즉, 클래스가 인터페이스를 implements 하면 모든 추상메소드를 구현해야한다.(body작성을 의미)

//        InterTest01 interTest01 = new InterTest01(){}; // 인터페이스는 생성자 생성 불가.// 구현한 곳에서 불러와야함.


        //인터페이스의 표현 1️⃣
        InterTestImpl interTest = new InterTestImpl();
        interTest.a();
        //👀..근데 구현클래스도 만들기 번거로워~ 그렇다면한번에 만들수 있어요.

        //인터페이스의 표현2️⃣
        //바로 구현부를 작성
        InterTest01 interTest01 = new InterTest01() {//생성과 동시에 구현
            @Override
            public void a() {
                System.out.println("인터페이스는 생성자를 호출할 수 없지만 생성과 동시에 " +
                        "구현부를 적을수있다(일일히 구현클래스를 만들 필요 없음)");
            }
        };

        // ==> 클래스를 만들고 추상메서드를 구현하는 행위를 생략해도 JVM 이 자동으로 익명 클래스를 만들어서 구현됨.
        // 📂 JVM 이 자동으로 하는일
        //      -L03Interface 의 내부 클래스로 1을 생성 (익명 클래스)
        //      -Class 1 implement InterTest01 { public void a(){} } 을 대신해줌.
        //              ->이게 실존 실제 메인함수에 전달되는것은 (Syntactic sugar) 이다.

        //인터페이스의 표현3️⃣
        //람다식 (Syntactic sugar: 문법적설탕, 문법만 존재하고 실존하지 않는다. 람다식이나 익명함수표현등)
        //추상메서드가 1개 있는 인터페이스에 @FunctionalInterface 를 명시하면 작성가능.
        InterTest02 interTest02 = ()->{  }; // public void a() 함수를 람다식으로 표현



    }
}

package com.acon;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.function.*;

public class L10Lambda {
    private static int sum2;

    public static void main(String[] args) {
        //📂 람다식(익명함수) 이란? 추상메서드가 1개 있는 인터페이스를 화살표 함수를 이용해 객체로 생성하는 것
        //   함수형언어를 흉내내는것.
        //   객체지향 문법에서 함수를 매개변수로 사용하기 위한 문법적 설탕.
        //👀내생각..>> 정확히는  함수형 인터페이스를 가진 익명클래스, 함수형 언어를 흉내낸다.

        //❓ Q1. 객체지향 문법에서 함수를 매개변수로 사용할 수 있나요?
        //  A1. 함수는 타입이 아니기 때문에 매개변수로 전달 할 수 없다.
        //❓ Q2. 람다식을 사용한다는 것은 자바가 함수형 언어의 특징을 갖는 것이 아닌가요?
        //  A1. 아닙니다 자바가 코드를 줄이기 위해 함수를 매개변수로 보낼 수 있는 척 하는것(static sugar) 입니다.
        //❓ Q3. 함수형 언어가 무엇인가요?
        //  A3. 함수가 타입이 되는 언어입니다. 대표적으로 자바스크립트가 있고 프로토타입의 함수형 언어입니다.
        ActionListener actionListener = new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {

            }
        };
        ActionListener actionListener1 = (event) -> {
        };

        // 자바는 타입이 명확한 언어기 때문에 람다식으로 사용하는 인터페이스를 미리 정의해 두었다.
        // 대부분 StreamAPI 에서 사용됨
        Function function = (p) -> {
            return p + "";
        }; //return 값이 존재
        Function<Integer, String> function1 = (p) -> {
            return p + "";
        }; //integer로 들어온 타입이 String 타입으로 반환된다.
        //<매개변수,반환값타입>                               //매개변수와 반환값이 있고, 타입이 다른것
        Consumer<Integer> consumer = (p) -> {
        };// 매개변수만 존재하는 함수
        BiConsumer<Integer, Integer> biConsumer = (p, p1) -> {
        };//매개변수가 2개인 함수
        Supplier<String> supplier = () -> {
            return "";
        };
        Supplier<String> supplier2 = () -> "";//return 의 생략 블럭이 없고,실행코드가 하나일때 리턴을 자동으로 한다.
        BinaryOperator<Integer> operator = (i, i2) -> i + i2;//다항연산
        UnaryOperator<Integer> operator1 = (i) -> i * i;//단항연산
        Predicate<String> intPredicate = (s) -> {//현재 예제는, 문자열이 정수인지 검사하는 식
            boolean p = false;
            try {
                int i = Integer.parseInt(s);
                p = true;
                return p;
            } catch (Exception e) {
            }
            return p;
        };

        //📂함수형 인터페이스: 자바는 타입이 명확한 언어기 때문에 람다식으로 사용하는 인터페이스를 미리 정의해 두었다.
        // Runnable : 매개변수도 없고 반환값도 없는 함수 (멀티스레드를 만들때 사용)
        //                >> run으로 호출 (스레드생성시는 start()로 호출)
        // Function : 매개변수와 반환값이 있고 타입이 다른 함수
        //                >>apply로 호출
        // Consumer : 매개변수만 존재하는 함수
        //              >> accept로 호출
        // Supplier :  리턴값만 존재하는 함수.
        //              >> get으로 호출
        // BinaryOperator: 매개변수가 2개이고, 반환하는 값이 있는 함수로 타입이 모두 같다.(2개의 값을 연산하기 위해 정의)
        //                  >> apply 로 호출
        //   -DoubleBinaryOperator, IntBinaryOperator,LongBinaryOperator :
        //              제네릭은 자료형만 가능하기 때문에 기본형도 매개변수로 사용할 수 있도록 하는 함수.
        System.out.println("130+47=" + operator.apply(130, 47));// BinaryOperator의 예
        // Predicate : 매개변수를 검사한 결과(boolean)를 반환하는 함수
        //              >>test 로 호출
        // (Funxtion,Consumer,Predicate 는 (=즉 매개변수가 있는경우)  Bi- 앞에 붙여주면 매개변수가 2개인 함수로 정의된다/
        System.out.println("'삼'은 정수인가요?" + intPredicate.test("삼"));
        System.out.println("'33'은 정수인가요?" + intPredicate.test("33"));

        String[] strArr = {"1", "23", "삼", "101"};
        for (String s : strArr) {
            System.out.println(s + " 의 배열의 값을 정수 인가요?" + intPredicate.test(s));
        }
        //Stream API : 내부 반복문을 작성해서 반복문을 유지보수하기 유리하도록 작성하기 위해 만들어짐.
        //filter(Predicate) : 중간연산으로 검사식을 만족하지 않는 요소를 제외하는 내부 반복문
        //forEach(Consumer) : 최종연산으로 스트림을 소비하는 내부 반복문, 보통 검사할 때 많이 사용


        // 함수와 메서드 : 함수는 메서드의 한국말. 함수는 수학에서 유래되었고 프로그래밍이세는 정의할 수 있는 연산의 단위 가 된다.
        // 함수와 메서드는 같은 말이다. 함수형 언어에서 함수는 유닛이가 객체지향언어에서 함수는 유닛의 필드이다.
        // 자바에 정석에서는 함수형 언어의 메서드를 함수라고 하고, 객체지향의 메서드를 메서드라고 구분해서 사용.
        Arrays.stream(strArr)
                .filter((s) -> {
                    try {
                        int i = Integer.parseInt(s);
                        return true;
                    } catch (Exception e) {
                        e.getStackTrace();
                    }
                    return false;
                })// 이결과를 마치면 배열에 true인것만 남음.
                .forEach((s) -> {
                    System.out.println(s);
                });

        // Collection (List, Set, Map etc.) 의 메소드를 람다로 재정의 가능
        List<Integer> numList = new ArrayList<>();
        numList.add(77);
        numList.add(7);
        numList.add(777);
        numList.add(7777);
        numList.add(77777);
        int sum = 0;
        for (int i = 0; i < numList.size(); i++) {
            sum += numList.get(i);
        }
        System.out.println(sum);

        sum = 0;
        for (int num : numList) {
            sum += num;// num.intValue()// 자동형변환(랩퍼클래스의)
        }
        System.out.println(sum);
        //JS 같은 생산성이 높은 언어들은 내부반복문을 사용한다 -> 자바에서도 내부 반복문이 도입!
        sum = 0;

        //람다식은 중첩클래스로 정의된 타입으로 지역변수를 참조할 수 없다.
        //하지만 자바가 참조할 수 있도록 도와준다 (컴파일러가 코드변환을 하는 것을 추측))
        //도움의 한계가 있어서 지역변수를 상수로 취급한다.
        numList.forEach((n) -> {
//            sum += n; // 지역변수
            sum2 += n;//필드
        });
        System.out.println(sum2);
    }

}

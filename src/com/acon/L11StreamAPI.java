package com.acon;

import java.util.stream.Stream;

public class L11StreamAPI {
    public static void main(String[] args) {
        //📂 Stream 과 Stream API 은 다른 것이다.
        // InputStreamReader -> Stream : 입출력의 이름
        // Arrays(배열).stream().foreach(); -> Stream API

        //📂Stream API : 이터레이터와 유사한 자료구조로 내부 반복문이 정의되어있다.
        // 자바는 Stream API를 이용해서 모든 자료 구조를 통일된 반복문을 사용할 수 있도록 하는것이 목표.
        // {},List,Map,Set등의 자료구조가 다 다른방식으로 반복문을 사용해왔다. 때문에 반복문을 재사용하는 것이 어려워졌다.
        // 때문에 반복문을 재사용하는것이 어려워졌다.
        // (반복문의 특정 코드를 함수로 변형해서 재사용할 수 있지만 반복문 자체는 재사용하기 힘들다.)
        // 내부반복문(forEach)은 코드 전체를 함수로 재정의하기 때문에 재사용성이 높고, 유지보수가 용이하다.
        // 내부반복문에 이름을 정하고 메소드 체이닝으로 연결해서 재사용성과 가독성을 더 좋게 만들었다.

        //📂Stream 의 특징
        // 1) Stream 은 일회용이다.
        // 2) Stream 은  데이터 소스를 변경하지 않는다.
        // 3) Stream 은 작업을 내부 반복으로 처리한다. (= iterator 와 유사한 구조로 되어있다)

        // 자바에서 이런 내부반복문의 장점을 사용하기 위해 Array와  Collection의 모든 자료를 Stream이라는
        // 이터레이터와 유사한 자료로 변환할 수 있도록 정의하고 Stream 의 필드로 내부 함수를 정의했다.

        // 내부함수를 크게 3가지로 나누는데 중간연산, 최종연산, 컬렉트 연산(최종연산의 일부) 으로 나누어 서로 다른 역할을 부여했다.
        // 특히 중간연산은 연산의 결과가 Stream으로 중간연산을 연결함으로써 반복문을 중첩하는 효과를 갖는다.

        /* 📂Stream API 중간연산 (중간연산은 메소드체이닝을 위해 무조건 Stream을 반환하고 최종연산과 같이 사용한다)
        *   - distinct : 중복을 제거 (기본형 과 (equals가 구현된) 자료형 만 가능)
        *   - map(Function) : 스트림의 각 요소를 변형하기 위한 반복문 (매개변수가 현재 요소이고, 반환하는 것이 바뀌는 요소)
        */

        // distinct 의 예제
        Stream.of(1,1,2,2,3,4,5).distinct().forEach((n)->{
            System.out.print(n+" ");
        });
        System.out.print("\n\n");

        Stream.of("1",new String("1"),"2","2","3","4","5").distinct().forEach((n)->{
            System.out.print(n+" ");
        });
        System.out.print("\n\n");

        //메서드 참조: 컴파일러가상상할 수 있는 만큼 생략할 수 있다.(코드를 줄일수록 비용이 절감됨)
        Stream.of("1",new String("1"),"2","2","3","4","5").distinct().forEach(System.out::print);
        System.out.print("\n\n");

        //Map의 예제
        Stream.of("1",new String("1"),"2","2","3","4","5")
                .distinct() // 새로운 스트림을 반환함.(중간연산의 특징)
                .map(Integer::parseInt)//이때 모든 요소가 정수로 바뀐다.
                .map((i)-> i*i)//나열되는 수를 제곱합니다.
                .forEach(n-> System.out.print(n+" "));// 최종연산이 끝나면 스트림은 다시 정의해야한다.(한번밖에못해)
    }
}

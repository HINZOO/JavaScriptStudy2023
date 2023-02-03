package com.acon;


import java.util.*;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.DoubleStream;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import static java.lang.Long.sum;

class NullCheck implements Predicate {
    @Override
    public boolean test(Object o) {
        return o != null;
    }
}


public class L12StreamIntermediate {

    public static void main(String[] args) {
        int[] intArr = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
//        List list = List.of(intArr);
        //Collections 로 변환해서 사용하지 않는다.(요소들의 타입을 기본형으로 쓸 수 없기때문)
        IntStream stream = Arrays.stream(intArr);
        //Stream 은 기본형 스트림이 존재 : IntStream, LongStream, DoubleStream (byte,short,float,boolean,char 은 없다)

        //📂 <스트림의 연산>
        //   - 중간 연산 : 연산 결과가 스트림인 연산, 스트림에 연속해서 중간연산 할 수 있음.
        //   - 최종 연산 : 연산결과가 스트림이 아닌 연산, 스트림의 요소를 소모하므로 단 한번만 사용가능.
        //📂 중간연산의 종류(1)
        // skip(long n ) : 건너뛰는 연산
        // limit(long maxSize) : 길이만큼 잘라내는 연산

        int[] intArrSkip = Arrays.stream(intArr)
                .skip(3)
                .toArray();
        System.out.println("skip(3) " + Arrays.toString(intArrSkip));

        int[] intArrLimit = Arrays.stream(intArr)
                .limit(5)
                .toArray();
        System.out.println("limit(5) " + Arrays.toString(intArrLimit));//처음부터 5번째 까지 자르기.

        int[] intArrSkipLimit = Arrays.stream(intArr)
                .skip(3)
                .limit(4)// 스킵과 리미트의 순서를 바꾸면 [4]만 나옴.
                .toArray();

        System.out.println("[4,5,6,7]skip(3).limit(4):: " + Arrays.toString(intArrSkipLimit));


        //📂 중간연산의 종류(2)
        // distinct() : 중복제거 (자료형 포함)
        // filter(Predicate (e)->Boolean) : Predicate 함수형으로써 boolean 값을 반환)
        Integer[] intArr2 = {1, 2, 2, null, 3, 3, 4, null, 5, 6, null, 7, 7, 8, 9, 10};


        //💚 ArrayList를 이용하여 null 값 제거(배열자체로 for 문을 바로 적용할 수 없다 (배열의 길이를 바꿀수 없기 때문))
        List<Integer> listArr2 = new ArrayList<>();// 반드시 List 화 하여 계산해야한다.
        for (Integer i : intArr2) {
            if (i != null) {
                listArr2.add(i);
            }
        }
        System.out.println("배열을 사용한경우: e != null");
        System.out.println("listArr2:" + listArr2 + "\n");

        //💚 Stream 을 이용해서 null 제거
        // 🍒 Array의 스트림 변환 : 무조건 Arrays.stream()으로만 변환 가능(암기!)
        Stream<Integer> intArrStream2 = Arrays.stream(intArr2);
        List intList2 =
                //💚case1 외부객체 생성 후 필터에 대입)//(List) intArrStream2.filter(new NullCheck())
                //💚case2 외부객체 생성하지않고 안에서 바로 override
//                    intArrStream2.filter(new Predicate<Integer>() {
                // 추상클래스나 인터페이스는 객체가 될수없다 단, 추상메서드를 생성과동시에 구현하면 가능.
                // 이때 내부 클래스로 익명클래스 생성 후 해당 인터페이스 구현 -> 익명클래스가 객체로 생성
//                                @Override
//                                public boolean test(Integer o) {
//                                    return o!=null;
//                                }
//                            })
                //💚case3 이를 더 간단하게 람다식으로 나타냄
                intArrStream2.filter(o -> o != null)
                        .collect(Collectors.toList());//최종연산
        System.out.println("filter((e)->e!=null)");
        System.out.println("intList2:" + intList2 + "\n");


        System.out.println("위 배열의 중복을 없애고 null을 제거하세요 : ");
        List intList3 = Arrays.stream(intArr2).distinct().filter(n -> n != null).collect(Collectors.toList());
        System.out.println("intList3: " + intList3);

        System.out.println("위 배열의 중복을 없애고 null을 제거한뒤 모두 더하세요(reduce사용) : ");
        Optional<Integer> sum1 = Arrays.stream(intArr2).filter(n -> n != null).distinct().reduce((total, n) -> total + n);
        // reduce(초기값,(변수,변수)->스트림의 요소를 하나씩 줄여가면서 계산
        // Optional : 결과가 null 일 수도 있다고 알려주는 타입
        System.out.println("intArr Sum1 case1: " + sum1 + sum1.isEmpty());// isEmpty(): Optional의 메소드,  값이 있는지 체크.
        int sum2 = Arrays.stream(intArr2).distinct().filter(n -> n != null).mapToInt(Integer::valueOf).sum();
        System.out.println("intArr Sum2 case2: " + sum2);

        //📂 중간연산의 종류(3)
        // map(Function): 요소를 다른 데이터로 바꾸는 중간 연산
        // mapToInt,mapToLong, mapToDouble : 요소를 기본형(값)으로 바꾸고 기본형 스트림을 반환하는 중간연산
        // flatMap(Function): 스트림의 형태가 배열과 같을 때, 모든 원소를 단일 원소 스트림으로 반환할 수 있음.
        // IntStream, LongStream, DoubleStream (기본형 스트림): 자료형 만을 요소로 사용할 수 있는 컬렉션의 한계를 극복하기 위해.
        // 기본형(값)을 정의하는 이유?? 수를 정의하는 이유, 연산을 하기위해서
        //                          cf)기본형의 또다른 수>>>boolean(0/1, 1byte(자바의최소참조단위)의 기본형으로 1bit 의 수를 표현),char(유니코드번호)
        // 기본형 stream에는 연산에 유용한 최종연산을 제공 >> (sum, average : reduce 변형)

        //👀 js: null=>0 , java: null=>0:오류


        String[] strArr = {"1", "2", "2", null, "3", "3", "4", null, "5", "6", null, "7", "7", "8", "9", "10"};

        Optional<Integer> strArrToInt1 = Arrays.stream(strArr).filter(n -> n != null).map(e -> Integer.parseInt(e)).reduce((n1, n2) -> n1 + n2);
        System.out.println("case1) 다음 배열을 정수로 바꾸고 전체의 합을 구하세요!: " + strArrToInt1);

        OptionalInt strArrToInt2 = Arrays.stream(strArr).filter(n -> n != null).mapToInt(Integer::parseInt).reduce((n1, n2) -> n1 + n2);
        System.out.println("case2) 다음 배열을 정수로 바꾸고 전체의 합을 구하세요!: " + strArrToInt2);

        int strArrToInt3 = Arrays.stream(strArr).filter(n -> n != null).mapToInt(Integer::parseInt).sum();
        System.out.println("case3) 다음 배열을 정수로 바꾸고 전체의 합을 구하세요!: " + strArrToInt3);

        OptionalDouble strArrToInt4 = Arrays.stream(strArr).filter(n -> n != null).mapToInt(Integer::parseInt).average();
        System.out.println(" 다음 배열을 정수로 바꾸고 전체의 평균을 구하세요!: " + strArrToInt4.getAsDouble());


//💚 원본///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//        Optional<Integer> sum3 = Arrays.stream(strArr)
//                                  .filter(n->n!=null)
//                                  .map(e->Integer.parseInt(e))
//                                  .reduce((n1,n2)->n1+n2);
//        System.out.println("case1) 다음 배열을 정수로 바꾸고 전체의 합을 구하세요!: "+sum3);
//
//        OptionalInt strArrToInt1=
//                Arrays.stream(strArr)
//                        .filter(n->n!=null)
//                        // .mapToInt((e)->Integer.parseInt(e))
//                        .mapToInt(Integer::parseInt)//메서드참조=>매개변수를 함수가 실행하면서 사용할때,
//                        .reduce((n1,n2)->n1+n2);
//        System.out.println("case2) 다음 배열을 정수로 바꾸고 전체의 합을 구하세요: "+strArrToInt1);
//
//        int strArrToInt2=
//                Arrays.stream(strArr)
//                        .filter(n->n!=null)
//                        .mapToInt(Integer::parseInt)
//                        .sum();
//        System.out.println("case3) 다음 배열을 정수로 바꾸고 전체의 합을 구하세요: "+strArrToInt2);
//
//        OptionalDouble strArrToInt3=
//                Arrays.stream(strArr)
//                        .filter(n->n!=null)
//                        .mapToInt(Integer::parseInt)
//                        .average();// OptionalDouble 타입인점 유의!
//        System.out.println("다음 배열을 정수로 바꾸고 전체의 평균을 구하세요: "+strArrToInt3.getAsDouble());
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        //sorted() :  정렬한 Stream 을 반환 (Comparator 가 정의되어야 사용가능)
        //대문자를 먼저 정렬하는 이유: 아스키 코드표의 번호가 대문자가 앞에 있어서
        //문자의 정렬 : 유니코드의 번호로 정렬 (알파벳 + 타 문자들도 포함)
        String strArr2[] = {"Car", "ZZ", "Cap", "zz", "ab", "A", "Apple", "aa"};
        List<String> strArrSorted = Arrays.stream(strArr2)
                .sorted()// 대문자->소문자, a->z정렬
                .collect(Collectors.toList());

        System.out.println("sorted() :" + strArrSorted);

        strArrSorted = Arrays.stream(strArr2)
                .sorted(String.CASE_INSENSITIVE_ORDER)//동등한게 있다면 대문자가 우선.
                .collect(Collectors.toList());
        System.out.println("sorted(String.CASE_INSENSITIVE_ORDER) " + strArrSorted);

        strArrSorted = Arrays.stream(strArr2)
                .sorted()//정렬은 여러번 가능.
                .sorted(Comparator.comparing((s) -> s.length()))//길이가 짧은 순서대로 정렬
                .collect(Collectors.toList());
        System.out.println("sorted().sorted(s.length) " + strArrSorted);


//        Arrays.stream(strArr)
//                .sorted()
//                .sorted(Comparator.comparing((s)->((String)s).length()))
//                .forEach(System.out::println);
//        System.out.println("map((n)->2*n)");
//        //map() :stream의 값을 변환하는 함수
//        Arrays.stream(intArr2)
//                .filter((n)->n!=null)
//                //.peek(System.out::println)
//                .distinct()
//                .map((n)->(double)(2*n) ) //기존의 값을 다른 타입으로 변경 -> 변경된 스트림으로 반환됨
//                .forEach(System.out::println);


    }
}
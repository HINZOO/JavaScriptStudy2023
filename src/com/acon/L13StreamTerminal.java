package com.acon;

import java.time.LocalDate;
import java.util.*;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class L13StreamTerminal {
    class Person{
        private String name;
        private int birth;
        private String gender;
        public Person(String name,int birth,String gender) {
            this.name=name;
            this.birth=birth;
            this.gender=gender;
        }
        @Override
        public String toString() {
            return "["+name+", "+birth+", "+gender+"]";
        }
        public String getName() {
            return name;
        }
        public void setName(String name) {
            this.name = name;
        }
        public int getBirth() {
            return birth;
        }
        public void setBirth(int birth) {
            this.birth = birth;
        }
        public String getGender() {
            return gender;
        }
        public void setGender(String gender) {
            this.gender = gender;
        }

    }
    public static void main(String[] args) {
        //📂 StreamAPI 의 최종연산 (🍒암기)
        //forEach(Consumer (T)->{} )  : 보통 결과를 출력할 때 많이 사용
        //reduce(BinaryOperator(n1,n2)->n3) : 하나의 결과를 반환하기 위해 사용.
        //toArray(): 스트림 자료를 배열({})로 변환
        //Collect(collectors.to~) : 스트림 자료를 컬렉션(List(Array,ArrayList,Vector,LinkedList),Set(TreeSet,hashSet),Map)의
        //                          자료형으로 반환
        //count(): 스트림의 길이 반환
        //max,min(Comparator)
        //sum(),average() : 기본형 스트림에만 존재
        //(all/none/any)Match(predicate) : 모두가 검사식에 충족/아무도 검사식에 충족하지않음/하나라도 검사식에 충족 (boolean)


        L13StreamTerminal out=new L13StreamTerminal();
        ArrayList<Person> personList=new ArrayList<Person>();
        personList.add(out.new Person("김유진",2000,"여자"));
        personList.add(out.new Person("박현우",1995,"남자"));
        personList.add(out.new Person("김승현",2002,"남자"));
        personList.add(out.new Person("김성현",1999,"남자"));
        personList.add(out.new Person("이서윤",2004,"여자"));
        personList.add(out.new Person("김지영",1980,"여자"));
        personList.add(out.new Person("박시우",1990,"남자"));
        System.out.println(personList.toString());

        System.out.println();

        //❓Q1)personList 에서 남자의 이름만 배열로 만드세요.
        //A1-1) 반복문 사용
        int size=0;
        List manNameList = new ArrayList();
        for(Person p : personList){
            if(p.getGender().equals("남자")) {
                size++;
                manNameList.add(p.getName());
            }
        }
        System.out.println("남자의 수 : " + size);
        System.out.println("남자의 이름 : " + manNameList);
        //A1-2) Stream 사용 (재가공을 위해 배열로 받는다)
        String[] manNameArr = personList.stream()
                .filter((p) -> p.getGender().equals("남자"))
                .map(p -> p.getName())
                .toArray(String[]::new);
        System.out.println("남자의 이름: "+ Arrays.toString(manNameArr));

        //❓ Q2) 2000년도 이후에 태어난 사람의 이름을 배열로 반환하세요! (교수님은 Object객체로 하셨엄)
        Object[] birth2000 = personList.stream()
                .filter((p)->p.getBirth()>=2000)
                .map(Person::getName)
                .toArray();
        System.out.println("2000년도 이후에 태어난 사람 이름: "+Arrays.toString(birth2000));

        //❓ Q3) 30살 이하의 여성의 이름.
        List<String> nameList2 = personList.stream()
                        .filter(p->p.getGender().equals("여자"))
                        .filter(p->(2023-p.getBirth()<31))
                        .map(Person::getName)
                        .collect(Collectors.toList());
        System.out.println("30살 이하의 여성의 이름: "+nameList2);




        //💚 이름들만 나열하기(1)
        Stream<Person> personStream=personList.stream();
        personStream.forEach((p)->{
            System.out.print(p.name+" ");
        });
        System.out.println();

        //Optional<T> reduce(BiOperator (i1,i2)->{return ?? }) : Stream<T> 각요소들을 하나 요소로 변형해서 반환하는 함수 정의
        //1. 한번 사용한 Stream을 재사용할 수 없다.
        //2. reduce 처음에 생성된 Stream type으로 반환해야한다.
//		personStream.reduce((p,p1)->{
//			return p.getName()+", "+p1.getName();
//		})

        //💚 이름들만 나열하기(2)
        Optional<String> names=personList.stream()
                .map((p)->p.getName()) //Stream<String>
                .reduce((name1,name2)->name1+", "+name2);//문자열연산자 +
        System.out.println(names);

//     📂 Stream.of(data1,data2,data...) =>매개변수로 작성된 데이터를 Stream 객체로 반환

        Stream<Integer> numStream=Stream.of(-13,13,20,50,1,100,-1);
        //❓ 모든 자료의 제곱된 값을 더해보세요!
        // A) case1. map/reduce 사용
        Optional<Integer> powSum = numStream.map(n->n*n).reduce((n1, n2)->n1+n2);
        System.out.println("모든 자료의 제곱한 값을 더하세요:" +powSum);
        // A) case2. mapToInt+sum 사용
        numStream=Stream.of(-13,13,20,50,1,100,-1);// 재사용안되서 재정의.
        int powSum2 = numStream.mapToInt(n->n*n).sum();
        System.out.println("모든 자료의 제곱한 값을 더하세요: "+powSum2);

        //❓ Person 의 태어난해 (birth)로 key,이름(name)을 value 로 정의한 Map 을 반환해보자!
        //ex) {2000=김유진, 2002=김승현, 2004=이서윤, 1990=박시우, 1995=박현우, 1980=김지영, 1999=김성현}
        Map<Integer,String> personMap = personList.stream() // Stream은 array와 유사한 자료.
//              .collect(Collectors.toMap((p)->p.getBirth(),(p)->p.getName()));
                .collect(Collectors.toMap(Person::getBirth,Person::getName));// 윗줄과 같은 뜻.
        System.out.println("태어난해가 키고 이름이 값인 Map"+personMap);

    }
}


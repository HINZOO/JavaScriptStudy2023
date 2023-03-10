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
        //๐ StreamAPI ์ ์ต์ข์ฐ์ฐ (๐์๊ธฐ)
        //forEach(Consumer (T)->{} )  : ๋ณดํต ๊ฒฐ๊ณผ๋ฅผ ์ถ๋ ฅํ  ๋ ๋ง์ด ์ฌ์ฉ
        //reduce(BinaryOperator(n1,n2)->n3) : ํ๋์ ๊ฒฐ๊ณผ๋ฅผ ๋ฐํํ๊ธฐ ์ํด ์ฌ์ฉ.
        //toArray(): ์คํธ๋ฆผ ์๋ฃ๋ฅผ ๋ฐฐ์ด({})๋ก ๋ณํ
        //Collect(collectors.to~) : ์คํธ๋ฆผ ์๋ฃ๋ฅผ ์ปฌ๋ ์(List(Array,ArrayList,Vector,LinkedList),Set(TreeSet,hashSet),Map)์
        //                          ์๋ฃํ์ผ๋ก ๋ฐํ
        //count(): ์คํธ๋ฆผ์ ๊ธธ์ด ๋ฐํ
        //max,min(Comparator)
        //sum(),average() : ๊ธฐ๋ณธํ ์คํธ๋ฆผ์๋ง ์กด์ฌ
        //(all/none/any)Match(predicate) : ๋ชจ๋๊ฐ ๊ฒ์ฌ์์ ์ถฉ์กฑ/์๋ฌด๋ ๊ฒ์ฌ์์ ์ถฉ์กฑํ์ง์์/ํ๋๋ผ๋ ๊ฒ์ฌ์์ ์ถฉ์กฑ (boolean)


        L13StreamTerminal out=new L13StreamTerminal();
        ArrayList<Person> personList=new ArrayList<Person>();
        personList.add(out.new Person("๊น์ ์ง",2000,"์ฌ์"));
        personList.add(out.new Person("๋ฐํ์ฐ",1995,"๋จ์"));
        personList.add(out.new Person("๊น์นํ",2002,"๋จ์"));
        personList.add(out.new Person("๊น์ฑํ",1999,"๋จ์"));
        personList.add(out.new Person("์ด์์ค",2004,"์ฌ์"));
        personList.add(out.new Person("๊น์ง์",1980,"์ฌ์"));
        personList.add(out.new Person("๋ฐ์์ฐ",1990,"๋จ์"));
        System.out.println(personList.toString());

        System.out.println();

        //โQ1)personList ์์ ๋จ์์ ์ด๋ฆ๋ง ๋ฐฐ์ด๋ก ๋ง๋์ธ์.
        //A1-1) ๋ฐ๋ณต๋ฌธ ์ฌ์ฉ
        int size=0;
        List manNameList = new ArrayList();
        for(Person p : personList){
            if(p.getGender().equals("๋จ์")) {
                size++;
                manNameList.add(p.getName());
            }
        }
        System.out.println("๋จ์์ ์ : " + size);
        System.out.println("๋จ์์ ์ด๋ฆ : " + manNameList);
        //A1-2) Stream ์ฌ์ฉ (์ฌ๊ฐ๊ณต์ ์ํด ๋ฐฐ์ด๋ก ๋ฐ๋๋ค)
        String[] manNameArr = personList.stream()
                .filter((p) -> p.getGender().equals("๋จ์"))
                .map(p -> p.getName())
                .toArray(String[]::new);
        System.out.println("๋จ์์ ์ด๋ฆ: "+ Arrays.toString(manNameArr));

        //โ Q2) 2000๋๋ ์ดํ์ ํ์ด๋ ์ฌ๋์ ์ด๋ฆ์ ๋ฐฐ์ด๋ก ๋ฐํํ์ธ์! (๊ต์๋์ Object๊ฐ์ฒด๋ก ํ์จ์)
        Object[] birth2000 = personList.stream()
                .filter((p)->p.getBirth()>=2000)
                .map(Person::getName)
                .toArray();
        System.out.println("2000๋๋ ์ดํ์ ํ์ด๋ ์ฌ๋ ์ด๋ฆ: "+Arrays.toString(birth2000));

        //โ Q3) 30์ด ์ดํ์ ์ฌ์ฑ์ ์ด๋ฆ.
        List<String> nameList2 = personList.stream()
                        .filter(p->p.getGender().equals("์ฌ์"))
                        .filter(p->(2023-p.getBirth()<31))
                        .map(Person::getName)
                        .collect(Collectors.toList());
        System.out.println("30์ด ์ดํ์ ์ฌ์ฑ์ ์ด๋ฆ: "+nameList2);




        //๐ ์ด๋ฆ๋ค๋ง ๋์ดํ๊ธฐ(1)
        Stream<Person> personStream=personList.stream();
        personStream.forEach((p)->{
            System.out.print(p.name+" ");
        });
        System.out.println();

        //Optional<T> reduce(BiOperator (i1,i2)->{return ?? }) : Stream<T> ๊ฐ์์๋ค์ ํ๋ ์์๋ก ๋ณํํด์ ๋ฐํํ๋ ํจ์ ์ ์
        //1. ํ๋ฒ ์ฌ์ฉํ Stream์ ์ฌ์ฌ์ฉํ  ์ ์๋ค.
        //2. reduce ์ฒ์์ ์์ฑ๋ Stream type์ผ๋ก ๋ฐํํด์ผํ๋ค.
//		personStream.reduce((p,p1)->{
//			return p.getName()+", "+p1.getName();
//		})

        //๐ ์ด๋ฆ๋ค๋ง ๋์ดํ๊ธฐ(2)
        Optional<String> names=personList.stream()
                .map((p)->p.getName()) //Stream<String>
                .reduce((name1,name2)->name1+", "+name2);//๋ฌธ์์ด์ฐ์ฐ์ +
        System.out.println(names);

//     ๐ Stream.of(data1,data2,data...) =>๋งค๊ฐ๋ณ์๋ก ์์ฑ๋ ๋ฐ์ดํฐ๋ฅผ Stream ๊ฐ์ฒด๋ก ๋ฐํ

        Stream<Integer> numStream=Stream.of(-13,13,20,50,1,100,-1);
        //โ ๋ชจ๋  ์๋ฃ์ ์ ๊ณฑ๋ ๊ฐ์ ๋ํด๋ณด์ธ์!
        // A) case1. map/reduce ์ฌ์ฉ
        Optional<Integer> powSum = numStream.map(n->n*n).reduce((n1, n2)->n1+n2);
        System.out.println("๋ชจ๋  ์๋ฃ์ ์ ๊ณฑํ ๊ฐ์ ๋ํ์ธ์:" +powSum);
        // A) case2. mapToInt+sum ์ฌ์ฉ
        numStream=Stream.of(-13,13,20,50,1,100,-1);// ์ฌ์ฌ์ฉ์๋์ ์ฌ์ ์.
        int powSum2 = numStream.mapToInt(n->n*n).sum();
        System.out.println("๋ชจ๋  ์๋ฃ์ ์ ๊ณฑํ ๊ฐ์ ๋ํ์ธ์: "+powSum2);

        //โ Person ์ ํ์ด๋ํด (birth)๋ก key,์ด๋ฆ(name)์ value ๋ก ์ ์ํ Map ์ ๋ฐํํด๋ณด์!
        //ex) {2000=๊น์ ์ง, 2002=๊น์นํ, 2004=์ด์์ค, 1990=๋ฐ์์ฐ, 1995=๋ฐํ์ฐ, 1980=๊น์ง์, 1999=๊น์ฑํ}
        Map<Integer,String> personMap = personList.stream() // Stream์ array์ ์ ์ฌํ ์๋ฃ.
//              .collect(Collectors.toMap((p)->p.getBirth(),(p)->p.getName()));
                .collect(Collectors.toMap(Person::getBirth,Person::getName));// ์์ค๊ณผ ๊ฐ์ ๋ป.
        System.out.println("ํ์ด๋ํด๊ฐ ํค๊ณ  ์ด๋ฆ์ด ๊ฐ์ธ Map"+personMap);

    }
}


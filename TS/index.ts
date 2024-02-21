var 이름: string = "kim";
let 이름들: string[] = ["kim", "park"];
// var 이름: { name: string } = { name: "kim" };
// TypeScript에서는 같은 스코프 내에서 변수를 같은 이름으로 재선언하는 것을 허용하지 않습니다.

var 다른이름: { name: string } = { name: "kim" };

// ?가 들어오면 그 key에 해당하는 key가 안들어와도 괜찮음
var 또다른이름: { name?: string } = {};

let 성: string | number = "wony";
// = let 성: (string | number) = "wony";
성 = 123;

// 타입 변수 만들기
// 변수는 대문자로 만듬
type Cue = string | number;
let 타입: Cue = 123;

function 함수(x: number): number {
  return x * 2;
}

// 첫째는 number, 둘째는 boolean
type Member = [number, boolean];
let john: Member = [123, true];

// object에 타입 지정해야할 속성이 너무 많으면
type Mem = {
  [key: string]: string;
};
let sara: Mem = { name: "kim", age: "25" };

let project: { member: string[]; days: number; started: boolean } = {
  member: ["kim", "park"],
  days: 30,
  started: true,
};

let 회원들: (number | string)[] = [1, "2", 3];
let object: { a: string | number } = { a: "123" };

// any 타입 모든 자료형 허용해줌 (타입 실드 해제문법임)
// -> 타입관련 버그가 나도 잡아주지 않음
let cow: any;

// unknown 타입 모든 자료형 허용해줌
// unknown 타입 any보다 안전한 이유는
let kim: unknown;
kim = 123;

// unknown로 할 경우, 변수1에 할당이 안됨
// -> 오류남
// let 변수1: string = kim;

// any로 할 경우, 변수 2에 할당됨
// -> 오류 안남
let 변수2: string = cow;

// 타입스크립트의 엄격함
// 간단한 수학 연산도 타입 맞아야함
// kim-1
// -> unknown - number이라서 오류남

let user: string = "kim";
let age: undefined | number = undefined;
let married: boolean = false;
let 철수: (string | boolean | undefined | number)[] = [user, age, married];

let 학교: {
  score: (number | boolean)[];
  teacher: string;
  friend: string | string[];
} = {
  score: [100, 97, 84],
  teacher: "Phil",
  friend: "John",
};
학교.score[4] = false;
학교.friend = ["Lee", 학교.teacher];

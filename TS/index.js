var 이름 = "kim";
var 이름들 = ["kim", "park"];
// var 이름: { name: string } = { name: "kim" };
// TypeScript에서는 같은 스코프 내에서 변수를 같은 이름으로 재선언하는 것을 허용하지 않습니다.
var 다른이름 = { name: "kim" };
// ?가 들어오면 그 key에 해당하는 key가 안들어와도 괜찮음
var 또다른이름 = {};
var 성 = "wony";
// = let 성: (string | number) = "wony";
성 = 123;
var 타입 = 123;
function 함수(x) {
    return x * 2;
}
var john = [123, true];
var sara = { name: "kim", age: "25" };
var project = {
    member: ["kim", "park"],
    days: 30,
    started: true,
};
var 회원들 = [1, "2", 3];
var object = { a: "123" };
// any 타입 모든 자료형 허용해줌 (타입 실드 해제문법임)
// -> 타입관련 버그가 나도 잡아주지 않음
var cow;
// unknown 타입 모든 자료형 허용해줌
// unknown 타입 any보다 안전한 이유는
var kim;
kim = 123;
// unknown로 할 경우, 변수1에 할당이 안됨
// -> 오류남
// let 변수1: string = kim;
// any로 할 경우, 변수 2에 할당됨
// -> 오류 안남
var 변수2 = cow;
// 타입스크립트의 엄격함
// 간단한 수학 연산도 타입 맞아야함
// kim-1
// -> unknown - number이라서 오류남
var user = "kim";
var age = undefined;
var married = false;
var 철수 = [user, age, married];
var 학교 = {
    score: [100, 97, 84],
    teacher: "Phil",
    friend: "John",
};
학교.score[4] = false;
학교.friend = ["Lee", 학교.teacher];

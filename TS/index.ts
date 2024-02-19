let 이름: string[] = ["kim", "park"];
let 특성: { name?: string; age?: number } = { name: "Hwnag", age: 21 };

let 성: string[] | number = 123;

type Name = string[] | number;
let sleep: Name = 45;

function 함수(x: number): number {
  return x * 2;
}

// 함수("배고프");
// TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.

type Member = [number, boolean];
let john: Member = [123, true];

type M = { [key: string]: string };
let chae: M = { name: "hwang", age: "12" };

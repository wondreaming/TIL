import 'package:flutter/material.dart';


void main() {
  // runApp 앱 시작해주세요. (const 앱 메인페이지)
  runApp(const MyApp());
}


// class MyApp extends StatelessWidget {
//   const MyApp({super.key});
//
//   @override
//   Widget build(BuildContext context) {}
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Center(
          child: Container(width: 50, height: 50, color: Colors.deepPurple,)
      )
          // 1. 글자를 넣는 방법
          //Text('안녕'),
          // 2. 아이콘을 넣는 방법
          // Icon(Icons.아이콘 이름)
          // 3. 이미지는 넣는 방법
          // Image.asset('경로')
          // 1) assets 디렉토리 만들기
          // 2) 이미지 등록
          // 3) pubspec.yaml에 등록
          // 4) Image.asset('경로')
          // 4. 박스를 넣는 방법
          // 1) Container()
          // 2) SizedBox()
          // Container(width: 50, height: 50, color: Colors.deepPurple,)
          // 스타일을 줄 땐 (스타일명 : 값)
    );
  }
}

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';


void main() {
  runApp(const MyApp());
}


class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: SizedBox(
            child: Row(
              children: [Container(child: Text("금호동3가"), margin: EdgeInsets.fromLTRB(20, 10, 10, 10),),
                Icon(Icons.star)],),),
          actions: const [Padding(
            padding: EdgeInsets.all(8),
            child: Icon(Icons.search),
          ), Padding(
            padding: EdgeInsets.all(8),
            child: Icon(Icons.menu),
          ), Padding(
            padding: EdgeInsets.all(8),
            child: Icon(Icons.notifications),
          )],
        ),
        body: Container(
          height: 200, width: double.infinity, margin: EdgeInsets.all(20),
          child: Row(
            children: [
              Padding(
                padding: const EdgeInsets.all(10),
                child: SizedBox(child: Image.asset("318"), height: 180, width: 180,),
              ),
              Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: 
                [Text("캐논 DSLR 100D(단렌즈, 충전기 16기가SD 포함)",
                  style: TextStyle(fontWeight: FontWeight.w600, fontSize: 20), ),
                  Text("성동구 행당동 * 끌올 10분 전"),
                  Text("210,000원", style: TextStyle(fontWeight: FontWeight.w500, fontSize: 15),),
                  Container(

                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                          children : [Icon(Icons.favorite), Text("4")]))
                ],
              )
            ],),
        ),

      ),
    );
  }
}

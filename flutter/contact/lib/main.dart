import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';


void main() {
  // runApp 앱 시작해주세요. (const 앱 메인페이지)
  runApp(MaterialApp(home : MyApp()));
}


class MyApp extends StatefulWidget {
  MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {

  var total = 3;
  var name = ['김영숙', '피자집', '홍길동'];
  addOne(){
    setState(() {
      total++;
    });
  }

  addName(name){
    setState(() {
      name.add('name');
      print(name);
    });
  }

  @override
  Widget build(BuildContext context) {

    print(MediaQuery.of(context).size.width);

    return Scaffold(
        floatingActionButton: Builder(
          builder: (context) {
            return FloatingActionButton(
              onPressed: (){
                print(context);
                showDialog(
                    context: context,
                    barrierDismissible: true,
                    builder: (context){
                      return DialogUI(addOne : addOne, addName : addName);
                    });
              },
            );
          }
        ),
        appBar: AppBar(
          title: Text("SSAFY"),
        leading: Text(total.toString()),),
        bottomNavigationBar: BottomAppBar(),
        body: ListView.builder(
            itemCount: total,
            itemBuilder: (context, i){
              return ListTile(
                leading: Icon(Icons.account_circle_rounded),
                title: Text(name[i]),
              );},
            ),
      );
  }
}

class BottomAppBar extends StatelessWidget {
  const BottomAppBar({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 100,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: const [
          Icon(Icons.phone),
          Icon(Icons.message),
          Icon(Icons.contact_page),
        ],
      ),
    );
  }
}

class DialogUI extends StatelessWidget {
  DialogUI({super.key, this.addOne, this.addName});

  final addOne;
  final addName;

  var inputData = TextEditingController();
  var inputData2 = '';
  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text("Contact"),
      content: TextField(

        onChanged: (value){
          inputData2 = value;
          print(value);
        },
      ),
      actions: <Widget>[
        Row(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            ElevatedButton(
                onPressed: (){
                  addName(inputData2);
                  addOne();
                  Navigator.pop(context);
                },
                child: Text("Cancel")),
            ElevatedButton(
                onPressed: (){
                  Navigator.pop(context);
                  },
                child: Text("Yes")),
          ],
        )
      ],

    );
  }
}


import 'package:flutter/material.dart';

void main() => runApp(UrlValidatorApp());

class UrlValidatorApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'URL Validator',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: UrlValidatorPage(),
    );
  }
}

class UrlValidatorPage extends StatefulWidget {
  @override
  _UrlValidatorPageState createState() => _UrlValidatorPageState();
}

class _UrlValidatorPageState extends State<UrlValidatorPage> {
  final TextEditingController _controller = TextEditingController();
  bool? _isValid;

  void _validate() {
    final url = _controller.text.trim();
    final regex = RegExp(r'^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/[^\s]*)?$');
    setState(() {
      _isValid = regex.hasMatch(url);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('URL Validator')),
      body: Padding(
        padding: EdgeInsets.all(20),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: _controller,
              decoration: InputDecoration(
                labelText: 'Enter URL',
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 10),
            ElevatedButton(
              onPressed: _validate,
              child: Text('Validate'),
            ),
            SizedBox(height: 20),
            if (_isValid != null)
              Text(
                _isValid! ? 'URL is valid!' : 'URL is invalid',
                style: TextStyle(
                  color: _isValid! ? Colors.green : Colors.red,
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
              )
          ],
        ),
      ),
    );
  }
}

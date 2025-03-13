import 'package:flutter/material.dart';

void main() {
  runApp(ExpenseTrackerApp());
}

class ExpenseTrackerApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(primarySwatch: Colors.blue),
      home: ExpenseTrackerScreen(),
    );
  }
}

class Expense {
  final double amount;
  final String category;

  Expense(this.amount, this.category);
}

class ExpenseTrackerScreen extends StatefulWidget {
  @override
  _ExpenseTrackerScreenState createState() => _ExpenseTrackerScreenState();
}

class _ExpenseTrackerScreenState extends State<ExpenseTrackerScreen> {
  final TextEditingController _controller = TextEditingController();
  final List<Expense> _expenses = [];
  String _selectedCategory = 'Побутові речі';
  double _totalSum = 0.0;

  final List<String> _categories = [
    'Побутові речі',
    'Одяг',
    'Їжа',
    'Транспорт',
    'Розваги',
  ];

  void _addExpense() {
    String inputText = _controller.text.trim();
    double? expenseAmount = double.tryParse(inputText);
    if (expenseAmount != null && expenseAmount > 0) {
      setState(() {
        _expenses.add(Expense(expenseAmount, _selectedCategory));
        _totalSum += expenseAmount;
        _controller.clear();
      });
    }
  }

  void _removeExpense(int index) {
    setState(() {
      _totalSum -= _expenses[index].amount;
      _expenses.removeAt(index);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Трекер витрат')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _controller,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(
                labelText: 'Введіть суму',
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 10),
            DropdownButtonFormField(
              value: _selectedCategory,
              items: _categories.map((category) {
                return DropdownMenuItem(
                  value: category,
                  child: Text(category),
                );
              }).toList(),
              onChanged: (value) {
                setState(() {
                  _selectedCategory = value as String;
                });
              },
              decoration: InputDecoration(
                labelText: 'Оберіть категорію',
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 10),
            ElevatedButton(
              onPressed: _addExpense,
              child: Text('Додати витрату'),
            ),
            SizedBox(height: 20),
            Text(
              'Загальна сума: ${_totalSum.toStringAsFixed(2)} грн', // Відображаємо total sum
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            Expanded(
              child: ListView.builder(
                itemCount: _expenses.length,
                itemBuilder: (context, index) {
                  return Card(
                    margin: EdgeInsets.symmetric(vertical: 5),
                    child: ListTile(
                      title: Text('${_expenses[index].amount} грн'),
                      subtitle: Text(_expenses[index].category),
                      trailing: IconButton(
                        icon: Icon(Icons.delete, color: Colors.red),
                        onPressed: () => _removeExpense(index),
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { ExpensesComponent } from './expenses/expenses.component';
import { ExpenseService } from './expense.service';

@Component({
  selector: 'root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  expense;
  title = 'Costs to be the #Bawse';
  subtitle = 'My expense tracking app';
  total;
  isHidden = true;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    this.calculateTotal();
  }
 
  calculateTotal() {
    this.total = 0;

    this.expenseService.findAllExpenses().then(expenses => 
      expenses.forEach(expense => 
        this.total += expense.cost)); 
  }

  toggleNewExpenseForm() {
    this.isHidden = !this.isHidden;
  }

  setExpense(value) {
    this.expense = value;
  }

  updateExpense() {
    this.calculateTotal();
    this.setExpense(null);
  }

  addExpense() {
    this.calculateTotal();
    this.toggleNewExpenseForm();
  }
}
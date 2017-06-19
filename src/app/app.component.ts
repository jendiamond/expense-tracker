import { Component, OnInit } from '@angular/core';
import { Expense } from './expense';
import { ExpenseService } from './expense.service';

@Component({
  selector: 'root',
  template: `
    <div>
      {{title}}
    </div>

    <ul>
      <li *ngFor='let expense of expenses'>
        <p>{{expense.date}}</p>
        <p>{{expense.description}}</p>
        <p>$<span>{{expense.cost}}</span></p>
        <button (click)=deleteExpense(expense)>Remove</button>
      </li>
    </ul>

    <p>Total: $<span>{{total}}</span></p>

    <new-expense (updateTotal)=calculateTotal()></new-expense>
  `
})
export class AppComponent implements OnInit {
  title = 'Because it costs to be the boss';
  total;
  expenses; 

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    this.getExpenses();
    this.calculateTotal();
  }

  getExpenses() {
    this.expenseService.getExpenses()
      .then(expenses => this.expenses = expenses);
  }

  calculateTotal() {
    this.total = 0;

    this.expenseService.getExpenses()
      .then(expenses => expenses.forEach(expense => this.total += expense.cost)); 
  }

  deleteExpense(expense: Expense) {
    this.expenseService.removeExpense(expense);

    this.calculateTotal();
  }
}
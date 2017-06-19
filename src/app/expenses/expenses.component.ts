import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Expense } from '../expense';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'expenses',
  template: `
    <ul>
      <li *ngFor='let expense of expenses'>
        <p>{{expense.date}}</p>
        <p>{{expense.description}}</p>
        <p>$<span>{{expense.cost}}</span></p>
        <button (click)=deleteExpense(expense)>Remove</button>
      </li>
    </ul>
  `,
  styles: []
})
export class ExpensesComponent implements OnInit {
  expenses;

  @Output() updateTotal = new EventEmitter();

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
    this.getExpenses();
  }

  deleteExpense(expense: Expense) {
    this.expenseService.removeExpense(expense);
    this.updateTotal.emit();
  }

  getExpenses() {
    this.expenseService.getExpenses()
      .then(expenses => this.expenses = expenses);
  }
}
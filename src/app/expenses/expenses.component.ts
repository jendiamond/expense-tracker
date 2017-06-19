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
        <button (click)=deleteExpense(expense)>Delete</button>
        <button (click)=editExpense(expense)>Edit</button>
      </li>
    </ul>
  `,
  styles: []
})
export class ExpensesComponent implements OnInit {
  isHidden;
  expenses;

  @Output() updateTotal = new EventEmitter();
  @Output() getExpense = new EventEmitter();

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
    this.findAllExpenses();
  }

  deleteExpense(expense: Expense) {
    this.expenseService.removeExpense(expense);
    this.updateTotal.emit();
  }

  editExpense(expense: Expense) {
    this.getExpense.emit(expense);
  }

  findAllExpenses() {
    this.expenseService.findAllExpenses()
      .then(expenses => this.expenses = expenses);
  }
}
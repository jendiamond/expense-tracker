import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Expense } from '../expense';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'expenses',
  template: `
    <ul class='col-xs-12'>
      <li *ngFor='let expense of expenses' class='row expense'>
        <p class='col-xs-12 col-md-3'>{{expense.date}}</p>
        <p class='col-xs-7 col-md-5'>{{expense.description}}</p>
        <p class='col-xs-2 col-md-2'>$<span>{{expense.cost}}</span></p>
        <div class='col-xs-3 col-md-2 icons-container'>
          <div (click)=deleteExpense(expense) class='remove-icon'></div>
          <div (click)=editExpense(expense) class='edit-icon'></div>
        </div>
      </li>
    </ul>
  `,
  styles: [`
    ul {
      list-style-type: none;
    }
  `]
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
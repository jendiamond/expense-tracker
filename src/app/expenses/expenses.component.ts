import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Expense } from '../data/expense';
import { ExpenseService } from '../expense-service/expense.service';

@Component({
  selector: 'expenses',
  template: `
    <ul class='col-xs-12'>
      <li *ngFor='let expense of expenses' class='row expense'>
        <div *ngIf='expense.editing'>
          <edit-expense (updateExpense)=updateExpense(expense) 
                        [selectedExpense]='expense'></edit-expense>
        </div>
        <div *ngIf='!expense.editing'>
          <p class='col-xs-12 col-md-3'>{{expense.date}}</p>
          <p class='col-xs-7 col-md-5'>{{expense.description}}</p>
          <p class='col-xs-2'>$<span>{{expense.cost}}</span></p>
          <div class='col-xs-3 col-md-2 icons-container'>
            <div (click)=deleteExpense(expense) class='remove-icon'></div>
            <div (click)=editExpense(expense) class='edit-icon'></div>
          </div>
        </div>
      </li>
    </ul>
  `,
  styleUrls: ['expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  expenses;

  @Output() updateTotal = new EventEmitter();

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
    this.findAllExpenses();
  }

  deleteExpense(expense: Expense) {
    this.expenseService.removeExpense(expense);
    this.updateTotal.emit();
  }

  editExpense(expense: Expense) {
    expense.editing = true;
  }

  updateExpense(expense: Expense) {
    expense.editing = false;
    this.updateTotal.emit();
  }

  findAllExpenses() {
    this.expenseService.findAllExpenses()
      .then(expenses => this.expenses = expenses);
  }
}
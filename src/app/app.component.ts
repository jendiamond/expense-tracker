import { Component, OnInit } from '@angular/core';
import { ExpensesComponent } from './expenses/expenses.component';
import { ExpenseService } from './expense.service';

@Component({
  selector: 'root',
  template: `
    <h1>{{title}}</h1>
    <expenses (getExpense)=setExpense($event)></expenses>
    <p *ngIf='total > 0'>Total: $<span>{{total}}</span></p>
    <p *ngIf='total === 0'>Whoa, no expenses?</p>
    <button (click)='toggleNewExpenseForm()'>{{isHidden ? 'Add' : 'Cancel'}} new expense</button>
    <new-expense (updateTotal)=addExpense() [ngClass]='{hidden: isHidden}'></new-expense>
    <div *ngIf='expense'>
      <edit-expense (updateExpense)=updateExpense() [selectedExpense]='expense'></edit-expense>
    </div>
  `,
  styles: [`
    .hidden { display: none; }
  `]
})
export class AppComponent implements OnInit {
  expense;
  title = 'Because it costs to be the boss';
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

  setExpense(expense) {
    this.expense = expense;
  }

  updateExpense() {
    this.calculateTotal();
    this.expense = null;
  }

  addExpense() {
    this.calculateTotal();
    this.toggleNewExpenseForm();
  }
}
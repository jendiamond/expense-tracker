import { Component, OnInit } from '@angular/core';
import { ExpensesComponent } from './expenses/expenses.component';
import { ExpenseService } from './expense.service';

@Component({
  selector: 'root',
  template: `
    <div class='container'>
      <h1 class='row text-center'>{{title}}</h1>
      <h3 class='row text-center'>{{subtitle}}</h3>
      <expenses (updateTotal)=calculateTotal() 
                (getExpense)=setExpense($event) 
                class='row'></expenses>
      <div class='row text-center'>
        <h3 *ngIf='total > 0' class='col-xs-12'>
          Total: $<span>{{total}}</span>
        </h3>
        <h3 *ngIf='total === 0' class='col-xs-12'>
          Whoa, no expenses?
        </h3>
      </div>
      <div (click)='toggleNewExpenseForm()' 
            class='row text-center icon-container'>
        <div class='add-icon'></div>
        <h4 class=''>{{isHidden ? 'Add' : 'Cancel'}} new expense</h4>
      </div>
      <new-expense (updateTotal)=addExpense() 
                  [ngClass]='{hidden: isHidden}'
                  class='row text-center'></new-expense>
      <div *ngIf='expense' class='row'>
        <edit-expense (updateExpense)=updateExpense() 
                      (cancelExpense)=setExpense(null)
                      [selectedExpense]='expense'></edit-expense>
      </div>
    </div>
  `,
  styles: [`
    .hidden { display: none; }
  `]
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
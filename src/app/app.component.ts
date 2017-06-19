import { Component, OnInit } from '@angular/core';
import { ExpensesComponent } from './expenses/expenses.component';
import { ExpenseService } from './expense.service';

@Component({
  selector: 'root',
  template: `
    <h1>{{title}}</h1>
    <expenses (updateTotal)=calculateTotal()></expenses>
    <p *ngIf='total > 0'>Total: $<span>{{total}}</span></p>
    <p *ngIf='total === 0'>Whoa, no expenses?</p>
    <button (click)='toggleNewExpenseForm()'>{{isHidden ? 'Show' : 'Hide'}} expense form</button>
    <new-expense (updateTotal)=calculateTotal() [ngClass]='{hide_element: isHidden}'></new-expense>
  `,
  styles: [
    '.hide_element { display: none; }'
  ]
})
export class AppComponent implements OnInit {
  title = 'Because it costs to be the boss';
  total;
  isHidden = true;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    this.calculateTotal();
  }
 
  calculateTotal() {
    this.total = 0;

    this.expenseService.getExpenses().then(expenses => 
      expenses.forEach(expense => 
        this.total += expense.cost)); 
  }

  toggleNewExpenseForm() {
    this.isHidden = !this.isHidden;
  }
}
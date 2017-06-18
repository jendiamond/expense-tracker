import { Component, OnInit } from '@angular/core';
import { EXPENSES } from './mock-expenses';
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
        <p>{{expense.cost}}</p>
      </li>
    </ul>

    <p>Total: {{total}}</p>

    <form (submit)='addExpense()'>
      <p>New Expense</p>
      <label>Date</label>
      <input type='text' name='date' [(ngModel)]='date'>
      <label>Description</label>
      <input type='text' name='desc' [(ngModel)]='desc'>
      <label>Cost</label>
      <input type='number' name='cost' [(ngModel)]='cost'>
      <button>Submit</button>
    </form>
  `
})
export class AppComponent implements OnInit {
  date = '';
  desc = '';
  cost = 0;
  title = 'Because it costs to be the boss';
  total = 0;
  expenses = this.expenseService.getExpenses();

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    this.addTotal();
  }

  addTotal() {
    this.expenses.forEach(expense => 
      this.total += expense.cost)
  }

  addExpense() {
    this.expenses.push({
      date: this.date,
      description: this.desc,
      cost: this.cost
    });

    this.total += this.cost;
  }
}
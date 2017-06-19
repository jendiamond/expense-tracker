import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'new-expense',
  template: `
    <form (submit)='addExpense()'>
      <p>New Expense</p>
      <label>Date</label>
      <input type='date' name='date' [(ngModel)]='date'>
      <label>Description</label>
      <input type='text' name='description' [(ngModel)]='description'>
      <label>Cost</label>
      <input type='number' name='cost' [(ngModel)]='cost'>
      <button>Submit</button>
    </form>
  `,
  styles: []
})
export class NewExpenseComponent implements OnInit {
  cost;
  date = '';
  description = '';

  @Output() updateTotal = new EventEmitter();

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
  }

  addExpense() {
    this.expenseService.addExpense({
      id: this.expenseService.getNextId(),
      date: this.date,
      description: this.description,
      cost: this.cost
    });

    this.cost = '';
    this.date = '';
    this.description = '';

    this.updateTotal.emit();
  }
}

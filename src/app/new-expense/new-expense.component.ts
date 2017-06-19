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
      <input type='text' name='desc' [(ngModel)]='desc'>
      <label>Cost</label>
      <input type='number' name='cost' [(ngModel)]='cost'>
      <button>Submit</button>
    </form>

  `,
  styles: []
})
export class NewExpenseComponent implements OnInit {
  @Output() updateTotal = new EventEmitter();

  date = '';
  desc = '';
  cost = 0;

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
  }

  addExpense() {
    this.expenseService.addExpense({
      id: 5,
      date: this.date,
      description: this.desc,
      cost: this.cost
    });

    this.updateTotal.emit();
  }
}

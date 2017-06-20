import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Expense } from '../expense';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'edit-expense',
  template: `
    <form (submit)=editExpense()>
      <p>Edit Expense</p>
      <label>Date</label>
      <label>id: </label>{{selectedExpense.id}}
      <input type='date' name='date' [(ngModel)]='selectedExpense.date'>
      <label>Description</label>
      <input type='text' name='description' [(ngModel)]='selectedExpense.description'>
      <label>Cost</label>
      <input type='number' name='cost' [(ngModel)]='selectedExpense.cost'>
      <button>Update</button>
      <button (click)='cancel()'>X</button>
    </form>
  `
})
export class EditExpenseComponent { 

  @Input() selectedExpense: Expense;
  @Output() updateExpense = new EventEmitter();
  @Output() cancelExpense = new EventEmitter();

  constructor(private expenseService: ExpenseService) {}

  editExpense() {
    this.updateExpense.emit();
  }

  cancel() {
    this.cancelExpense.emit();
  }
}
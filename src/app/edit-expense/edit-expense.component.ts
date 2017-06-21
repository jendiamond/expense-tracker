import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Expense } from '../data/expense';
import { ExpenseService } from '../expense-service/expense.service';

@Component({
  selector: 'edit-expense',
  template: `
    <form class='row edited-row'>
      <input type='date' name='date' [(ngModel)]='selectedExpense.date'
                                     class='col-xs-12 col-md-3'>
      <input type='text' name='description' [(ngModel)]='selectedExpense.description'
                                            class='col-xs-7 col-md-5'>
      <input type='number' name='cost' [(ngModel)]='selectedExpense.cost'
                                       class='col-xs-2'>
      <div class='col-xs-3 col-md-2 icons-container'>
        <div (click)=editExpense() class='update-icon'></div>
      </div>
    </form>
  `,
  styleUrls: ['edit-expense.component.css']
})
export class EditExpenseComponent { 

  @Input() selectedExpense: Expense;
  @Output() updateExpense = new EventEmitter();

  constructor(private expenseService: ExpenseService) {}

  editExpense() {
    this.updateExpense.emit();
  }
}
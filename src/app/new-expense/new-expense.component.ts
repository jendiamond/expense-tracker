import { Component, Output, EventEmitter } from '@angular/core';
import { ExpenseService } from '../expense-service/expense.service';

@Component({
  selector: 'new-expense',
  template: `
    <form (submit)='addExpense()' class='form-container'>
      <input type='date' name='date' [(ngModel)]='date'>
      <input type='text' name='description' [(ngModel)]='description' placeholder='Description'>
      <input type='number' name='cost' [(ngModel)]='cost' placeholder='Cost'>
      <div (click)='addExpense()' class='submit-icon'></div>
    </form>
  `,
  styleUrls: ['new-expense.component.css']
})
export class NewExpenseComponent {
  cost;
  date = '';
  description = '';

  @Output() calculateTotalAndToggleForm = new EventEmitter();

  constructor(private expenseService: ExpenseService) { }

  addExpense() {
    this.expenseService.getNextId().then(id => {
      this.expenseService.addExpense({
        id,
        date: this.date,
        description: this.description,
        cost: this.cost,
        editing: false
      });

      this.clearForm();
      this.calculateTotalAndToggleForm.emit();
    });
  }
  
  clearForm() {
    this.cost = 0;
    this.date = '';
    this.description = '';
  }
}
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ExpenseService } from '../expense.service';

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
export class NewExpenseComponent implements OnInit {
  cost;
  date = '';
  description = '';

  @Output() calculateTotalAndToggleForm = new EventEmitter();

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
  }

  addExpense() {
    this.expenseService.addExpense({
      id: this.expenseService.getNextId(),
      date: this.date,
      description: this.description,
      cost: this.cost,
      editing: false
    });

    this.cost = '';
    this.date = '';
    this.description = '';

    this.calculateTotalAndToggleForm.emit();
  }
}

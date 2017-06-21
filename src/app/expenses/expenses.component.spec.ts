import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { EditExpenseComponent } from '../edit-expense/edit-expense.component';
import { Expense } from '../data/expense';
import { ExpensesComponent } from './expenses.component';
import { ExpenseService } from '../expense-service/expense.service';

describe('ExpensesComponent', () => {
  let component: ExpensesComponent;
  let fixture: ComponentFixture<ExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesComponent, EditExpenseComponent ],
      imports: [ FormsModule ],
      providers: [ ExpenseService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', inject([ExpenseService], (service: ExpenseService) => {
    expect(component).toBeTruthy();
  }));

  it('should set editing property to be true', inject([ExpenseService], (service: ExpenseService) => {
    const mockExpense = {
      id: 10, 
      date: '2017-06-01',
      description: 'Lunch at King Taco', 
      cost: 10,
      editing: false
    }
    component.editExpense(mockExpense);

    expect(mockExpense.editing).toBeTruthy();
  }));

  it('should set editing property to be false', inject([ExpenseService], (service: ExpenseService) => {
    const mockExpense = {
      id: 10, 
      date: '2017-06-01',
      description: 'Lunch at King Taco', 
      cost: 10,
      editing: true
    }
    component.updateExpense(mockExpense);

    expect(mockExpense.editing).toBeFalsy();
  }));

  // it('should set expenses property', inject([ExpenseService], (service: ExpenseService) => {
  //   component.findAllExpenses();
  //   console.log(component.expenses);

  //   expect(component.expenses).toBeTruthy();
  // }));
});

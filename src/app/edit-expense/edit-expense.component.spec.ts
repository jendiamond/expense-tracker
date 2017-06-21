import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { EditExpenseComponent } from './edit-expense.component';
import { Expense } from '../data/expense';
import { ExpenseService } from '../expense-service/expense.service';

describe('EditExpenseComponent', () => {
  let component: EditExpenseComponent;
  let fixture: ComponentFixture<EditExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditExpenseComponent ],
      imports: [ FormsModule ],
      providers: [ ExpenseService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExpenseComponent);
    const mockExpense = {
      id: 10,
      cost: 20,
      date: '2017-06-15',
      description: 'Christian\'s bday lunch',
      editing: true
    };
    component = fixture.componentInstance;
    component.selectedExpense = mockExpense;
    fixture.detectChanges();
  });

  it('should be created', inject([ExpenseService], (service: ExpenseService) => {
    expect(component).toBeTruthy();
  }));

  it('should display the selected expense', inject([ExpenseService], (service: ExpenseService) => {
    let element = fixture.debugElement.query(By.css("input[name='description']")).nativeElement;
    element.dispatchEvent(new Event('input'));

    fixture.whenStable().then(() => {
      expect(element.value).toContain('Christian\'s bday lunch');
  })}));

  it('should emit on submit click', inject([ExpenseService], (service: ExpenseService) => {
    spyOn(component.updateExpense, 'emit');

    let submitElement = fixture.nativeElement.querySelector('div.update-icon');
    submitElement.dispatchEvent(new Event('click'));

    expect(component.updateExpense.emit).toHaveBeenCalled();
  }));
});
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ExpenseService } from '../expense-service/expense.service';
import { NewExpenseComponent } from './new-expense.component';

describe('NewExpenseComponent', () => {
  let component: NewExpenseComponent;
  let fixture: ComponentFixture<NewExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewExpenseComponent ],
      imports: [ FormsModule ],
      providers: [ ExpenseService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', inject([ExpenseService], (service: ExpenseService) => {
    expect(component).toBeTruthy();
  }));

  it('should call a method upon form submission', inject([ExpenseService], (service: ExpenseService) => {
    spyOn(component, 'addExpense');

    let submitElement = fixture.nativeElement.querySelector('div.submit-icon');
    submitElement.click();

    fixture.whenStable().then(() => {
      expect(component.addExpense).toHaveBeenCalled();
    })
  }));

  it('should clear form input', inject([ExpenseService], (service: ExpenseService) => {
    component.cost = 20;
    component.description = 'Brunch';
    component.date = 'January 1, 2017';
    let costElement = fixture.debugElement.query(By.css("input[name='cost']")).nativeElement;
    let descriptionElement = fixture.debugElement.query(By.css("input[name='description']")).nativeElement;
    let dateElement = fixture.debugElement.query(By.css("input[name='date']")).nativeElement;
    let submitElement = fixture.debugElement.query(By.css('div.submit-icon')).nativeElement;
    submitElement.dispatchEvent(new Event('click'));

    fixture.whenStable().then(() => {
      expect(costElement.value).toEqual('');
      expect(descriptionElement.value).toEqual('');
      expect(dateElement.value).toEqual('');
  })}));
});

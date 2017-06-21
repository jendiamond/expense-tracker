import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { ExpenseService } from './expense-service/expense.service';
import { NewExpenseComponent } from './new-expense/new-expense.component';
import { FormsModule } from '@angular/forms';
import { allExpenses } from './data/mock-expenses';

describe('AppComponent', () => {
  const APP_TITLE = 'Costs to be the #Bawse';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [ExpenseService],
      declarations: [
        AppComponent,
        ExpensesComponent,
        EditExpenseComponent,
        NewExpenseComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should have a title', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual(APP_TITLE);
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(APP_TITLE);
  }));
});
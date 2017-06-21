import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';
import { ExpenseService } from './expense-service/expense.service';
import { ExpensesComponent } from './expenses/expenses.component';
import { NewExpenseComponent } from './new-expense/new-expense.component';

@NgModule({
  declarations: [
    AppComponent,
    EditExpenseComponent,
    ExpensesComponent,
    NewExpenseComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ExpenseService],
  bootstrap: [AppComponent]
})
export class AppModule { }

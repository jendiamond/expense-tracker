import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ExpenseService } from './expense.service';
import { NewExpenseComponent } from './new-expense/new-expense.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';

@NgModule({
  declarations: [
    AppComponent,
    NewExpenseComponent,
    ExpensesComponent,
    EditExpenseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ExpenseService],
  bootstrap: [AppComponent]
})
export class AppModule { }

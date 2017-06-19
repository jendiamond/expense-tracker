import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { ExpenseService } from './expense.service';
import { NewExpenseComponent } from './new-expense/new-expense.component';

@NgModule({
  declarations: [
    AppComponent,
    NewExpenseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ExpenseService],
  bootstrap: [AppComponent]
})
export class AppModule { }

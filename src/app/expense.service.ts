import { Injectable } from '@angular/core';
import { Expense } from './expense';
import { EXPENSES } from './mock-expenses';

@Injectable()
export class ExpenseService {

  getExpenses(): Expense[] {
    return EXPENSES; 
  }
}

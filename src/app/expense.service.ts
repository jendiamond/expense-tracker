import { Injectable } from '@angular/core';
import { Expense } from './expense';
import { allExpenses } from './mock-expenses';

@Injectable()
export class ExpenseService {

  addExpense(expense: Expense): void {
    allExpenses.push(expense);
  }

  getExpenses(): Promise<Expense[]> {
    return Promise.resolve(allExpenses); 
  }

  getExpense(id: number): Promise<Expense> {
    return this.getExpenses().then(expenses =>
      expenses.find(expense => expense.id === id)
    )
  }

  removeExpense(expense: Expense): void {
    this.getExpenses().then(expenses => {
      const index = expenses.indexOf(expense);
      expenses.splice(index, 1);
    })
  }   
}

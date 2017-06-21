import { Injectable } from '@angular/core';
import { Expense } from '../data/expense';
import { allExpenses } from '../data/mock-expenses';

@Injectable()
export class ExpenseService {

  addExpense(expense: Expense): void {
    allExpenses.push(expense);
  }

  findAllExpenses(): Promise<Expense[]> {
    return Promise.resolve(allExpenses); 
  }

  findExpense(id: number): Promise<Expense> {
    return this.findAllExpenses().then(expenses =>
      expenses.find(expense => expense.id === id)
    )
  }

  getNextId(): Promise<number> {
    return this.findAllExpenses().then(expenses => {
      const expenseIds = expenses.map(expense => expense.id)
      return Math.max.apply(null, expenseIds) + 1;
    });
  }

  removeExpense(expense: Expense): void {
    this.findAllExpenses().then(expenses => {
      const index = expenses.indexOf(expense);
      expenses.splice(index, 1);
    })
  }   

  updateExpense(expense: Expense): void {
    this.findAllExpenses().then(expenses => 
      expenses.map(e => {
        if (e.id === expense.id) { 
          e.cost = expense.cost;
          e.date = expense.date;
          e.description = expense.description;
          e.editing = expense.editing;
        }       
      })
    );
  }
}
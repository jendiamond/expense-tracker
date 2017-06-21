import { ExpenseService } from './expense.service';

describe('ExpenseService', () => {
  let service: ExpenseService;
  beforeEach(() => { service = new ExpenseService(); });
  
  const mockExpense = {
    id: 10, 
    date: '2017-06-01',
    description: 'Lunch at King Taco', 
    cost: 10,
    editing: false
  }

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an expense', (done: DoneFn) => { 
    service.addExpense(mockExpense);

    let numOfExpenses;
    service.findAllExpenses().then(expenses => {
      numOfExpenses = expenses.length;
      expect(numOfExpenses).toEqual(5);
      done();

      service.removeExpense(mockExpense);
    })
  });

  it('should return all expenses with a valid expense', (done: DoneFn) => { 
    service.findAllExpenses().then(expenses => 
      expenses.forEach(expense => {
        expect(expense.id).toBeTruthy();
        expect(expense.cost).toBeTruthy();
        expect(expense.date).toBeTruthy();
        expect(expense.description).toBeTruthy();
        expect(expense.editing).toBeFalsy();
        done();
      })
    )
  });

  it('should return an expense by id', (done: DoneFn) => { 
    service.findExpense(1).then(expense => {
      expect(expense.id).toEqual(1);
      done();
    })
  });

  it('should return the next highest id', (done: DoneFn) => { 
    service.addExpense(mockExpense);

    service.getNextId().then(id => {
      expect(id).toEqual(11);
      service.removeExpense(mockExpense);
      done();
    });
  });

  it('should remove an expense', (done: DoneFn) => { 
    service.addExpense(mockExpense);
    service.removeExpense(mockExpense);

    let numOfExpenses;
    service.findAllExpenses().then(expenses => {
      numOfExpenses = expenses.length;
      expect(numOfExpenses).toEqual(4);
      done();
    })
  });

  it('should update an expense', (done: DoneFn) => { 
    const updatedMockExpense = {
      id: 3,
      date: '2017-06-15',
      description: 'Vacation ticket to Utah',
      cost: 300,
      editing: true
    }
    service.updateExpense(updatedMockExpense);

    service.findExpense(3).then(expense => {
      expect(expense.id).toEqual(3);
      expect(expense.date).toEqual('2017-06-15');
      expect(expense.description).toEqual('Vacation ticket to Utah');
      expect(expense.cost).toEqual(300);
      expect(expense.editing).toBeTruthy();
      done();
    })
  });
});
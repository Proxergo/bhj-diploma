
/**Класс TransactionsWidget отвечает за открытие всплывающих окон для создания нового дохода или расхода*/

class TransactionsWidget {
  constructor( element ) {
    if (!element) {
      throw new Error('Элемент для создания транзакции не был передан');            
    } 

    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    this.element.querySelector('.create-income-button').addEventListener('click', () => {
      App.getModal('newIncome').open();
    });

    this.element.querySelector('.create-expense-button').addEventListener('click', () => {
      App.getModal('newExpense').open();
    });
  }
}

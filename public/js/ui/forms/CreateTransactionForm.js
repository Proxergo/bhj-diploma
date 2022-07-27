
/*Класс CreateTransactionForm управляет формой создания новой транзакции*/

class CreateTransactionForm extends AsyncForm {

  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  renderAccountsList() {
    const accountSelect = this.element.querySelector('.accounts-select');
    Account.list(User.current(), (err, response) => {
      if (response && response.data) {
          accountSelect.textContent = '';
          let html = '';
          response.data.forEach((elem) => {            
            html += 
            `<option value="${elem.id}">${elem.name}</option>`;            
          });
          accountSelect.insertAdjacentHTML('beforeend', html);
      }
  });
  }

  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response && response.success) {
        this.element.reset();
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();
        App.update();     
      }
    });
  }
}

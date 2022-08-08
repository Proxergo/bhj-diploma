
/*Класс CreateTransactionForm управляет формой создания новой транзакции*/

class CreateTransactionForm extends AsyncForm {

  constructor(element) {
    super(element)
    this.renderAccountsList();
   //this.renderCurrency();
  }

  renderAccountsList() {
    const accountSelect = this.element.querySelector('.accounts-select');
    Account.list(User.current(), (err, response) => {
      if (response && response.data) {
          accountSelect.innerHTML = response.data.reduce((init, item) => init + `<option value="${item.id}">${item.name}</option>`, '');          
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

  renderCurrency() {
    const currencies = JSON.parse(localStorage.currencyList);
    //console.log(currency);
    let currency = [];
    const currencyList = document.querySelector('.currency');
    //JSON.parse(localStorage.currencyList).USD.CharCode;
    //console.log(currency.USD[CharCode])
    let html = '';
    
    for (let item in currencies) {
      if (currencies.hasOwnProperty(item)) {
        currency.push(item)
      }
    }
    console.log(html);
    currencyList.innerHTML = html;    
  }
}
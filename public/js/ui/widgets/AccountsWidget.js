/*Класс AccountsWidget управляет блоком отображения счетов в боковой колонке*/

class AccountsWidget {
  constructor( element ) {
    if (!element) {
      throw new Error('Элемент не найден')
    }
    this.element = element;
    this.registerEvents();
    this.update();
  }

  registerEvents() {
    this.element.addEventListener('click', (event) => {
      event.preventDefault();

      if (event.target.closest('li')) {
        if (event.target.classList.contains('create-account')) {
          App.getModal('createAccount').open();
        }
        this.onSelectAccount(event.target.closest('li'));
      }
    });
  }

  update() {
    Account.list(null, (err, response) => {
      if (response && response.success) {
        this.clear();
        response.data.forEach(item => this.renderItem(item));
      }
     });
  }

  clear() {
    this.element.querySelectorAll('.account').forEach(element => element.remove());
  }

  onSelectAccount(element) {     
    if (this.selectedAccount) {
      this.selectedAccount.classList.remove('active');
    }
    element.classList.add('active');
    this.selectedAccount = element;
    App.showPage( 'transactions', {account_id: element.dataset.id});
  }

  getAccountHTML(item) {
    //Приведение числа суммы к денежному виду, для отражения нецелой части и валюты
    const currency = item.sum.toLocaleString('ru-RU', {
      style: 'currency',
      currency: 'RUB',
    });

    return `<li class="account" data-id="${item.id}">
              <a href="#">
                <span>${item.name}</span>  /  
                <span>${currency}</span>
              </a>
            </li>`
  }

  renderItem(data){
    this.element.insertAdjacentHTML('beforeend', this.getAccountHTML(data));
  }
}

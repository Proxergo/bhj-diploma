
/*Класс TransactionsPage управляет страницей отображения доходов и расходов конкретного счёта*/

class TransactionsPage {
  constructor( element ) {
    if (!element) {     
      throw new Error('Элемент не был передан при попытке показать транзакцию');      
    }
    this.element = element;
    this.registerEvents();
  }

  update() {
    this.render(this.lastOptions);
  }

  registerEvents() {
    this.element.querySelector('.remove-account').addEventListener('click', () => {
      this.removeAccount();
    });

    this.element.addEventListener('click', (elem) => {
      const removeTransaction = elem.target.closest('.transaction__remove')
      
      if (removeTransaction) {
        this.removeTransaction(removeTransaction.dataset.id);
      }      
    })
  }

  removeAccount() {
    if (this.lastOptions) {
      if (confirm(`Вы действительно хотите удалить счет?`)) {
        Account.remove({id : this.lastOptions.account_id}, (err, response) => {
          if (response && response.success) {
            App.updateWidgets();
            App.updateForms();
            this.clear();
          }
        });            
      }
    }      
  }

  removeTransaction(id) {
    if (id) {
      if(confirm('Вы действительно хотите удалить эту транзакцию?')) {
        Transaction.remove({id}, (err, response) => {
          if (response && response.success) {            
            App.getWidget('accounts').update();
            this.update();
          } else {
            throw new Error(err);
          }   
        });
      }
    }
  }

  render(options){     
    if (options) {
      this.lastOptions = options;
      Account.get(options.account_id, (err, response) => {
        if (err) {
          console.error(err);
        } else {          
          this.renderTitle(response.data.name);
        }
      });

      Transaction.list( {account_id: options.account_id}, (err, response) => {
        if (err) {
          console.error(err);
        } else {          
          this.renderTransactions(response.data);
        }
      });
    }
  }

  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = null;
  }

  renderTitle(name){
    document.querySelector('.content-title').textContent = name ;
  }

  formatDate(date){
    const dateTran = new Date(date);
    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
    return dateTran.toLocaleDateString('ru-RU', options);
  }

  getTransactionHTML(item){
    return `<div class="transaction transaction_${item.type} row">
        <div class="col-md-7 transaction__details">
          <div class="transaction__icon">
              <span class="fa fa-money fa-2x"></span>
          </div>
          <div class="transaction__info">
              <h4 class="transaction__title">${item.name}</h4>
              <div class="transaction__date">${this.formatDate(item.created_at)}</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="transaction__summ">
              ${item.sum} <span class="currency">₽</span>
          </div>
        </div>
        <div class="col-md-2 transaction__controls">
            <button class="btn btn-danger transaction__remove" data-id="${item.id}">
                <i class="fa fa-trash"></i>  
            </button>
        </div>
    </div>`
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){
    let html = '';
    const content = this.element.querySelector('.content');
    data.forEach((item) => {
      html += this.getTransactionHTML(item);      
    });

    content.textContent = '';
    content.insertAdjacentHTML('beforeend', html);    
  }
}
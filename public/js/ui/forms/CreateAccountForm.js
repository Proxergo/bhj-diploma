
/*Класс CreateAccountForm управляет формой создания нового счёта */

class CreateAccountForm extends AsyncForm { 
  onSubmit(data) {
    Account.create(data, (err, response) => {      
        if (response && response.success) {
          this.element.reset();
          App.getModal('createAccount').close();
          App.update();
        } else {
          throw new Error(response.error);          
        }      
    });    
  }
}
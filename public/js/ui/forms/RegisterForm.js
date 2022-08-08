
/*Класс RegisterForm управляет формой регистрации*/

class RegisterForm extends AsyncForm {
  onSubmit(data) {
    User.register(data, (err, response) => {
      if (response && response.user) {
        this.element.reset();
        App.setState('user-logged');
        App.getModal('register').close();
      } else {
        throw new Error('Не удалось произвести регистрацию пользователя')
      }
    }) 
  }
}
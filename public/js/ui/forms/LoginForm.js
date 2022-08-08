
/*Класс LoginForm управляет формой входа в портал*/

class LoginForm extends AsyncForm {
  onSubmit(data) {
    User.login(data, (err, response) => {
      if (response && response.user) {
        this.element.reset();
        App.setState('user-logged');
        App.getModal('login').close();
      } else {
        throw new Error(err);
      }
    })
  }
}
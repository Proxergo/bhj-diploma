/*Управляет авторизацией, выходом и регистрацией пользователя из приложения*/
class User {
  static URL = '/user';
  static setCurrent(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /*Удаляет информацию об авторизованном пользователе из локального хранилища.*/
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /* Возвращает текущего авторизованного пользователя из локального хранилища*/
  static current() {
    const user = localStorage.user;
    if (user) {
      return JSON.parse(localStorage.user);
    } else {
      return undefined;
    }
  }

  /*Получает информацию о текущем авторизованном пользователе.*/
  static fetch(callback) {
    createRequest({
      url: this.URL + '/current',
      method: 'GET',
      callback: (err, response) => {
        if (response && response.success) {
          this.setCurrent(response.user);
        } else {
          this.unsetCurrent();
        }
        callback(err, response);
      },
    });
  }

  /*Производит попытку авторизации.*/
  static login(data, callback) {
    return createRequest({
      url: this.URL + '/login',
      method: 'POST',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  /* Производит попытку регистрации пользователя.*/
  static register(data, callback) {
    return createRequest ({
      url: this.URL + '/register',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.success) {
          this.setCurrent(response.user);
        } 
        callback(err, response);
      },
    })
  }

  /*Производит выход из приложения.*/
  static logout(callback) {
    return createRequest ({
      url: this.URL + '/logout',
      method: 'POST',
      callback: (err, response) => {
        if (response && response.success) {
          this.unsetCurrent();
        } 
        callback(err, response);
      },
    })
  }
}
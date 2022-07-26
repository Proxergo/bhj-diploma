
/*Класс Entity - базовый для взаимодействия с сервером.*/

class Entity {
  static URL = '';

  static list(data, callback){
    return createRequest({
      url: this.URL + `?account_id=${data}`,
      responseType: 'json',
      method: 'GET',
      callback,
    });
  }

  static create(data, callback) {
    return createRequest({
      url: this.URL,
      data,
      responseType: 'json',
      method: 'PUT',
      callback,
    });
  }

  static remove(data, callback ) {
    return createRequest({
      url: this.URL + '/',
      data,
      responseType: 'json',
      method: 'DELETE',
      callback,
    });
  }
}
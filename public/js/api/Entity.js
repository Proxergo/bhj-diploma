/*Класс Entity - базовый для взаимодействия с сервером.*/
class Entity {
  static URL = '';
  /*Запрашивает с сервера список данных. Это могут быть счета или доходы/расходы*/
  static list(data, callback){
    return createRequest({
      url: this.URL + `?account_id=${data}`,
      responseType: 'json',
      method: 'GET',
      callback,
    });
  }

  /*Создаёт счёт или доход/расход с помощью запроса на сервер.*/
  static create(data, callback) {
    return createRequest({
      url: this.URL,
      data,
      responseType: 'json',
      method: 'PUT',
      callback,
    });
  }

  /*Удаляет информацию о счёте или доходе/расходе*/
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
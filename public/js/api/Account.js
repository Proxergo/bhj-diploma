class Account extends Entity {
  static URL = '/account'
  /*Получает информацию о счёте*/
  static get(id = '', callback){
    return createRequest({
      url: this.URL + '/' + id,
      responseType: 'json',
      method: 'GET',
      callback,
    });
  }
}
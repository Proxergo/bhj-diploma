


class Account extends Entity {
  static URL = '/account'

  static get(id = '', callback){
    return createRequest({
      url: this.URL + '/' + id,
      responseType: 'json',
      method: 'GET',
      callback,
    });
  }
}
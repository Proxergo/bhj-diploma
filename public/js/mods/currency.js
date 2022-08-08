/*Записывает в localstorage.user дату последнего запроса. Скрипт проверяет дату и если она отлична от сегодняшней, запрашивает
список валюты, убирает из него лишнее и сохраняет в localstorage. Перезаписывает данные в user
По сути костыль для обхода необходимости сохранения данных на сервере
*/

const currency = () => {
  const dateNow = new Date().toISOString().split('T')[0];
  const user = JSON.parse(localStorage.getItem('user'));
  if (dateNow !== user.lastLoginDate) { 
    fetch('https://www.cbr-xml-daily.ru/daily_json.js').then((response) => {          
    if (response.status === 200) {
        response.json().then((data) => {
            console.log(data["Valute"]);
            localStorage.setItem('currencyList', JSON.stringify(data["Valute"]));
            user['lastLoginDate'] = new Date().toISOString().split('T')[0];
            localStorage.setItem('user', JSON.stringify(user));
        });  
    } else {
      console.error('Возникла проблема при отправке запроса курса валют. Код ошибки: ' + response.status);
      return;
    }})
    .catch((err) => {  
      console.error('Ошибка fetch запроса', err);  
    });
  }  
}

/* Класс UserWidget отвечает за отображение информации о имени пользователя после авторизации или его выхода из системы*/

class UserWidget {
  constructor(element){
    if (!element) {
      throw new Error('Элемент с данными пользователя не был передан')
    } else {
      this.element = element;
    }
  }

  update(){
    const user = User.current();
    if (user) {
      this.element.querySelector('.user-name').innerText = user.name;
    }

  }
}

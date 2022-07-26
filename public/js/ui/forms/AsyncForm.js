
/*Класс AsyncForm управляет всеми формами приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данныес таких форм собираются и передаются
 * в метод onSubmit для последующей обработки*/

class AsyncForm {
  constructor(element) {
    if (!element) {
      console.error('Элемент формы не был передан')
    } 
    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    this.element.addEventListener('submit', (elem) => {
      elem.preventDefault();
      this.submit()
    })
  }

  getData() {
    const formData = new FormData(this.element);
    return Object.fromEntries(formData.entries());
  }

  onSubmit(options){
    
  }

  submit() {
    this.onSubmit(this.getData());  
  }
}
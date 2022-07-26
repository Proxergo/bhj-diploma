
/*Класс Modal отвечает за управление всплывающими окнами. В первую очередь это открытие или закрытие имеющихся окон*/

class Modal {
  constructor(element){
    if (!element) {
      console.error('При создании модального окна не был передан элемент');
    } 
    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    this.element.querySelectorAll(`[data-dismiss="modal"]`).forEach((elem)=> {
      elem.addEventListener('click', (elem) => {
        elem.preventDefault();
        this.onClose()
      })
    });
  }

  onClose(e) {
    if (e) {
      e.preventDefault();
    }      
    this.close();
  }

  open() {
    this.element.style.display = 'block';
  }

  close(){
    this.element.style.removeProperty('display');
  }
}
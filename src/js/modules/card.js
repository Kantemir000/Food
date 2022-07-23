import {getResource} from "../services/servises";

function card() {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) { 
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27; //будет с сервера
            this.changeToUAH(); 
        }

        changeToUAH() { //поменятьНаГривны 
            this.price *= this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {  //значит если массив пустой, будем ставить дефолтный класс (создаём "параметры по умолчанию" своими руками)
                this.element = 'menu__item'; //чтобы переиспользовать класс, если в будущем вдруг понадобится, но это не обязательно
                element.classList.add(this.element); 
              //element.classList.add('menu__item'); если не переиспользовать
            } else { // если есть хотя бы один класс, то
                this.classes.forEach(className => element.classList.add(className)); //так как classes массив нам нужно перебрать его и подсоединить его к div.
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    //Замена карточек созданных в ручную 
    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

  //часто повторяется, можно сократить
  //const div = new MenuCard(...); //в переменную кладём объект, но объект может жить без переменной
  //div.render();

  //сокращение
  //new MenuCard(...).render(); //мы нигде не сохраняем этот объект, у него не будет ссылок(можем использовать один раз)

    /* new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container",
        'menu__item'
      //'big' если добавить ещё один класс, то будет <div class='menu__item bg'>...</div>

      //НО если пользователь забудит написать дефолтный класс, то в голову приходит сразу использовать параметры по умолчанию
      //... class = 'menu__item'( не сработает, rest не поддерживает дефолтные значения), а если по старому способу?
      //this.classes = classes || 'menu__item', но 188 строка мы пытаемся перебрать того, что пока не существует.
      // также если дефолного значения не будет, то мы получим пустой массив ...classes , значит ( продолжение строка 183)
      //Стоит заменить this.classes = classes || 'menu__item' не работает ещё по тому, что classes true, а чтобы этот способ работал нужно false (написанно в уроке про этот способ)
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        ".menu .container",
        'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        ".menu .container",
        'menu__item'
    ).render(); */
}
export default card;
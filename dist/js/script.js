/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
  let sex, height, weight, age, ratio;

  if (localStorage.getItem('sex')) {
    //После перезагрузки страницы если мы поменяли какие-то данные, например пол, то они сохранятся. 
    sex = localStorage.getItem('sex');
  } else {
    //параметры по умолчанию
    localStorage.setItem('sex', 'female');
    sex = 'female';
  }

  if (localStorage.getItem('ratio')) {
    //После перезагрузки страницы если мы поменяли какие-то данные, например пол, то они сохранятся. 
    ratio = localStorage.getItem('ratio');
  } else {
    //параметры по умолчанию
    localStorage.setItem('ratio', 1.372);
    ratio = 1.372;
  }

  function initLocalSettings(selector, activeClass) {
    //классы активноти после перезагрузки страницы
    const elements = document.querySelectorAll(selector);
    elements.forEach(elem => {
      elem.classList.remove(activeClass);

      if (elem.getAttribute('id') === localStorage.getItem('sex')) {
        elem.classList.add(activeClass);
      }

      if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        elem.classList.add(activeClass);
      }
    });
  }

  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
  initLocalSettings('#gender div', 'calculating__choose-item_active');
  const result = document.querySelector('.calculating__result span');

  function calcTotal() {
    //общая сумма
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = 0;
      return; //досрочно прервать функцию
    }

    if (sex === 'male') {
      result.textContent = Math.round(88.36 + 13.4 * weight + 4.8 * height - 5.7 * age * ratio);
    } else {
      result.textContent = Math.round(447.6 + 9.2 * weight + 3.1 * height - 4.3 * age * ratio);
    }
  }

  calcTotal();

  function getStaticInformation(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);
    document.querySelector(parentSelector).addEventListener('click', e => {
      if (e.target.classList.contains('calculating__choose-item')) {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +e.target.getAttribute('data-ratio')); //новый ключ
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', e.target.getAttribute('id')); //новый ключ
        }

        elements.forEach(element => element.classList.remove(activeClass));
        e.target.classList.add(activeClass);
        calcTotal();
      }
    });
  }

  getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');
  getStaticInformation('#gender', 'calculating__choose-item_active');

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);
    input.addEventListener('input', () => {
      if (input.value.match(/\D/g)) {
        //красная обводка, если не число
        input.style.border = '1px solid red';
      } else {
        input.style.border = 'none';
      }

      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;

        case 'weight':
          weight = +input.value;
          break;

        case 'age':
          age = +input.value;
          break;
      }

      console.log(height, weight, age);
      calcTotal();
    });
  }

  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./src/js/modules/card.js":
/*!********************************!*\
  !*** ./src/js/modules/card.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_servises__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/servises */ "./src/js/services/servises.js");


function card() {
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;

      for (var _len = arguments.length, classes = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        classes[_key - 6] = arguments[_key];
      }

      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27; //будет с сервера

      this.changeToUAH();
    }

    changeToUAH() {
      //поменятьНаГривны 
      this.price *= this.transfer;
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        //значит если массив пустой, будем ставить дефолтный класс (создаём "параметры по умолчанию" своими руками)
        this.element = 'menu__item'; //чтобы переиспользовать класс, если в будущем вдруг понадобится, но это не обязательно

        element.classList.add(this.element); //element.classList.add('menu__item'); если не переиспользовать
      } else {
        // если есть хотя бы один класс, то
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

  } //Замена карточек созданных в ручную 


  (0,_services_servises__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu').then(data => {
    data.forEach(_ref => {
      let {
        img,
        altimg,
        title,
        descr,
        price
      } = _ref;
      new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    });
  }); //часто повторяется, можно сократить
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (card);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");
/* harmony import */ var _services_servises__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/servises */ "./src/js/services/servises.js");



function forms(modalSelector, modalIdTimer, formSelector, ModalDialog) {
  const forms = document.querySelectorAll(formSelector); //form обязательна в документе HTML без неё на сервер данные не будут отправляться

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };
  forms.forEach(item => {
    bindPostData(item);
  }); //Передаём formData 

  function bindPostData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const statusMessage = document.createElement('img'); //добавляем спинер загрузки

      statusMessage.src = message.loading; //setAttribute альтернатива

      statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `; //form.append(statusMessage); не красивое отображение в форме, которая почтив конце

      form.insertAdjacentElement('afterend', statusMessage); //------------------------------------------------------------------------------------------------
      //XMLHttpRequest

      /* const request = new XMLHttpRequest();
      request.open('POST', 'server.php'); */
      //json  //request.setRequestHeader('Content-type', 'application/json; charset=utf-8'); //Передаём в формате json
      //request.setRequestHeader('Content-type', 'multipart/form-data'); //НЕ ИСПОЛЬЗОВАТЬ С  XMLHttpRequest, заголовок устанавливается автоматически
      //const formData = new FormData(form);
      //json  //Передаём в формате json

      /* const object = {}; //создаём обычный объект
         formData.forEach(function(value, key){
             object[key] = value;
         });
         const json = JSON.stringify(object); //превращает обычный объект в JSON
         request.send(json); */
      //request.send(formData); //в post мы уже отправляем в нашем случае formData

      /* request.addEventListener('load', () => {
           if (request.status === 200) {
               console.log(request.response); //если не делать проверку на статус 'ок' то будет выводить пустоту так как данные не успели вернуться клиенту
               //statusMessage.textContent = message.success;
               showThanksModal(message.success); //урок 054
               form.reset(); //сброс формы, альтернатива взять input этой формы перебрать их и отчислить их value
               statusMessage.remove(); //использовать для спинера
           } else {
               //statusMessage.textContent = message.failure;
               showThanksModal(message.failure); //урок 054
               statusMessage.remove();
           }
       }); */
      //------------------------------------------------------------------------------------------------
      //Fetch API

      const formData = new FormData(form); //старый

      /* 
      const object = {}; 
      formData.forEach(function(value, key){
          object[key] = value;
      }); */
      //новый

      const json = JSON.stringify(Object.fromEntries(formData.entries())); //вынесем в отдельную функцию PostData 262
      //fetch('server.php',{
      //method: 'POST',

      /* headers: {
          'Content-type': 'application/json; charset=utf-8'
      }, */
      //body: formData /* JSON.stringify(object);  */
      //})

      (0,_services_servises__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json) //formData

      /* .then(data => 
          data.text()) */
      .then(data => {
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
      }).catch(() => {
        showThanksModal(message.failure);
        statusMessage.remove();
      }).finally(() => {
        form.reset();
      }); //------------------------------------------------------------------------------------------------
    });
  } //Modal thanks (затрагивает изменения в modal стр100)


  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(ModalDialog);
    prevModalDialog.classList.remove('show'); //можно не добавлять, просто при повторном открытии thanksModal будет "modal__dialog show hide", что не очень красиво 

    prevModalDialog.classList.add('hide');
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(modalSelector, modalIdTimer);
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `;
    document.querySelector(modalSelector).append(thanksModal);
    setTimeout(() => {
      //закрывается модальное окно благодарности и снова начинает отображаться модальное окно регистрации
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalClose)(modalSelector); // если мы не закроем thanksModal сами, то через 2000 откроется мадольное окно контактов, что лично не для меня не очень, зачем его снова отображать, если человек уже оставил заявку
    }, 2000);
  } //пример из видео

  /* fetch('http://localhost:3000/menu')
  .then(data => data.json())
  .then(res => console.log(res)); */

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "modalClose": () => (/* binding */ modalClose),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
// Способ 1 (мой)

/*  modalTrigger.forEach((btn) => {
     btn.addEventListener('click', event => {
         event.preventDefault();
         modal.style.display = 'block';
     });
 });
   modalCloseBtn.addEventListener('click', event => {
     event.preventDefault();
     modal.style.display = 'none';
 }); */
let stop = false; //Способ 2 + DRY

function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  stop = true; //вместо add и remove
  //modal.classList.toggle('show'); //Способ 3 

  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden'; //чтобы не было прокрутки после вызова модального окна

  if (modalTimerId) {
    clearInterval(modalTimerId); //если пользователь откроет модальное окно, то модальное окно с временным интервалом не появится
  }

  return stop;
}

function modalClose(modalSelector) {
  const modal = document.querySelector(modalSelector); //вместо add и remove
  //modal.classList.toggle('show'); //Способ 3

  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = ''; //scroll по умолчанию 
} //modalCloseBtn.addEventListener('click', modalClose); //Не использовали делегирование 037


function modal(modalTrig, modalSelector, modalIdTimer) {
  const modalTrigger = document.querySelectorAll(modalTrig),
        //modalTrigger = document.querySelector('[data-modal]'), //у нас несколько data-modal, поэтому он возьмёт первый
  modal = document.querySelector(modalSelector); //modalCloseBtn = document.querySelector('[data-close]'); //убираем чтобы использовать делегирование событий, это нужно чтобы крестик работал

  modalTrigger.forEach(btn => btn.addEventListener('click', () => openModal(modalSelector, modalIdTimer)));
  modal.addEventListener('click', e => {
    //при нажатии на пустоту, модальное окно закрывается
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      //закроется модальное окно при нажатии на что угодно, если не будет сравнения || что это в уроке 054
      modalClose(modalSelector);
    }
  });
  document.addEventListener('keydown', e => {
    //закрытие модального окна при нажатии клавиш
    if (e.code === "Escape" && modal.classList.contains('show')) {
      //свойство code //чтобы каждый раз при нажатии на esc не вызывалась наша функция(когда модальное окно закрыто), используем contains('show')
      modalClose(modalSelector);
    }
  });

  function showModalScroll() {
    //вызывается модальное окно в конце страницы
    if (window.pageYOffset + document.documentElement.clientHeight >= //высоту прокрутки + высоту видимой части (в процессе узнаём)
    document.documentElement.scrollHeight - 1 && !stop) {
      // весь контент, который есть (сразу узнаем). -1, чтобы не было багов в некоторых браузерах(не отображается модальное окно после прокрутки)
      openModal(modalSelector, modalIdTimer);
      window.removeEventListener('scroll', showModalScroll); //как только условие сработало, мы удаляем обработчик
    }
  } //Событие scroll вешается на глобальный объект window 


  window.addEventListener('scroll', showModalScroll); //после скрола вызываем функцию (как только идёт прокрутка колёсика мыши на 1 деление, это уже будет скрол)
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider(_ref) {
  let {
    container,
    slide,
    prevArrow,
    nextArrow,
    totalCounter,
    currentCounter,
    wrapperSliders,
    field
  } = _ref;
  //slider 1

  /* const slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.getElementById('total'),
        current = document.getElementById('current');
  
  let index = 1;
    showSlide(index);
    if (slides.length < 10) {
      total.textContent = `0${slides.length}`;
  } else {
      total.textContent = slides.length;
  }
    function showSlide(n) {
        if (n > slides.length) {
          index = 1;
      }
        if (n < 1) {
          index = slides.length;
      }
        if (index < 10) {
          current.textContent = `0${index}`;
      } else {
          current.textContent = index;
      }
        slides.forEach((slide) => {
          slide.classList.add('hide');
          slide.classList.remove('show', 'fade');
      });
        slides[index - 1].classList.add('show', 'fade');
      slides[index - 1].classList.remove('hide');
      
  }
    function pluseSlide(n) {
      showSlide(index += n);
  }
    next.addEventListener('click', () => {
      pluseSlide(1);
  });
    prev.addEventListener('click', () => {
      pluseSlide(-1);
  }); */
  //slider 2
  const slides = document.querySelectorAll(slide),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.getElementById(totalCounter),
        current = document.getElementById(currentCounter),
        wrapper = document.querySelector(wrapperSliders),
        inner = document.querySelector(field),
        width = window.getComputedStyle(wrapper).width; // выглядит как '250px' также это строка, а не число//получение определённого свойства в объекте

  let index = 1; //для счётчика //не факт, что 1

  let offset = 0; //для перемещения слайдов

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
  } else {
    total.textContent = slides.length;
  }

  if (index < 10) {
    current.textContent = `0${index}`;
  } else {
    current.textContent = index;
  }

  slides.forEach(slide => {
    //одинаковая ширина
    slide.style.width = width;
  });
  inner.style.display = 'flex';
  inner.style.transition = '0.5s all';
  inner.style.width = 100 * slides.length + '%'; //ширина блока

  wrapper.style.overflow = 'hidden'; //обрезаем под размер блока

  next.addEventListener('click', () => {
    if (index == slides.length) {
      //изменяем индекс
      index = 1;
    } else {
      index++;
    }

    if (index < 10) {
      //изменённый индекс помещаем на страницу
      current.textContent = `0${index}`;
    } else {
      current.textContent = index;
    }

    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      //первый слайд отчёт с 0 (offset), поэтому (slides.length - 1)
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }

    inner.style.transform = `translateX(-${offset}px)`; //Nav slides

    dots.forEach(dot => dot.style.opacity = '.5');
    dots[index - 1].style.opacity = '1';
  });
  prev.addEventListener('click', () => {
    if (index == 1) {
      //изменяем индекс
      index = slides.length;
    } else {
      index--;
    }

    if (index < 10) {
      //изменённый индекс помещаем на страницу
      current.textContent = `0${index}`;
    } else {
      current.textContent = index;
    }

    if (offset == 0) {
      //первый слайд отчёт с 0 (offset), поэтому (slides.length - 1)     
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }

    inner.style.transform = `translateX(-${offset}px)`; // минус оставляем т.к. offset отрицательное число, - на - даёт + 
    //Nav slides

    dots.forEach(dot => dot.style.opacity = '.5');
    dots[index - 1].style.opacity = '1';
  }); //Nav slides

  const slider = document.querySelector(container);
  slider.style.position = 'relative';
  const indicators = document.createElement('ol'),
        dots = [];
  indicators.classList.add('carousel-indicators');
  indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
  slider.append(indicators);
  slides.forEach((slide, i) => {
    const dot = document.createElement('li'); //пересоздаётся

    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

    if (i == 0) {
      dot.style.opacity = '1';
    }

    indicators.append(dot);
    dots.push(dot); //dot каждый раз пересоздаётся, поэтому для работы со всеми элементами создадим массив
  });
  dots.forEach(dot => {
    dot.addEventListener('click', e => {
      const slideTo = e.target.getAttribute('data-slide-to');
      index = slideTo;
      offset = slideTo;

      if (index < 10) {
        current.textContent = `0${index}`;
      } else {
        current.textContent = index;
      }

      dots.forEach(dot => dot.style.opacity = '.5');
      dots[index - 1].style.opacity = '1';
      offset = +width.slice(0, width.length - 2) * (offset - 1); //offset = slideTo, slideTo отсчёт с 1, а слайды с 0, значит 'offset - 1', иначе последний сайт будет 'пустота'

      inner.style.transform = `translateX(-${offset}px)`;
    });
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsParentSelector, tabsSelector, tabsContentSelector, activeSelector) {
  //не всегда используют inline style, используют class
  const tabsParent = document.querySelector(tabsParentSelector),
        tabs = tabsParent.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector);

  function haidTabsContent() {
    tabsContent.forEach(item => {
      //item.style.display = 'none';
      item.classList.add('hide');
      item.classList.remove('show', 'fade'); //fade - чтобы при переключениях анимация вновь воспроизводилась
    });
    tabs.forEach(item => {
      item.classList.remove(activeSelector);
    });
  }

  function showTabsContent() {
    let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    //параметры по умолчанию es6 
    //tabsContent[i].style.display = "block";
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add(activeSelector);
  }

  haidTabsContent();
  showTabsContent();
  tabsParent.addEventListener('click', event => {
    const target = event.target;

    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, i) => {
        if (target == item) {
          //тот элемент на который только что кликнули == тот элемент, который мы перебираем в цикле
          haidTabsContent();
          showTabsContent(i);
        }
      });
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
  function getTimeRemaining(endtime) {
    //получаем ост время
    const t = Date.parse(endtime) - Date.parse(new Date()),
          //date.parse а не просто date, потому что это болле целенаправленный метод и чаще применяется, хотя по сути одно и тоже
    day = Math.floor(t / (1000 * 60 * 60 * 24)),
          //математические операции
    hour = Math.floor(t / (1000 * 60 * 60) % 24),
          minute = Math.floor(t / (1000 * 60) % 60),
          second = Math.floor(t / 1000 % 60);
    return {
      'total': t,
      'day': day,
      'hour': hour,
      'minute': minute,
      'second': second
    };
  }

  function addZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);
    updateClock(); //setInterval сработает только через 1 сек и чтобы не ждать мы инициализируем функцию  updateClock()

    function updateClock() {
      const timeRemaining = getTimeRemaining(endtime);
      days.innerHTML = addZero(timeRemaining.day);
      hours.innerHTML = addZero(timeRemaining.hour);
      minutes.innerHTML = addZero(timeRemaining.minute);
      seconds.innerHTML = addZero(timeRemaining.second);

      if (timeRemaining.total <= 0) {
        clearInterval(timeInterval); //когда время выйдет, таймер не обновляем

        days.innerHTML = '00';
        hours.innerHTML = '00';
        minutes.innerHTML = '00';
        seconds.innerHTML = '00';
      }
    }
  }

  setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./src/js/services/servises.js":
/*!*************************************!*\
  !*** ./src/js/services/servises.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8'
    },
    body: data
  });
  return await res.json();
};

const getResource = async url => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }

  return await res.json();
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");
/* harmony import */ var _modules_card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/card */ "./src/js/modules/card.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");










document.addEventListener('DOMContentLoaded', () => {
  const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('.modal', modalTimerId), 50000); //Модальное окно появится через 50 сек, но что, если пользователь нажмёт на кнопку с модальным окном, то его будет расжражать, что оно вылезло, хотя он его уже видел. (строчка 122) 

  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_card__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])('.modal', modalTimerId, 'form', '.modal__dialog');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal', modalTimerId);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
    container: '.offer__slider',
    slide: '.offer__slide',
    prevArrow: '.offer__slider-prev',
    nextArrow: '.offer__slider-next',
    totalCounter: 'total',
    currentCounter: 'current',
    wrapperSliders: '.offer__slider-wrapper',
    field: '.offer__slider-inner'
  });
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2022-06-14');
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map
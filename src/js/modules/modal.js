
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
let stop = false;
    //Способ 2 + DRY
    function openModal(modalSelector, modalTimerId) {
        const modal = document.querySelector(modalSelector);
        stop = true;
        //вместо add и remove
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
        const modal = document.querySelector(modalSelector);
        //вместо add и remove
        //modal.classList.toggle('show'); //Способ 3
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = ''; //scroll по умолчанию 
    }

    //modalCloseBtn.addEventListener('click', modalClose); //Не использовали делегирование 037

    
function modal(modalTrig, modalSelector, modalIdTimer) {
    const modalTrigger = document.querySelectorAll(modalTrig),
        //modalTrigger = document.querySelector('[data-modal]'), //у нас несколько data-modal, поэтому он возьмёт первый
          modal = document.querySelector(modalSelector);
        //modalCloseBtn = document.querySelector('[data-close]'); //убираем чтобы использовать делегирование событий, это нужно чтобы крестик работал

    
    modalTrigger.forEach((btn) => 
        btn.addEventListener('click', () => openModal(modalSelector, modalIdTimer)));

    modal.addEventListener('click', (e) => {  //при нажатии на пустоту, модальное окно закрывается
        if (e.target === modal || e.target.getAttribute('data-close') == '') { //закроется модальное окно при нажатии на что угодно, если не будет сравнения || что это в уроке 054
            modalClose(modalSelector); 
        }
    });

    document.addEventListener('keydown', e => { //закрытие модального окна при нажатии клавиш
        if (e.code === "Escape" && modal.classList.contains('show')) { //свойство code //чтобы каждый раз при нажатии на esc не вызывалась наша функция(когда модальное окно закрыто), используем contains('show')
            modalClose(modalSelector);
        }
    });

    function showModalScroll() { //вызывается модальное окно в конце страницы

        if ((window.pageYOffset + document.documentElement.clientHeight >= //высоту прокрутки + высоту видимой части (в процессе узнаём)
        document.documentElement.scrollHeight -1) && !stop) { // весь контент, который есть (сразу узнаем). -1, чтобы не было багов в некоторых браузерах(не отображается модальное окно после прокрутки)
            openModal(modalSelector, modalIdTimer);
            window.removeEventListener('scroll', showModalScroll); //как только условие сработало, мы удаляем обработчик
        }
    }
  //Событие scroll вешается на глобальный объект window 
    window.addEventListener('scroll', showModalScroll); //после скрола вызываем функцию (как только идёт прокрутка колёсика мыши на 1 деление, это уже будет скрол)
}
export default modal;
export {openModal, modalClose};


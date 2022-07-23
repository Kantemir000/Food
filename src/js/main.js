'use strict';

import calc from './modules/calc';
import card from './modules/card';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {openModal} from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000); //Модальное окно появится через 50 сек, но что, если пользователь нажмёт на кнопку с модальным окном, то его будет расжражать, что оно вылезло, хотя он его уже видел. (строчка 122) 

    calc();
    card();
    forms('.modal', modalTimerId, 'form', '.modal__dialog');
    modal('[data-modal]', '.modal', modalTimerId);
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        totalCounter: 'total',
        currentCounter: 'current',
        wrapperSliders: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    tabs('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
    timer('.timer', '2022-06-14');
    
}); 


function slider({container, slide, prevArrow, nextArrow, totalCounter, currentCounter, wrapperSliders, field}) {
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
          width = window.getComputedStyle(wrapper).width; // выглядит как '250px' также это строка, а не число//getComputedStyle - все свойства в объекте, width - обрщаемся к определённомму объекту
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

    slides.forEach(slide => { //одинаковая ширина
        slide.style.width = width;
    });
 
    inner.style.display = 'flex';
    inner.style.transition = '0.5s all';
    inner.style.width = 100 * slides.length + '%'; //ширина блока

    wrapper.style.overflow = 'hidden'; //обрезаем под размер блока

    next.addEventListener('click', () => {
        if (index == slides.length) { //изменяем индекс
            index = 1;
        } else { 
            index++;
        }

        if (index < 10) { //изменённый индекс помещаем на страницу
            current.textContent = `0${index}`;
        } else {
            current.textContent = index;
        }


        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) { //первый слайд отчёт с 0 (offset), поэтому (slides.length - 1)
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        inner.style.transform = `translateX(-${offset}px)`;

        //Nav slides
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[index - 1].style.opacity = '1';
    });

    prev.addEventListener('click', () => {
        if (index == 1) { //изменяем индекс
            index = slides.length;
        } else {
            index--;
        }

        if (index < 10) { //изменённый индекс помещаем на страницу
            current.textContent = `0${index}`;
        } else {
            current.textContent = index;
        }

        if (offset == 0) { //первый слайд отчёт с 0 (offset), поэтому (slides.length - 1)     
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        inner.style.transform = `translateX(-${offset}px)`; // минус оставляем т.к. offset отрицательное число, - на - даёт + 

        //Nav slides
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[index - 1].style.opacity = '1';
    });

//Nav slides
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

            offset = +width.slice(0, width.length - 2) * (offset - 1);  //offset = slideTo, slideTo отсчёт с 1, а слайды с 0, значит 'offset - 1', иначе последний сайт будет 'пустота'
            inner.style.transform = `translateX(-${offset}px)`;
        });
    });
}

export default slider;
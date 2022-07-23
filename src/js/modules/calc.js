function calc() {
    let sex, height, weight, age, ratio;

    if(localStorage.getItem('sex')) {  //После перезагрузки страницы если мы поменяли какие-то данные, например пол, то они сохранятся. 
        sex = localStorage.getItem('sex');
    } else { //параметры по умолчанию
        localStorage.setItem('sex', 'female');
        sex = 'female';
    }

    if(localStorage.getItem('ratio')) {  //После перезагрузки страницы если мы поменяли какие-то данные, например пол, то они сохранятся. 
        ratio = localStorage.getItem('ratio');
    } else { //параметры по умолчанию
        localStorage.setItem('ratio', 1.372);
        ratio = 1.372;
    }

    function initLocalSettings(selector, activeClass) { //классы активноти после перезагрузки страницы
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

    function calcTotal() { //общая сумма
        if (!sex || !height || !weight|| !age || !ratio) {
            result.textContent = 0;
            return; //досрочно прервать функцию
        }

        if (sex === 'male') {
            result.textContent = Math.round(88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age) * ratio);
        } else {
            result.textContent = Math.round(447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age) * ratio);
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

            if (input.value.match(/\D/g)) { //красная обводка, если не число
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
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

export default calc;
import {openModal, modalClose} from './modal';
import {postData} from '../services/servises';

function forms(modalSelector, modalIdTimer, formSelector, ModalDialog) {
    const forms = document.querySelectorAll(formSelector); //form обязательна в документе HTML без неё на сервер данные не будут отправляться
    
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });


//Передаём formData 
    function bindPostData (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();

            const statusMessage = document.createElement('img');  //добавляем спинер загрузки
            statusMessage.src = message.loading; //setAttribute альтернатива
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            //form.append(statusMessage); не красивое отображение в форме, которая почтив конце
            form.insertAdjacentElement('afterend', statusMessage);

//------------------------------------------------------------------------------------------------
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
            const formData = new FormData(form);

            //старый
            /* 
            const object = {}; 
            formData.forEach(function(value, key){
                object[key] = value;
            }); */
            //новый
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            //вынесем в отдельную функцию PostData 262
            //fetch('server.php',{
                //method: 'POST',
                /* headers: {
                    'Content-type': 'application/json; charset=utf-8'
                }, */
                //body: formData /* JSON.stringify(object);  */
            //})
            postData('http://localhost:3000/requests', json) //formData
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
            });
//------------------------------------------------------------------------------------------------

        });
    }

//Modal thanks (затрагивает изменения в modal стр100)
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector(ModalDialog);

        prevModalDialog.classList.remove('show'); //можно не добавлять, просто при повторном открытии thanksModal будет "modal__dialog show hide", что не очень красиво 
        prevModalDialog.classList.add('hide');
        openModal(modalSelector, modalIdTimer);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector(modalSelector).append(thanksModal);

        setTimeout(() =>{ //закрывается модальное окно благодарности и снова начинает отображаться модальное окно регистрации
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            modalClose(modalSelector); // если мы не закроем thanksModal сами, то через 2000 откроется мадольное окно контактов, что лично не для меня не очень, зачем его снова отображать, если человек уже оставил заявку
        }, 2000);
    }
    //пример из видео
    /* fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res)); */
}
export default forms;
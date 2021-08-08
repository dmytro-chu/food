import {modalClose, modalOpen} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            //Создаем спиннер загрузки
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // Чтобы синер появлялся после формы а не в её конце
            form.insertAdjacentElement('afterend', statusMessage);

       


            // Запос XMLHttpRequest()
            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');

            //Передача данных в обычном формате

            // request.setRequestHeader('Content-type', 'multipart/form-data'); // НЕ УКАЗЫВАТЬ ЭТУ СТРОКУ При совместном использовании XMLHttpRequest() и FormData(form), 'multipart/form-data' использовать не нужно
            // const formData = new FormData(form); 

            // request.send(formData);
            
            // Передача данных с методом JSON
            
            // request.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form);

            //Создаем обычный объект из formData
            // const object = {};
            // formData.forEach(function(value, key){
            //     object[key] = value;
            // });

            const json = JSON.stringify(Object.fromEntries(formData.entries())); //Преобразуем formData без перебора с помощью метода .entries*/

            // const json = JSON.stringify(object); //для работы без fetch
            postData('http://localhost:3000/requests', json/*JSON.stringify(object) - для работы с JSON /*formData - если работаем с форм датой*/)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
            
            // request.send(json); // Отправка закпроса

            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         form.reset();
            //         statusMessage.remove();
            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        modalOpen('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>x</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            modalClose('.modal');
        }, 4000);
    }
}

export default forms;
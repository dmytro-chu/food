function modalOpen (modalSelector, modalTimerId) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function modalClose (modalSelector) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
    document.body.style.overflow = ''; 
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    const btnModalOpen = document.querySelectorAll(triggerSelector),
        //   btnModalClose = document.querySelector('[data-close]'),// Не нужна после создания отправки формб поменяли код в 128 строке
          modalWindow = document.querySelector(modalSelector);
    
    
    btnModalOpen.forEach(item =>{
        item.addEventListener('click', () => modalOpen(modalSelector, modalTimerId));
    });

    // btnModalClose.addEventListener('click', modalClose);//Переменную удалили в 106й строке

    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
            modalClose(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
            modalClose(modalSelector);
        }
    });

    

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            modalOpen(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    
    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {modalClose};
export {modalOpen};
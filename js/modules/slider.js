function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    let offset = 0;
    let slideIndex = 1;
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent =  `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent =  slideIndex;
    }        

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    
    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative'; //Код навигации

    const indicators = document.createElement('ol'), //Код навигции
          dots = []; //Код навигции
    indicators.classList.add('carousel-indicators'); //Код навигции
    slider.append(indicators); //Код навигции

    for (let i = 0; i < slides.length; i++) { //Код навигции
        const dot = document.createElement('li'); //Код навигции
        dot.setAttribute('data-slide-to', i + 1); //Код навигции
        dot.classList.add('dot'); //Код навигции
        if (i == 0) { //Код навигции
            dot.style.opacity = 1; //Код навигции
        } //Код навигции
        indicators.append(dot); //Код навигции
        dots.push(dot); //Код навигции
    }

    function nullsAndDotsOpacity () {
        if (slides.length < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = ".5"); //Код навигции
        dots[slideIndex-1].style.opacity = 1;
    }

    function delNotNum (str) {
        return +str.replace(/\D/g, '');
    }
    
    next.addEventListener('click', () => {
        if (offset === delNotNum(width) * (slides.length -1)) {
            offset = 0;
        } else {
            offset += delNotNum(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        nullsAndDotsOpacity ();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = delNotNum(width) * (slides.length - 1);
        } else {
            offset -= delNotNum(width);
        }
                 
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        nullsAndDotsOpacity ();
    });

    // Переключение по точкам навигации ---------------------------------------
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = delNotNum(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            nullsAndDotsOpacity ();
        });
    });
}

export default slider;
const TIME = 3000;

const slides = document.querySelectorAll('.carousel__slide');
const slide1 = document.querySelector('.slide-1');
const length = slides.length;
let i = 1;

setInterval(function () {
    slides[i].classList.add('carousel__slide--active');

    const slideToHide = slides[i - 1];
    const lastSlide = slides[length - 1];
    if (slideToHide) {
        setTimeout(function () {
            slideToHide.classList.remove('carousel__slide--active');
        }, 500);
    } else {
        setTimeout(function () {
            lastSlide.classList.remove('carousel__slide--active');
        }, 500);
    }

    i++;
    if (i === length) {
        i = 0;
    }
    if (i === length - 1) {
        slide1.classList.add('carousel__slide--z-index');
    }
    if (i === 1) {
        slide1.classList.remove('carousel__slide--z-index');
    }
}, TIME);



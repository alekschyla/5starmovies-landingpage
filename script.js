const activeSlide = document.querySelector('.carousel__slide--active');
const slides = document.querySelectorAll('.carousel__slide');


const changeSlide = setInterval(function() {
    //slides[i].classList.add('carousel__slide--active');

    activeSlide.classList.remove('carousel__slide--active');
}, 5000);


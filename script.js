const TIME = 1000;

const slides = document.querySelectorAll('.carousel__slide');
const length = slides.length;
let i = 1;

setInterval(function () {
    slides[i].classList.add('carousel__slide--active');
    //
    // setTimeout(
    //     function () {
            const slideToHide = slides[i - 1];
            const lastSlide = slides[slides.length -1];
            if (slideToHide) {
                slideToHide.classList.remove('carousel__slide--active');
            }else {
                lastSlide.classList.remove('carousel__slide--active');
            }
        // },
    //     TIME
    // )

    i++;
    if (i === length) {
        i = 0;
    }
}, TIME);


//slides[i-1].classList.remove('carousel__slide--active');

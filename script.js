const slides = document.querySelectorAll('.carousel__slide');
let length = slides.length;
let i = 1;

setInterval(function () {
    slides[i].classList.add('carousel__slide--active');
    //slides[i-1].classList.remove('carousel__slide--active');
    i++;
   if (i === length) {
       i = 0;
   }
}, 3000);


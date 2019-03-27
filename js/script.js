const TIMENEXTSLIDE = 1000;
const TIMEOFSETTIMEOUT = 500;
let i = 1;
const slides = document.querySelectorAll('.carousel__slide');
const slide1 = document.querySelector('.slide-1');
const lastSlide = document.querySelector('.last-slide');
const length = slides.length;
const carousel = document.querySelector(".hero__carousel-wrapper");
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let currentIntervalId = null;
let canIClick = true;

const startInterval = () => (
    currentIntervalId = setInterval(
        () => {
            nextSlide();
        },
        TIMENEXTSLIDE
    )
);

const nextSlide = () => {
    slides[i].classList.add('carousel__slide--active');

    const slideToHide = slides[i - 1];
    const lastSlide = slides[length - 1];

    if (slideToHide) {
        setTimeout(function () {
            slideToHide.classList.remove('carousel__slide--active');
        }, TIMEOFSETTIMEOUT);
    } else {
        setTimeout(function () {
            lastSlide.classList.remove('carousel__slide--active');
        }, TIMEOFSETTIMEOUT);
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

};

const prevSlide = () => {
    if (i === 0) {
        slides[length - 2].classList.add('carousel__slide--active');
        setTimeout(
            () => lastSlide.classList.remove('carousel__slide--active'),
            TIMEOFSETTIMEOUT
        )
        i = length - 1;
    } else if (i === 1) {
        slides[length - 1].classList.add('carousel__slide--active');
        setTimeout(
            () => slides[i - 1].classList.remove('carousel__slide--active'),
            TIMEOFSETTIMEOUT
        )
        i--;
    } else {
        slides[i - 2].classList.add('carousel__slide--active');
        setTimeout(
            () => slides[i - 1].classList.remove('carousel__slide--active'),
            TIMEOFSETTIMEOUT
        )
        i--;
    }
};

startInterval();

prev.addEventListener("click", () => {
    if (canIClick) {
        prevSlide();
        canIClick = false;
        setTimeout(() => canIClick = true, 1000);
    }
});

next.addEventListener("click", () => {
    if (canIClick) {
        nextSlide();
        canIClick = false;
        setTimeout(() => canIClick = true, 1000);
    }
});

carousel.addEventListener("mouseenter", () => {
    clearInterval(currentIntervalId);
    currentIntervalId = null;
});

carousel.addEventListener("mouseleave", () => {
    if (!currentIntervalId) {
        startInterval();
    }
});

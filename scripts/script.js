<<<<<<< HEAD
=======
// SLIDER
const TIMENEXTSLIDE = 3000;
const SLIDETIME = 1000;

const slides = document.querySelectorAll('.carousel__slide');
let prevSlideIndex = slides.length - 1;
let currentSlideIndex = 0;

let currentIntervalId = null;
let canIClick = true;

const clearSlides = () => {
    slides.forEach(
        slide => {
            slide.classList.remove('carousel__slide--active');
            slide.classList.remove('carousel__slide--preserved');
        }
    );
};

const updateDisplay = () => {
    const prevSlide = slides[prevSlideIndex];
    const currentSlide = slides[currentSlideIndex];

    clearSlides();

    preserveSlide(prevSlide);
    makeSlideActive(currentSlide);
};

const preserveSlide = (slide) => {
    slide.classList.add('carousel__slide--preserved');
    setTimeout(
        () => {
            slide.classList.remove('carousel__slide--preserved');
        },
        TIMENEXTSLIDE
    );
};

const makeSlideActive = (slide) => {
    slide.classList.add('carousel__slide--active');
};

const startInterval = () => {
    currentIntervalId = setInterval(
        () => {
            nextSlide();
        },
        TIMENEXTSLIDE
    );
};

const nextSlide = () => {
    prevSlideIndex = currentSlideIndex;

    const nextSlide = currentSlideIndex + 1;
    if (nextSlide > slides.length - 1) {
        currentSlideIndex = 0;
    } else {
        currentSlideIndex = nextSlide;
    }

    updateDisplay();
};

const prevSlide = () => {
    prevSlideIndex = currentSlideIndex;

    const prevSlide = currentSlideIndex - 1;
    if (prevSlide < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = prevSlide;
    }

    updateDisplay();
};

// CONTROLS

document.querySelector('.prev').addEventListener("click", () => {
    if (canIClick) {
        prevSlide();
        canIClick = false;
        setTimeout(() => canIClick = true, SLIDETIME)
    }
});

document.querySelector('.next').addEventListener("click", () => {
    if (canIClick) {
        nextSlide();
        canIClick = false;
        setTimeout(() => canIClick = true, SLIDETIME);
    }
});

document.querySelector(".hero__carousel-wrapper").addEventListener("mouseenter", () => {
    clearInterval(currentIntervalId);
    currentIntervalId = null;
});

document.querySelector(".hero__carousel-wrapper").addEventListener("mouseleave", () => {
    if (!currentIntervalId) {
        startInterval();
    }
});

// AUTO SLIDES

startInterval();




// ANIMATE PHOTOS
const teammatesContainer = document.querySelector('.teammates');
const teammatesPhotos = document.querySelectorAll('.teammate-item__photo');
const teammatesContainerHeight = teammatesContainer.clientHeight;

function inView() {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollPosition = scrollY + windowHeight;
    const elementPosition = teammatesContainer.getBoundingClientRect().top + scrollY + teammatesContainerHeight;
    return scrollPosition > elementPosition;
}

function animate() {
    if (inView()) {
        teammatesPhotos.forEach(photo => photo.classList.add('teammates-animate'))
    }
}

document.addEventListener('scroll', animate);
>>>>>>> develop

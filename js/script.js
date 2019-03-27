const TIMENEXTSLIDE = 1000

const slides = document.querySelectorAll('.carousel__slide')
let prevSlideIndex = slides.length - 1
let currentSlideIndex = 0

let currentIntervalId = null
let canIClick = true

const clearSlides = () => {
  slides.forEach(
    slide => {
      slide.classList.remove('carousel__slide--active')
      slide.classList.remove('carousel__slide--preserved')
    }
  )
}

const updateDisplay = () => {
  const prevSlide = slides[prevSlideIndex]
  const currentSlide = slides[currentSlideIndex]

  clearSlides()

  preserveSlide(prevSlide)
  makeSlideActive(currentSlide)
}

const preserveSlide = (slide) => {
  slide.classList.add('carousel__slide--preserved')
  setTimeout(
    () => {
      slide.classList.remove('carousel__slide--preserved')
    },
    TIMENEXTSLIDE
  )
}

const makeSlideActive = (slide) => {
  slide.classList.add('carousel__slide--active')
}

const startInterval = () => {
  currentIntervalId = setInterval(
    () => {
      nextSlide()
    },
    TIMENEXTSLIDE
  )
}

const nextSlide = () => {
  prevSlideIndex = currentSlideIndex

  const nextSlide = currentSlideIndex + 1
  if (nextSlide > slides.length - 1) {
    currentSlideIndex = 0
  } else {
    currentSlideIndex = nextSlide
  }

  updateDisplay()
}

const prevSlide = () => {
  prevSlideIndex = currentSlideIndex

  const prevSlide = currentSlideIndex - 1
  if (prevSlide < 0) {
    currentSlideIndex = slides.length - 1
  } else {
    currentSlideIndex = prevSlide
  }

  updateDisplay()
}

// CONTROLS

document.querySelector('.prev').addEventListener("click", () => {
  if (canIClick) {
    prevSlide()
    canIClick = false
    setTimeout(() => canIClick = true, TIMENEXTSLIDE)
  }
})

document.querySelector('.next').addEventListener("click", () => {
  if (canIClick) {
    nextSlide()
    canIClick = false
    setTimeout(() => canIClick = true, TIMENEXTSLIDE)
  }
})

document.querySelector(".hero__carousel-wrapper").addEventListener("mouseenter", () => {
  clearInterval(currentIntervalId)
  currentIntervalId = null
})

document.querySelector(".hero__carousel-wrapper").addEventListener("mouseleave", () => {
  if (!currentIntervalId) {
    startInterval()
  }
})

// AUTO SLIDES

startInterval()
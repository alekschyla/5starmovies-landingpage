const TIMENEXTSLIDE = 1000
const TIMEOFSETTIMEOUT = 500

const slides = document.querySelectorAll('.carousel__slide')
let prevSlideIndex = slides.length - 1
let currentSlideIndex = 0

let currentIntervalId = null
let canIClick = true

const updateDisplay = () => {
  console.log(prevSlideIndex, currentSlideIndex)

  const prevSlide = slides[prevSlideIndex]
  const currentSlide = slides[currentSlideIndex]

  makeSlideInActive(prevSlide)
  makeSlideActive(currentSlide)
}

const makeSlideInActive = (slide) => {
  // slide.style.zIndex = 0
  // setInterval(
  //   () => {
  //     delete slide.style.zIndex
      slide.classList.remove('carousel__slide--active')
    // },
    // TIMENEXTSLIDE
  // )
}
const makeSlideActive = (slide) => {
  slide.classList.add('carousel__slide--active')
}

const startInterval = () => (
  currentIntervalId = setInterval(
    () => {
      nextSlide()
    },
    TIMENEXTSLIDE
  )
)

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
    setTimeout(() => canIClick = true, 1000)
  }
})

document.querySelector('.next').addEventListener("click", () => {
  if (canIClick) {
    nextSlide()
    canIClick = false
    setTimeout(() => canIClick = true, 1000)
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
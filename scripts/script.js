const teammatesContainer = document.querySelector('.teammates');
const teammatesPhotos = document.querySelectorAll('.teammate-item__photo');
const teammatesContainerHeight = teammatesContainer.clientHeight;

function inView() {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollPosition = scrollY + windowHeight;
    // get element position (distance from the top of the page to the bottom of the element)
    const elementPosition = teammatesContainer.getBoundingClientRect().top + scrollY + teammatesContainerHeight;
    if (scrollPosition > elementPosition) {
        return true;
    }

    return false;
}

function animate() {
    if (inView()) {
        teammatesPhotos.forEach(photo => photo.classList.add('teammates-animate'))
    }
}

document.addEventListener('scroll', animate);
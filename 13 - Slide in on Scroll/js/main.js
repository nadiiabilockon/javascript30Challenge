const sliderImages = document.querySelectorAll('.slide-in')

function debounce(func, wait = 15, immediate = true) {
    var timeout;
    return function () {
        let context = this, args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

function checkSlide(e) {
    sliderImages.forEach(image => {
        const slideInAt = (window.scrollY + window.innerHeight) - image.height;
        const imageBottom = image.offsetTop + image.height;

        const isHalfShown = slideInAt > image.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottom

        if (isHalfShown && isNotScrolledPast) {
            image.classList.add('active')
        } else {
            image.classList.remove('active')
        }
    })
}

window.addEventListener('scroll', debounce(checkSlide))
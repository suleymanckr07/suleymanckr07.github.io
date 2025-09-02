// This file contains JavaScript for triggering animations on the Turistly website.

document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.animate');

    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50% 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
});
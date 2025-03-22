document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded');

    // Initialize AOS animation library with delay
    setTimeout(function () {
        if (typeof AOS !== 'undefined') {
            console.log('Initializing AOS');
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                mirror: false,
                disable: 'mobile'
            });
        } else {
            console.warn('AOS not loaded');
        }
    }, 100);

    // Navbar Scroll Effect
    function updateNavbar() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }

    // Initial check
    updateNavbar();

    // Add scroll event listener
    window.addEventListener('scroll', updateNavbar);

    // Smooth scrolling for anchor links - FIX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('Anchor clicked:', this.getAttribute('href')); // Debug log

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active section on scroll
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }

    // Initial check
    updateActiveNavLink();

    // Add scroll event listener
    window.addEventListener('scroll', updateActiveNavLink);

    // Back to top button functionality
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Form submission handling (if needed)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // Form submission code here
            alert('Form submitted! (This is a demo message)');
            contactForm.reset();
        });
    }

    // Mobil ve masaüstü deneyimini iyileştirme
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

    // Mobil cihazlarda AOS animasyon gecikmelerini azaltma
    if (isMobile) {
        const aosElements = document.querySelectorAll('[data-aos]');
        aosElements.forEach(el => {
            // Gecikmeli animasyonları eşitleme
            if (el.getAttribute('data-aos-delay')) {
                const currentDelay = parseInt(el.getAttribute('data-aos-delay'));
                if (currentDelay > 100) {
                    el.setAttribute('data-aos-delay', '100');
                }
            }

            // Animasyon süresini kısaltma
            if (el.getAttribute('data-aos-duration')) {
                const currentDuration = parseInt(el.getAttribute('data-aos-duration'));
                if (currentDuration > 800) {
                    el.setAttribute('data-aos-duration', '800');
                }
            }
        });
    }

    // Dokunmatik cihazlar için geliştirilmiş etkileşim
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        // Galeri resimlerine dokunma ile büyütme
        const galleryImages = document.querySelectorAll('.gallery-img');
        galleryImages.forEach(img => {
            img.addEventListener('touchstart', function () {
                this.style.transform = 'scale(1.05)';
            });

            img.addEventListener('touchend', function () {
                setTimeout(() => {
                    this.style.transform = 'none';
                }, 200);
            });
        });

        // Butonlara dokunma efekti
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('touchstart', function () {
                this.style.transform = 'scale(0.98)';
            });

            btn.addEventListener('touchend', function () {
                this.style.transform = 'none';
            });
        });
    }

    // Masaüstü cihazlarda geliştirilmiş etkileşim
    if (!isMobile) {
        // Hover ile kartları biraz kaldırma
        const cards = document.querySelectorAll('.feature-card, .benefit-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-10px)';
                this.style.transition = 'transform 0.3s ease';
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = 'none';
            });
        });
    }
});

// Ensure images are loaded
window.addEventListener('load', function () {
    console.log('Window fully loaded');
    document.body.classList.add('loaded');
});
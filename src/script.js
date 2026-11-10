// Mobile menu toggle
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Project Slider Carousel Logic
const slider = document.getElementById('project-slider');
const prevBtn = document.getElementById('prev-project-btn');
const nextBtn = document.getElementById('next-project-btn');

if (slider && prevBtn && nextBtn) {
    let autoSlideInterval;

    // Hitung jarak geser sesuai lebar 1 kartu + gap
    const getScrollAmount = () => {
        const card = slider.querySelector('.snap-start');
        return card ? card.offsetWidth + 24 : 320;
    };

    // Fungsi geser ke kanan (maju)
    const slideNext = () => {
        const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
        if (slider.scrollLeft >= maxScrollLeft - 10) {
            // Jika sudah di paling kanan, muter balik ke paling awal
            slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            slider.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        }
    };

    // Fungsi geser ke kiri (mundur)
    const slidePrev = () => {
        if (slider.scrollLeft <= 10) {
            slider.scrollTo({ left: slider.scrollWidth, behavior: 'smooth' });
        } else {
            slider.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        }
    };

    // Tombol Next & Prev
    nextBtn.addEventListener('click', () => {
        slideNext();
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        slidePrev();
        resetAutoSlide();
    });

    // Timer Auto-Slide otomatis setiap 3.5 detik
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(slideNext, 3500);
    };

    const stopAutoSlide = () => {
        clearInterval(autoSlideInterval);
    };

    const resetAutoSlide = () => {
        stopAutoSlide();
        startAutoSlide();
    };

    // Pause saat mouse diarahkan ke slider (hover)
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);

    // Jalankan auto-slide
    startAutoSlide();
}
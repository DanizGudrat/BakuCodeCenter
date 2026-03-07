document.addEventListener('DOMContentLoaded', () => {


    const menuToggle = document.querySelector('.header__menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuContent = document.querySelector('.mobile-menu__content');
    const navList = document.querySelector('.nav__list');
    const headerChips = document.querySelector('.header__chips');

    if (mobileMenuContent) {
        mobileMenuContent.innerHTML = '';
        if (navList) mobileMenuContent.appendChild(navList.cloneNode(true));
        if (headerChips) mobileMenuContent.appendChild(headerChips.cloneNode(true));
    }

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            menuToggle.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }


    const langBtn = document.querySelector('.lang-switcher__btn');
    const langDropdown = document.querySelector('.lang-switcher__dropdown');
    const langOptions = document.querySelectorAll('.lang-switcher__option');

    if (langBtn && langDropdown) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
                langDropdown.classList.remove('active');
            }
        });

        langOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                langBtn.innerHTML = `${option.textContent.trim()} <span class="lang-switcher__arrow">▼</span>`;
                langDropdown.classList.remove('active');
            });
        });
    }


    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    const lightbox = document.getElementById('gallery-lightbox');

    if (!galleryItems.length || !lightbox) return;

    const backdrop = lightbox.querySelector('.lightbox__backdrop');
    const track = lightbox.querySelector('.lightbox__track');
    const prevBtn = lightbox.querySelector('.lightbox__nav--prev');
    const nextBtn = lightbox.querySelector('.lightbox__nav--next');
    const closeBtn = lightbox.querySelector('.lightbox__close');
    const counter = lightbox.querySelector('.lightbox__counter');

    let currentIndex = 0;
    const total = galleryItems.length;

    /* Build slides from gallery items */
    galleryItems.forEach((item) => {
        const src = item.querySelector('.gallery__image').src;
        const alt = item.querySelector('.gallery__image').alt;

        const slide = document.createElement('div');
        slide.className = 'lightbox__slide';

        const img = document.createElement('img');
        img.src = src;
        img.alt = alt;

        slide.appendChild(img);
        track.appendChild(slide);
    });


    function openLightbox(index) {
        currentIndex = index;
        goToSlide(currentIndex, false);
        lightbox.removeAttribute('hidden');
        lightbox.classList.add('lightbox--visible');
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
    }

    function closeLightbox() {
        lightbox.setAttribute('hidden', '');
        lightbox.classList.remove('lightbox--visible');
        document.body.style.overflow = '';
        if (galleryItems[currentIndex]) galleryItems[currentIndex].focus();
    }

    /* Slide navigation (infinite loop) */
    function goToSlide(index, animate) {
        if (animate === undefined) animate = true;
        const slides = track.querySelectorAll('.lightbox__slide');

        currentIndex = ((index % total) + total) % total;

        if (!animate) {
            track.style.transition = 'none';
        } else {
            track.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        counter.textContent = `${currentIndex + 1} / ${total}`;

        slides.forEach((slide, i) => {
            slide.setAttribute('aria-hidden', i !== currentIndex ? 'true' : 'false');
        });
    }

    function showNext() {
        goToSlide(currentIndex + 1);
    }

    function showPrev() {
        goToSlide(currentIndex - 1);
    }


    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    closeBtn.addEventListener('click', closeLightbox);
    backdrop.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);

    document.addEventListener('keydown', (e) => {
        if (lightbox.hasAttribute('hidden')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });


    lightbox.querySelector('.lightbox__dialog').addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

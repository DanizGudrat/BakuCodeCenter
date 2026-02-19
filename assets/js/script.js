document.addEventListener('DOMContentLoaded', () => {
    //  Mobile Menu 
    const menuToggle = document.querySelector('.header__menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuContent = document.querySelector('.mobile-menu__content');
    const navList = document.querySelector('.nav__list');
    const headerChips = document.querySelector('.header__chips');


    if (mobileMenuContent) {
        mobileMenuContent.innerHTML = '';

        if (navList) {
            const clonedNav = navList.cloneNode(true);
            mobileMenuContent.appendChild(clonedNav);
        }

        if (headerChips) {
            const clonedChips = headerChips.cloneNode(true);
            mobileMenuContent.appendChild(clonedChips);
        }
    }

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');

            menuToggle.classList.toggle('open');

            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close when clicking outside
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }


    // Language Switcher 
    const langBtn = document.querySelector('.lang-switcher__btn');
    const langDropdown = document.querySelector('.lang-switcher__dropdown');
    const langOptions = document.querySelectorAll('.lang-switcher__option');

    if (langBtn && langDropdown) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('active');
        });

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
                langDropdown.classList.remove('active');
            }
        });


        langOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const selectedLang = option.textContent;
                langBtn.innerHTML = `${selectedLang} <span class="lang-switcher__arrow">▼</span>`;
                langDropdown.classList.remove('active');
            });
        });
    }



    const track = document.querySelector('.hero__slider-track');
    const dots = document.querySelectorAll('.slider-dot');
    const totalSlides = dots.length;
    const intervalTime = 4500;
    let currentSlide = 0;
    let slideInterval;
    let isTransitioning = false;

    function updateDots(index) {
        dots.forEach(dot => dot.classList.remove('active'));
        const safeIndex = index >= totalSlides ? 0 : index;
        if (dots[safeIndex]) {
            dots[safeIndex].classList.add('active');
        }
    }

    function goToSlide(index) {
        if (!track) return;
        currentSlide = index;
        track.style.transition = 'transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)';
        track.style.transform = `translateY(-${currentSlide * 100}%)`;
        updateDots(currentSlide);
    }

    function nextSlide() {
        if (!track || isTransitioning) return;
        isTransitioning = true;
        currentSlide += 1;
        track.style.transition = 'transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)';
        track.style.transform = `translateY(-${currentSlide * 100}%)`;
        updateDots(currentSlide);

        track.addEventListener('transitionend', () => {
            isTransitioning = false;
            if (currentSlide >= totalSlides) {
                track.style.transition = 'none';
                currentSlide = 0;
                track.style.transform = 'translateY(0)';
            }
        }, { once: true });
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    function pauseSlider() {
        clearInterval(slideInterval);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            pauseSlider();
            goToSlide(index);
            startSlider();
        });
    });

    // Partners Slider Logic
    const pTrack = document.querySelector('.partners__track');
    const pPrevBtn = document.querySelector('.partners__nav-btn--prev');
    const pNextBtn = document.querySelector('.partners__nav-btn--next');

    if (pTrack && pPrevBtn && pNextBtn) {
        const originalLogos = Array.from(pTrack.children);
        const count = originalLogos.length;


        originalLogos.forEach(item => {
            const clone = item.cloneNode(true);
            pTrack.appendChild(clone);
        });

        originalLogos.slice().reverse().forEach(item => {
            const clone = item.cloneNode(true);
            pTrack.insertBefore(clone, pTrack.firstChild);
        });

        let pIndex = count;
        let pIsMoving = false;

        function getSlideBasis() {
            if (window.innerWidth < 768) return 50;
            if (window.innerWidth < 1024) return 33.333;
            return 20;
        }

        function updatePTransform(transition = true) {
            const basis = getSlideBasis();
            pTrack.style.transition = transition ? 'transform 0.4s ease-out' : 'none';
            pTrack.style.transform = `translateX(-${pIndex * basis}%)`;
        }


        setTimeout(() => {
            updatePTransform(false);
        }, 50);

        function moveNext() {
            if (pIsMoving) return;
            pIsMoving = true;
            pIndex++;
            updatePTransform(true);

            pTrack.addEventListener('transitionend', () => {
                pIsMoving = false;
                if (pIndex >= count * 2) {
                    pIndex = count;
                    updatePTransform(false);
                }
            }, { once: true });
        }

        function movePrev() {
            if (pIsMoving) return;
            pIsMoving = true;
            pIndex--;
            updatePTransform(true);

            pTrack.addEventListener('transitionend', () => {
                pIsMoving = false;
                if (pIndex < count) {
                    pIndex = count * 2 - 1;
                    updatePTransform(false);
                }
            }, { once: true });
        }

        pNextBtn.addEventListener('click', moveNext);
        pPrevBtn.addEventListener('click', movePrev);


        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                updatePTransform(false);
            }, 100);


            if (window.innerWidth > 1024 && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }

    startSlider();
});

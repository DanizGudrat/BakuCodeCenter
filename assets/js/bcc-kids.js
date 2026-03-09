document.addEventListener('DOMContentLoaded', () => {

    /* Mobile Menu */
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

        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }

    /* Language Switcher */
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
                const selectedLang = option.textContent;
                langBtn.innerHTML = `${selectedLang} <span class="lang-switcher__arrow">▼</span>`;
                langDropdown.classList.remove('active');
            });
        });
    }

    /* Smooth-scroll */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const id = anchor.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            const offset = (document.querySelector('.header')?.offsetHeight ?? 80) + 12;
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY - offset,
                behavior: 'smooth',
            });
        });
    });


    if ('IntersectionObserver' in window) {
        const items = [...document.querySelectorAll('.curriculum__item')];
        items.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(16px)';
        });

        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const idx = items.indexOf(el);
                requestAnimationFrame(() => {
                    el.style.transition = `opacity .4s ${idx * 60}ms ease,
                                           transform .4s ${idx * 60}ms ease`;
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                });
                io.unobserve(el);
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -30px' });

        items.forEach(el => io.observe(el));
    }


    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024 && mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
});

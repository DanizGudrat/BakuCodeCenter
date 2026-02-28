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
});

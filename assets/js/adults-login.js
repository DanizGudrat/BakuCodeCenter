document.addEventListener('DOMContentLoaded', () => {
    //Mobile Menu
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

    // Language Switcher (From script.js)
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

    // Form Submission Handling 
    const form = document.getElementById('kidsLoginForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();


            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            console.log('Form Submitted:', data);


            const submitBtn = form.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Göndərilir...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Qeydiyyat uğurla tamamlandı! Sizinlə tezliklə əlaqə saxlayacağıq.');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Scroll Effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            } else {
                header.classList.remove('scrolled');
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            }
        });
    }
});
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

    // News Section Logic
    const newsCards = document.querySelectorAll('.news-card');
    const newsDots = document.querySelectorAll('.news-dot');
    const newsDetailContent = document.getElementById('newsDetailContent');
    const newsDetailImage = document.getElementById('newsDetailImage');

    const newsData = [
        {
            id: 0,
            text: "Tapşırıqlar, mini layihələr müəllim tərəfindən yoxlanılması sizin bilik və bacarıqlarının hansı dərəcədə olduğunu və həm tədris müddətində, həm də məzun olduqdan sonra hansı sahələri daha da təkmilləşdirməli olduğuzu göstərən əsas amillərdən biridir. Qiymətləriniz davamiyyət, quizlər, ev tapşırıqları və bitiyətinizin qeydiyyatı müəllim və mentor tərəfindən aparılır. Məzun, şərəf məzunu və yüksək şərəf məzunu dərəcələri tətbiq olunur.",
            image: "../assets/images/images/gallery-1.svg"
        },
        {
            id: 1,
            text: "Hər hansı bir peşəni yaxşı bacarmaq üçün yalnız öyrənmək kifayət deyil, onu tətbiq etmək lazımdır. Hackathon-lar komanda şəklində işləmək, problem həlletmə bacarıqlarını inkişaf etdirmək və real layihələr üzərində işləmək üçün mükəmməl bir fürsətdir. Burada siz nəinki kod yazmağı, həm də layihə idarəetməsini öyrənəcəksiniz.",
            image: "../assets/images/images/gallery-2.svg"
        },
        {
            id: 2,
            text: "Buraxılış layihəsi \"Code Academy\"dəki təhsilin yekun layihəsi hesab olunur. Bu layihə sizin bütün kurs boyu öyrəndiyiniz bilikləri real bir məhsula çevirmək şansınızdır. Tələbələr qruplara bölünərək mentorların dəstəyi ilə tam funksional tətbiqlər hazırlayırlar.",
            image: "../assets/images/images/gallery-3.svg"
        },
        {
            id: 3,
            text: "Tədbirlərimizdə sənaye liderləri ilə görüşmək, onların təcrübələrindən yararlanmaq və networking imkanları əldə etmək mümkündür. Təhsil yalnız auditoriyada bitmir, real dünya ilə əlaqə qurmaq karyera üçün vacibdir.",
            image: "../assets/images/images/gallery-4.svg"
        },
        {
            id: 4,
            text: "Əlavə tədbirlər və vörkşoplar vasitəsilə tələbələrimiz ən son texnologiyalarla tanış olur, soft skill-lərini inkişaf etdirir və gələcək karyeralarına daha inamla addımlayırlar. Bizim məqsədimiz sadəcə proqramçı yox, həm də liderlər yetişdirməkdir.",
            image: "../assets/images/images/gallery-5.svg"
        }
    ];

    function updateNews(index) {
        // Update Cards
        newsCards.forEach(card => {
            if (parseInt(card.dataset.id) === index) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        // Update Dots
        newsDots.forEach(dot => {
            if (parseInt(dot.dataset.id) === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Update Content
        const data = newsData[index];
        if (data) {
            newsDetailContent.innerHTML = `<p>${data.text}</p>`;
            newsDetailImage.src = data.image;
        }
    }

    if (newsCards.length > 0) {
        newsCards.forEach(card => {
            card.addEventListener('click', () => {
                const index = parseInt(card.dataset.id);
                updateNews(index);
            });
        });

        newsDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.dataset.id);
                updateNews(index);
            });
        });
    }
});
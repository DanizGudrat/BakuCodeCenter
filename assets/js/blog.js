document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu
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


    const blogGrid = document.getElementById('blogGrid');

    // Check if we are on the blog listing page
    if (blogGrid) {

        const blogPosts = [
            {
                id: 1,
                title: "Müasir dizayn və trendlərin inkişafı",
                readTime: "5-7 dəq. oxunur",
                date: "2025.11.09",
                image: "../assets/images/images/blog-img1.svg",
                slug: "modern-design-trends",
                excerpt: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat."
            },
            {
                id: 2,
                title: "Frontend Development: Başlanğıc üçün bələdçi",
                readTime: "4-6 dəq. oxunur",
                date: "2025.11.10",
                image: "../assets/images/images/blog-img2.svg",
                slug: "frontend-development-guide",
                excerpt: "Veb proqramlaşdırma dünyasına ilk addımlarınızı atın. HTML, CSS və JavaScript öyrənərək necə inkişaf edə biləcəyinizi kəşf edin."
            },
            {
                id: 3,
                title: "UI/UX Dizayn nədir və niyə vacibdir?",
                readTime: "6-8 dəq. oxunur",
                date: "2025.11.12",
                image: "../assets/images/images/blog-img3.svg",
                slug: "ui-ux-design-importance",
                excerpt: "İstifadəçi təcrübəsi və interfeys dizaynının rəqəmsal məhsulların uğurundakı rolunu araşdırırıq."
            },
            {
                id: 4,
                title: "Python proqramlaşdırma dili ilə nələr edilə bilər?",
                readTime: "5-7 dəq. oxunur",
                date: "2025.11.15",
                image: "../assets/images/images/blog-img4.svg",
                slug: "python-capabilities",
                excerpt: "Süni intellekt, veri analizi və veb inkişafı üçün Python-un güclü tərəflərini öyrənin."
            },
            {
                id: 5,
                title: "Rəqəmsal Marketinq strategiyaları 2026",
                readTime: "7-9 dəq. oxunur",
                date: "2025.11.18",
                image: "../assets/images/images/blog-img5.svg",
                slug: "digital-marketing-2026",
                excerpt: "Gələcəyin marketinq trendləri və biznesinizi böyütmək üçün istifadə edə biləcəyiniz strategiyalar."
            },
            {
                id: 6,
                title: "Kibertəhlükəsizlik: Məlumatlarınızı necə qorumalı?",
                readTime: "6-8 dəq. oxunur",
                date: "2025.11.20",
                image: "../assets/images/images/blog-img6.svg",
                slug: "cybersecurity-basics",
                excerpt: "İnternet dünyasında təhlükəsizliyinizi təmin etmək üçün vacib məsləhətlər və alətlər."
            },
            {
                id: 7,
                title: "Soft Skills: Karyerada uğur qazanmaq üçün",
                readTime: "4-5 dəq. oxunur",
                date: "2025.11.22",
                image: "../assets/images/images/blog-img7.svg",
                slug: "soft-skills-success",
                excerpt: "Texniki biliklərdən əlavə, komanda işi və ünsiyyət bacarıqlarının karyeranızdakı əhəmiyyəti."
            },
            {
                id: 8,
                title: "Mobil Tətbiq İnkişafı: iOS vs Android",
                readTime: "8-10 dəq. oxunur",
                date: "2025.11.25",
                image: "../assets/images/images/blog-img8.svg",
                slug: "mobile-app-dev-ios-android",
                excerpt: "Mobil tətbiq yaratmaq istəyənlər üçün platformaların müqayisəsi və seçim meyarları."
            },
            {
                id: 9,
                title: "Gələcəyin Texnologiyaları: AI və Blockchain",
                readTime: "9-11 dəq. oxunur",
                date: "2025.11.28",
                image: "../assets/images/images/blog-img9.svg",
                slug: "future-tech-ai-blockchain",
                excerpt: "Süni intellekt və blokçeyn texnologiyalarının dünyamızı necə dəyişdirdiyini kəşf edin."
            },

            {
                id: 10,
                title: "Uşaqlar üçün kodlama: Niyə indi başlamalı?",
                readTime: "5-6 dəq. oxunur",
                date: "2025.12.01",
                image: "../assets/images/images/blog-img10.svg",
                slug: "coding-for-kids",
                excerpt: "Uşaqların gələcək bacarıqlarını inkişaf etdirmək üçün proqramlaşdırmanın rolu."
            },
            {
                id: 11,
                title: "Freelance işləmək: Avantajlar və çətinliklər",
                readTime: "6-8 dəq. oxunur",
                date: "2025.12.05",
                image: "../assets/images/images/blog-img11.svg",
                slug: "freelance-work-pros-cons",
                excerpt: "Azad qrafiklə işləmək istəyənlər üçün bələdçi və vacib məqamlar."
            },
            {
                id: 12,
                title: "Data Science: Məlumatların gücü",
                readTime: "7-9 dəq. oxunur",
                date: "2025.12.10",
                image: "../assets/images/images/blog-img12.svg",
                slug: "data-science-power",
                excerpt: "Böyük verilənlərin analizi və qərar qəbuletmə prosesindəki rolu."
            }
        ];

        // Clear placeholder content
        blogGrid.innerHTML = '';

        // Generate Cards
        blogPosts.forEach(post => {
            const cardLink = document.createElement('a');
            cardLink.href = `blog-details.html?slug=${post.slug}`;
            cardLink.className = 'blog-card';


            cardLink.innerHTML = `
                <div class="blog-card__header">
                    <img src="${post.image}" alt="${post.title}" class="blog-card__image" loading="lazy">
                    <div class="blog-card__overlay">
                        <h3 class="blog-card__overlay-title">${post.title}</h3>
                    </div>
                </div>
                <div class="blog-card__body">
                    <div class="blog-card__meta">
                        <span class="blog-card__time">${post.readTime}</span>
                        <span class="blog-card__date">${post.date}</span>
                    </div>
                    <h4 class="blog-card__title">${post.title}</h4>
                    <p class="blog-card__desc">${post.excerpt}</p>
                </div>
            `;

            blogGrid.appendChild(cardLink);
        });
    }
});

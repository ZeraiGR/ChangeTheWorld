document.addEventListener('DOMContentLoaded', function () {
    function burgerMenu() {
        const isMobile = {
            Android: function () {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function () {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function () {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function () {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function () {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function () {
                return (
                    isMobile.Android() ||
                    isMobile.BlackBerry() ||
                    isMobile.iOS() ||
                    isMobile.Opera() ||
                    isMobile.Windows()
                );
            },
        };

        if (isMobile.any()) {
            document.body.classList.add('_touch');

            let menuArrows = document.querySelectorAll('.header__menu-arrow');
            if (menuArrows.length > 0) {
                for (let i = 0; i < menuArrows.length; i++) {
                    const menuArrow = menuArrows[i];
                    menuArrow.addEventListener('click', function () {
                        menuArrow.parentElement.classList.toggle('_active');
                    });
                }
            }
        } else {
            document.body.classList.add('_pc');
        }

        const burgerBtn = document.querySelector('.header__burger');
        if (burgerBtn) {
            const headerNav = document.querySelector('.header__nav');
            burgerBtn.addEventListener('click', function (e) {
                document.body.classList.toggle('lock');
                this.classList.toggle('_active');
                headerNav.classList.toggle('_active');
            });
        }
    }

    burgerMenu();

    const importanceSlider = new Swiper('.importance__slider', {
        slidesPerView: 1,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        keyboard: {
            enabled: true,
            onlyInViewport: false,
        },
    });
});

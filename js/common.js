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

    function tubsManager() {
        const tabNavs = document.querySelectorAll('.initiatives__tab');
        const tabPanes = document.querySelectorAll('.initiatives__tab-content');
        const tabImages = document.querySelectorAll(
            '.initiatives__images-content'
        );
        const earthIcon = document.querySelector('.initiatives');

        for (let i = 0; i < tabNavs.length; i++) {
            tabNavs[i].addEventListener('click', function (e) {
                e.preventDefault();
                earthIcon.classList.toggle('rotate');
                const activeTabAttr = e.target.getAttribute('data-tab');

                for (let j = 0; j < tabNavs.length; j++) {
                    const contentAttr =
                        tabPanes[j].getAttribute('data-tab-content');
                    const contentImagesAttr =
                        tabImages[j].getAttribute('data-tab-content');

                    if (activeTabAttr === contentAttr) {
                        tabNavs[j].classList.add('active');
                        tabPanes[j].classList.add('active');
                        tabImages[j].classList.add('active');
                    } else {
                        tabNavs[j].classList.remove('active');
                        tabPanes[j].classList.remove('active');
                        tabImages[j].classList.remove('active');
                    }
                }
            });
        }
    }

    function resumeHundler() {
        const resumeBtnOpen = document.querySelector('.resume__open-btn'),
            resumeContent = document.querySelector('.resume__content'),
            resumeCloseBtn = document.querySelector('.resume__close');

        const toggleContent = function () {
            resumeContent.classList.add('show');
            resumeBtnOpen.classList.add('hide');
        };

        resumeBtnOpen.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleContent();
        });

        document.addEventListener('click', function (e) {
            const target = e.target,
                itsMenu =
                    target == resumeContent || resumeContent.contains(target),
                itsCloseBtn = target == resumeCloseBtn,
                menuIsActive = resumeContent.classList.contains('show');

            if ((!itsMenu || itsCloseBtn) && menuIsActive) {
                resumeContent.classList.remove('show');
                resumeBtnOpen.classList.remove('hide');
            }
        });
    }

    burgerMenu();
    tubsManager();
    resumeHundler();

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

    Fancybox.bind('#grouped-images-1 a', {});

    Fancybox.bind('#grouped-images-2 a', {});
});

document.addEventListener('DOMContentLoaded', function () {
    function popupLogic() {
        'use strict';
        const popupLinks = document.querySelectorAll('.popup-link');
        const body = document.querySelector('body');
        const lockPadding = document.querySelectorAll('.lock-padding');

        let unlock = true;

        const timeout = 800;

        if (popupLinks.length > 0) {
            for (let i = 0; i < popupLinks.length; i++) {
                const popupLink = popupLinks[i];

                popupLink.addEventListener('click', (e) => {
                    const popupName = popupLink
                        .getAttribute('href')
                        .replace('#', '');
                    const currentPopup = document.getElementById(popupName);
                    popupOpen(currentPopup);
                    e.preventDefault();
                });
            }
        }

        const popupCloseIcon = document.querySelectorAll('.close-popup');

        if (popupCloseIcon.length > 0) {
            for (let i = 0; i < popupCloseIcon.length; i++) {
                const el = popupCloseIcon[i];
                el.addEventListener('click', (e) => {
                    popupClose(el.closest('.popup'));
                    e.preventDefault();
                });
            }
        }

        function popupOpen(currentPopup) {
            if (currentPopup && unlock) {
                const popupActive = document.querySelector('.popup.open');

                if (popupActive) {
                    popupClose(popupActive, false);
                } else {
                    bodyLock();
                }

                currentPopup.classList.add('open');
                currentPopup.addEventListener('click', (e) => {
                    if (!e.target.closest('.popup__content')) {
                        popupClose(e.target.closest('.popup'));
                    }
                });
            }
        }

        function popupClose(popupActive, doUnlock = true) {
            if (unlock) {
                popupActive.classList.remove('open');
                if (doUnlock) {
                    bodyUnlock();
                }
            }
        }

        function bodyLock() {
            const lockPaddingValue =
                window.innerWidth - body.offsetWidth + 'px';

            if (lockPadding.length > 0) {
                for (let i = 0; i < lockPadding.length; i++) {
                    const el = lockPadding[i];
                    el.style.paddingRight = lockPaddingValue;
                }
            }

            body.style.paddingRight = lockPaddingValue;
            body.classList.add('lock');

            unlock = false;
            setTimeout(function timer() {
                unlock = true;
            }, timeout);
        }

        function bodyUnlock() {
            setTimeout(() => {
                if (lockPadding.length > 0) {
                    for (let i = 0; i < lockPadding.length; i++) {
                        const el = lockPadding[i];
                        el.style.paddingRight = '0px';
                    }
                }
                body.style.paddingRight = '0px';
                body.classList.remove('lock');
            }, timeout);

            unlock = false;
            setTimeout(function timer() {
                unlock = true;
            }, timeout);
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const popupActive = document.querySelector('.popup.open');
                popupClose(popupActive);
            }
        });

        (function () {
            if (!Element.prototype.closest) {
                Element.prototype.closest = function (css) {
                    var node = this;

                    while (node) {
                        if (node.matches(css)) return node;
                        else node = node.parentElement;
                    }
                    return null;
                };
            }
        })();

        (function () {
            if (!Element.prototype.matches) {
                Element.prototype.matches =
                    Element.prototype.matchesSelector ||
                    Element.prototype.webkitMatchesSelector ||
                    Element.prototype.mozMatchesSelector ||
                    Element.prototype.msMatchesSelector;
            }
        })();
    }

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
            const headerNav = document.querySelector('.header__menu');
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

    function closeResume() {
        const resumeContent = document.querySelector('.resume__content'),
            resumeBtnOpen = document.querySelector('.resume__open-btn');

        resumeContent.classList.remove('show');
        resumeBtnOpen.classList.remove('hide');
    }

    function openResume() {
        const resumeContent = document.querySelector('.resume__content'),
            resumeBtnOpen = document.querySelector('.resume__open-btn');

        resumeContent.classList.add('show');
        resumeBtnOpen.classList.add('hide');
    }

    function resumeHundler() {
        const resumeContent = document.querySelector('.resume__content'),
            resumeBtnOpen = document.querySelector('.resume__open-btn'),
            resumeCloseBtn = document.querySelector('.resume__close');

        if (resumeBtnOpen) {
            resumeBtnOpen.addEventListener('click', function (e) {
                e.stopPropagation();
                openResume();
            });

            document.addEventListener('click', function (e) {
                const target = e.target,
                    itsMenu =
                        target == resumeContent ||
                        resumeContent.contains(target),
                    itsCloseBtn = target == resumeCloseBtn,
                    menuIsActive = resumeContent.classList.contains('show');

                if ((!itsMenu || itsCloseBtn) && menuIsActive) {
                    closeResume();
                }
            });
        }
    }

    function btnMoreHundler() {
        const btnMore = document.querySelector('.help-ways__more');

        if (btnMore) {
            const items = document.querySelectorAll('.help-ways__one');
            btnMore.addEventListener('click', function openItems() {
                items.forEach((el) => {
                    if (!el.classList.contains('help-ways__one--visible')) {
                        el.classList.add('help-ways__one--visible');
                    }
                    btnMore.classList.add('hide');
                });
            });
        }
    }

    function articleTabs() {
        const tabs = document.querySelector('.recovery-ways__tabs');
        const tabsBtn = document.querySelectorAll('.recovery-ways__tabs-btn');
        const tabsContent = document.querySelectorAll(
            '.recovery-ways__tabs-content'
        );

        if (tabs) {
            tabs.addEventListener('click', (e) => {
                if (e.target.classList.contains('recovery-ways__tabs-btn')) {
                    const tabsPath = e.target.dataset.tabsPath;
                    tabsBtn.forEach((el) => {
                        el.classList.remove('recovery-ways__tabs-btn--active');
                    });
                    document
                        .querySelector(`[data-tabs-path="${tabsPath}"]`)
                        .classList.add('recovery-ways__tabs-btn--active');
                    tabsHandler(tabsPath);
                }
            });
        }

        const tabsHandler = (path) => {
            tabsContent.forEach((el) => {
                el.classList.remove('recovery-ways__tabs-content--active');
            });
            document
                .querySelector(`[data-tabs-target="${path}"]`)
                .classList.add('recovery-ways__tabs-content--active');
        };
    }

    function resumeHandler() {
        const resume = document.querySelector('.resume__list');

        if (resume) {
            let scrollTimeout;
            resume.addEventListener('click', function (e) {
                let link = e.target;

                if (link.classList.contains('resume__link')) {
                    e.preventDefault();
                    scrollToTarget(link.hash);
                }
            });

            let isThrottled = false;

            window.addEventListener('scroll', () => {
                // clearTimeout(scrollTimeout);
                isThrottled = true;
                scrollTimeout = setTimeout(onScroll, 200);
            });

            function onScroll() {
                isThrottled = false;
                let resume = document.querySelector('.resume__list');
                let links = document.querySelectorAll('.resume__link');
                let pos = window.pageYOffset;

                for (let i = links.length - 1; i >= 0; i--) {
                    let link = links[i];
                    let target = document.querySelector(link.hash);

                    if (pos + window.innerHeight / 4 > target.offsetTop) {
                        resume
                            .querySelector('.resume__link--active')
                            .classList.remove('resume__link--active');
                        link.classList.add('resume__link--active');
                        break;
                    }
                }
            }
        }
    }

    function scrollToTarget(id) {
        let target = document.querySelector(id);

        if (target !== null) {
            let pos = target.offsetTop + 10;

            window.scrollTo({
                top: pos,
                behavior: 'smooth',
            });

            closeResume();
        }
    }

    function alignCards() {
        const cardsContent = document.querySelectorAll(
            '.universal-item__main-content'
        );

        if (cardsContent && window.screen.width >= 576) {
            let height = [];
            cardsContent.forEach((el) => {
                height.push(el.clientHeight);
            });
            const maxElHeight = Math.max(...height);

            cardsContent.forEach((el) => {
                el.style.height = maxElHeight + 'px';
            });
        }
    }

    function initSliders() {
        const sliders = {};

        if (window.innerWidth <= 1080) {
            const helpSlider = new Swiper('.help__swiper', {
                slidesPerView: 'auto',
                spaceBetween: 20,
                freeMode: true,
            });
            sliders['helpSlider'] = helpSlider;
        }

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

        sliders['importanceSlider'] = importanceSlider;

        return sliders;
    }

    const slidersInit = initSliders();

    burgerMenu();
    tubsManager();
    resumeHundler();
    btnMoreHundler();
    articleTabs();
    popupLogic();
    resumeHandler();
    alignCards();

    Fancybox.bind('#grouped-images-1 a', {});

    Fancybox.bind('#grouped-images-2 a', {});
});

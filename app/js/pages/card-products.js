/** * @description Увеличение фото */
document.addEventListener("DOMContentLoaded", () => {
    $('[data-fancybox="zoom"]').fancybox({
        infobar: 0,
        toolbar: 0,
        baseClass: "zoom-container",
        // Arrows
        btnTpl: {
            smallBtn: `<div class="popup-close">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L11 11M11 1L1 11" stroke="#1F2636" stroke-width="2" stroke-linecap="round" />
            </svg>
        </div>`,
            arrowLeft: `<button data-fancybox-prev class="slider--arrow gray--slide slider--arrow-left flex flex-center-vertical flex-center-horizontal arrow--disabled" title="{{PREV}}">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 14L4 8L10 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </button>`,

            arrowRight: `<button data-fancybox-next  class="slider--arrow gray--slide slider--arrow-right flex flex-center-vertical flex-center-horizontal arrow--disabled" title="{{PREV}}">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 14L4 8L10 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </button>`,
        },
        onActivate: () => {
            let close = `<button data-fancybox-close class="fancybox-close">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L11 11M11 1L1 11" stroke="#fff" stroke-width="2" stroke-linecap="round" />
        </svg>
        </button>`;
            document.querySelector(".fancybox-toolbar").insertAdjacentHTML("afterbegin", close);
            // new SimpleBar(document.querySelector(".fancybox-thumbs__list"));
        },
        afterClose: function () {
            document.body.classList.remove("no_scroll");
        },
    });
    if (document.querySelector(".zoom")) {
        document.querySelector(".zoom").addEventListener("click", function () {
            let btn = document.querySelectorAll(".big-sc__item");
            btn.forEach((el, i) => {
                if (el.classList.contains("active")) {
                    document.querySelectorAll(".big-sc__item")[i].click();
                }
            });
            // document.querySelectorAll(".big-sc__item")[0].click();
        });
    }
});

/** * @description Увеличение фото на карточке коллекции в образцах */
document.addEventListener("DOMContentLoaded", () => {
    $('[data-fancybox="samples"]').fancybox({
        infobar: 0,
        toolbar: 0,
        baseClass: "zoom-container",
        // Arrows
        btnTpl: {
            smallBtn: `<div class="popup-close">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L11 11M11 1L1 11" stroke="#1F2636" stroke-width="2" stroke-linecap="round" />
            </svg>
        </div>`,
            arrowLeft: `<button data-fancybox-prev class="slider--arrow gray--slide slider--arrow-left flex flex-center-vertical flex-center-horizontal arrow--disabled" title="{{PREV}}">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 14L4 8L10 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </button>`,

            arrowRight: `<button data-fancybox-next  class="slider--arrow gray--slide slider--arrow-right flex flex-center-vertical flex-center-horizontal arrow--disabled" title="{{PREV}}">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 14L4 8L10 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </button>`,
        },
        onActivate: () => {
            let close = `<button data-fancybox-close class="fancybox-close">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L11 11M11 1L1 11" stroke="#fff" stroke-width="2" stroke-linecap="round" />
        </svg>
        </button>`;
            document.querySelector(".fancybox-toolbar").insertAdjacentHTML("afterbegin", close);
        },
        afterClose: function () {
            document.body.classList.remove("no_scroll");
        },
    });
});

/** * @description Слайдер в карточке товаров*/
function ThumbnailPlugin(main) {
    return (slider) => {
        let wrapper, arrowLeft, arrowRight;

        function wrapperMarkup(remove) {
            wrapper = global.createDiv("min-sc__wrapper flex");
            slider.container.parentNode.appendChild(wrapper);
            wrapper.appendChild(slider.container);
        }

        function addClickEvents() {
            slider.slides.forEach((slide, idx) => {
                slide.addEventListener("click", () => {
                    main.moveToIdx(idx);
                });
            });
        }

        function arrowMarkup(remove) {
            arrowLeft = document.querySelector(".min-sc__arr_prev");
            arrowLeft.addEventListener("click", function () {
                slider.prev();
                global.removeActive(slider);
                global.removeActive(main);
                const next = slider.animator.targetIdx || 0;
                global.addActive(slider.track.absToRel(next), slider);
                global.addActive(slider.track.absToRel(next), main);
                main.moveToIdx(next);
            });
            arrowRight = document.querySelector(".min-sc__arr_next");
            arrowRight.addEventListener("click", function () {
                slider.next();
                global.removeActive(slider);
                global.removeActive(main);
                const next = slider.animator.targetIdx || 0;
                global.addActive(slider.track.absToRel(next), slider);
                global.addActive(slider.track.absToRel(next), main);
                main.moveToIdx(next);
            });
            wrapper.insertBefore(arrowLeft, wrapper.firstChild);
            wrapper.appendChild(arrowRight);
        }

        slider.on("created", () => {
            wrapperMarkup();
            arrowMarkup();
            global.addActive(slider.track.details.rel, slider);
            global.addActive(slider.track.details.rel, main);
            addClickEvents();
            main.on("animationStarted", (main) => {
                global.removeActive(slider);
                const next = main.animator.targetIdx || 0;
                global.addActive(main.track.absToRel(next), slider);
                slider.moveToIdx(next);
            });
            slider.on("animationStarted", (slider) => {
                global.removeActive(main);
                const next = slider.animator.targetIdx || 0;
                global.addActive(slider.track.absToRel(next), main);
                main.moveToIdx(next);
            });
        });
    };
}

/** * @description Табы в карточке товара */
if (document.querySelectorAll("tab-btn")) {
    let btnTab = document.querySelectorAll(".tab-btn");
    let bodyTab = document.querySelectorAll(".tabs-card__item");

    for (let i = 0; i < btnTab.length; i++) {
        btnTab[i].addEventListener("click", function () {
            if (btnTab[i].classList.contains("active")) {
                btnTab.forEach((item) => item.classList.remove("active"));
                bodyTab.forEach((item) => item.classList.remove("active"));
            } else {
                btnTab.forEach((item) => item.classList.remove("active"));
                bodyTab.forEach((item) => {
                    item.dataset.tab == this.dataset.btn ? item.classList.add("active") : item.classList.remove("active");
                });
                this.classList.toggle("active");
            }
        });
        if (window.innerWidth > 1023) btnTab[0].click();
    }
}

/** * @description Слайдер сопутствующих товаров */
let relatedSlider = {
    navigation: function (slider) {
        let arrowLeft, arrowRight, dots;

        function markup(remove) {
            arrowMarkup(remove);
            dotMarkup(remove);
        }

        function arrowMarkup(remove) {
            let classUp = slider.container.parentElement;
            arrowLeft = classUp.querySelector(".recommended--slider-left");
            arrowRight = classUp.querySelector(".recommended--slider-right");
            arrowLeft.addEventListener("click", () => slider.prev());
            arrowRight.addEventListener("click", () => slider.next());
        }

        function dotMarkup(remove) {
            if (remove) {
                removeElement(dots);
                return;
            }
            let classUp2 = slider.container.parentElement;

            if (classUp2.querySelector(".slider-default__dots")) classUp2.querySelector(".slider-default__dots").remove();

            dots = global.createDiv("slider-default__dots flex flex-center-horizontal");
            slider.track.details.slides.forEach((_e, idx) => {
                var dot = global.createDiv("slider--dot-circle");
                dot.addEventListener("click", () => slider.moveToIdx(idx));
                if (window.innerWidth > 1023 && slider.track.details.slides.length > 5) dots.appendChild(dot);
                if (window.innerWidth < 1023 && window.innerWidth > 768 && slider.track.details.slides.length > 3) dots.appendChild(dot);
                if (window.innerWidth < 768 && slider.track.details.slides.length > 2) dots.appendChild(dot);
            });
            let classUp = slider.container.parentElement;

            classUp.appendChild(dots);
        }

        function updateClasses() {
            var slide = slider.track.details.rel;
            slide === 0 ? arrowLeft.classList.add("arrow--disabled") : arrowLeft.classList.remove("arrow--disabled");
            slide === slider.track.details.slides.length - 1 ? arrowRight.classList.add("arrow--disabled") : arrowRight.classList.remove("arrow--disabled");

            Array.from(dots.children).forEach(function (dot, idx) {
                idx === slide ? dot.classList.add("dot--active") : dot.classList.remove("dot--active");
            });
        }

        slider.on("created", () => {
            markup();
            updateClasses();
            productSizeInit(true);
        });
        slider.on("optionsChanged", () => {
            markup();
            updateClasses();
        });
        slider.on("slideChanged", () => {
            updateClasses();
        });
        slider.on("destroyed", () => {
            markup(true);
        });
    },
    globSlider: "",
    init: () => {
        let slider = document.querySelector(".tabs-products__ready-solutions .tabs-products__wrap");

        if (slider) {
            relatedSlider.globSlider = new sliderGlob.mainKeen(
                slider,
                {
                    loop: true,
                    dragSpeed: 1.5,
                    duration: 500,
                    offset: false,
                    selector: ".products--block.show",
                    slides: {
                        perView: "auto",
                        spacing: 16,
                    },
                    mode: "snap",
                    rubberband: false,
                    breakpoints: {
                        "(max-width: 1599px)": {
                            slides: {
                                perView: "auto",
                                spacing: 8,
                            },
                        },
                    },
                },
                [relatedSlider.navigation]
            );
        }
    },
};

/** * @description Слайдер товары коллекций */
let productCollSlider = {
    navigation: function (slider) {
        let arrowLeft, arrowRight, dots;

        function markup(remove) {
            arrowMarkup(remove);
            dotMarkup(remove);
        }

        function arrowMarkup(remove) {
            let classUp = slider.container.parentElement;
            arrowLeft = classUp.querySelector(".recommended--slider-left");
            arrowRight = classUp.querySelector(".recommended--slider-right");
            arrowLeft.addEventListener("click", () => slider.prev());
            arrowRight.addEventListener("click", () => slider.next());
        }

        function dotMarkup(remove) {
            if (remove) {
                removeElement(dots);
                return;
            }
            let classUp2 = slider.container.parentElement;

            if (classUp2.querySelector(".slider-default__dots")) classUp2.querySelector(".slider-default__dots").remove();
            dots = global.createDiv("slider-default__dots flex flex-center-horizontal");
            slider.track.details.slides.forEach((_e, idx) => {
                var dot = global.createDiv("slider--dot-circle");
                dot.addEventListener("click", () => slider.moveToIdx(idx));
                if (window.innerWidth > 1023 && slider.track.details.slides.length > 5) dots.appendChild(dot);
                if (window.innerWidth < 1023 && window.innerWidth > 768 && slider.track.details.slides.length > 3) dots.appendChild(dot);
                if (window.innerWidth < 768 && slider.track.details.slides.length > 2) dots.appendChild(dot);
            });
            let classUp = slider.container.parentElement;
            classUp.appendChild(dots);
        }

        function updateClasses() {
            var slide = slider.track.details.rel;
            slide === 0 ? arrowLeft.classList.add("arrow--disabled") : arrowLeft.classList.remove("arrow--disabled");
            slide === slider.track.details.slides.length - 1 ? arrowRight.classList.add("arrow--disabled") : arrowRight.classList.remove("arrow--disabled");

            Array.from(dots.children).forEach(function (dot, idx) {
                idx === slide ? dot.classList.add("dot--active") : dot.classList.remove("dot--active");
            });
        }

        slider.on("created", () => {
            markup();
            updateClasses();
            productSizeInit(true);
        });
        slider.on("optionsChanged", () => {
            markup();
            updateClasses();
        });
        slider.on("slideChanged", () => {
            updateClasses();
        });
        slider.on("destroyed", () => {
            markup(true);
        });
    },
    globSlider: "",
    init: () => {
        let slider = document.querySelector(".tabs-products__prod-col .tabs-products__wrap");

        if (slider) {
            productCollSlider.globSlider = new sliderGlob.mainKeen(
                slider,
                {
                    loop: true,
                    dragSpeed: 1.5,
                    duration: 500,
                    offset: false,
                    selector: ".products--block.show",
                    slides: {
                        perView: "auto",
                        spacing: 16,
                    },
                    mode: "snap",
                    rubberband: false,
                    breakpoints: {
                        "(max-width: 1599px)": {
                            slides: {
                                perView: "auto",
                                spacing: 8,
                            },
                        },
                    },
                },
                [productCollSlider.navigation]
            );
        }
    },
};

/** * @description Слайдер готовые решение */
let turnkeySlider = {
    navigation: function (slider) {
        let arrowLeft, arrowRight, dots;

        function markup(remove) {
            arrowMarkup(remove);
            dotMarkup(remove);
        }

        function arrowMarkup(remove) {
            let classUp = slider.container.parentElement;
            arrowLeft = classUp.querySelector(".recommended--slider-left");
            arrowRight = classUp.querySelector(".recommended--slider-right");
            arrowLeft.addEventListener("click", () => slider.prev());
            arrowRight.addEventListener("click", () => slider.next());
        }

        function dotMarkup(remove) {
            if (remove) {
                removeElement(dots);
                return;
            }
            let classUp2 = slider.container.parentElement;

            if (classUp2.querySelector(".slider-default__dots")) classUp2.querySelector(".slider-default__dots").remove();
            dots = global.createDiv("slider-default__dots flex flex-center-horizontal");
            slider.track.details.slides.forEach((_e, idx) => {
                var dot = global.createDiv("slider--dot-circle");
                dot.addEventListener("click", () => slider.moveToIdx(idx));
                if (window.innerWidth > 1023 && slider.track.details.slides.length > 5) dots.appendChild(dot);
                if (window.innerWidth < 1023 && window.innerWidth > 768 && slider.track.details.slides.length > 3) dots.appendChild(dot);
                if (window.innerWidth < 768 && slider.track.details.slides.length > 2) dots.appendChild(dot);
            });
            let classUp = slider.container.parentElement;
            classUp.appendChild(dots);
        }

        function updateClasses() {
            var slide = slider.track.details.rel;
            slide === 0 ? arrowLeft.classList.add("arrow--disabled") : arrowLeft.classList.remove("arrow--disabled");
            slide === slider.track.details.slides.length - 1 ? arrowRight.classList.add("arrow--disabled") : arrowRight.classList.remove("arrow--disabled");

            Array.from(dots.children).forEach(function (dot, idx) {
                idx === slide ? dot.classList.add("dot--active") : dot.classList.remove("dot--active");
            });
        }

        slider.on("created", () => {
            markup();
            updateClasses();
            productSizeInit(true);
        });
        slider.on("optionsChanged", () => {
            markup();
            updateClasses();
        });
        slider.on("slideChanged", () => {
            updateClasses();
        });
        slider.on("destroyed", () => {
            markup(true);
        });
    },
    globSlider: "",
    init: () => {
        let slider = document.querySelector(".tabs-products__turnkey-solution .tabs-products__wrap");

        if (slider) {
            turnkeySlider.globSlider = new sliderGlob.mainKeen(
                slider,
                {
                    loop: true,
                    dragSpeed: 1.5,
                    duration: 500,
                    offset: false,
                    selector: ".card-solution.show",
                    slides: {
                        perView: "auto",
                        spacing: 16,
                    },
                    mode: "snap",
                    rubberband: false,
                    breakpoints: {
                        "(max-width: 1599px)": {
                            slides: {
                                perView: "auto",
                                spacing: 8,
                            },
                        },
                    },
                },
                [turnkeySlider.navigation]
            );
        }
    },
};

/** * @description Табы в сопутствующих товарах */
let relatedSliderTabs = {
    tabs: document.querySelectorAll(".tabs-products__ready-solutions .tags button"),
    blocks: document.querySelectorAll(".tabs-products__ready-solutions .products--block"),
    arrow: document.querySelectorAll(".tabs-products__ready-solutions .slider--arrow"),
    itemSelect: document.querySelectorAll(".tabs-products__ready-solutions .new-select__item"),

    init: () => {
        if (window.innerWidth > 1023) {
            if (relatedSliderTabs.tabs) {
                relatedSliderTabs.tabs.forEach((el) => {
                    el.addEventListener("click", () => {
                        relatedSliderTabs.tabs.forEach((item) => item.classList.remove("active"));
                        relatedSliderTabs.blocks.forEach((item) => {
                            item.dataset.prodcart === el.dataset.tabcard ? item.classList.add("show") : item.classList.remove("show");
                        });

                        let it = document.querySelectorAll(".tabs-products__ready-solutions .products--block.show");
                        it.length < 4 ? relatedSliderTabs.arrow.forEach((el) => (el.style.opacity = "0")) : relatedSliderTabs.arrow.forEach((el) => (el.style.opacity = 1));

                        relatedSlider.init();
                        el.classList.add("active");
                        productPhotoInit();
                        productSizeInit();
                    });
                });
            }
        } else {
            if (relatedSliderTabs.itemSelect) {
                relatedSliderTabs.itemSelect.forEach((el) => {
                    el.addEventListener("click", () => {
                        relatedSliderTabs.blocks.forEach((item) => {
                            item.dataset.prodcart === el.dataset.tabcard ? item.classList.add("show") : item.classList.remove("show");
                        });

                        relatedSlider.init();
                        productSizeInit();
                    });
                });
            }
        }
    },
};

/** * @description Табы в товарах готовые коллекции */
let turnkeySliderTabs = {
    tabs: document.querySelectorAll(".tabs-products__turnkey-solution .tags button"),
    blocks: document.querySelectorAll(".tabs-products__turnkey-solution .card-solution"),
    arrow: document.querySelectorAll(".tabs-products__turnkey-solution .slider--arrow"),
    itemSelect: document.querySelectorAll(".tabs-products__turnkey-solution .new-select__item"),

    init: () => {
        if (window.innerWidth > 1023) {
            if (turnkeySliderTabs.tabs) {
                turnkeySliderTabs.tabs.forEach((el) => {
                    el.addEventListener("click", () => {
                        turnkeySliderTabs.tabs.forEach((item) => item.classList.remove("active"));
                        turnkeySliderTabs.blocks.forEach((item) => {
                            item.dataset.prodcart === el.dataset.tabcard ? item.classList.add("show") : item.classList.remove("show");
                        });

                        let it = document.querySelectorAll(".tabs-products__turnkey-solution .card-solution.show");
                        it.length < 4 ? turnkeySliderTabs.arrow.forEach((el) => (el.style.opacity = "0")) : turnkeySliderTabs.arrow.forEach((el) => (el.style.opacity = 1));

                        turnkeySlider.init();
                        el.classList.add("active");
                        productPhotoInit();
                        productSizeInit();
                    });
                });
            }
        } else {
            if (turnkeySliderTabs.itemSelect) {
                turnkeySliderTabs.itemSelect.forEach((el) => {
                    el.addEventListener("click", () => {
                        turnkeySliderTabs.itemSelect.forEach((item) => item.classList.remove("active"));
                        turnkeySliderTabs.blocks.forEach((item) => {
                            item.dataset.prodcart === el.dataset.tabcard ? item.classList.add("show") : item.classList.remove("show");
                        });

                        turnkeySlider.init();
                        el.classList.add("active");

                        productSizeInit();
                    });
                });
            }
        }
    },
};

/** * @description Якорь на табы в карточке товары   */
function optionAllCard() {
    let btnTab = document.querySelectorAll(".tab-btn");
    let height = document.querySelector(".header").clientHeight;

    height > 100 ? (height = 100) : (height = height + 20);
    let t = Math.round(document.querySelector(".card__tabs").getBoundingClientRect().top) - height;

    window.scrollBy({
        top: t,
        behavior: "smooth",
    });

    for (let i = 0; i < btnTab.length; i++) {
        if (!btnTab[0].classList.contains("active")) btnTab[0].click();
    }
}

/** * @description Якорь  универсальный */
function anchorCustom(end) {
    let height = document.querySelector(".header").clientHeight;
    height > 100 ? (height = 100) : (height = height + 20);
    let t = Math.round(document.querySelector(end).getBoundingClientRect().top) - height;

    window.scrollBy({
        top: t,
        behavior: "smooth",
    });
}

/** * @description Якорь отзывов */
function reviewsAllCard() {
    let height = document.querySelector(".header").clientHeight;
    height > 100 ? (height = 100) : (height = height + 20);
    let t = Math.round(document.querySelector(".card__tabs").getBoundingClientRect().top) - height;

    window.scrollBy({
        top: t,
        behavior: "smooth",
    });
    document.getElementById("tab-reviews").click();
}

/** * @description Плашка при скролле */
function dieCard() {
    let priceDiv = document.querySelector(".three-card__order");
    if (priceDiv) {
        if (window.innerWidth < 1279 && priceDiv.getBoundingClientRect().top < 10) {
            if (!document.querySelector(".card__die").classList.contains("active")) {
                document.querySelector(".card__die").classList.add("active");
                document.querySelector(".die-card__name").innerHTML = document.querySelector("h1").textContent;
                document.querySelector(".die-card .products--price-main").innerHTML = document.querySelector(".order-ct__price").innerHTML;
            }
        } else {
            if (document.querySelector(".card__die").classList.contains("active")) document.querySelector(".card__die").classList.remove("active");
        }
    }
}

/** * @description Кнопка открытия видео в карточке товара */
function showVideo() {
    document.querySelector(".video-sc").classList.add("active");
    if (document.querySelector(".video-sc__play").classList.contains("in")) {
        document.querySelector(".video-sc__play").classList.add("hide");
    }
}
/** * @description Кнопка закрытия видео в карточке товара */
function hideVideo() {
    document.querySelector(".video-sc").classList.remove("active");
    document.querySelector(".video-sc__play").classList.remove("hide");
    document.querySelector(".video-sc__play").classList.add("in");
}

/** * @description Слайдер  коллекций в карточке товара*/
let collCardSlider = {
    navigation: function (slider) {
        let arrowLeft, arrowRight, dots;
        let classUp = slider.container.parentElement;

        function markup(remove) {
            arrowMarkup(remove);
            dotMarkup(remove);
        }

        function arrowMarkup(remove) {
            arrowLeft = classUp.querySelector(".slider--arrow-left");
            arrowRight = classUp.querySelector(".slider--arrow-right");

            arrowLeft.addEventListener("click", () => {
                slider.prev();
            });
            arrowRight.addEventListener("click", () => {
                slider.next();
            });
        }

        function dotMarkup(remove) {
            if (remove) {
                global.removeElement(dots);
                return;
            }
            if (document.querySelector(".slider-collection__dots")) document.querySelector(".slider-collection__dots").remove();
            dots = global.createDiv("slider-collection__dots flex flex-center-horizontal");
            slider.track.details.slides.forEach((_e, idx) => {
                var dot = global.createDiv("slider--dot-circle");
                dot.addEventListener("click", () => slider.moveToIdx(idx));
                dots.appendChild(dot);
            });
            document.querySelector(".slider-collection__body").appendChild(dots);
        }

        function updateClasses() {
            var slide = slider.track.details.rel;
            slide === 0 ? arrowLeft.classList.add("arrow--disabled") : arrowLeft.classList.remove("arrow--disabled");
            slide === slider.track.details.slides.length - 1 ? arrowRight.classList.add("arrow--disabled") : arrowRight.classList.remove("arrow--disabled");

            Array.from(dots.children).forEach(function (dot, idx) {
                idx === slide ? dot.classList.add("dot--active") : dot.classList.remove("dot--active");
            });
        }

        slider.on("created", () => {
            markup();
            updateClasses();
            productSizeInit(true);
        });

        slider.on("optionsChanged", () => {
            markup();
            updateClasses();
        });
        slider.on("slideChanged", () => {
            updateClasses();
        });

        slider.on("destroyed", () => {
            markup(true);
        });
    },
    globSlider: "",
    init: () => {
        let slider = document.querySelector(".slider-collection-wrap");

        if (slider) {
            collCardSlider.globSlider = new sliderGlob.mainKeen(
                slider,
                {
                    loop: true,
                    duration: 500,
                    dragSpeed: 1,
                    rubberband: true,
                    selector: ".products--block.show",
                    slides: {
                        perView: "auto",
                        spacing: 16,
                    },
                    breakpoints: {
                        "(max-width: 1599px)": {
                            slides: {
                                perView: "auto",
                                spacing: 8,
                            },
                        },
                    },
                },

                [collCardSlider.navigation]
            );
        }
    },
};

/** * @description Табы в сопутствующих товарах */
let collectionCardTabsSlider = {
    tabs: document.querySelectorAll(".slider-collection__tags button"),
    blocks: document.querySelectorAll(".slider-collection .products--block"),
    itemSelect: document.querySelectorAll(".slider-collection .new-select__item"),

    init: () => {
        if (window.innerWidth > 1023) {
            if (collectionCardTabsSlider.tabs) {
                collectionCardTabsSlider.tabs.forEach((el) => {
                    el.addEventListener("click", () => {
                        collectionCardTabsSlider.tabs.forEach((item) => item.classList.remove("active"));
                        collectionCardTabsSlider.blocks.forEach((item) => {
                            item.dataset.prodcart === el.dataset.tabcard ? item.classList.add("show") : item.classList.remove("show");
                        });

                        el.classList.add("active");
                        collCardSlider.init();
                        productSizeInit();
                    });
                });
            }
        } else {
            if (collectionCardTabsSlider.itemSelect) {
                collectionCardTabsSlider.itemSelect.forEach((el) => {
                    el.addEventListener("click", () => {
                        collectionCardTabsSlider.itemSelect.forEach((item) => item.classList.remove("active"));
                        collectionCardTabsSlider.blocks.forEach((item) => {
                            item.dataset.prodcart === el.dataset.tabcard ? item.classList.add("show") : item.classList.remove("show");
                        });

                        collCardSlider.init();
                        el.classList.add("active");

                        productSizeInit();
                    });
                });
            }
        }
    },
};

/** * @description Мануфактура в карточке */
const openManufacture = {
    input: document.querySelectorAll(".drop-color__input"),
    btn: document.querySelectorAll(".drop-color"),
    body: document.querySelectorAll(".down-color"),
    init: () => {
        let scrolledEl = document.querySelectorAll(".down-color__body");
        scrolledEl.forEach((el) => {
            new SimpleBar(el);
            el.classList.add("scrll");
        });

        for (let i = 0; i < openManufacture.btn.length; i++) {
            let li = openManufacture.body[i].querySelectorAll(".down-color__item");

            openManufacture.btn[i].querySelector(".drop-color__count span").innerHTML = "+" + li.length;
            openManufacture.btn[i].querySelector(".drop-color__name").innerHTML = openManufacture.input[i].value;

            li.forEach((item, index) => {
                if (openManufacture.input[i].value == item.querySelector(".down-color__subname").textContent) {
                    if (openManufacture.btn[i].querySelector(".drop-color__color")) openManufacture.btn[i].querySelector(".drop-color__color").innerHTML = item.querySelector(".down-color__icon").innerHTML;
                    item.classList.add("active");
                } else {
                    item.classList.remove("active");
                }
            });

            openManufacture.btn[i].addEventListener("click", () => {
                openManufacture.body[i].classList.add("active");

                document.body.classList.add("_lock");
                let element = document.createElement("div");
                element.className = "show-filter";
                document.body.appendChild(element);

                li.forEach((item, index) => {
                    openManufacture.input[i].value == item.querySelector(".down-color__subname").textContent ? item.classList.add("active") : item.classList.remove("active");

                    li[index].addEventListener("click", function () {
                        openManufacture.btn[i].querySelector(".drop-color__name").innerHTML = openManufacture.input[i].value = this.querySelector(".down-color__subname").textContent;

                        if (openManufacture.body[i].classList.contains("active")) openManufacture.body[i].classList.remove("active");
                        document.body.classList.remove("_lock");

                        if (document.querySelector(".show-filter")) document.body.removeChild(document.querySelector(".show-filter"));
                        if (openManufacture.btn[i].querySelector(".drop-color__color")) openManufacture.btn[i].querySelector(".drop-color__color").innerHTML = this.querySelector(".down-color__icon").innerHTML;
                    });
                });
            });
        }
    },
};

/** * @description Слайдер сопутствующих товаров */
let samplesSlider = {
    navigation: function (slider) {
        let arrowLeft, arrowRight;

        function markup(remove) {
            arrowMarkup(remove);
        }

        function arrowMarkup(remove) {
            let classUp = slider.container.parentElement;
            arrowLeft = classUp.querySelector(".slider-cc__arr_prev");
            arrowRight = classUp.querySelector(".slider-cc__arr_next");
            arrowLeft.addEventListener("click", () => slider.prev());
            arrowRight.addEventListener("click", () => slider.next());
        }

        function updateClasses() {
            var slide = slider.track.details.rel;
            slide === 0 ? arrowLeft.classList.add("arrow--disabled") : arrowLeft.classList.remove("arrow--disabled");
            slide === slider.track.details.slides.length - 1 ? arrowRight.classList.add("arrow--disabled") : arrowRight.classList.remove("arrow--disabled");
        }

        slider.on("created", () => {
            markup();
            updateClasses();
            productSizeInit(true);
        });
        slider.on("optionsChanged", () => {
            markup();
            updateClasses();
        });
        slider.on("slideChanged", () => {
            updateClasses();
        });
        slider.on("destroyed", () => {
            markup(true);
        });
    },
    globSlider: "",
    init: () => {
        let slider = document.querySelector(".card-coll__slider .slider-cc__wrap");

        if (slider) {
            samplesSlider.globSlider = new sliderGlob.mainKeen(
                slider,
                {
                    loop: true,
                    dragSpeed: 1.5,
                    duration: 500,
                    offset: false,
                    selector: ".slider-cc__slide",
                    slides: {
                        perView: "auto",
                        spacing: 16,
                    },
                    mode: "snap",
                    rubberband: false,
                    breakpoints: {
                        "(max-width: 1599px)": {
                            slides: {
                                perView: "auto",
                                spacing: 12,
                            },
                        },
                        "(max-width: 1023px)": {
                            slides: {
                                perView: "auto",
                                spacing: 8,
                            },
                        },
                    },
                },
                [samplesSlider.navigation]
            );
        }
    },
};
/** * @description Слайдер готовых решений в карточке сопутствующих товаров */
let samplesCardSlider = {
    navigation: function (slider) {
        let arrowLeft, arrowRight, dots;
        let classUp = slider.container.parentElement;

        function markup(remove) {
            arrowMarkup(remove);
            dotMarkup(remove);
        }

        function arrowMarkup(remove) {
            arrowLeft = classUp.querySelector(".recommended--slider-left");
            arrowRight = classUp.querySelector(".recommended--slider-right");
            arrowLeft.addEventListener("click", () => slider.prev());
            arrowRight.addEventListener("click", () => slider.next());
        }

        function dotMarkup(remove) {
            if (remove) {
                removeElement(dots);
                return;
            }

            if (classUp.querySelector(".slider-default__dots")) classUp.querySelector(".slider-default__dots").remove();
            dots = global.createDiv("slider-default__dots flex flex-center-horizontal");
            slider.track.details.slides.forEach((_e, idx) => {
                var dot = global.createDiv("slider--dot-circle");
                dot.addEventListener("click", () => slider.moveToIdx(idx));

                if (window.innerWidth > 1023 && slider.track.details.slides.length > 5) dots.appendChild(dot);
                if (window.innerWidth < 1023 && window.innerWidth > 768 && slider.track.details.slides.length > 3) dots.appendChild(dot);
                if (window.innerWidth < 768 && slider.track.details.slides.length > 2) dots.appendChild(dot);
            });

            classUp.appendChild(dots);
        }

        function updateClasses() {
            var slide = slider.track.details.rel;
            slide === 0 ? arrowLeft.classList.add("arrow--disabled") : arrowLeft.classList.remove("arrow--disabled");
            slide === slider.track.details.slides.length - 1 ? arrowRight.classList.add("arrow--disabled") : arrowRight.classList.remove("arrow--disabled");

            Array.from(dots.children).forEach(function (dot, idx) {
                idx === slide ? dot.classList.add("dot--active") : dot.classList.remove("dot--active");
            });
        }

        slider.on("created", () => {
            markup();
            updateClasses();
            productSizeInit(true);
        });
        slider.on("optionsChanged", () => {
            markup();
            updateClasses();
        });
        slider.on("slideChanged", () => {
            updateClasses();
        });
        slider.on("destroyed", () => {
            markup(true);
        });
    },
    globSlider: "",
    init: () => {
        let slider = document.querySelector(".sc-slider .sc-slider__list");

        if (slider) {
            samplesCardSlider.globSlider = new sliderGlob.mainKeen(
                slider,
                {
                    loop: true,
                    dragSpeed: 1.5,
                    duration: 500,
                    offset: false,
                    selector: ".card-solution",
                    slides: {
                        perView: 5,
                        spacing: 16,
                    },
                    mode: "snap",
                    rubberband: false,
                    breakpoints: {
                        "(max-width: 1599px)": {
                            slides: {
                                perView: "auto",
                                spacing: 8,
                            },
                        },
                    },
                },
                [samplesCardSlider.navigation]
            );
        }
    },
};

/** * @description Табы в карточке коллекции */
const tabsCardColl = {
    btn: document.querySelectorAll(".coll-product__tags button"),
    itemSelect: document.querySelectorAll(".card__product-coll .new-select__item"),
    item: document.querySelectorAll(".card__product-coll .products--block"),
    init: () => {
        if (tabsCardColl.item) {
            if (window.innerWidth > 767) {
                for (let i = 0; i < tabsCardColl.btn.length; i++) {
                    tabsCardColl.btn[0].click();
                    tabsCardColl.btn[i].addEventListener("click", function () {
                        tabsCardColl.btn.forEach((el) => el.classList.remove("active"));
                        tabsCardColl.item.forEach((el) => el.classList.remove("show"));
                        this.dataset.tabcard == 0
                            ? tabsCardColl.item.forEach((el) => {
                                el.classList.add("show");
                            })
                            : tabsCardColl.item.forEach((el) => {
                                el.dataset.item === this.dataset.tabcard ? el.classList.add("show") : el.classList.remove("show");
                            });
                        // productSizeInit();
                        this.classList.add("active");
                    });
                }
            } else {
                tabsCardColl.itemSelect.forEach((el) => {
                    tabsCardColl.itemSelect[0].click();
                    el.addEventListener("click", function () {
                        tabsCardColl.itemSelect.forEach((item) => item.classList.remove("active"));
                        el.dataset.tabcard == 0
                            ? tabsCardColl.item.forEach((el) => {
                                el.classList.add("show");
                            })
                            : tabsCardColl.item.forEach((e) => {
                                e.dataset.item === el.dataset.tabcard ? e.classList.add("show") : e.classList.remove("show");
                            });
                        // productSizeInit();
                        this.classList.add("active");
                    });
                });
            }
        }
    },
};

/** * @description  Запускаем функцию при прокрутке страницы*/
window.addEventListener("scroll", function () {
    dieCard();
});
/**  * @description Запускаем после загрузки страницы*/
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("bigItemsSlider")) {
        let slider = new sliderGlob.mainKeen(document.getElementById("bigItemsSlider"), {
            selector: ".big-sc__item",
        });
        let thumbnails = new sliderGlob.mainKeen(
            document.getElementById("minItemsSlider"),
            {
                dragSpeed: 1.5,
                duration: 500,
                offset: false,
                selector: ".min-sc__item",
                slides: {
                    perView: "auto",
                    spacing: 12,
                },

                breakpoints: {
                    "(max-width: 480px)": {
                        slides: {
                            perView: "auto",
                            spacing: 7,
                        },
                    },
                },
            },
            [ThumbnailPlugin(slider)]
        );
    }
    samplesCardSlider.init();
    collCardSlider.init();

    relatedSlider.init();
    relatedSliderTabs.init();

    productCollSlider.init();

    turnkeySlider.init();
    turnkeySliderTabs.init();
    collectionCardTabsSlider.init();

    samplesSlider.init();
    openManufacture.init();
    tabsCardColl.init();
    if (document.querySelector(".slider-collection__tags")) document.querySelector(".slider-collection__tags button").click();
});

 
document.addEventListener("click", (e) => {
    /** Закрытие dropdown мануфактуры */
    if (e.target.classList.contains("show-filter") || e.target.classList.contains("down-color__close")) {
        document.querySelectorAll(".down-color").forEach((element) => {
            element.classList.remove("active");
        });
        document.body.classList.remove("_lock");
        document.body.removeChild(document.querySelector(".show-filter"));
    }
});

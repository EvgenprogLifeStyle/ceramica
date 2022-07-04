/**  @description Слайдер рекомендуемых товаров */

let dealerSlider = {
    navigation: function (slider) {
        let dots;
        function markup(remove) {
            dotMarkup(remove);
        }

        function dotMarkup(remove) {
            dots = global.createDiv("plitka-about__dots flex flex-center-horizontal");
            slider.track.details.slides.forEach((_e, idx) => {
                var dot = global.createDiv("slider--dot-circle");
                dot.addEventListener("click", () => slider.moveToIdx(idx));
                dots.appendChild(dot);
            });
            let classUp = slider.container.parentElement;
            classUp.appendChild(dots);
        }

        function updateClasses() {
            var slide = slider.track.details.rel;

            Array.from(dots.children).forEach(function (dot, idx) {
                idx === slide ? dot.classList.add("dot--active") : dot.classList.remove("dot--active");
            });
        }

        slider.on("created", () => {
            markup();
            updateClasses();
        });
        slider.on("optionsChanged", () => {
            markup(true);
            markup();
            updateClasses();
        });
        slider.on("slideChanged", () => {
            updateClasses();
        });
    },
    globSlider: "",
    init: () => {
        if (document.querySelector(".benefits-dealer__body")) {
            new sliderGlob.mainKeen(
                document.querySelector(".benefits-dealer__body"),
                {
                    loop: true,
                    dragSpeed: 1.5,
                    duration: 500,
                    offset: false,
                    selector: ".benefits-dealer__item",
                    slides: {
                        perView: "auto",
                        spacing: 8,
                    },
                    mode: "snap",
                    rubberband: false,
                },

                [dealerSlider.navigation]
            );
        }
    },
};

/** * @description Слайдер каталог товаров */

let catalogDealerSlider = {
    navigation: function (slider) {
        let arrowLeft, dots, arrowRight, wrapper;
        let classUp = slider.container.parentElement.parentElement.parentElement;

        wrapper = classUp.querySelector(".recommended--products");
        function markup(remove) {
            arrowMarkup(remove);
            dotMarkup(remove);
        }

        function arrowMarkup(remove) {
            arrowLeft = classUp.querySelector(".recommended--slider-left");
            arrowRight = classUp.querySelector(".recommended--slider-right");

            if (remove) {
                console.log("remove");
            }

            arrowLeft.addEventListener("click", () => slider.prev());
            arrowRight.addEventListener("click", () => slider.next());
        }

        function createDiv(className) {
            var div = document.createElement("div");
            var classNames = className.split(" ");
            classNames.forEach((name) => div.classList.add(name));
            return div;
        }

        function dotMarkup(remove) {
            dots = createDiv("slider--dots circle flex");
            slider.track.details.slides.forEach((_e, idx) => {
                var dot = createDiv("slider--dot");
                dot.addEventListener("click", () => slider.moveToIdx(idx));
                dots.appendChild(dot);
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
            markup(true);
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
        let slider = document.querySelectorAll(".recommended--block.active .products--block-wrap");
        if (slider) {
            for (let i = 0; i < slider.length; i++) {
                catalogDealerSlider.globSlider = new sliderGlob.mainKeen(
                    slider[i],
                    {
                        loop: true,
                        dragSpeed: 1.5,
                        duration: 500,
                        offset: false,
                        selector: ".products--block",
                        slides: {
                            perView: 5,
                            spacing: 16,
                        },
                        breakpoints: {
                            "(max-width: 1599px)": {
                                slides: {
                                    perView: 4.3,
                                    spacing: 8,
                                },
                            },
                            "(max-width: 1023px)": {
                                slides: {
                                    perView: 3.3,
                                    spacing: 8,
                                },
                            },
                            "(max-width: 767px)": {
                                slides: {
                                    perView: 2.6,
                                    spacing: 8,
                                },
                            },
                            "(max-width: 639px)": {
                                slides: {
                                    perView: 2,
                                    spacing: 8,
                                },
                            },
                            "(max-width: 439px)": {
                                slides: {
                                    perView: 1.3,
                                    spacing: 8,
                                },
                            },
                        },
                        mode: "snap",
                        rubberband: false,
                    },
                    [catalogDealerSlider.navigation]
                );
            }
        }
    },
};

/** * @description табы на странице дилеры */
let catalogDelSliderTabs = {
    wrap: document.querySelectorAll(".catalog-dealer"),
    tabs: document.querySelectorAll(".recommended--tabs button"),
    blocks: document.querySelectorAll(".dealer__catalog .recommended--block"),
    arrow: document.querySelectorAll(".dealer__catalog .slider--arrow"),
    itemSelect: document.querySelectorAll(".catalog-dealer__select .new-select__item"),

    init: () => {
        if (catalogDelSliderTabs.wrap) {
            for (let i = 0; i < catalogDelSliderTabs.wrap.length; i++) {
                let tabs = catalogDelSliderTabs.wrap[i].querySelectorAll(".recommended--tabs button");
                let blocks = catalogDelSliderTabs.wrap[i].querySelectorAll(".recommended--block");
                let arrow = catalogDelSliderTabs.wrap[i].querySelectorAll(".slider--arrow");
                let itemSelect = catalogDelSliderTabs.wrap[i].querySelectorAll(".catalog-dealer__select .new-select__item");

                if (window.innerWidth > 1023) {
                    if (tabs) {
                        tabs.forEach((el) => {
                            el.addEventListener("click", () => {
                                el.classList.add("active");
                                siblingsEl(el).forEach((tab) => {
                                    tab.classList.remove("active");
                                });
                                blocks.forEach((block) => {
                                    if (block.dataset.block === el.dataset.tab) {
                                        block.classList.add("active");
                                        catalogDealerSlider.init();
                                    } else {
                                        block.classList.remove("active");
                                    }
                                });
                            });
                        });
                    }
                } else {
                    if (itemSelect) {
                        itemSelect.forEach((el) => {
                            el.addEventListener("click", () => {
                                blocks.forEach((item) => {
                                    item.dataset.block === el.dataset.tab ? item.classList.add("active") : item.classList.remove("active");
                                });
                                catalogDealerSlider.init();
                                productSizeInit();
                            });
                        });
                    }
                }
            }
        }
    },
};

document.addEventListener("DOMContentLoaded", () => {
    catalogDealerSlider.init();
    catalogDelSliderTabs.init();
    if (window.innerWidth < 1024) {
        dealerSlider.init();
    }
});

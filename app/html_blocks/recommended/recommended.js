/** * @description Слайдер рекомендуемых товаров */
let listener1 = () => {
        recommendedSlider.globSlider.prev();
    },
    listener2 = () => {
        recommendedSlider.globSlider.next();
    };
let recommendedSlider = {
    dots: "",
    firstLoad: true,
    navigation: function (slider) {
        let arrowLeft, dots, arrowRight, wrapper;
        //  wrapper = getClosest(slider.container, "recommended--bottom");
        wrapper = document.querySelector(".recommended--block.active .products--block-wrap");

        function markup(remove) {
            arrowMarkup(remove);
            dotMarkup(remove);
        }

        function arrowMarkup(remove) {
            arrowLeft = document.querySelector(".recommended--slider-left");
            arrowRight = document.querySelector(".recommended--slider-right");

            if (remove) {
                arrowLeft.removeEventListener("click", listener1, false);
                arrowRight.removeEventListener("click", listener2, false);
            }

            arrowLeft.addEventListener("click", listener1, false);
            arrowRight.addEventListener("click", listener2, false);
        }

        function createDiv(className) {
            var div = document.createElement("div");
            var classNames = className.split(" ");
            classNames.forEach((name) => div.classList.add(name));
            return div;
        }

        function dotMarkup(remove) {
            if (remove) {
                recommendedSlider.dots.remove();
                return;
            }
            dots = createDiv("slider--dots circle flex");
            slider.track.details.slides.forEach((_e, idx) => {
                var dot = createDiv("slider--dot");
                dot.addEventListener("click", () => slider.moveToIdx(idx));
                dots.appendChild(dot);
            });
            wrapper.appendChild(dots);
            recommendedSlider.dots = dots;
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
            productSizeInit(true);
        });
        slider.on("optionsChanged", () => {
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
        let slider = document.querySelector(".recommended--block.active .products--block-wrap");

        if (slider) {
            slider.classList.add("init");
            recommendedSlider.globSlider = new sliderGlob.mainKeen(
                slider,
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
                                perView: 3.2,
                                spacing: 8,
                            },
                        },
                        "(max-width: 767px)": {
                            slides: {
                                perView: 2.7,
                                spacing: 8,
                            },
                        },
                        "(max-width: 639px)": {
                            slides: {
                                perView: 2,
                                spacing: 8,
                            },
                        },
                        "(max-width: 479px)": {
                            slides: {
                                perView: 1.48,
                                spacing: 8,
                            },
                        },
                        "(max-width: 360px)": {
                            slides: {
                                perView: 1.3,
                                spacing: 8,
                            },
                        },
                    },
                    mode: "snap",
                    rubberband: false,
                },
                [recommendedSlider.navigation]
            );
        }
    },
};

/** * @description Табы в рекомендуемых */

let recomendedTabs = {
    tabs: document.querySelectorAll(".recommended--tabs button"),
    blocks: document.querySelectorAll(".recommended--block"),
    init: () => {
        if (recomendedTabs.tabs) {
            recomendedTabs.tabs.forEach((el) => {
                el.addEventListener("click", () => {
                    el.classList.add("active");
                    siblingsEl(el).forEach((tab) => {
                        tab.classList.remove("active");
                    });
                    recomendedTabs.blocks.forEach((block) => {
                        if (block.dataset.block === el.dataset.tab) {
                            block.classList.add("active");
                            recommendedSlider.init();
                        } else {
                            block.classList.remove("active");
                        }
                    });
                });
            });
        }
    },
};

 /** * @description Слайдер товаров на главной в мобильной версии */
let productDefault = {
    navigation: function (slider, nav) {
        let wrapper, dots;
        wrapper = slider.container;
        wrapper.classList.add("init");

        function markup(remove) {
            dotMarkup(remove);
            wrapper.classList.remove("init");
        }

        function removeElement(elment) {
            elment.parentNode.removeChild(elment);
        }

        function createDiv(className) {
            var div = document.createElement("div");
            var classNames = className.split(" ");
            classNames.forEach((name) => div.classList.add(name));
            return div;
        }

        function dotMarkup(remove) {
            if (remove) {
                removeElement(dots);
                return;
            }
            dots = createDiv("slider--dots flex");
            slider.track.details.slides.forEach((_e, idx) => {
                var dot = createDiv("slider--dot");
                dot.addEventListener("click", () => slider.moveToIdx(idx));
                dots.appendChild(dot);
            });
            wrapper.appendChild(dots);
        }

        function updateClasses() {
            let slide = slider.track.details.rel;
            Array.from(dots.children).forEach(function (dot, idx) {
                idx === slide ? dot.classList.add("dot--active") : dot.classList.remove("dot--active");
            });
        }

        slider.on("created", () => {
            productSizeInit(true);
            markup();
            updateClasses();
        });
        slider.on("optionsChanged", () => {
            updateClasses();
        });
        slider.on("slideChanged", () => {
            updateClasses();
        });
        slider.on("destroyed", () => {
            markup(true);
        });
    },
    globSliders: [],
    mobileInit: false,
    init: () => {
        let slider = document.querySelectorAll(".products--block-wrap:not(.init)");
        if (slider) {
            for (let i = 0; i < slider.length; i++) {
                productDefault.globSliders[i] = new sliderGlob.mainKeen(
                    slider[i],
                    {
                        loop: true,
                        dragSpeed: 1.5,
                        duration: 500,
                        offset: false,
                        selector: ".products--block",
                        slides: {
                            perView: 3.2,
                            spacing: 8,
                        },
                        breakpoints: {
                            "(max-width: 767px)": {
                                slides: {
                                    perView: 2.7,
                                    spacing: 8,
                                },
                            },
                            "(max-width: 639px)": {
                                slides: {
                                    perView: 2,
                                    spacing: 8,
                                },
                            },
                            "(max-width: 479px)": {
                                slides: {
                                    perView: 1.48,
                                    spacing: 8,
                                },
                            },
                            "(max-width: 360px)": {
                                slides: {
                                    perView: 1.3,
                                    spacing: 8,
                                },
                            },
                        },
                        mode: "snap",
                        rubberband: false,
                    },

                    [productDefault.navigation]
                );
            }
        }
    },
};

document.addEventListener("DOMContentLoaded", () => {
    recomendedTabs.init();
    recommendedSlider.init();
    if (window.innerWidth < 1024 && !productDefault.mobileInit) {
        productDefault.mobileInit = true;
        productDefault.init();
    }
});

window.addEventListener("resize", () => {
    productSizeInit(true);
    if (window.innerWidth < 1024 && !productDefault.mobileInit) {
        productDefault.mobileInit = true;
        productDefault.init();
    } else if (window.innerWidth >= 1024 && productDefault.mobileInit) {
        productDefault.mobileInit = false;
        productDefault.globSliders.forEach((el) => {
            el.destroy();
        });
    }
});

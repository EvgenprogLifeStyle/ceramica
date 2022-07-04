/** Слайдер брендов */
let brandSlider = {
    slider: document.getElementById("slider-brand"),
    navigation: function (slider) {
        let wrapper, dots, arrowLeft, arrowRight;

        function markup(remove) {
            wrapperMarkup(remove);
            dotMarkup(remove);
            arrowMarkup(remove);
        }

        function arrowMarkup(remove) {
            arrowLeft = document.querySelector(".slider-brand__prev");
            arrowRight = document.querySelector(".slider-brand__next");
            if (arrowLeft) {
                arrowLeft.addEventListener("click", () => slider.prev());
                arrowRight.addEventListener("click", () => slider.next());
            }
        }

        function wrapperMarkup(remove) {
            if (remove) {
                var parent = wrapper.parentNode;
                while (wrapper.firstChild) parent.insertBefore(wrapper.firstChild, wrapper);
                global.removeElement(wrapper);
                return;
            }
            wrapper = global.createDiv("slider-brand__body-slider");
            slider.container.parentNode.appendChild(wrapper);
            wrapper.appendChild(slider.container);
        }
        function dotMarkup(remove) {
            if (remove) {
                global.removeElement(dots);
                return;
            }
            dots = global.createDiv("slider-brand__dots");
            slider.track.details.slides.forEach((_e, idx) => {
                var dot = global.createDiv("slider--dot-circle");
                dot.addEventListener("click", () => slider.moveToIdx(idx));
                dots.appendChild(dot);
            });
            wrapper.appendChild(dots);
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
    init: () => {
        if (brandSlider.slider) {
            new sliderGlob.mainKeen(
                brandSlider.slider,
                {
                    loop: true,
                    dragSpeed: 1,
                    duration: 500,
                    selector: ".slider-brand__item",
                    offset: false,
                    slides: {
                        perView: 6,
                        spacing: 0,
                    },
                    mode: "snap",
                    rubberband: false,
                    breakpoints: {
                        "(max-width: 767px)": {
                            slides: {
                                perView: 5,
                            },
                        },
                        "(max-width: 639px)": {
                            slides: {
                                perView: 4,
                            },
                        },
                        "(max-width: 479px)": {
                            slides: {
                                perView: 3,
                            },
                        },
                    },
                },
                [brandSlider.navigation]
            );
        }
    },
};
/**  Запускаем после загрузки страницы*/
document.addEventListener("DOMContentLoaded", () => {
    brandSlider.init();
});

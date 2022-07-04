let productSlider = {
    navigation: function (slider) {
        let arrowLeft, arrowRight, dots;
        function markup(remove) {
            arrowMarkup(remove);
            dotMarkup(remove);
        }
        function createDiv(className) {
            var div = document.createElement("div");
            var classNames = className.split(" ");
            classNames.forEach((name) => div.classList.add(name));
            return div;
        }
        function arrowMarkup(remove) {
            let classUp = slider.container.parentElement;
            arrowLeft = classUp.querySelector(".recommended--slider-left");
            arrowRight = classUp.querySelector(".recommended--slider-right");
            arrowLeft.addEventListener("click", () => slider.prev());
            arrowRight.addEventListener("click", () => slider.next());
        }

        function dotMarkup(remove) {
            let classUp2 = slider.container.parentElement;

            if (classUp2.querySelector(".slider-default__dots")) classUp2.querySelector(".slider-default__dots").remove();
            dots = createDiv("slider-default__dots flex flex-center-horizontal");
            slider.track.details.slides.forEach((_e, idx) => {
                var dot = createDiv("slider--dot-circle");
                dot.addEventListener("click", () => slider.moveToIdx(idx));
                dots.appendChild(dot);
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
        let slider = document.querySelectorAll(".slider-default .slider-default-wrap");

        if (slider.length) {
            for (let i = 0; i < slider.length; i++) {
                new sliderGlob.mainKeen(
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
                        mode: "snap",
                        rubberband: false,
                        breakpoints: {
                            "(max-width: 1599px)": {
                                slides: {
                                    perView: 5,
                                    spacing: 8,
                                },
                            },
							"(max-width: 1279px)": {
								slides: {
									perView: "auto",
									spacing: 8,
								},
							},
                        },
                    },

                    [productSlider.navigation]
                );
            }
        }
    },
};
document.addEventListener("DOMContentLoaded", () => {
    productSlider.init();
});
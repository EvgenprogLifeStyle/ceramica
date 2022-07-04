/** * @description Слайдер преимуществ */
let advantage_slider = {
    wrap: document.querySelector(".advantages--block-wrap"),
    active: false,
    slider: "",
    navigation: (slider) => {
        let wrapper, arrowLeft, arrowRight;

        function markup(remove) {
            wrapperMarkup(remove);
            arrowMarkup(remove);
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

        function arrowMarkup(remove) {
            if (remove) {
                return;
            }
            arrowLeft = document.querySelector(".advantages--slider-left");
            arrowLeft.classList.add("active");
            arrowLeft.addEventListener("click", () => slider.prev());

            arrowRight = document.querySelector(".advantages--slider-right");
            arrowRight.classList.add("active");
            arrowRight.addEventListener("click", () => slider.next());

            wrapper.appendChild(arrowLeft);
            wrapper.appendChild(arrowRight);
        }

        function wrapperMarkup(remove) {
            if (remove) {
                var parent = wrapper.parentNode;
                while (wrapper.firstChild) parent.insertBefore(wrapper.firstChild, wrapper);
                removeElement(wrapper);
                return;
            }
            wrapper = createDiv("navigation-wrapper");
            slider.container.parentNode.appendChild(wrapper);
            wrapper.appendChild(slider.container);
        }

        function updateClasses() {
            var slide = slider.track.details.rel;
            slide === 0 ? arrowLeft.classList.add("arrow--disabled") : arrowLeft.classList.remove("arrow--disabled");
            slide === slider.track.details.slides.length - 1 ? arrowRight.classList.add("arrow--disabled") : arrowRight.classList.remove("arrow--disabled");
        }

        slider.on("created", () => {
            markup();
            updateClasses();
        });
        slider.on("optionsChanged", (ev) => {
            // markup(true)
            // markup()
            updateClasses();
        });
        slider.on("slideChanged", () => {
            updateClasses();
        });
        slider.on("destroyed", () => {
            // markup(true);
        });
    },
    init: () => {
        if (advantage_slider.wrap) {
            advantage_slider.slider = new sliderGlob.mainKeen(
                advantage_slider.wrap,
                {
                    loop: true,
                    dragSpeed: 1.5,
                    duration: 500,
                    offset: false,
                    selector: ".advantages--block",
                    slides: {
                        perView: 2.6,
                        spacing: 0,
                    },
                    breakpoints: {
                        "(max-width: 767px)": {
                            slides: {
                                perView: 1.6,
                                spacing: 0,
                            },
                        },
                        "(max-width: 500px)": {
                            slides: {
                                perView: 1,
                                spacing: 0,
                            },
                        },
                    },
                    mode: "snap",
                    rubberband: false,
                },
                [advantage_slider.navigation]
            );
        }
    },
};

document.addEventListener("DOMContentLoaded", () => {
    if (window.innerWidth < 1024 && !advantage_slider.active) {
        advantage_slider.active = true;
        advantage_slider.init();
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth < 1024 && !advantage_slider.active) {
        advantage_slider.active = true;
        advantage_slider.init();
    } else if (window.innerWidth >= 1024 && advantage_slider.active) {
        advantage_slider.active = false;
        advantage_slider.slider.destroy();
    }
})

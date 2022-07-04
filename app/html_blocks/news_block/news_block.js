/** * @description Слайдер новостей */
let newsSlider = {
    slider: document.querySelector(".news--main"),
    slide: '',
    firstLoad: true,
    navigation: (slider) => {
        let wrapper, dots, newsBottom;

        function markup(remove) {
            wrapperMarkup(remove);
            dotMarkup(remove);
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

        function wrapperMarkup(remove) {
            if (remove) {
                var parent = wrapper.parentNode;
                while (wrapper.firstChild) parent.insertBefore(wrapper.firstChild, wrapper);
                removeElement(wrapper);
                // console.log( parent.querySelectorAll('.news--block'));
                parent.querySelectorAll('.news--block').forEach(el => {
                    el.removeAttribute('style');
                });
                return;
            }
            wrapper = createDiv("navigation-wrapper relative");
            newsBottom = findEl(slider.container.parentNode, 'news--mobile');
            slider.container.parentNode.insertBefore(wrapper, newsBottom);
            wrapper.appendChild(slider.container);
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
            markup();
            updateClasses();
        });
        slider.on("optionsChanged", (ev) => {
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
        if (newsSlider.slider.children.length > 3) {
            newsSlider.slide = new sliderGlob.mainKeen(
                newsSlider.slider,
                {
                    loop: true,
                    dragSpeed: 1.5,
                    duration: 500,
                    offset: false,
                    selector: ".news--block",
                    slides: {
                        perView: 2.5,
                        spacing: 8,
                    },
                    breakpoints: {
                        "(max-width: 639px)": {
                            slides: {
                                perView: 2,
                                spacing: 8,
                            },
                        },
                        "(max-width: 479px)": {
                            slides: {
                                perView: 1.45,
                                spacing: 8,
                            },
                        },
                        "(max-width: 359px)": {
                            slides: {
                                perView: 1.3,
                                spacing: 8,
                            },
                        },
                    },
                    mode: "snap",
                    rubberband: false,
                },
                [newsSlider.navigation]
            );
        }
    },
};
if (newsSlider.slider) {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.innerWidth < 768) {
            newsSlider.firstLoad = false;
            newsSlider.init();
        }
    })
    window.addEventListener('resize', () => {
        if (window.innerWidth < 768 && newsSlider.firstLoad) {
            newsSlider.firstLoad = false;
            newsSlider.init();
        } else if (window.innerWidth >= 768 && !newsSlider.firstLoad) {
            newsSlider.firstLoad = true;
            newsSlider.slide.destroy();
        }
    });
}
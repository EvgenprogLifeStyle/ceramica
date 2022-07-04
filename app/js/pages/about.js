/** * @description Слайдер рекомендуемых товаров */
let aboutSlider = {
    navigation: function (slider) {
        let dots;
        function markup(remove) {
            dotMarkup(remove);
        }
        function createDiv(className) {
            var div = document.createElement("div");
            var classNames = className.split(" ");
            classNames.forEach((name) => div.classList.add(name));
            return div;
        }
        function dotMarkup(remove) {
            dots = createDiv("plitka-about__dots flex flex-center-horizontal");
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
        if (document.querySelector(".plitka-about__body")) {
            new sliderGlob.mainKeen(
                document.querySelector(".plitka-about__body"),
                {
                    loop: true,
                    dragSpeed: 1.5,
                    duration: 500,
                    offset: false,
                    selector: ".plitka-about__item",
                    slides: {
                        perView: "auto",
                        spacing: 8,
                    },
                    mode: "snap",
                    rubberband: false,
                },

                [aboutSlider.navigation]
            );
        }
    },
};
document.addEventListener("DOMContentLoaded", () => {
    if (window.innerWidth < 1024) aboutSlider.init();
});

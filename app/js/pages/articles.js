/** * @description Слайдер внутри контента статьи */
let articleSlider = {
    navigation: function (slider) {
        let arrowLeft, arrowRight, dots;
        function markup(remove) {
            arrowMarkup(remove);
            dotMarkup(remove);
        }

        function arrowMarkup(remove) {
            let classUp = slider.container.parentElement.parentElement;

            arrowLeft = classUp.querySelector(".recommended--slider-left");
            arrowRight = classUp.querySelector(".recommended--slider-right");
            arrowLeft.addEventListener("click", () => slider.prev());
            arrowRight.addEventListener("click", () => slider.next());
        }

        function dotMarkup(remove) {
            let classUp2 = slider.container.parentElement;

            if (classUp2.querySelector(".slider-default__dots")) classUp2.querySelector(".slider-default__dots").remove();
            dots = global.createDiv("slider-default__dots flex flex-center-horizontal");
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
        let slider = document.querySelector(".detal-articl__slider .products--block-wrap");

        if (slider) {
            new sliderGlob.mainKeen(
                slider,
                {
                    loop: true,
                    selector: ".detal-articl__slider .products--block",
                    slides: {
                        perView: 4,
                        spacing: 16,
                    },

                    rubberband: false,
                    breakpoints: {
                        "(max-width: 1919px)": {
                            slides: {
                                perView: "auto",
                                spacing: 16,
                            },
                        },
                        "(max-width: 1599px)": {
                            slides: {
                                perView: "auto",
                                spacing: 8,
                            },
                        },
                    },
                },

                [articleSlider.navigation]
            );
        }
    },
};
/** * @description Слайдер похожие статьи */
let articleSimilarSlider = {
    navigation: function (slider) {
        let arrowLeft, arrowRight, dots;
        function markup(remove) {
            arrowMarkup(remove);
            dotMarkup(remove);
        }

        function arrowMarkup(remove) {
            let classUp = slider.container.parentElement.parentElement;

            arrowLeft = classUp.querySelector(".recommended--slider-left");
            arrowRight = classUp.querySelector(".recommended--slider-right");
            arrowLeft.addEventListener("click", () => slider.prev());
            arrowRight.addEventListener("click", () => slider.next());
        }

        function dotMarkup(remove) {
            let classUp2 = slider.container.parentElement;

            if (classUp2.querySelector(".slider-default__dots")) classUp2.querySelector(".slider-default__dots").remove();
            dots = global.createDiv("slider-default__dots flex flex-center-horizontal");
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
        let slider = document.querySelector(".articl--similar .products--block-wrap");

        if (slider) {
            new sliderGlob.mainKeen(
                slider,
                {
                    loop: true,
                    dragSpeed: 1.5,
                    duration: 500,
                    offset: false,
                    selector: ".articl--similar__card",
                    slides: {
                        perView: 4,
                        spacing: 16,
                    },

                    breakpoints: {
                        "(max-width: 1599px)": {
                            slides: {
                                perView: "auto",
                                spacing: 12,
                            },
                        },
                    },

                    mode: "snap",
                    rubberband: false,
                },

                [articleSimilarSlider.navigation]
            );
        }
    },
};
/** * @description Генерация саписка с якорными ссылками по заголовкам внутри статьи */
let anchorArticle = {
    wrap: document.querySelector(".detal-articl__anchor"),
    link: document.querySelectorAll(".detal-articl h2"),
    list: document.querySelector(".detal-articl ol"),
    init: () => {
        if (anchorArticle.wrap) {
            if (anchorArticle.link.length > 0) {
                anchorArticle.link.forEach((el) => {
                    let li = `<li> ${el.textContent} </li>`;
                    anchorArticle.list.insertAdjacentHTML("afterbegin", li);
                });

                let listAnchor = anchorArticle.list.querySelectorAll("li");

                for (let i = 0; i < listAnchor.length; i++) {
                    listAnchor[i].addEventListener("click", () => {
                        let height = document.querySelector(".header").clientHeight;
                        height > 100 ? (height = 100) : (height = height + 20);
                        let t = Math.round(anchorArticle.link[i].getBoundingClientRect().top) - height;

                        window.scrollBy({
                            top: t,
                            behavior: "smooth",
                        });
                    });
                }
            } else {
                anchorArticle.wrap.style.display = "none";
            }
        }
    },
};
/** * @description Удаление текста из тригеров(количество, просмотры, лайки) в шапке */
let regNoLetters = {
    text: document.querySelectorAll(".header-articl__item span:last-child"),
    init: () => {
        if (regNoLetters.text) {
            for (let i = 0; i < regNoLetters.text.length; i++) {
                let number = regNoLetters.text[i].textContent.replace(/[a-zа-яё()]/gi, "");
                regNoLetters.text[i].textContent = number;
            }
        }
    },
};
/** * @description Открытие формы отзывов на карточке статьи */
function openFormArticl() {
    document.querySelector(".reviews-articl__form").classList.add("active");
}
document.addEventListener("DOMContentLoaded", () => {
    articleSlider.init();
    anchorArticle.init();
    articleSimilarSlider.init();

    if (window.innerWidth < 768) regNoLetters.init();
});

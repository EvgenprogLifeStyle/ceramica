/** * @description  Слайдер списка коллекций */
let collectionSlider = {
    slider: document.getElementById("collection-slider"),
    navigation: function (slider) {
        let wrapper, dots, arrowLeft, arrowRight;

        function markup(remove) {
            wrapperMarkup(remove);
            dotMarkup(remove);
            arrowMarkup(remove);
        }

        function arrowMarkup(remove) {
            if (remove) {
                global.removeElement(arrowLeft);
                global.removeElement(arrowRight);
                return;
            }
            if (document.querySelector(".list-catalog__arr_prev")) {
                arrowLeft = document.querySelector(".list-catalog__arr_prev");
                arrowLeft.addEventListener("click", () => slider.prev());
                arrowRight = document.querySelector(".list-catalog__arr_next");
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
            wrapper = global.createDiv("list-catalog__slider");
            slider.container.parentNode.appendChild(wrapper);
            wrapper.appendChild(slider.container);
        }
        function dotMarkup(remove) {
            if (remove) {
                global.removeElement(dots);
                return;
            }
            dots = global.createDiv("list-catalog__dots flex flex-center-horizontal");
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
        if (collectionSlider.slider) {
            new sliderGlob.mainKeen(
                collectionSlider.slider,
                {
                    loop: true,
                    dragSpeed: 1,
                    duration: 500,
                    selector: ".list-catalog__item",
                    offset: false,
                    slides: {
                        perView: 7,
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
                [collectionSlider.navigation]
            );
        }
    },
};

/** Блок управления образцами на коллекциях */
let btnColl = document.querySelectorAll(".drop-btn-sample");
let bodyColl = document.querySelectorAll(".drop-body-sample");
if (btnColl) {
    for (let i = 0; i < btnColl.length; i++) {
        let listLi = bodyColl[i].querySelectorAll(".drop-item-sample");

        btnColl[i].addEventListener("click", () => {
            document.querySelectorAll(".drop-body-sample")[i].classList.toggle("active");
            btnColl[i].classList.toggle("in");
        });

        for (let j = 0; j < listLi.length; j++) {
            let itemLi = listLi[0].querySelectorAll("li");
            if (window.innerWidth > 1380) {
                if (!listLi[1] && itemLi.length < 10) {
                    bodyColl[i].classList.add("sb");
                    btnColl[i].classList.add("_hide");
                }
            }
            if (window.innerWidth < 420) {
                if (!listLi[1] && itemLi.length < 8) {
                    bodyColl[i].classList.add("sb");
                    btnColl[i].classList.add("_hide");
                }
            } else if (window.innerWidth < 767) {
                if (!listLi[1] && itemLi.length < 10) {
                    bodyColl[i].classList.add("sb");
                    btnColl[i].classList.add("_hide");
                }
            } else if (window.innerWidth < 992) {
                if (!listLi[1] && itemLi.length < 9) {
                    bodyColl[i].classList.add("sb");
                    btnColl[i].classList.add("_hide");
                }
            } else if (window.innerWidth < 1040) {
                if (!listLi[1] && itemLi.length < 7) {
                    bodyColl[i].classList.add("sb");
                    btnColl[i].classList.add("_hide");
                }
            } else if (window.innerWidth < 1280) {
                if (!listLi[1] && itemLi.length < 10) {
                    bodyColl[i].classList.add("sb");
                    btnColl[i].classList.add("_hide");
                }
            } else if (window.innerWidth > 1280) {
                if (!listLi[1] && itemLi.length < 8) {
                    bodyColl[i].classList.add("sb");
                    btnColl[i].classList.add("_hide");
                }
            }
        }
    }
}
/** * @description Скролл фильтра   */
let element = "";
let catalogBody = "";

if (document.querySelector(".catalog__desc")) {
    element = document.querySelector(".catalog__desc");
} else if (document.querySelector(".sample__catalog")) {
    element = document.querySelector("footer");
} else {
    element = document.querySelector("footer");
}

if (document.querySelector(".catalog__body")) {
    catalogBody = document.querySelector(".catalog__body");
} else if (document.querySelector(".sample__catalog")) catalogBody = document.querySelector(".sample__catalog");

let filterBodyScroll = document.querySelector(".filter");

if (catalogBody) {
    var Visible = function (target) {
        // Все позиции элемента
        var targetPosition = {
                top: window.pageYOffset + target.getBoundingClientRect().top,
                left: window.pageXOffset + target.getBoundingClientRect().left,
                right: window.pageXOffset + target.getBoundingClientRect().right,
                bottom: window.pageYOffset + target.getBoundingClientRect().bottom,
            },
            // Получаем позиции окна
            windowPosition = {
                top: window.pageYOffset,
                left: window.pageXOffset,
                right: window.pageXOffset + document.documentElement.clientWidth,
                bottom: window.pageYOffset + document.documentElement.clientHeight,
            };

        if (
            targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
            targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
            targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
            targetPosition.left < windowPosition.right
        ) {
            // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
            // Если элемент полностью видно, то запускаем следующий код
            console.clear();

            document.querySelector(".filter").classList.add("_block");
            document.querySelector(".filter").classList.remove("_fixed");
        } else {
            document.querySelector(".filter").classList.remove("_block");
            let what = catalogBody.getBoundingClientRect().top;

            if (what > 20) {
                filterBodyScroll.classList.remove("_fixed");
            } else {
                filterBodyScroll.classList.add("_fixed");
            }
        }
    };

    // Запускаем функцию при прокрутке страницы
    window.addEventListener("scroll", function () {
        Visible(element);
    });
}

/** * @description Запускаем после загрузки страницы*/
document.addEventListener("DOMContentLoaded", () => {
    collectionSlider.init(); // слайдер коллекций
});

/** * @description Слушаем изменение шириы страницы*/
window.addEventListener("resize", function () {
    if (window.innerWidth < 767 && document.querySelector(".catalog__products")) {
        document.querySelector(".catalog__products").classList.remove("layoutLine");
    }
});

/** * @description Слушаем клик по странице */
document.body.addEventListener("click", (e) => {
    /** * @description Закрытие формы фильтра */
    if (e.target.classList.contains("show-filter") || e.target.classList.contains("filter__close")) {
        document.querySelector(".filter").classList.remove("active");
        document.body.classList.remove("_lock");
        document.body.removeChild(document.querySelector(".show-filter"));
    }
    /** * @description Закрытие всех castom select */
    if (!e.target.classList.contains("new-select__input") && document.querySelector(".new-select.in")) {
        selectCastomBody.forEach((el) => {
            el.classList.remove("in");
        });
    }

    if (e.target.id === "layoutGrid") {
        document.querySelector(".catalog__products").classList.remove("layoutLine");
        document.getElementById("layoutGrid").classList.add("active");
        document.getElementById("layoutLine").classList.remove("active");
        productPhotoInit();
        productSizeInit();
    }
    if (e.target.id === "layoutLine") {
        document.querySelector(".catalog__products").classList.add("layoutLine");
        document.getElementById("layoutGrid").classList.remove("active");
        document.getElementById("layoutLine").classList.add("active");
        productPhotoInit();
        productSizeInit();
    }
});

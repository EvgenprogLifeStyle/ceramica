function contentBlock(block) {
    let content = block.textContent;
    if (content.length > 0) {
        let value = block.textContent.replace(/\D/, "");
        if(Number(value) <= 1) {
            value = '1';
            block.textContent = Number(value);
        }
        block.textContent = block.textContent.replace(/\D/, "");
    } else {
        block.textContent = 1;
    }
    block.previousElementSibling.value = block.textContent;
}

function changeType(btn) {
    btn.classList.add("active");
    siblingsEl(btn)[0].classList.remove("active");
}

function cQuantity(block, status) {
    let input = siblingEl(block, "calc--quantity-input").querySelector(".calc--num"),
        value = Number(input.textContent);
    if (status) {
        input.textContent = value + 1;
    } else {
        if (value > 1) {
            input.textContent = value - 1;
        }
    }
}

/** * @description Формат для ввода в инпут */

function calcInputFormat() {
    let inputs = document.querySelectorAll(".clc_inp");
    inputs.forEach((el) => {
        el.addEventListener("input", () => {
            let value = el.value;
            el.value = value.replace(/[^0-9.]/, "");
        });
        el.addEventListener("blur", () => {
            let value = el.value.split(".");
            if (value.length > 2) {
                el.classList.add("error");
            } else if ((value.length === 2 && value[1].replace(/ /g, "") === "") || (value.length === 1 && value[0].replace(/ /g, "") !== "")) {
                el.value = value[0] + ".0";
                el.classList.remove("error");
            } else {
                el.classList.remove("error");
            }
        });
    });
}

/** * @description Переключение табов */

function calcTabs(btn) {
    let wrap = btn.parentNode,
        data = btn.dataset.tab,
        tabs = document.querySelectorAll(".calc--tab");
    wrap.classList.add("active");
    siblingsEl(wrap).forEach((el) => {
        el.classList.remove("active");
    });
    tabs.forEach((el) => {
        el.dataset.tab === data ? el.classList.add("active") : el.classList.remove("active");
    });
}

function contentFocus(el) {
    let p = el.querySelector(".calc--num"),
        s = window.getSelection(),
        r = document.createRange();
    if (!el.contains(p)) {
        r.setStart(p, 0);
        r.setEnd(p, 0);
        s.removeAllRanges();
        s.addRange(r);
    }
}

/** * @description Мобильное переключение табов */

function changeCalcTab(block) {
    let data = block.dataset.block,
        topTabs = document.querySelectorAll('.calc--tabs li'),
        tabs = document.querySelectorAll(".calc--tab");
    tabs.forEach((el) => {
        if (el.dataset.tab === data) {
            el.classList.add("active");
            let initSlider = document.querySelector('.image--radio-wrap.init'),
                newSlider = el.querySelector('.image--radio-wrap');
            if (initSlider) {
                calculatorSlider.globSlider.destroy();
                calculatorSlider.initialized = false;
            }
            if (newSlider) {
                if (window.innerWidth < 990 && !calculatorSlider.initialized) {
                    calculatorSlider.initialized = true;
                    calculatorSlider.init();
                }
            }
        } else {
            el.classList.remove("active")
        }
    });
    topTabs.forEach(el => {
        if (el.querySelector('button').dataset.tab === data) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    })
}

function toggleLine(checkBox) {
    let next = checkBox.parentNode.nextElementSibling;
    next.classList.toggle('active');
    if(next.classList.contains('tBx2')) {
        next.nextElementSibling.classList.toggle('active');
    }
}

/** * @description Инициализация кастомного селекта */

function initSelect() {
    let select = document.querySelector('.new-select'),
        resize = false,
        elements = select.querySelectorAll('.new-select__item');

    window.addEventListener('resize', () => {
        if (window.innerWidth < 1024 && !resize) {
            resize = true;
            let active = document.querySelector('.calc--tabs li.active button');
            elements.forEach(el => {
                if (el.dataset.value === active.textContent.trim()) {
                    el.click();
                }
            })
        } else {
            resize = false;
        }
    })
}

/** * @description Слайдер на странице калькулятора */

let calculatorSlider = {
    navigation: function (slider, nav) {
        let wrapper, dots;

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
                return;
            }
            wrapper = createDiv("navigation-wrapper relative ov_hidden swp rfon");
            slider.container.parentNode.appendChild(wrapper);
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
            slider.container.classList.add('init');
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
            slider.container.classList.remove('init');
            markup(true)
        });
    },
    globSlider: '',
    initialized: false,
    init: () => {
        let slider = document.querySelector('.calc--tab.active .image--radio-wrap')

        if (slider) {
            calculatorSlider.globSlider = new sliderGlob.mainKeen(
                slider,
                {
                    loop: true,
                    dragSpeed: 1.5,
                    duration: 500,
                    offset: false,
                    selector: ".image--radio",
                    slides: {
                        perView: 'auto',
                        spacing: 16,
                    },
                    mode: "snap",
                    rubberband: false,
                },

                [calculatorSlider.navigation]
            );
        }
    },
};

initSelect();

window.addEventListener('resize', () => {
    if (window.innerWidth < 990 && !calculatorSlider.initialized) {
        calculatorSlider.initialized = true;
        calculatorSlider.init();
    } else if (window.innerWidth >= 990 && calculatorSlider.initialized) {
        calculatorSlider.initialized = false;
        calculatorSlider.globSlider.destroy();
    }
})

document.addEventListener("DOMContentLoaded", () => {
    calcInputFormat();
    if (window.innerWidth < 990 && !calculatorSlider.initialized) {
        calculatorSlider.initialized = true;
        calculatorSlider.init();
    }
});

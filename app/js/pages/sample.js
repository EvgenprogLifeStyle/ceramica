/** * @description Кастомный скролл */
function customScrollSample() {
    if (document.querySelector(".popup-sample__text")) {
        new SimpleBar(document.querySelector(".popup-sample__text"), {
            autoHide: false,
        });
    }
}
/** * @description контент модального окна */
function dynamicTextSample() {
    var elem1 = document.querySelector(".fancybox-container.sample .fancybox-caption__body");
    var elem2 = document.querySelector(".popup-sample__text").cloneNode(true);

    document.querySelector(".fancybox-toolbar").innerHTML = `<div data-fancybox-close class="text-sample__close popup-close" onclick="closeSample()">
        <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L11 11M11 1L1 11" stroke="#1F2636" stroke-width="2" stroke-linecap="round" />
        </svg>
        </div>`;
    elem2.classList.add("active");
    elem1.appendChild(elem2);
}
/** * @description Октрытие модального окна для просмотра карточки*/
const openSample = {
    btn: document.querySelectorAll(".sample-cart"),
    body: document.querySelector(".popup-sample__text"),
    init: () => {
        for (let i = 0; i < openSample.btn.length; i++) {
            openSample.btn[i].addEventListener("click", () => {
                dynamicTextSample();
                openSample.body.classList.add("active");
            });
        }
    },
};
/** * @description Закрытие модального окна для просмотра карточки*/
const closeSample = () => {
    document.querySelector(".popup-sample__text").classList.remove("active");
    document.querySelector(".fancybox-thumbs").innerHTML = "";
    document.querySelector(".fancybox-navigation").innerHTML = "";
    $.fancybox.destroy();
};

let allProduct = document.querySelectorAll(".sample-cart .sample-cart__img");

if (allProduct) {
    for (let i = 0; i < allProduct.length; i++) {
        allProduct[i].setAttribute("data-i", i);
    }
}
/** * @description Thumbs в модальном окне */
function thumb() {
    let dataVal = $.fancybox.getInstance().current.opts.subgroup;

    let body = document.querySelector(".text-sample__other");
    body.innerHTML = "";

    for (let i = 0; i < allProduct.length; i++) {
        if (dataVal == allProduct[i].dataset.subgroup) {
            let src = allProduct[i].getAttribute("href");
            let index = allProduct[i].dataset.i;
            let item = `<div class="other-sample__link" data-indsample="${index}">
                <img src="${src}" class="bg-i contain" alt="so-4">
            </div>`;
            body.insertAdjacentHTML("afterbegin", item);
        }
    }

    let btn = document.querySelectorAll(".other-sample__link");
    let thumb = document.querySelectorAll(".fancybox-thumbs__list a");
    let activeThumb = document.querySelector(".fancybox-thumbs-active");

    btn.forEach((item) => {
        if (activeThumb.dataset.index == item.dataset.indsample) item.classList.add("active");
    });

    for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener("click", function () {
            btn.forEach((item) => item.classList.remove("active"));
            thumb.forEach((item) => {
                if (item.dataset.index == this.dataset.indsample) item.click();
            });
        });
    }
}

/** * @description  Запускаем после загрузки страницы*/
document.addEventListener("DOMContentLoaded", () => {
    if (window.innerWidth > 1023) customScrollSample();
    openSample.init();

    let number = 0;
/** * @description Подключаем fancybox в виде модального окна */
    $('[data-fancybox="sample"]').fancybox({
        infobar: 0,
        toolbar: 0,
        baseClass: "sample",
        modal: 0,
        loop: 1,
        animationDuration: 100,
        thumbs: {
            autoStart: true,
            axis: "x",
            gutter: 50,
        },
        touch: {
            vertical: false,
        },
        // Arrows
        btnTpl: {
            smallBtn: `<div class="popup-close">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L11 11M11 1L1 11" stroke="#1F2636" stroke-width="2" stroke-linecap="round" />
                </svg>
            </div>`,
            arrowLeft: `<button data-fancybox-prev class="slider--arrow gray--slide slider--arrow-left flex flex-center-vertical flex-center-horizontal arrow--disabled" title="{{PREV}}">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 14L4 8L10 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>`,
            arrowRight: `<button data-fancybox-next  class="slider--arrow gray--slide slider--arrow-right flex flex-center-vertical flex-center-horizontal arrow--disabled" title="{{PREV}}">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 14L4 8L10 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>`,
        },
        beforeLoad: function () {
            if (window.innerWidth > 1023) {
                number++;
                if (number > 3) {
                    thumb();
                }
            }
        },

        onActivate: () => {
            let close = `<button data-fancybox-close class="fancybox-close">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L11 11M11 1L1 11" stroke="#fff" stroke-width="2" stroke-linecap="round" />
            </svg>
            </button>`;
            let list = document.querySelector(".fancybox-thumbs__list");

            let element = document.createElement("div");
            element.className = "toolbar-block";
            document.querySelector(".fancybox-thumbs-x").appendChild(element);

            document.querySelector(".toolbar-block").appendChild(list);

            document.querySelector(".fancybox-toolbar").insertAdjacentHTML("afterbegin", close);

            new SimpleBar(document.querySelector(".toolbar-block"));

            if (window.innerWidth > 1023) {
                setTimeout(() => {
                    document.querySelector(".fancybox-thumbs-active").click();
                    thumb();
                }, 100);
            }
        },

        afterClose: function () {
            document.body.classList.remove("no_scroll");
            document.querySelector(".popup-sample__text").classList.remove("active");
        },
    });
});

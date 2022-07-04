/** * @description Глобальные функуии и т.д. */
const global = {
    createDiv: (className) => {
        var div = document.createElement("div");
        var classNames = className.split(" ");
        classNames.forEach((name) => div.classList.add(name));
        return div;
    },
    removeActive: (slider) => {
        slider.slides.forEach((slide) => {
            slide.classList.remove("active");
        });
    },
    addActive: (idx, slider) => {
        slider.slides[idx].classList.add("active");
    },
    removeElement: (elment) => {
        elment.parentNode.removeChild(elment);
    },
};

/** * @description Добавить класс на иконку в избранное */
let favorites = document.querySelectorAll(".products--favorites");
if (favorites) {
    for (let i = 0; i < favorites.length; i++) {
        favorites[i].addEventListener("click", function () {
            this.classList.toggle("active");
        });
    }
}

/** * @description Открытие модального окна быстрого заказа */
function orderOneOpen() {
    $.fancybox.open({
        src: "#one-order",
        opts: {
            autoFocus: false,
            touch: false,
            smallBtn: false,
            toolbar: false,
            hideScrollbar: false,
        },
    });

    let product = {
        imgSrc: document.querySelectorAll(".big-sc__item img")[0].getAttribute("src"),
        imgAlt: document.querySelectorAll(".big-sc__item img")[0].getAttribute("alt"),
        id: document.querySelector(".order-ct__id div").textContent,
        name: document.querySelector("h1").textContent,
        price: document.querySelector(".order-ct__price").textContent,
        size: "", // размер м2
        props: document.getElementById("props-list").innerHTML,
    };

    let oneTop = ` <div class="top-one__img">
                        <img src="${product.imgSrc}" alt="${product.imgAlt}" />
                    </div>
                    <div class="top-one__text">
                        <div class="top-one__id flex">Арт.  <div>${product.id}</div></div>
                        <div class="top-one__name">${product.name}</div>
                        <div class="top-one__price flex">
                            <div>${product.price}</div>
                            <span>${product.size}</span>
                        </div>
                        <div class="top-one__props">
                            <div class="products--prop flex flex-column">
                            ${product.props}
                                 
                            </div>
                        </div>
                    </div>`;
    document.querySelector(".modal-one__top").innerHTML = "";
    document.querySelector(".modal-one__top").insertAdjacentHTML("afterbegin", oneTop);
}

/** * @description Модальная форма быстрого заказа - при успешной валидации */
$("#one-order").on("submit", function (e) {
    e.preventDefault();
    modalOneSuccess();
});

/** * @description Действие при успешной отправке формы быстрого заказа  */
function modalOneSuccess(clear = false) {
    let success = document.querySelector(".modal--callback-success");
    if (clear) {
        let form = document.getElementById("one-order-form");
        form.reset();
    }
    success.classList.toggle("active");
}

/** * @description Открытие модального окна после добавления в корзину */
function orderAddOpen() {
    $.fancybox.open({
        src: "#add-order",
        opts: {
            autoFocus: false,
            touch: false,
            smallBtn: false,
            toolbar: false,
            hideScrollbar: false,
        },
    });

    let product = {
        imgSrc: document.querySelectorAll(".big-sc__item img")[0].getAttribute("src"),
        imgAlt: document.querySelectorAll(".big-sc__item img")[0].getAttribute("alt"),
        id: document.querySelector(".order-ct__id div").textContent,
        name: document.querySelector("h1").textContent,
        price: document.querySelector(".order-ct__price").textContent,
        size: "", // размер м2
    };

    let oneTop = ` <div class="top-one__img">
                        <img src="${product.imgSrc}" alt="${product.imgAlt}" />
                    </div>
                    <div class="top-one__text">
                        <div class="top-one__id flex">Арт.  <div>${product.id}</div></div>
                        <div class="top-one__name">${product.name}</div>
                        <div class="top-one__price flex">
                            <div>${product.price}</div>
                            <span>${product.size}</span>
                        </div>
                    </div>`;
    document.querySelector(".modal-order__top").innerHTML = "";
    document.querySelector(".modal-order__top").insertAdjacentHTML("afterbegin", oneTop);
}

/** * @description Открытие модального окна добавления отзыва */
function reviewAddOpen() {
    $.fancybox.open({
        src: "#add-review",
        opts: {
            autoFocus: false,
            touch: false,
            smallBtn: false,
            toolbar: false,
            hideScrollbar: false,
        },
    });
}

/** * @description Открытие модального окна после добавления в корзину */
function designAddOpen() {
    $.fancybox.open({
        src: "#add-design",
        opts: {
            autoFocus: false,
            touch: false,
            smallBtn: false,
            toolbar: false,
            hideScrollbar: false,
        },
    });
}
/** * @description Слушаем клик по кнопке в форме заказать дизайн */
$("#design-form").on("submit", function (e) {
    e.preventDefault();
    modalDesignSuccess();
});

/** * @description Проверка на валидность с последующим открытием окна результата */
function modalDesignSuccess(clear = false) {
    let success = document.getElementById("add-design").querySelector(".modal--callback-success");
    if (clear) {
        let form = document.getElementById("add-design");
        form.reset();
    }
    success.classList.toggle("active");
}

/** * @description Скрытие первых, 1-2 элемента хлебных крошек на адаптиве */
const breadcrumb = {
    item: document.querySelectorAll(".breadcrumbs li"),
    init: () => {
        if (breadcrumb.item && window.innerWidth < 1023) {
            if (breadcrumb.item.length > 3) {
                breadcrumb.item.forEach((el, index) => {
                    if (index < 2) el.style.display = "none";
                });
            } else if (breadcrumb.item.length === 3) breadcrumb.item[0].style.display = "none";
        } else
            breadcrumb.item.forEach((el, index) => {
                el.style.display = "inline";
            });
    },
};
breadcrumb.init();

/**  Слушаем изменение шириы страницы*/
window.addEventListener("resize", function () {
    breadcrumb.init();
});

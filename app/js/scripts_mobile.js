function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
}

function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;

        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        const callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function getAbsoluteHeight(el) {
    el = typeof el === "string" ? document.querySelector(el) : el;

    var styles = window.getComputedStyle(el);
    var margin = parseFloat(styles["marginTop"]) + parseFloat(styles["marginBottom"]);

    return Math.ceil(el.offsetHeight + margin);
}

function getClosest(el, tag) {
    do {
        if (el.classList.contains(tag)) {
            return el;
        }
    } while ((el = el.parentNode));

    return null;
}

function allChilds(elem, type) {
    return Array.from(elem.children).filter((el) => el.type === type);
}

function siblingsEl(elem) {
    let elems = Array.from(elem.parentNode.children).filter((el) => el !== elem);
    return elems;
}
function siblingEl(elem, classList) {
    let elems = Array.from(elem.parentNode.children).filter((el) => el.classList.contains(classList));
    return elems[0];
}

function hasChild(elem) {
    if (elem.children.length > 0) {
        return true;
    } else {
        return false;
    }
}

function findEl(elem, need) {
    let obj = [];

    function elEach(elem) {
        let child = elem.children;
        child = Array.prototype.slice.call(child);
        child.forEach(function (e, el) {
            if ((e.children.length > 0 && !e.classList.contains(need)) || !e.getAttribute("id") === need) {
                elEach(e);
            } else {
                if (e.classList.contains(need) || e.getAttribute("id") === need) {
                    obj.push(e);
                }
            }
        });
    }

    elEach(elem);
    if (obj.length === 1) {
        return obj[0];
    } else {
        return obj;
    }
}

function findTag(elem) {
    let obj = [];

    function elEach(elem) {
        let child = elem.children;
        child = Array.prototype.slice.call(child);
        child.forEach(function (e, el) {
            if (e.children.length > 0) {
                elEach(e);
            } else {
                if (e.nodeName === "INPUT" || e.nodeName === "TEXTAREA") {
                    obj.push(e);
                }
            }
        });
    }

    elEach(elem);
    return obj;
}

function checkProdTitleHeight() {
    setTimeout(function (e) {
        if ($(".t_title").length > 0) {
            $(".t_title").each(function (tIndex, el) {
                var elClass = "title-" + tIndex + "",
                    titleHeight = [];
                $(el)
                    .find(".product--block")
                    .each(function (eIndex, el) {
                        var title = $(el).find(".tl--prod"),
                            elHeight = title.find("p")[0].clientHeight;
                        title.addClass(elClass);
                        if (titleHeight.indexOf(elHeight) === -1) {
                            titleHeight.push(elHeight);
                        }
                    });
                var maxHeight = getMaxOfArray(titleHeight);
                if (maxHeight > 30) {
                    maxHeight = 30;
                }
                $("." + elClass).css("min-height", maxHeight);
            });
        }
    }, 200);
}

/** * @description Закрытие меню */

function closeMenu() {
    let subMenu = document.querySelector(".header--catalog-submenu");
    subMenu.classList.remove("active");
    subMenu.removeAttribute("style");
    document.body.classList.remove("no_scroll");
}

/** * @description Работа основного субменю каталога */

function toggleMenu(btn) {
    let pos = btn.clientHeight + btn.getBoundingClientRect().top,
        subMenu = document.querySelector(".header--catalog-submenu"),
        body = document.body,
        left = subMenu.querySelector(".header--catalog-left"),
        right = subMenu.querySelector(".header--catalog-right");
    body.classList.toggle("no_scroll");
    if (!subMenu.classList.contains("active")) {
        let wh = window.innerHeight - pos + "px";
        subMenu.classList.add("active");
        subMenu.setAttribute("style", "top: " + pos + "px; height: " + wh + "");
        right.setAttribute("style", "height:" + (subMenu.clientHeight - 60) + "px");
        left.setAttribute("style", "height:" + (subMenu.clientHeight - 60) + "px");
    } else {
        subMenu.classList.remove("active");
        subMenu.removeAttribute("style");
    }
}

/** * @description Переключение вкладок субменю */

function headerCatalogInit() {
    let btns = document.querySelectorAll(".header--catalog-left button"),
        blocks = document.querySelectorAll(".header--catalog-right .menu--catalog-block");
    btns.forEach((el) => {
        el.addEventListener("mouseenter", () => {
            let data = Number(el.dataset.menu);
            btns.forEach((el) => {
                el.parentNode.classList.remove("active");
            });
            blocks.forEach((el) => {
                if (data !== Number(el.dataset.menu)) {
                    el.classList.remove("active");
                } else {
                    el.classList.add("active");
                }
            });

            el.parentNode.classList.add("active");
        });
    });
}

/** * @description Открытие модального окна по ID */

function openModal(id) {
    event.preventDefault();
    $.fancybox.open({
        src: "#" + id,
        opts: {
            autoFocus: false,
            touch: false,
            smallBtn: false,
            toolbar: false,
            hideScrollbar: true,
        },
    });
}

/** * @description Очистить модальные формы */

function clearModalForms() {
    $.fancybox.close();
    let forms = document.querySelectorAll(".modal form");
    forms.forEach((el) => {
        el.reset();
    });
}

/** * @description Переключение табов в окне авторизации */

function toggleEnterTab(btn) {
    let data = btn.dataset.tab,
        enterTabs = document.querySelectorAll(".modal--enter-tab");
    btn.classList.add("active");
    siblingsEl(btn).forEach((el) => {
        el.classList.remove("active");
    });
    enterTabs.forEach((el) => {
        if (el.dataset.tab === data) {
            el.classList.add("active");
        } else {
            el.classList.remove("active");
        }
    });
}

/** * @description Кастомные радио кнопки */

function customRadio() {
    let radio = document.querySelectorAll(".btn--input input");
    if (radio.length) {
        radio.forEach((el) => {
            el.addEventListener("change", () => {
                el.parentNode.classList.add("active");
                siblingsEl(el.parentNode).forEach((el) => {
                    el.classList.remove("active");
                });
            });
        });
    }
}

/** * @description Открытие формы авторизации/регистрации  */

function callbackEnter() {
    $.fancybox.open({
        src: "#modal_enter",
        opts: {
            autoFocus: false,
            touch: false,
            smallBtn: false,
            toolbar: false,
            hideScrollbar: false,
            afterShow: function (instance, current) {},
            afterClose: function (e, target) {},
        },
    });
}

/** * @description Поиск в шапке */

let ms = {
    wrap: document.querySelector(".header--search"),
    input: document.getElementById("header_search"),
    doSearch: debounce(function (input) {
        if (input.value.length >= 3) {
            ms.wrap.classList.add("active");
        } else {
            ms.wrap.classList.remove("active");
        }
    }, 1000),
    clear: function () {
        ms.wrap.classList.remove("active");
        ms.input.value = "";
    },
};

/** * @description   Модальная форма обратного звонка - при успешной валидации */

$("#modal_callback").on("submit", function (e) {
    e.preventDefault();
    modalCallbackSuccess();
});

/** * @description Действие при успешной отправке формы обратного звонка */

function modalCallbackSuccess(clear = false) {
    let success = document.querySelector(".modal--callback-success");
    if (clear) {
        let form = document.getElementById("callback_form");
        form.reset();
    }
    success.classList.toggle("active");
}

/** * @description Маска телеофна */

function maskOnInputs() {
    let selector = document.querySelectorAll(".masked-phone");
    Inputmask({ mask: "+7(999)999-99-99" }).mask(selector);
}

/** * @description Кнопка "на верх" */

function upBtn(scroll) {
    let btn = document.getElementById("scroll_top");
    if (scroll >= 200 && !window.customScroll) {
        window.customScroll = true;
        btn.classList.add("active");
    } else if (scroll < 200 && window.customScroll) {
        window.customScroll = false;
        btn.classList.remove("active");
    }
}

/** * @description Показ окна с подтверждением кук */

function getCookie(name) {
    let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function checkCookie() {
    let cookie = getCookie("confirm_cookie"),
        modal = document.querySelector(".cookie--confirm");
    if (typeof cookie === "undefined") {
        modal.classList.add("active");
    }
}

function cookieConfirm() {
    let date = new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
        modal = document.querySelector(".cookie--confirm");
    date = date.toUTCString();
    document.cookie = "confirm_cookie=" + 1 + "; expires=" + date + "; path=/";
    modal.classList.remove("active");
}

/** * @description Скролл к началу страницы */

function scrollToTop() {
    window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
}

/** * @description Фиксированная шапка при скролле */

function fixedHeader(scroll) {
    let header = document.querySelector(".header");
    if (scroll >= 200 && window.customScroll) {
        header.classList.add("scroll");
    } else if (scroll < 200 && !window.customScroll) {
        header.classList.remove("scroll");
    }
}

/** * @description Модальный фон */

function doModalBg() {
    let bg = document.querySelector(".mobile--menu-fon");
    bg.classList.toggle("active");
}

/** * @description Открытие/закрытие мобильного меню */

function toggleMobileMenu() {
    let menu = document.getElementById("mobile_menu");
    menu.classList.toggle("active");
    doModalBg();
    if (document.body.classList.contains("no_scroll")) {
        document.body.classList.remove("no_scroll");
    } else {
        document.body.classList.add("no_scroll");
    }
}

/** * @description Закрытие субменю */

function submenuClose(btn) {
    let subMenu = getClosest(btn, "mobile--submenu");
    subMenu.classList.remove("active");
}

/** *@description Откытие субменю */

function openSubMenu(btn) {
    btn.nextElementSibling.classList.add("active");
}

/** *@description Кастомный скролл */
function customScrollElements() {
    let scrolledEl = document.querySelectorAll(".c_s:not(.scrll)");
    scrolledEl.forEach((el) => {
        new SimpleBar(el);
        el.classList.add("scrll");
    });
}

/** * @description События при успешной/не успешной валидации полей */

window.Parsley.on("field:error", function (e) {
    this.$element[0].parentNode.classList.add("error");
});
window.Parsley.on("field:success", function (e) {
    this.$element[0].parentNode.classList.remove("error");
});

window.addEventListener("scroll", () => {
    let scroll = window.scrollY;
    upBtn(scroll);
    fixedHeader(scroll);
});

$(document).on("afterShow.fb", () => {
    window.preopen = false;
    if (!document.body.classList.contains("no_scroll")) {
        window.preopen = true;
        document.body.classList.add("no_scroll");
    }
});

$(document).on("afterClose.fb", () => {
    if (window.preopen) {
        window.preopen = false;
        document.body.classList.remove("no_scroll");
    }
});

document.addEventListener("click", (event) => {
    let search = document.querySelector(".header--search");
    if (event.target !== search && !search.contains(event.target)) {
        ms.clear();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    checkCookie();
    customRadio();
    maskOnInputs();
    headerCatalogInit();
    customScrollElements();
});

// Главная страница

// @@include('./html_blocks/advantage_block/advantage_slider.js')

// @@include('./js/pages/home_mobile.js')

// @@include('./html_blocks/news_block/news_block.js')

// @@include('./js/pages/product.js')

// @@include('./html_blocks/product_slider/product_default_mobile.js')

// Каталог общий
// @@include('./js/pages/ui.js')
// @@include('./js/pages/global.js')
// @@include('./js/pages/catalog.js')
// @@include('./js/pages/catalog-all.js')

// @@include('./html_blocks/filter_catalog/script.js')
// @@include('./html_blocks/brand_block/brand.js')
// @@include('./html_blocks/slider_default/slider-default.js')

// Фото образцов
// @@include('./js/pages/sample.js')

// Контакты
// @@include('./js/pages/contacts_mobile.js')

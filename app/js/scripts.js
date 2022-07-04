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

/** @description Окно обратного звонка */

function doCallback(btn, status) {
    let modal = document.querySelector(".header--callback-main"),
        position = btn.getBoundingClientRect(),
        offset = modal.clientWidth - btn.clientWidth,
        right = position.right - btn.clientWidth - offset,
        top = position.top + btn.clientHeight + 2;
    if (!modal.classList.contains("active")) {
        if (status) {
            modal.setAttribute("style", "left: " + right + "px; top:" + top + "px");
            setTimeout(() => {
                modal.classList.add("active");
            }, 300);
        }
    } else {
        if (status) {
            modal.classList.remove("active");
        } else {
            modal.setAttribute("style", "left: " + right + "px; top:" + top + "px");
        }
    }
}

/** * @description Инициализация мобильной шапки с помощью js */

window.mobileHead = false;

function initMobileHeader(mobile = false) {
    let search = document.querySelector(".header--search"),
        middleWrap = document.querySelector(".header--middle"),
        contacts = document.querySelector(".header--contacts"),
        icons = document.querySelector(".header--icons"),
        phones = document.querySelector(".header--contacts"),
        callback = document.querySelector(".header--callback"),
        menuSocial = document.querySelector(".mobile--menu-social"),
        mobileMenu = document.querySelector(".mobile--menu-main"),
        bottomWrap = document.querySelector(".header--bottom");
    if (mobile) {
        bottomWrap.append(search);
        middleWrap.append(icons);
        mobileMenu.insertBefore(phones, menuSocial);
    } else {
        middleWrap.insertBefore(contacts, callback);
        middleWrap.insertBefore(search, contacts);
        bottomWrap.append(icons);
    }
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
    let btns = document.querySelectorAll(".header--catalog-left .hovered--category"),
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


/** * @description Кастомный скролл меню каталога */

function scrollCatalog() {
    window.sCr = new SimpleBar(document.querySelector(".header--catalog-right"), {
        autoHide: false,
    });
    window.sCl = new SimpleBar(document.querySelector(".header--catalog-left"), {
        autoHide: false,
        forceVisible: true,
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

/** * @description   Модальная форма обратного звонка - при успешной валидации */

$("#freed_callback").on("submit", function (e) {
    e.preventDefault();

    modalFreedSuccess();
});

/** * @description Действие при успешной отправке формы обратного звонка */

function modalFreedSuccess(clear = false) {
    let success = document.querySelector("freed_callback .modal--callback-success");

    if (clear) {
        let form = document.getElementById("freed_form");
        form.reset();
    }
    success.classList.toggle("active");
}

/** * @description Маска телеофна */

function maskOnInputs() {
    let selector = document.querySelectorAll(".masked-phone");
    Inputmask({mask: "+7(999)999-99-99"}).mask(selector);
}

/** * @description Кнопка "на верх" */

function upBtn(scroll) {
    let btn = document.getElementById("scroll_top");
    if (scroll >= 100 && !window.customScroll) {
        window.customScroll = true;
        btn.classList.add("active");
    } else if (scroll < 100 && window.customScroll) {
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

function closeAllSub() {
    let sub = document.querySelectorAll('.mobile--submenu.active');
    if (sub.length) {
        sub.forEach(el => {
            el.classList.remove('active');
        })
    }
}

/** * @description Задаём класс для инпута, который имеет внутри значение */
function filled() {
    document.querySelectorAll('.iText').forEach((el) => {
        if (el.value.length > 0) {
            el.parentNode.classList.add('filled');
        } else {
            el.parentNode.classList.remove('filled');
        }
    });
}


function initInputs() {
    document.querySelectorAll('.iText').forEach(el => {
        el.addEventListener('input', () => {
            filled();
        })
        el.addEventListener('focus', () => {
            filled();
        })
        el.addEventListener('blur', () => {
            filled();
        })
    })
}

function clearInput(btn) {
    let input = btn.nextElementSibling;
    input.value = '';
    filled();
}

function moveCallbackWindow(scroll = false) {
    let btn;
    if (!scroll) {
        btn = document.querySelector(".callback--btn");
        doCallback(btn, false);
    } else {
        btn = document.querySelector(".scroll--callback");
        doCallback(btn, false);
    }
}

/** * @description Фиксированная шапка при скролле */

function fixedHeader(scroll) {
    let header = document.querySelector(".header");
    if (scroll >= 100 && window.customScroll) {
        header.classList.add("scroll");
        moveCallbackWindow(true);
    } else if (scroll < 100 && !window.customScroll) {
        header.classList.remove("scroll");
        moveCallbackWindow(false);
    }
}

/** * @description Модальный фон */

function doModalBg() {
    let bg = document.querySelector(".mobile--menu-fon");
    bg.classList.toggle("active");
}

/** * @description Следит за добавлением класса на body "no_scroll" и делает отступ */
window.padding = window.innerWidth - document.documentElement.clientWidth;

function bodyObserver() {
    let body = document.body,
        header = document.querySelector(".header");
    var observer = new MutationObserver(function (mutations) {
        let count = 0;
        mutations.forEach(function (mutation) {
            if (mutation.attributeName === "class") {
                if (mutation.target.classList.contains("compensate-for-scrollbar")) {
                    count++;
                }
            }
        });
        if (count) {
            header.style.padding = "0 " + window.padding + "px 0 0";
            // body.style.padding = "0 " + window.padding + "px 0 0";
        } else {
            header.style.padding = "0";
            // body.style.padding = "0";
        }
    });

    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"],
    });
}

/** * @description Открытие/закрытие мобильного меню */

function toggleMobileMenu() {
    let menu = document.getElementById("mobile_menu");
    menu.classList.toggle("active");
    doModalBg();
    if (document.body.classList.contains("no_scroll")) {
        document.getElementsByTagName( 'html' )[0].classList.remove('no_scroll')
        document.body.classList.remove("no_scroll");
    } else {
        document.body.classList.add("no_scroll");
        document.getElementsByTagName( 'html' )[0].classList.add('no_scroll')
    }
    closeAllSub();
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

/** *@description Ховер по иконкам в шапке */

function headerIcons() {
    let icons = document.querySelectorAll(".hi"),
        block = document.querySelector(".header--icons-empty"),
        text = ["В просмотренном пусто", "В сравнении пусто", "В избранном пусто", "В корзине пусто"];
    icons.forEach((el) => {
        el.addEventListener("mouseenter", () => {
            if (el.classList.contains("empty")) {
                let elH, elW, left, top;
                elW = el.clientWidth;
                elH = el.clientHeight;
                left = el.getBoundingClientRect().left;
                top = el.getBoundingClientRect().top;
                block.textContent = text[el.dataset.text];
                block.style.top = top + elH + "px";
                block.style.left = left + elW - block.clientWidth + "px";
                block.classList.remove("hidden");
            }
        });
        el.addEventListener("mouseleave", () => {
            block.classList.add("hidden");
        });
    });
}

/** *@description Кастомный скролл */
function customScrollElements() {
    let scrolledEl = document.querySelectorAll(".c_s:not(.scrll)");
    scrolledEl.forEach((el) => {
        new SimpleBar(el);
        el.classList.add("scrll");
    });
}

/** * @description Инициализация мобильного меню */
function initMobileMenu() {
    let menuStart = document.querySelectorAll(".hovered--category"),
        menuLvl1 = {},
        menuLeft = document.querySelector(".header--catalog-left"),
        headSubmenu = document.querySelector(".header--catalog-submenu"),
        menuRight = document.querySelector(".header--catalog-right"),
        mobileMenu = document.querySelector(".mobile--submenu-main"),
        mobileWrap = document.querySelector(".mobile--menu"),
        menuLvl2 = {},
        submenuWrap = document.querySelector(".mobile--submenu-main");
    window.mobileMenu = false;
    menuStart.forEach((el, index) => {
        let items = document.querySelectorAll('.menu--catalog-block[data-menu="' + el.dataset.menu + '"] .menu--catalog-item');
        let data = {
            mainElement: el.cloneNode(true),
            image: el.children[0],
            text: el.children[1].textContent,
            link: el.getAttribute("href"),
            childrens: [],
        };
        items.forEach((el, index) => {
            data.childrens[index] = el.cloneNode(true);
        });
        menuLvl1[index] = data;
    });

    function initMobile() {
        document.querySelectorAll(".header--catalog-left ul:not(:first-child)").forEach((el, index) => {
            menuLvl2[index] = el;
            for (const [key, value] of Object.entries(menuLvl2)) {
                value.classList.add("no--border");
                submenuWrap.append(value);
            }
        });

        function doButton(item, first = true) {
            let button = document.createElement("button"),
                span = document.createElement("span");
            if (first) {
                span.innerHTML = item.text;
            } else {
                span.innerHTML = item.textContent;
            }
            button.setAttribute("onclick", "openSubMenu(this)");
            button.setAttribute("type", "button");
            button.classList.add("flex", "flex-center-vertical");
            if (first) {
                button.append(item.image);
            }
            button.append(span);
            button.insertAdjacentHTML("beforeend", '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path d="M4.5 10.5L9 6L4.5 1.5" stroke="#C5CBD9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </svg>');
            return button;
        }

        function doSubmenu(li, first = true, newItem = {}, key) {
            let submenu = document.createElement("div"),
                ul = document.createElement("ul"),
                href,
                text,
                categoryLink = document.createElement("a"),
                backButton = '<div class="mobile--submenu-top flex">\n' + '<button type="button" onclick="submenuClose(this);" class="mobile--submenu-close flex flex-center-vertical">\n' + '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">\n' + '<path d="M7.5 10.5L3 6L7.5 1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>\n' + "</svg>\n" + "<span>Назад</span>\n" + "</button>\n" + "</div>";
            submenu.classList.add("mobile--submenu");
            submenu.insertAdjacentHTML("beforeend", backButton);
            li.append(submenu);
            categoryLink.classList.add("mobile--submenu-title", "hovered");
            if (first) {
                href = menuLvl1[key].link;
                text = menuLvl1[key].text;
            } else {
                href = newItem.querySelector(".menu--catalog-title").getAttribute("href");
                text = newItem.querySelector(".menu--catalog-title").textContent;
            }
            categoryLink.setAttribute("href", href);
            categoryLink.textContent = text;
            submenu.append(categoryLink);
            submenu.append(ul);
            if (first) {
                for (const [index, item] of Object.entries(menuLvl1[key].childrens)) {
                    let li = document.createElement("li"),
                        link = item.querySelector(".menu--catalog-title");
                    li.append(doButton(link, false));
                    ul.append(li);
                    doSubmenu(li, false, item);
                }
            } else {
                for (let i = 1; i < newItem.children.length; i++) {
                    let li = document.createElement("li"),
                        a = document.createElement("a"),
                        link = newItem.children[i];
                    a.setAttribute("href", link.getAttribute("href"));
                    a.textContent = link.textContent;
                    li.append(a);
                    ul.append(li);
                }
            }
        }

        let ul = document.createElement("ul");
        for (const [key, value] of Object.entries(menuLvl1)) {
            let li = document.createElement("li");

            li = document.createElement("li");
            ul.classList.add("last--border");
            li.append(doButton(menuLvl1[key]));
            ul.append(li);
            doSubmenu(li, true, {}, key);
            submenuWrap.insertBefore(ul, submenuWrap.children[0]);
        }
        menuLeft.innerHTML = "";
        menuRight.innerHTML = "";
        menuStart.forEach((el, index) => {
            el.remove();
        });
        document.querySelectorAll(".menu--catalog-block .menu--catalog-item").forEach((el) => {
            el.remove();
        });
        menuRight.removeAttribute("data-simplebar");
        window.sCr.unMount();
        window.sCl.unMount();
    }

    document.addEventListener("DOMContentLoaded", () => {
        if (window.innerWidth < 1024) {
            window.mobileMenu = true;
            initMobile();
        }
    });
    window.addEventListener("resize", () => {
        if (window.innerWidth < 1024 && !window.mobileMenu) {
            window.mobileMenu = true;
            if (headSubmenu.classList.contains("active")) {
                closeMenu();
            }
            initMobile();
        } else if (window.innerWidth >= 1024 && window.mobileMenu) {
            if (mobileWrap.classList.contains("active")) {
                toggleMobileMenu();
            }
            window.mobileMenu = false;
            let ul = document.createElement("ul");
            for (const [key, value] of Object.entries(menuLvl1)) {
                let dataDiv = document.createElement("div");
                ul.append(doMainLeft(menuLvl1[key].image, menuLvl1[key].link, menuLvl1[key].text, key));
                dataDiv.classList.add("menu--catalog-block");
                dataDiv.dataset.menu = key;
                menuRight.append(dataDiv);
                menuLvl1[key].childrens.forEach((el) => {
                    dataDiv.append(el);
                });
            }
            menuLeft.append(ul);
            mobileMenu.querySelector(".last--border").remove();

            mobileMenu.querySelectorAll("ul").forEach((el) => {
                menuLeft.append(el);
            });
            menuRight.children[0].classList.add("active");
            scrollCatalog();
            headerCatalogInit();
            mobileMenu.innerHTML = "";
        }
    });

    // Для десктопной версии

    function doMainLeft(img, link, text, key) {
        let li = document.createElement("li"),
            span = document.createElement("span"),
            a = document.createElement("a");
        li.classList.add("flex", "flex-center-vertical");
        a.classList.add("hovered", "flex", "flex-center-vertical", "hovered--category");
        a.append(img);
        span.textContent = text;
        a.append(span);
        li.append(a);
        a.dataset.menu = key;
        a.href = link;
        return li;
    }
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

window.addEventListener("resize", () => {
    let windowWidth = window.innerWidth;
    if (windowWidth < 1024 && !window.mobileHead) {
        window.mobileHead = true;
        initMobileHeader(true);
    } else if (windowWidth >= 1024 && window.mobileHead) {
        window.mobileHead = false;
        initMobileHeader(false);
    }
});

document.addEventListener("click", (event) => {
    let target = event.target,
        search = document.querySelector(".header--search"),
        fixedBtn = document.querySelector(".scroll--callback > a"),
        modal = document.querySelector(".header--callback-main");
    if (!target.classList.contains("callback--btn") && target !== fixedBtn) {
        if (target !== modal && !modal.contains(target)) {
            modal.classList.remove("active");
        }
    }
    if (event.target !== search && !search.contains(event.target)) {
        ms.clear();
    }
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

/** * @description   Модальная форма обратного звонка Дилер - при успешной валидации */

$("#modal_dealer").on("submit", function (e) {
    e.preventDefault();

    modalDealerSuccess();
});

/** * @description Действие при успешной отправке формы обратного звонка */

function modalDealerSuccess(clear = false) {
    let success = document.querySelector("#modal_dealer .modal--callback-success");

    if (clear) {
        let form = document.getElementById("dealer_form");
        form.reset();
    }
    success.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", () => {
    let windowWidth = window.innerWidth;
    checkCookie();
    customRadio();
    maskOnInputs();
    scrollCatalog();
    headerCatalogInit();
    customScrollElements();
    bodyObserver();
    headerIcons();
    filled();
    initInputs();
    if (windowWidth < 1024) {
        window.mobileHead = true;
        initMobileHeader(true);
    }
});
initMobileMenu();

// @@include('./js/pages/global.js')

// @@include('./js/pages/product.js')

// @@include('./js/pages/ui.js')

// @@include('./js/pages/catalog.js')

// @@include('./js/pages/card-products.js')






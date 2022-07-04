/** * @description Quantity + -  */
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

function contentBlock(block) {
    let content = block.textContent;
    if (content.length > 0) {
        let value = block.textContent.replace(/\D/, "");
        if (Number(value) <= 1) {
            value = '1';
            block.textContent = Number(value);
        }
        block.textContent = block.textContent.replace(/\D/, "");
    } else {
        block.textContent = 1;
    }
    block.previousElementSibling.value = block.textContent;
}

/** * @description Смена отображения в блоке кол-ва товаров при смене типа м2, шт... */

function changeQuantityType(block) {
    let val = block.dataset.value,
        center = getClosest(block, 'cart--block-center'),
        quantity = center.querySelector('.calc--qt');
    if (val === 'м2') {
        quantity.innerHTML = 'М<sup>2</sup>';
    } else {
        quantity.textContent = val;
    }

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

/** * @description Смена размеров плавающей корзины при window.resize */

function checkCartSize() {
    let cartWrap = document.querySelector('.cart--float'),
        float = document.querySelector('.cart--float-wrap'),
        string = '',
        style = float.getAttribute('style');
    if (style !== null) {
        style = style.split(';');
        style.filter((el, index) => {
            if (el.match('width')) {
                style.splice(index, index)
            }
        });
        style.forEach(el => {
            string += el + ';';
        })
        string += 'width: ' + cartWrap.clientWidth + 'px';
        float.setAttribute('style', string)
    }
}

/** * @description Основной функционал плавающей корзины */

function stickyCart() {
    function sticky() {
        let float = document.querySelector('.cart--float-wrap');
        if (window.innerWidth > 1024) {
            let wrap = document.querySelector('.cart--float'),
                header = document.querySelector('.header').clientHeight,
                wrapOffset = wrap.getBoundingClientRect().top + window.scrollY,
                left = document.querySelector('.cbl'),
                leftOffset = left.getBoundingClientRect().top + window.scrollY + left.clientHeight;
            if (left.clientHeight >= float.clientHeight + 100) {
                wrapOffset = wrapOffset - header - 20;
                leftOffset = leftOffset - float.clientHeight - header - 20;
                if (window.scrollY >= wrapOffset && window.scrollY < leftOffset) {
                    float.setAttribute('style', 'top: ' + (header + 20) + 'px; width: ' + wrap.clientWidth + 'px');
                    float.classList.add('fixed');
                    float.classList.remove('bottom');
                } else if (window.scrollY >= wrapOffset && window.scrollY >= leftOffset) {
                    float.classList.remove('fixed');
                    float.classList.add('bottom');
                    float.removeAttribute('style');
                } else {
                    float.classList.remove('fixed');
                    float.classList.remove('bottom');
                }
            } else {
                float.classList.remove('bottom');
                float.classList.remove('fixed');
                // float.classList.add('bottom');
                // float.classList.remove('bottom');
            }
        } else {
            float.classList.remove('fixed');
            float.classList.remove('bottom');
            float.removeAttribute('style');
        }

    }

    sticky()

}

/** * @description Смена типа доставки */

function toggleDelivery(block) {
    block.querySelector('input').checked = true;
    block.classList.add('active');
    let data = block.dataset.tab;
    siblingsEl(block).forEach(el => {
        el.classList.remove('active');
    })
    document.querySelectorAll('.ordering--delivery-tab').forEach(el => {
        data === el.dataset.tab ? el.classList.add('active') : el.classList.remove('active');
    })
    checkCartSize()
}

/** * @description Смена оплаты */

function togglePayment(block) {
    block.querySelector('input').checked = true;
    block.classList.add('active');
    siblingsEl(block).forEach(el => {
        el.classList.remove('active');
    })
}

/** * @description Карта в оформлении заказа ( аналог со страницы контактов ) */

function contactsMap(id, coords, route = false) {
    ymaps.ready(function () {
        var myMap = new ymaps.Map(id, {
                center: coords,
                zoom: 15
            }, {
                searchControlProvider: 'yandex#search'
            }),

            myPlacemarkWithContent = new ymaps.Placemark(myMap.getCenter(), {}, {
                iconLayout: 'default#imageWithContent',
                iconImageHref: '../pic/map/map.svg',
                iconImageSize: [30, 42],
                iconImageOffset: [-15, -42],
                iconContentOffset: [15, 15],
            });

        myMap.controls.remove('geolocationControl');
        myMap.controls.remove('searchControl');
        myMap.controls.remove('trafficControl');
        myMap.controls.remove('typeSelector');
        myMap.controls.remove('fullscreenControl');
        myMap.controls.remove('rulerControl');
        myMap.behaviors.disable('scrollZoom');


        myMap.geoObjects
            .add(myPlacemarkWithContent)
        if (route) {
            window.routeMap = myMap;
        }
    });
}

/** * @description Блок "Отправить заказ по e-mail" */

function toggleMail() {
    let container = document.querySelector('.cart--float-email');
    if (!container.classList.contains('active')) {

        container.classList.add('active');
        container.style.height = 'auto';

        var height = container.clientHeight + 'px';

        container.style.height = '0px';

        setTimeout(function () {
            container.style.height = height;
        }, 0);

    } else {

        container.style.height = '0px';

        container.addEventListener('transitionend', function () {
            container.classList.remove('active');
        }, {
            once: true
        });

    }
}

/** * @description Добавление нового промоблока */

function addPromoLine(button) {
    let div = document.createElement('div'),
        wrap = document.querySelector('.cart--promo-wrap'),
        input = document.createElement('input'),
        span = document.createElement('span'),
        promoInputs = document.querySelectorAll('.cart--promo-block input'),
        promoNum = 0,
        close = document.createElement('button');
    if (promoInputs.length) {
        promoNum = Number(promoInputs[promoInputs.length - 1].id.split('_')[1]) + 1;
    }
    div.classList.add('cart--promo-block');
    close.classList.add('cart--promo-remove', 'hovered');
    close.type = 'button';
    input.type = 'text';
    input.id = 'promocode_' + promoNum + '';
    input.name = 'promo';
    input.placeholder = 'Введите промокод';
    span.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
        '<path d="M3 3L13 13M13 3L3 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>\n' +
        '</svg>\n';
    span.classList.add('flex');
    close.setAttribute('onclick', 'removePromo("' + input.id + '")');
    div.append(input);
    close.append(span);
    div.append(close);
    wrap.append(div);
    wrap.classList.add('active');
    button.textContent = 'Применить промокод';
    button.setAttribute('onclick', 'submitPromo(this,"' + input.id + '")');
}

/** * @description Удаление промоблока */

function removePromo(id) {
    let wrap = document.querySelector('.cart--promo-wrap');
    document.getElementById(id).parentNode.remove();
    let blocks = document.querySelectorAll('.cart--promo-block')
    if (!blocks.length) {
        wrap.classList.remove('active');
    }
}

/** * @description Успешное применение промокода */

function promoSuccess(button, id) {
    let input = document.getElementById(id),
        parent = input.parentNode,
        block = document.createElement('div');
    block.textContent = 'Промокод применён';
    block.classList.add('cart--promo-text')
    parent.append(block);
    parent.classList.add('added');
    button.textContent = 'Добавить промокод';
    button.setAttribute('onclick', 'addPromoLine(this)');
}

/** * @description Ошибка при применении промокода */

function promoError(button, id) {
    let input = document.getElementById(id),
        parent = input.parentNode,
        block = document.createElement('div');
    block.textContent = 'Промокод не найден';
    block.classList.add('cart--promo-text')
    parent.append(block);
    parent.classList.add('error');
    button.textContent = 'Добавить промокод';
    button.setAttribute('onclick', 'addPromoLine(this)');
}

/** * @description Аякс для промокода и тд и тп */

function submitPromo(button, id) {
    promoSuccess(button, id);
    stickyCart();
}

/** @description Инициализация и уничтожение карты при нажатии на кнопку. */

function Mapinit() {
    document.getElementById('btn-map-lk').addEventListener('click', () => {
        let modal = document.getElementById('modal-map'),
            bollon = document.getElementById('modal-bollon');
        modal.innerHTML = '';
        bollon.classList.remove('active');
        var myPlacemark;
        var myMapL = new ymaps.Map(
            "modal-map",
            {
                center: [54.83, 37.11],
                zoom: 5,
                controls: ["zoomControl"],
            },
            {
                searchControlProvider: "yandex#search",
            }
        );


        myMapL.events.add("click", function (e) {
            var coords = e.get("coords");


            if (myPlacemark) {
                myPlacemark.geometry.setCoordinates(coords);
            } else {
                myPlacemark = createPlacemark(coords);
                myMapL.geoObjects.add(myPlacemark);

                myPlacemark.events.add("dragend", function () {
                    getAddress(myPlacemark.geometry.getCoordinates());
                });
            }
            getAddress(coords);
        });


        function createPlacemark(coords) {
            return new ymaps.Placemark(
                coords,
                {},
                {
                    draggable: true,
                    iconLayout: "default#imageWithContent",
                    iconImageHref: "../pic/map/map.svg",
                    iconImageSize: [30, 42],
                    iconImageOffset: [-15, -42],
                    iconContentOffset: [15, 15],
                }
            );
        }


        function getAddress(coords) {
            myPlacemark.properties.set("iconCaption", "поиск...");
            ymaps.geocode(coords).then(function (res) {
                let city = document.getElementById('ordering_city'),
                    street = document.getElementById('ordering_street'),
                    home = document.getElementById('ordering_home'),
                    text = bollon.querySelector('.modal-bollon__text');
                city.value = res.geoObjects.get(0).properties.get("description");
                street.value = res.geoObjects.get(0).properties.get("name").split(",").splice(0, 1).join(",");
                home.value = res.geoObjects.get(0).properties.get("name").split(",").splice(1, 1).join(",");
                bollon.classList.add('active');
                text.textContent = res.geoObjects.get(0).properties.get("text");
                filled();
            });
        }
    })
}

/** * @description Пример валидации для формы заказа */

function cartFormValidate() {
    let form = document.getElementById('ordering_form');
    $(form).parsley().on('form:success', () => {
        event.preventDefault();
        // Для примера в вёрстке идёт переход на страницу созданного заказа при успешной валидации
        location.href = '/ordering_success.html';
    });
}


window.addEventListener('resize', () => {
    checkCartSize();
    stickyCart();
})
document.addEventListener('DOMContentLoaded', () => {
    ymaps.ready(Mapinit);
    cartFormValidate();
    stickyCart();
})

document.addEventListener('scroll', () => {
    stickyCart();
})

/** * @description Drop down заказа */
const openlOrderLk = {
    btn1: document.querySelectorAll(".info-lk__top"),
    btn2: document.querySelectorAll(".status-lk__top"),
    order: document.querySelectorAll(".info-lk__show"),
    status: document.querySelectorAll(".status-lk__show"),
    init: () => {
        for (let i = 0; i < openlOrderLk.btn1.length; i++) {
            openlOrderLk.btn1[i].addEventListener("click", function () {
                openlOrderLk.btn2[i].querySelector(".status-lk__arr").classList.toggle("active");
                openlOrderLk.order[i].classList.toggle("active");
                openlOrderLk.status[i].classList.toggle("active");
            });
            openlOrderLk.btn2[i].addEventListener("click", function () {
                openlOrderLk.btn2[i].querySelector(".status-lk__arr").classList.toggle("active");
                openlOrderLk.order[i].classList.toggle("active");
                openlOrderLk.status[i].classList.toggle("active");
            });
        }
    },
};

/** * @description Копирование промокода */
const promocod = {
    btn: document.querySelectorAll(".promo-lk__btn .btn"),
    cod: document.querySelectorAll(".promo-lk__cod"),
    init: () => {
        if (promocod.btn) {
            for (let i = 0; i < promocod.btn.length; i++) {
                promocod.btn[i].addEventListener("click", function () {
                    window.navigator.clipboard.writeText(promocod.cod[i].textContent);
                });
            }
        }
    },
};

/** * @description Инициализация и уничтожение карты при нажатии на кнопку. */
function Mapinit() {
    $("#btn-map-lk").bind({
        click: function () {
            $("#modal-map").html("");
            $("#modal-bollon").removeClass("active");
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

            // Слушаем клик на карте.
            myMapL.events.add("click", function (e) {
                var coords = e.get("coords");

                // Если метка уже создана – просто передвигаем ее.
                if (myPlacemark) {
                    myPlacemark.geometry.setCoordinates(coords);
                }
                // Если нет – создаем.
                else {
                    myPlacemark = createPlacemark(coords);
                    myMapL.geoObjects.add(myPlacemark);
                    // Слушаем событие окончания перетаскивания на метке.
                    myPlacemark.events.add("dragend", function () {
                        getAddress(myPlacemark.geometry.getCoordinates());
                    });
                }
                getAddress(coords);
            });

            // Создание метки.
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

            // Определяем адрес по координатам (обратное геокодирование).
            function getAddress(coords) {
                myPlacemark.properties.set("iconCaption", "поиск...");
                ymaps.geocode(coords).then(function (res) {
                    $("#city-lk").val(res.geoObjects.get(0).properties.get("description"));
                    $("#street-lk").val(res.geoObjects.get(0).properties.get("name").split(",").splice(0, 1).join(","));
                    $("#kv-lk").val(res.geoObjects.get(0).properties.get("name").split(",").splice(1, 1).join(","));
                    $("#modal-bollon").addClass("active");
                    $(".modal-bollon__text").html(res.geoObjects.get(0).properties.get("text"));
                });
            }
        },
    });
}

document.addEventListener("DOMContentLoaded", () => {
    openlOrderLk.init();
    promocod.init();
    // Как только будет загружен API и готов DOM, выполняем инициализацию
    ymaps.ready(Mapinit);
});

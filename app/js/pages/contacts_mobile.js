/**
 * @description Карта в контактах
 * @param {string} id - ID блока для карты.
 * @param {string} coords - Координаты точки.
 * @param {boolean} route -  Нужно ли прокладывать маршрут
 * */

function contactsMap(id, coords, route = false) {
    ymaps.ready(function () {
        var myMap = new ymaps.Map(id, {
                center: coords,
                zoom: 16
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

function doRoute() {
    let coords = window.routeMap.getCenter();
    window.open('https://yandex.ru/maps/?rtext=~' + coords[0] + ',' + coords[1] + '&rtt=mt&ll=' + coords[1] + ',' + coords[0] + '', '_blank');
}


let contactsSlider = {
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
            markup(true)
        });
    },
    globSlider: [],
    init: (block) => {
        let id = block.querySelector('.contacts--section-tab').dataset.block,
            slider = block.querySelector(".contacts--section-photos");
        if (slider) {
            contactsSlider.globSlider[id] = new sliderGlob.mainKeen(
                slider,
                {
                    loop: true,
                    dragSpeed: 1.5,
                    duration: 500,
                    offset: false,
                    selector: ".contacts--section-photo",
                    slides: {
                        perView: 3.6,
                        spacing: 8,
                    },
                    breakpoints: {
                        '(max-width: 989px)': {
                            slides: {
                                perView: 'auto',
                                spacing: 8,
                            },
                        },
                    },
                    mode: "snap",
                    rubberband: false,
                },

                [contactsSlider.navigation]
            );
        }
    },
};

function toggleBlocks(block) {
    let data = block.dataset.block;
    block.parentNode.classList.toggle('active');
    if (contactsSlider.globSlider[data] && !block.parentNode.classList.contains('active')) {
        contactsSlider.globSlider[data].destroy();
    } else {
        contactsSlider.init(block.parentNode);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let active = document.querySelector('.contacts--section-wrap.active');
    contactsSlider.init(active);
})
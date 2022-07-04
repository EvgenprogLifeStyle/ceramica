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

function anchors() {
    const anchors = document.querySelectorAll('.contacts--page-top a');

    for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            let href = this.getAttribute('href').substring(1);

            const scrollTarget = document.getElementById(href);

            const topOffset = document.querySelector('.header').offsetHeight;
            const elementPosition = scrollTarget.getBoundingClientRect().top;
            const offsetPosition = elementPosition - topOffset;

            window.scroll({
                top: offsetPosition,
                left: 0,
                behavior: "smooth",
            });
        });
    }
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
    globSliders: [],
    init: () => {
        let slider = document.querySelectorAll(".contacts--section-photos");

        if (slider.length) {
            for (let i = 0; i < slider.length; i++) {
                contactsSlider.globSliders[i] = new sliderGlob.mainKeen(
                    slider[i],
                    {
                        loop: true,
                        dragSpeed: 1.5,
                        duration: 500,
                        offset: false,
                        selector: ".contacts--section-photo",
                        slides: {
                            perView: 3.2,
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
            if (window.innerWidth < 1024) {
                destroySliders()
            }
        }
    },
    single: (block) => {
        let id = block.querySelector('.contacts--section-tab').dataset.block,
            slider = block.querySelector(".contacts--section-photos");
        if (slider) {
            contactsSlider.globSliders[id] = new sliderGlob.mainKeen(
                slider,
                {
                    loop: true,
                    dragSpeed: 1.5,
                    duration: 500,
                    offset: false,
                    selector: ".contacts--section-photo",
                    slides: {
                        perView: 3.2,
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

function destroySliders() {
    let blocks = document.querySelectorAll('.contacts--section-wrap:not(.active)');
    if (blocks.length) {
        blocks.forEach(el => {
            let data = el.querySelector('.contacts--section-tab').dataset.block,
                slider = el.querySelector('.contacts--section-photos.init');
            if (slider) {
                contactsSlider.globSliders[data].destroy();
                contactsSlider.globSliders[data] = false;
            }
        })
    }

}

function toggleBlocks(block) {
    let data = block.dataset.block;
    block.parentNode.classList.toggle('active');
    if (contactsSlider.globSliders[data] && !block.parentNode.classList.contains('active')) {
        contactsSlider.globSliders[data].destroy();
        contactsSlider.globSliders[data] = false;
    } else {
        let wrap = block.parentNode;
        if (wrap.classList.contains('active') && !contactsSlider.globSliders[data]) {
            if (wrap.querySelector('.contacts--section-photos')) {
                contactsSlider.single(wrap);
            }
        }
    }
}

window.contacts = false;
document.addEventListener('DOMContentLoaded', () => {
    anchors();
    if (window.innerWidth < 1280) {
        window.contacts = true;
        contactsSlider.init();
    }
})
window.addEventListener('resize', () => {
    let w = window.innerWidth;
    if (w < 1280 && !window.contacts) {
        window.contacts = true;
        contactsSlider.init();
    } else if (w >= 1280 && window.contacts) {
        window.contacts = false;
        contactsSlider.globSliders.forEach(el => {
            el.destroy();
        })
    }
    if (window.innerWidth < 1024) {
        destroySliders()
    }
    if (window.innerWidth > 1023 && window.innerWidth < 1280) {
        let blocks = document.querySelectorAll('.contacts--section-photos:not(.init)');
        if (blocks.length) {
            blocks.forEach(el => {
                contactsSlider.single(getClosest(el, 'contacts--section-wrap'));
            })
        }
    }
});
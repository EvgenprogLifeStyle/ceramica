/** * @description Основной слайдер на главной */

let mainSlider = {
    slider: document.getElementById("main_slider"),
    firstLoad: true,
    main: '',
    subWrapper: document.querySelector(".main--slider-sub "),
    subSlides: document.querySelectorAll(".main--slider-subBlock"),
    changeSlider: (mobile) => {
        if (mobile) {
            mainSlider.subSlides.forEach((el) => {
                el.classList.add("main--slide", "sub--slide");
                el.classList.remove("main--slider-subBlock");
                mainSlider.slider.append(el);
            });
        } else {
            let slides = document.querySelectorAll(".sub--slide");
            slides.forEach((el) => {
                el.classList.remove("main--slide");
                el.classList.add("main--slider-subBlock");
                el.removeAttribute("style");
                mainSlider.subWrapper.append(el);
            });
        }
    },
    navigation: (slider) => {
        let wrapper, dots, arrowLeft, arrowRight;
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                slider.update();
            });
        });
        const config = {childList: true};

        function markup(remove) {
            wrapperMarkup(remove);
            dotMarkup(remove);
            arrowMarkup(remove);
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

        function arrowMarkup(remove) {
            if (remove) {
                mainSlider.firstLoad = false;
                // removeElement(arrowLeft)
                // removeElement(arrowRight)
                return;
            }
            if (mainSlider.firstLoad) {
                arrowLeft = document.querySelector(".main--slider-left");
                arrowLeft.addEventListener("click", () => slider.prev());
                arrowRight = document.querySelector(".main--slider-right");
                arrowRight.addEventListener("click", () => slider.next());

                wrapper.appendChild(arrowLeft);
                wrapper.appendChild(arrowRight);
            }
        }

        function wrapperMarkup(remove) {
            if (remove) {
                var parent = wrapper.parentNode;
                while (wrapper.firstChild) parent.insertBefore(wrapper.firstChild, wrapper);
                removeElement(wrapper);
                return;
            }
            wrapper = createDiv("navigation-wrapper");
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
            observer.observe(slider.container, config);
        });
        slider.on("optionsChanged", (ev) => {
            markup(true);
            markup();
            updateClasses();
        });
        slider.on("slideChanged", () => {
            updateClasses();
        });
        slider.on("destroyed", () => {
            markup(true);
            observer.disconnect();
        });
    },
    MutationPlugin: (slider) => {
    },
    init: () => {
        if (mainSlider.slider) {
            mainSlider.main = new sliderGlob.mainKeen(
                mainSlider.slider,
                {
                    loop: true,
                    dragSpeed: 1.5,
                    duration: 500,
                    offset: false,
                    selector: ".msb",
                    slides: {
                        perView: 1,
                        spacing: 0,
                    },
                    breakpoints: {
                        "(max-width: 1279px)": {
                            slides: {
                                perView: 'auto',
                                spacing: 5,
                            },
                        },
                    },
                    mode: "snap",
                    rubberband: false,
                },
                [mainSlider.navigation]
            );
        }
    },
};

/** * @description Видео на главной странице */

window.scriptLoad = false;

function playVideo(videoID, blockID) {
    if (!window.scriptLoad) {
        var tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        window.scriptLoad = true;
    }
    let item = document.getElementById(blockID);

    var player;
    window.onYouTubeIframeAPIReady = () => {
        player = new YT.Player(item, {
            height: "100%",
            width: "100%",
            videoId: videoID,
            playerVars: {
                autoplay: 0,
                controls: 0,
                showinfo: 0,
                disablekb: 0,
                enablejsapi: 1,
                customControls: true,
                iv_load_policy: 3,
                modestbranding: 1,
                rel: 0,
                frameborder: 0,
                loop: 0,
            },
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange,
            },
        });
    };

    function onPlayerReady(event) {
        let btn = siblingEl(event.target.h, 'youtube--play');
        btn.addEventListener('click', () => {
            event.target.playVideo();
        })
    }


    function onPlayerStateChange(event) {
        let btn = siblingEl(event.target.h, 'youtube--play'),
            poster = siblingEl(event.target.h, 'youtube--poster');
        if (event.data == YT.PlayerState.PLAYING) {
            btn.classList.add('hide');
            poster.classList.add('hide');
        } else if (event.data == YT.PlayerState.PAUSED) {
            btn.classList.remove('hide');
        }
    }

    function stopVideo() {
        player.stopVideo();
    }
}

window.subSlider = false;
window.addEventListener("resize", () => {
    if (window.innerWidth < 1280 && !window.subSlider) {
        window.subSlider = true;
        mainSlider.changeSlider(true);
    } else if (window.innerWidth >= 1280 && window.subSlider) {
        window.subSlider = false;
        mainSlider.changeSlider(false);
    }
});
document.addEventListener("DOMContentLoaded", () => {
    if (window.innerWidth < 1280) {
        window.subSlider = true;
        mainSlider.changeSlider(true);
    }
    mainSlider.init();
    relatedSliderTabs.init();
});

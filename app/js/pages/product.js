/** * @description Смена изображений на превью карточки */

function productPhotoInit() {
    function removeActive(el) {
        siblingsEl(el).forEach((block) => {
            block.classList.remove("active");
        });
    }
    function changeImage(mainImage, slide) {
        mainImage.setAttribute("style", "background-image: url(" + slide.dataset.image + ")");
        slide.classList.add("active");
        removeActive(slide);
    }

    let wrap = document.querySelectorAll(".products--image");
    wrap.forEach((el) => {
        let photos = el.querySelector(".products--image-slider:not(.init)");
        if (photos) {
            let mainImage = el.querySelector(".product--image-main"),
                count = photos.children.length;
            photos.classList.add("init");
            Array.from(photos.children).forEach((slide) => {
                slide.style.width = 100 / count + "%";
                slide.addEventListener("mouseenter", () => {
                    changeImage(mainImage, slide);
                });
            });
        }
    });
}

function productSizeInit(notTabs = false) {
    let blocks;
    if (!notTabs) {
        blocks = document.querySelectorAll(".products--block-wrap:not(.nt)");
    } else {
        blocks = document.querySelectorAll(".nt");
    }
    setTimeout(function (e) {
        if (blocks.length) {
            blocks.forEach((block, tIndex) => {
                let elements = block.querySelectorAll(".products--block"),
                    elClass = "props-" + tIndex + "",
                    titleHeight = [];
                elements.forEach((el, index) => {
                    let productsMainH,
                        productsMain = el.querySelector(".products--main");
                    productsMain.removeAttribute("style");
                    productsMainH = productsMain.clientHeight;
                    if (productsMainH > 0) {
                        productsMain.classList.add(elClass);
                        productsMain.classList.remove("inactive");
                    } else {
                        productsMain.classList.add("inactive");
                    }
                    if (titleHeight.indexOf(productsMainH) === -1) {
                        titleHeight.push(productsMainH);
                    }
                });
                let maxHeight = getMaxOfArray(titleHeight);
                document.querySelectorAll("." + elClass).forEach((el) => {
                    el.setAttribute("style", "min-height: " + maxHeight + "px");

                    if (!el.classList.contains("inactive")) {
                        el.classList.add("active");
                    } else {
                        el.classList.remove("active");
                    }
                });
            });
        }
    }, 150);
}
function solutiontSizeInit() {
    let blocks = document.querySelectorAll(".catalog__products");

    setTimeout(function (e) {
        if (blocks.length) {
            blocks.forEach((block, tIndex) => {
                let elements = block.querySelectorAll(".card-solution"),
                    elClass = "propsss-" + tIndex + "",
                    titleHeight = [];
                elements.forEach((el, index) => {
                    let productsMainH,
                        productsMain = el.querySelector(".card-solution__body");
                    productsMain.removeAttribute("style");
                    productsMainH = productsMain.clientHeight;
                    if (productsMainH > 0) {
                        productsMain.classList.add(elClass);
                        productsMain.classList.remove("inactive");
                    } else {
                        productsMain.classList.add("inactive");
                    }
                    if (titleHeight.indexOf(productsMainH) === -1) {
                        titleHeight.push(productsMainH);
                    }
                });
                let maxHeight = getMaxOfArray(titleHeight);
                document.querySelectorAll("." + elClass).forEach((el) => {
                    el.setAttribute("style", "min-height: " + maxHeight + "px");

                    if (!el.classList.contains("inactive")) {
                        el.classList.add("active");
                    } else {
                        el.classList.remove("active");
                    }
                });
            });
        }
    }, 150);
}

function similarSizeInit() {
    let blocks = document.querySelectorAll(".articl--similar");

    setTimeout(function (e) {
        if (blocks.length) {
            blocks.forEach((block, tIndex) => {
                let elements = block.querySelectorAll(".articl--similar__card"),
                    elClass = "propsss-" + tIndex + "",
                    titleHeight = [];
                elements.forEach((el, index) => {
                    let productsMainH,
                        productsMain = el.querySelector(".articl--similar__body");
                    productsMain.removeAttribute("style");
                    productsMainH = productsMain.clientHeight;
                    if (productsMainH > 0) {
                        productsMain.classList.add(elClass);
                        productsMain.classList.remove("inactive");
                    } else {
                        productsMain.classList.add("inactive");
                    }
                    if (titleHeight.indexOf(productsMainH) === -1) {
                        titleHeight.push(productsMainH);
                    }
                });
                let maxHeight = getMaxOfArray(titleHeight);
                document.querySelectorAll("." + elClass).forEach((el) => {
                    el.setAttribute("style", "min-height: " + maxHeight + "px");

                    if (!el.classList.contains("inactive")) {
                        el.classList.add("active");
                    } else {
                        el.classList.remove("active");
                    }
                });
            });
        }
    }, 150);
}

function solutiontTopSizeInit() {
    let blocks = document.querySelectorAll(".catalog__products");

    setTimeout(function (e) {
        if (blocks.length) {
            blocks.forEach((block, tIndex) => {
                let elements = block.querySelectorAll(".card-solution"),
                    elClass = "propss-" + tIndex + "",
                    titleHeight = [];
                elements.forEach((el, index) => {
                    let productsMainH,
                        productsMain = el.querySelector(".card-solution__top");
                    productsMain.removeAttribute("style");
                    productsMainH = productsMain.clientHeight;
                    if (productsMainH > 0) {
                        productsMain.classList.add(elClass);
                        productsMain.classList.remove("inactive");
                    } else {
                        productsMain.classList.add("inactive");
                    }
                    if (titleHeight.indexOf(productsMainH) === -1) {
                        titleHeight.push(productsMainH);
                    }
                });
                let maxHeight = getMaxOfArray(titleHeight);
                document.querySelectorAll("." + elClass).forEach((el) => {
                    el.setAttribute("style", "min-height: " + maxHeight + "px");

                    if (!el.classList.contains("inactive")) {
                        el.classList.add("active");
                    } else {
                        el.classList.remove("active");
                    }
                });
            });
        }
    }, 150);
}
document.addEventListener("DOMContentLoaded", () => {
    productPhotoInit();
    productSizeInit();
    solutiontSizeInit();
    similarSizeInit();
    solutiontTopSizeInit();
});

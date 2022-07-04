/** Кастомный select */
let selectCastom = document.querySelectorAll(".select");
let selectCastomBody = document.querySelectorAll(".new-select");
let selectCastomList = document.querySelectorAll(".new-select__body");

if (selectCastom) {
    for (let i = 0; i < selectCastom.length; i++) {
        let listItem = selectCastomList[i].querySelectorAll(".new-select__item");
        let inputItem = selectCastomBody[i].querySelector(".new-select__input");
        for (let j = 0; j < listItem.length; j++) {
            if (selectCastom.value) {
                selectCastomBody[i].querySelector(".new-select__input").innerHTML = listItem[0].dataset.value;
                selectCastom[i].value = listItem[0].dataset.value;
            }

            listItem[j].addEventListener("click", function () {
                listItem.forEach((el) => {
                    el.classList.remove("active");
                });
                if (selectCastomBody[i].classList.contains('custom')) {
                    selectCastomBody[i].querySelector(".new-select__input").innerHTML = listItem[j].innerHTML;
                } else {
                    selectCastomBody[i].querySelector(".new-select__input").innerHTML = this.dataset.value;
                }

                selectCastom[i].value = this.dataset.value;

                listItem[j].classList.add("active");
            });
        }
        inputItem.addEventListener("click", function () {
            if (selectCastomBody[i].classList.contains("in")) {
                selectCastomBody.forEach((el) => {
                    el.classList.remove("in");
                });
            } else {
                selectCastomBody.forEach((el) => {
                    el.classList.remove("in");
                });
                selectCastomBody[i].classList.add("in");
            }
        });
    }
}

/** Подключение кастомных scroll */
function scrollFilter() {
    if (document.querySelector(".filter")) {
        new SimpleBar(document.querySelector(".filter"), {
            autoHide: false,
        });
    }
    let select = document.querySelectorAll(".new-select__list");
    if (select) {
        for (let i = 0; i < select.length; i++) {
            new SimpleBar(select[i], {
                autoHide: false,
            });
        }
    }
}

/** Авто ширина input + quaintity */
function widthAutoInput() {
    let input = document.querySelector(".input-auto"),
        buffer = [];

    if (input) {
        let pack = document.querySelectorAll(".quantity-order .quantity-order__item input");

        for (let i = 0; i < pack.length; i++) {
            pack[i].addEventListener("click", function () {
                document.querySelector(".order-ct__quantity .quantity__value span").innerHTML = pack[i].value;
            });
        }

        buffer = document.createElement("div");
        buffer.className = "buffer";
        //вставляем скрытый div.buffer
        input.parentNode.insertBefore(buffer, input.nextSibling);

        input.nextElementSibling.innerHTML = input.value;
        input.style.width = input.nextElementSibling.clientWidth + "px";

        input.oninput = function () {
            if (!this.value) {
                this.value = 1;
                this.style.width = "9.5px";
            } else {
                if (this.value[0] == 0) {
                    this.value = this.value.substr(1);
                }
                this.nextElementSibling.innerHTML = this.value;
                this.style.width = this.nextElementSibling.clientWidth + "px";
            }
        };

        let quantityButtons = document.querySelectorAll(".quantity__control");

        for (let index = 0; index < quantityButtons.length; index++) {
            const quantityButton = quantityButtons[index];
            quantityButton.addEventListener("click", function (e) {
                let val = parseInt(quantityButton.closest(".quantity").querySelector("input").value);
                if (quantityButton.classList.contains("quantity__control_plus")) {
                    val++;
                } else {
                    val = val - 1;
                    if (val < 1) {
                        val = 1;
                    }
                }

                quantityButton.closest(".quantity").querySelector("input").value = val;

                input.nextElementSibling.innerHTML = input.value;
                input.style.width = input.nextElementSibling.clientWidth + "px";
            });
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    scrollFilter();
    widthAutoInput();
});

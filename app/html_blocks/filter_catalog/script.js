document.addEventListener("DOMContentLoaded", () => {
    /** Drobdown на форме фильтра */
    let dropBtnFilter = document.querySelectorAll(".dropBtn-filter");
    let drobBodyFilter = document.querySelectorAll(".dropBody-filter");
    let allBodyFilter = document.querySelectorAll(".dropAll-filter");
    if (dropBtnFilter) {
        for (let i = 0; i < dropBtnFilter.length; i++) {
            if (dropBtnFilter[i]) {
                let maxShowLi = 8; // Количество отображаемых элементов

                let countLi = drobBodyFilter[i].querySelectorAll("li");
                for (let j = 0; j < countLi.length; j++) {
                    if (maxShowLi <= j) {
                        countLi[j].classList.add("show");
                    }
                    if (countLi.length < 9) allBodyFilter[i].style.display = "none";
                }

                allBodyFilter[i].addEventListener("click", function () {
                    if (this.classList.contains("_active")) {
                        this.querySelector("span").textContent = "Показать еще";
                        for (let j = 0; j < countLi.length; j++) {
                            if (maxShowLi < j) {
                                countLi[j].classList.add("show");
                            }
                        }
                        this.classList.remove("_active");
                    } else {
                        this.querySelector("span").textContent = "Скрыть";
                        countLi.forEach((el) => {
                            el.classList.remove("show");
                        });
                        this.classList.add("_active");
                    }
                });
            }
            dropBtnFilter[i].addEventListener("click", function () {
                allBodyFilter[i].classList.toggle("_active");
                drobBodyFilter[i].classList.toggle("_active");
            });
        }
    }

    /** Открытие формы фильтра */
    let btnOpenFilter = document.getElementById("filter-btn");
    let filterBody = document.getElementById("filter");
    if (btnOpenFilter) {
        btnOpenFilter.addEventListener("click", () => {
            filterBody.classList.add("active");
            document.body.classList.add("_lock");

            let element = document.createElement("div");
            element.className = "show-filter";
            document.body.appendChild(element);
        });
    }

    /** Скрол шапки фильтра */
    let filterHeader = document.querySelector(".filter__top");

    if (filterHeader) {
        let filterBody = document.querySelector(".filter");
        filterBody.addEventListener("scroll", function () {
            if (filterBody.scrollTop > 10) {
                filterHeader.classList.add("shadow");
            } else {
                filterHeader.classList.remove("shadow");
            }
        });
    }
});

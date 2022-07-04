/** * @description Управление dropdown на странице Каталог(общая)*/
const dropCatalogAll = {
    btn: document.querySelectorAll(".drop"),
    body: document.querySelectorAll(".drop-body"),
    init: () => {
        if (dropCatalogAll.btn) {
            if (window.innerWidth > 1023) {
                for (let i = 0; i < dropCatalogAll.body.length; i++) {
                    let itemLi = dropCatalogAll.body[i].querySelectorAll("li");
                    let num = dropCatalogAll.body[i].dataset.li - 1;
                    let count = +dropCatalogAll.body[i].dataset.li;
                    if (itemLi.length <= count) dropCatalogAll.btn[i].querySelector(".cart-all__all").style.display = "none";

                    for (let j = 0; j < itemLi.length; j++) {
                        if (j > num) itemLi[j].classList.add("show");
                    }

                    dropCatalogAll.btn[i].querySelector(".cart-all__all").addEventListener("click", function () {
                        let itemLi = dropCatalogAll.body[i].querySelectorAll("li");
                        if (!this.classList.contains("open")) {
                            this.textContent = "Скрыть";
                            for (let j = 0; j < itemLi.length; j++) {
                                itemLi[j].classList.remove("show");
                            }
                        } else {
                            this.textContent = "Показать еще";
                            for (let j = 0; j < itemLi.length; j++) {
                                if (j > num) itemLi[j].classList.add("show");
                            }
                        }
                        this.classList.toggle("open");
                    });
                }
            } else {
                for (let i = 0; i < dropCatalogAll.body.length; i++) {
                    dropCatalogAll.btn[i].addEventListener("click", function () {
                        dropCatalogAll.body[i].classList.toggle("open");
                        this.querySelector(".cart-all__all").classList.toggle("open");
                    });
                }
            }
        }
    },
};
dropCatalogAll.init();

// /** Drobdown на форме фильтра */
// let dropBtnFilter = document.querySelectorAll(".dropBtn-filter");
// let drobBodyFilter = document.querySelectorAll(".dropBody-filter");
// let allBodyFilter = document.querySelectorAll(".dropAll-filter");
// if (dropBtnFilter) {
//     for (let i = 0; i < dropBtnFilter.length; i++) {
//         if (dropBtnFilter[i].dataset.li) {
//             let maxShowLi = +dropBtnFilter[i].dataset.li; // Количество отображаемых элементов

//             let countLi = drobBodyFilter[i].querySelectorAll("li");
//             for (let j = 0; j < countLi.length; j++) {
//                 if (maxShowLi <= j) {
//                     countLi[j].classList.add("show");
//                 }
//                 if (countLi.length < maxShowLi) allBodyFilter[i].style.display = "none";
//             }

//             allBodyFilter[i].addEventListener("click", function () {
//                 if (this.classList.contains("_active")) {
//                     this.querySelector("span").textContent = "Показать еще";
//                     for (let j = 0; j < countLi.length; j++) {
//                         if (maxShowLi < j) {
//                             countLi[j].classList.add("show");
//                         }
//                     }
//                     this.classList.remove("_active");
//                 } else {
//                     this.querySelector("span").textContent = "Скрыть";
//                     countLi.forEach((el) => {
//                         el.classList.remove("show");
//                     });
//                     this.classList.add("_active");
//                 }
//             });
//         }
//         dropBtnFilter[i].addEventListener("click", function () {
//             this.classList.toggle("_active");
//             drobBodyFilter[i].classList.toggle("_active");
//         });
//     }
// }

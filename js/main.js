import { fruits } from "./mock.js";

function renderElements() {
  const fruitsList = document.getElementById("list");
  fruits.forEach((item) => {
    const child = document.createElement("div");
    child.innerHTML += `
    <div class="main__list-item" id=${item.id}>
        <div class="item__img">
            <img src=${item.img} alt="" />
        </div>
        <div class="item__text1">${item.name}</div>
        <div class="item__text2">${item.description}</div>
        <div class="item__price">${item.price} руб.</div
        <<div class="item__btn">
        <button class="item__btn-add" id="add-${item.id}">+</button>
        <button class="item__btn-delete" id="delete-${item.id}">-</button>
        <button class="item__btn-basket" id="basket-${item.id}">В корзину</button>
        <div class="fruits__count" id="count-${item.id}">0</div>
        </div>
    </div>`;
    fruitsList.appendChild(child);
  });
}
renderElements();

document.querySelector("#list").addEventListener("click", (e) => {
  const handleClick = e.target.closest(".item__btn-add, .item__btn-delete");
  if (!handleClick) return;
  const counts = handleClick
    .closest(".main__list-item")
    .querySelector(".fruits__count");
  let v = handleClick.classList.contains("item__btn-add") ? 1 : -1;
  v = +counts.textContent + v;
  if (v > -1) counts.textContent = v;
});

/*===========================*/

// устанавливаем триггер для модального окна (название можно изменить)
const modalTrigger = document.getElementsByClassName("trigger")[0];

// получаем ширину отображенного содержимого и толщину ползунка прокрутки
const windowInnerWidth = document.documentElement.clientWidth;
const scrollbarWidth =
  parseInt(window.innerWidth) - parseInt(document.documentElement.clientWidth);

// привязываем необходимые элементы
const bodyElementHTML = document.getElementsByTagName("body")[0];
const modalBackground = document.getElementsByClassName("modalBackground")[0];
const modalClose = document.getElementsByClassName("modalClose")[0];
const modalActive = document.getElementsByClassName("modalActive")[0];

// функция для корректировки положения body при появлении ползунка прокрутки
function bodyMargin() {
  bodyElementHTML.style.marginRight = "-" + scrollbarWidth + "px";
}

// при длинной странице - корректируем сразу
bodyMargin();

// событие нажатия на триггер открытия модального окна
const rega = document.querySelector(".registration");
rega.addEventListener("click", function () {
  // делаем модальное окно видимым
  modalBackground.style.display = "block";

  // если размер экрана больше 1366 пикселей (т.е. на мониторе может появиться ползунок)
  if (windowInnerWidth >= 1366) {
    bodyMargin();
  }

  // позиционируем наше окно по середине, где 175 - половина ширины модального окна
  modalActive.style.left = "calc(50% - " + (175 - scrollbarWidth / 2) + "px)";
});

// нажатие на крестик закрытия модального окна
modalClose.addEventListener("click", function () {
  modalBackground.style.display = "none";
  if (windowInnerWidth >= 1366) {
    bodyMargin();
  }
});

// закрытие модального окна на зону вне окна, т.е. на фон
modalBackground.addEventListener("click", function (event) {
  if (event.target === modalBackground) {
    modalBackground.style.display = "none";
    if (windowInnerWidth >= 1366) {
      bodyMargin();
    }
  }
});

import { $g } from "../Modules/helpers.js";

let row = $g(".row");
let url =
    "https://raw.githubusercontent.com/win50117/FileStorage/master/Pizza.json";
let pizzaObject;

// Card製作
function setCard() {
    let card = $g("#cardPizza");
    for (let i = 0; i < pizzaObject.products.length; i++) {
        let cloneContent = card.content.cloneNode(true);
        cloneContent.querySelector("h5.card-title").innerText =
            pizzaObject.products[i].name;
        cloneContent.querySelector("h5.card-eng-title").innerText =
            pizzaObject.products[i].engname;
        cloneContent.querySelector("img").src = pizzaObject.products[i].picture;
        cloneContent
            .querySelector(".btn")
            .addEventListener("click", function () {
                this.setAttribute("data-toggle", "modal");
                this.setAttribute("data-target", "#exampleModal");
                let modal = $g("#exampleModal");
                modal.querySelector("h5").innerText =
                    pizzaObject.products[i].name;
                modal.querySelector("#pizzaImage").src =
                    pizzaObject.products[i].picture;
                modal.querySelector("#description").innerText =
                    pizzaObject.products[i].name;
            });
        row.append(cloneContent);
    }
}
window.onload = function () {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        pizzaObject = JSON.parse(this.responseText);
        // console.log(pizzaObject);
        setCard();
    };
    xhr.open("GET", url);
    xhr.send();
};

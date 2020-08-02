import { $g } from "../Modules/helpers.js";

let row = $g(".row");
let url =
    "https://raw.githubusercontent.com/win50117/FileStorage/master/Pizza.json";
let pizzaObject;

// Card製作
function setCard() {
    let card = $g("#cardPizza");
    for (let i = 0; i < pizzaObject.products.length; i++) {
        let foodary = pizzaObject.products[i].food;

        let cloneContent = card.content.cloneNode(true);
        cloneContent.querySelector("h5.card-title").innerText =
            pizzaObject.products[i].name;
        cloneContent.querySelector("h5.card-eng-title").innerText =
            pizzaObject.products[i].engname;

        for (let item of foodary) {
            cloneContent.querySelector(".food").innerHTML +=
                item == "pig"
                    ? '<i class="fas fa-piggy-bank"></i>'
                    : item == "chicken"
                    ? '<i class="fas fa-drumstick-bite"></i>'
                    : item == "fish"
                    ? '<i class="fas fa-fish"></i>'
                    : item == "vegetables"
                    ? '<i class="fas fa-seedling"></i>'
                    : item == "smhot"
                    ? '<i class="fas fa-pepper-hot"></i>'
                    : item == "mdhot"
                    ? '<i class="fas fa-pepper-hot"></i><i class="fas fa-pepper-hot"></i>'
                    : item;
        }

        cloneContent.querySelector(".price").innerHTML +=
            `<span class="word">L</span><span class="pizzaprice">$${pizzaObject.products[i].lprice}</span>` +
            `${
                pizzaObject.products[i].sprice != 0
                    ? `<span class="word">S</span><span class="pizzaprice">$${pizzaObject.products[i].sprice}</span>`
                    : ""
            }`;

        cloneContent.querySelector("img").src = pizzaObject.products[i].picture;
        cloneContent
            .querySelector(".btn")
            .addEventListener("click", function () {
                this.setAttribute("data-toggle", "modal");
                this.setAttribute("data-target", "#exampleModal");
                let modal = $g("#exampleModal");
                modal.querySelector("h4.modal-title").innerText =
                    pizzaObject.products[i].name;
                modal.querySelector("h5.modal-engtitle").innerText =
                    pizzaObject.products[i].engname;
                modal.querySelector("#pizzaImage").src =
                    pizzaObject.products[i].picture;
                modal.querySelector("#description").innerText =
                    pizzaObject.products[i].Description;
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

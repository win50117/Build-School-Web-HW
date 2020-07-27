import { $g } from "../Modules/helpers.js";

let pizzaProducts = {
    products: [
        {
            name: "炭火肉食披薩",
            picture:
                "https://www.0800076666.com.tw/Files/MenuPizza/62/%E7%82%AD%E7%81%AB%E8%82%89%E9%A3%9F.png",
        },
        {
            name: "美式嗆司臘腸披薩",
            picture:
                "https://www.0800076666.com.tw/Files/MenuPizza/26/%E7%BE%8E%E5%BC%8F%E5%97%86%E5%8F%B8%E8%87%98%E8%85%B8.png",
        },
        {
            name: "龍蝦沙拉披薩",
            picture:
                "https://www.0800076666.com.tw/Files/MenuPizza/30/%E9%BE%8D%E8%9D%A6%E6%B2%99%E6%8B%89.png",
        },
        {
            name: "總匯披薩",
            picture:
                "https://www.0800076666.com.tw/Files/MenuPizza/31/%E7%B8%BD%E5%8C%AF.png",
        },
        {
            name: "墨西哥嗆辣披薩 ",
            picture:
                "https://www.0800076666.com.tw/Files/MenuPizza/28/%E5%A2%A8%E8%A5%BF%E5%93%A5%E8%BE%A3%E6%A4%92.png",
        },
        {
            name: "西西里燻雞披薩 ",
            picture:
                "https://www.0800076666.com.tw/Files/MenuPizza/32/%E7%87%BB%E9%9B%9E.png",
        },
        {
            name: "海鮮披薩",
            picture:
                "https://www.0800076666.com.tw/Files/MenuPizza/33/%E6%B5%B7%E9%AE%AE.png",
        },
        {
            name: "地中海漁夫披薩",
            picture:
                "https://www.0800076666.com.tw/Files/MenuPizza/64/%E5%9C%B0%E4%B8%AD%E6%B5%B7%E6%BC%81%E5%A4%AB.png",
        },
        {
            name: "夏威夷披薩",
            picture:
                "https://www.0800076666.com.tw/Files/MenuPizza/35/%E5%A4%8F%E5%A8%81%E5%A4%B7.png",
        },
        {
            name: "蔬菜披薩 (奶素) ",
            picture:
                "https://www.0800076666.com.tw/Files/MenuPizza/36/%E8%94%AC%E8%8F%9C.png",
        },
        {
            name: "蘋果肉桂披薩",
            picture:
                "https://www.0800076666.com.tw/Files/MenuPizza/27/%E8%98%8B%E6%9E%9C%E8%82%89%E6%A1%82.png",
        },
        {
            name: "義式海陸豪華披薩",
            picture:
                "https://www.0800076666.com.tw/Files/MenuPizza/37/%E6%B5%B7%E9%99%B8.png",
        },
        {
            name: "洋食黃金脆雞披薩",
            picture:
                "https://www.0800076666.com.tw/Files/MenuPizza/38/%E9%BB%83%E9%87%91%E8%84%86%E9%9B%9E.png",
        },
        {
            name: "波隆那臘腸披薩",
            picture:
                "https://www.0800076666.com.tw/Files/MenuPizza/39/%E6%B3%A2%E9%9A%86%E7%B4%8D.png",
        },
        {
            name: "日式燒肉披薩",
            picture:
                "https://www.0800076666.com.tw/Files/MenuPizza/65/%E7%87%92%E8%82%89.png",
        },
    ],
};

let row = $g(".row");
let url =
    "https://raw.githubusercontent.com/win50117/FileStorage/master/Pizza.json";

// 單個Card製作
window.onload = function () {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        let pizzaObject = JSON.parse(this.responseText);
        console.log(pizzaObject);
    };
    xhr.open("GET", url);
    xhr.send();

    let card = $g("#cardPizza");
    for (let i = 0; i < pizzaProducts.products.length; i++) {
        let cloneContent = card.content.cloneNode(true);
        cloneContent.querySelector("h5").innerText =
            pizzaProducts.products[i].name;
        cloneContent.querySelector("img").src =
            pizzaProducts.products[i].picture;
        cloneContent
            .querySelector(".btn")
            .addEventListener("click", function () {
                this.setAttribute("data-toggle", "modal");
                this.setAttribute("data-target", "#exampleModal");
                let modal = $g("#exampleModal");
                modal.querySelector("h5").innerText =
                    pizzaProducts.products[i].name;
                modal.querySelector("#pizzaImage").src =
                    pizzaProducts.products[i].picture;
                modal.querySelector("#description").innerText =
                    pizzaProducts.products[i].name;
            });
        row.append(cloneContent);
    }
};

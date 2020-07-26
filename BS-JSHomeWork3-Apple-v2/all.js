const Products = {
    iPads: [
        {
            color: "space",
            img: "img/ipad-wifi-select-space-201909_GEO_TW.png",
            spec: [
                {
                    id: "gb32",
                    class: "storage-32",
                    storage: "32GB",
                    network: "wifi",
                    mobiNet: false,
                    price: "$10900",
                },
                {
                    id: "gb128",
                    class: "storage-128",
                    storage: "128GB",
                    network: "wifi",
                    mobiNet: false,
                    price: "$13900",
                },
                {
                    id: "gb32",
                    class: "storage-32",
                    storage: "32GB",
                    network: "mobiNet",
                    mobiNet: true,
                    price: "$15400",
                },
                {
                    id: "gb128",
                    class: "storage-128",
                    storage: "128GB",
                    network: "mobiNet",
                    mobiNet: true,
                    price: "$18400",
                },
            ],
        },
        {
            color: "silver",
            img: "img/ipad-wifi-select-silver-201909_GEO_TW.png",
            spec: [
                {
                    id: "gb32",
                    class: "storage-32",
                    storage: "32GB",
                    network: "wifi",
                    mobiNet: false,
                    price: "$10900",
                },
                {
                    id: "gb128",
                    class: "storage-128",
                    storage: "128GB",
                    network: "wifi",
                    mobiNet: false,
                    price: "$13900",
                },
                {
                    id: "gb32",
                    class: "storage-32",
                    storage: "32GB",
                    network: "mobiNet",
                    mobiNet: true,
                    price: "$15400",
                },
                {
                    id: "gb128",
                    class: "storage-128",
                    storage: "128GB",
                    network: "mobiNet",
                    mobiNet: true,
                    price: "$18400",
                },
            ],
        },
        {
            color: "gold",
            img: "img/ipad-wifi-select-gold-201909_GEO_TW.png",
            spec: [
                {
                    id: "gb32",
                    class: "storage-32",
                    storage: "32GB",
                    network: "wifi",
                    mobiNet: false,
                    price: "$10900",
                },
                {
                    id: "gb128",
                    class: "storage-128",
                    storage: "128GB",
                    network: "wifi",
                    mobiNet: false,
                    price: "$13900",
                },
                {
                    id: "gb32",
                    class: "storage-32",
                    storage: "32GB",
                    network: "mobiNet",
                    mobiNet: true,
                    price: "$15400",
                },
                {
                    id: "gb128",
                    class: "storage-128",
                    storage: "128GB",
                    network: "mobiNet",
                    mobiNet: true,
                    price: "$18400",
                },
            ],
        },
    ],
    iPhone: {
        color: ["white", "black", "green", "yellow", "purple", "red"],
        img: [
            "img/iphone11-white-select-2019.png",
            "img/iphone11-black-select-2019.png",
            "img/iphone11-green-select-2019.png",
            "img/iphone11-yellow-select-2019.png",
            "img/iphone11-purple-select-2019.png",
            "img/iphone11-red-select-2019.png",
        ],
        spec: {
            id: ["gb64", "gb128", "gb256"],
            class: ["storage-64", "storage-128", "storage-256"],
            storage: ["64GB", "128GB", "256GB"],
            price: ["$24900", "$26900", "$30400"],
        },
    },
};

let colorDict = {
    space: "太空灰",
    silver: "銀色",
    gold: "金色",
    white: "白色",
    black: "黑色",
    green: "綠色",
    yellow: "黃色",
    purple: "紫色",
    red: "紅色",
};

let picHtml = "";
let mainPic = document.querySelector(".main-pic");
let sumPrice = document.querySelector(".sum-price");
let btniPads = document.querySelector(".IPads");
let btniPhone = document.querySelector(".IPhone");
let g32Check;
let g128Check;
let wifiCheck;
let g64Check;
let g256Check;
let mobiNetCheck;

function CalcPrice(storage, mobiNetC) {
    console.log(storage.value);
    console.log(mobiNetC);
    for (let item of Products.iPads[0].spec) {
        if (item.mobiNet == mobiNetC && item.storage == storage.value) {
            sumPrice.innerText = item.price;
            return;
        }
    }
}

function getSelect() {
    g32Check = document.querySelector("#gb32");
    g128Check = document.querySelector("#gb128");
    mobiNetCheck = document.querySelector("#mobiNet").checked;
}

function getIphoneSelect() {
    g64Check = document.querySelector("#gb64");
    g128Check = document.querySelector("#gb128");
    g256Check = document.querySelector("#gb256");
}

function changeMainPic(imgSrc) {
    picHtml = `
    <img class="img-fluid w-75" src="${imgSrc}" alt="">
    `;
    mainPic.innerHTML = picHtml;
}

//IPads顏色區塊 插入元素
let colorSelect = document.getElementsByClassName("color-select")[0];
//IPads儲存裝置 插入元素
let storageSelect = document.getElementsByClassName("storage-select")[0];
//IPads連線能力 插入元素
let networkSelect = document.getElementsByClassName("network-select")[0];
//手機沒有連線能力選項 要移除Title
let networkTitle = document.getElementsByClassName("network-title")[0];

function ProductIPads() {
    colorSelect.innerHTML = "";
    storageSelect.innerHTML = "";
    sumPrice.innerText = "";
    networkSelect.style.display = "flex";
    networkTitle.style.display = "block";
    changeMainPic("img/ipad-hero-unselected-201909_GEO_TW.jpg");
    for (let j = 0; j < Products.iPads.length; j++) {
        let div = document.createElement("div");
        let div2 = document.createElement("div");
        let i = document.createElement("i");
        let p = document.createElement("p");
        div.setAttribute("class", "col-6 col-lg-6");
        div2.setAttribute(
            "class",
            `item item-${Products.iPads[j].color} text-center`
        );
        i.setAttribute(
            "class",
            `fas fa-circle fa-3x ${Products.iPads[j].color}`
        );
        p.innerText = `${colorDict[Products.iPads[j].color]}`;
        div2.append(i, p);
        div.appendChild(div2);
        colorSelect.appendChild(div);
    }
    for (let j = 0; j < 2; j++) {
        let div = document.createElement("div");
        let input = document.createElement("input");
        let label = document.createElement("label");
        let p = document.createElement("p");
        div.setAttribute("class", "col-6 col-lg-6");
        input.setAttribute("type", "radio");
        input.setAttribute("name", "storage");
        input.setAttribute("id", `${Products.iPads[0].spec[j].id}`);
        input.setAttribute("value", `${Products.iPads[0].spec[j].storage}`);
        label.setAttribute(
            "class",
            `item ${Products.iPads[0].spec[j].class} text-center`
        );
        label.setAttribute("for", `${Products.iPads[0].spec[j].id}`);
        p.innerText = Products.iPads[0].spec[j].storage;
        label.appendChild(p);
        div.append(input, label);
        storageSelect.append(div);
    }

    document
        .querySelector(".item-space")
        .addEventListener("click", function () {
            changeMainPic(Products.iPads[0].img);
        });

    document
        .querySelector(".item-silver")
        .addEventListener("click", function () {
            changeMainPic(Products.iPads[1].img);
        });

    document.querySelector(".item-gold").addEventListener("click", function () {
        changeMainPic(Products.iPads[2].img);
    });

    document
        .querySelector(".storage-32")
        .addEventListener("click", function () {
            getSelect();
            CalcPrice(g32Check, mobiNetCheck);
        });

    document
        .querySelector(".storage-128")
        .addEventListener("click", function () {
            getSelect();
            CalcPrice(g128Check, mobiNetCheck);
        });

    document.querySelector(".wifi").addEventListener("click", function () {
        getSelect();
        mobiNetCheck = false;
        if (g32Check.checked) {
            CalcPrice(g32Check, mobiNetCheck);
        } else {
            CalcPrice(g128Check, mobiNetCheck);
        }
    });

    document.querySelector(".mobiNet").addEventListener("click", function () {
        getSelect();
        mobiNetCheck = true;
        if (g32Check.checked) {
            CalcPrice(g32Check, mobiNetCheck);
        } else {
            CalcPrice(g128Check, mobiNetCheck);
        }
    });
}
ProductIPads();
btniPads.addEventListener("click", function () {
    ProductIPads();
});

// iPhone 切換
function ProductIPhone() {
    colorSelect.innerHTML = "";
    storageSelect.innerHTML = "";
    sumPrice.innerText = "";
    networkSelect.style.display = "none";
    networkTitle.style.display = "none";
    changeMainPic("img/iphone11-select-2019-family.jpg");

    console.log(Object.keys(Products.iPhone.color[0])[0]);
    for (let j = 0; j < Products.iPhone.color.length; j++) {
        let div = document.createElement("div");
        let div2 = document.createElement("div");
        let i = document.createElement("i");
        let p = document.createElement("p");
        div.setAttribute("class", "col-6 col-lg-6");
        div2.setAttribute(
            "class",
            `item item-${Products.iPhone.color[j]} text-center`
        );
        i.setAttribute(
            "class",
            `fas fa-circle fa-3x ${Products.iPhone.color[j]}`
        );
        p.innerText = `${colorDict[Products.iPhone.color[j]]}`;
        div2.append(i, p);
        div.appendChild(div2);
        colorSelect.appendChild(div);
    }

    //顏色切換事件
    let changeColor = document.querySelectorAll(".color-select .item");
    for (let i = 0; i < changeColor.length; i++) {
        changeColor[i].addEventListener("click", function () {
            changeMainPic(Products.iPhone.img[i]);
        });
    }

    //儲存裝置 塞入資料
    for (let j = 0; j < Products.iPhone.spec.storage.length; j++) {
        let div = document.createElement("div");
        let input = document.createElement("input");
        let label = document.createElement("label");
        let p = document.createElement("p");
        div.setAttribute("class", "col-6 col-lg-6");
        input.setAttribute("type", "radio");
        input.setAttribute("name", "storage");
        input.setAttribute("id", `${Products.iPhone.spec.id[j]}`);
        input.setAttribute("value", `${Products.iPhone.spec.storage[j]}`);
        label.setAttribute(
            "class",
            `item ${Products.iPhone.spec.class[j]} storage text-center`
        );
        label.setAttribute("for", `${Products.iPhone.spec.id[j]}`);
        p.innerText = Products.iPhone.spec.storage[j];
        label.appendChild(p);
        div.append(input, label);
        storageSelect.append(div);
    }

    // let changeStorage = document.querySelectorAll(".storage-select .storage");
    // for (let i = 0; i < changeStorage.length; i++) {
    //     changeStorage[i].addEventListener("click", function () {
    //         getIphoneSelect();
    //         console.log();
    //         if (g64Check.checked) {
    //             sumPrice.innerText = Products.iPhone.spec.price[0];
    //         }
    //         if (g128Check.checked) {
    //             sumPrice.innerText = Products.iPhone.spec.price[1];
    //         }
    //         if (g256Check.checked) {
    //             sumPrice.innerText = Products.iPhone.spec.price[2];
    //         }
    //     });
    // }
    document
        .querySelector(".storage-select .storage-64")
        .addEventListener("click", function () {
            sumPrice.innerText = Products.iPhone.spec.price[0];
        });
    document
        .querySelector(".storage-select .storage-128")
        .addEventListener("click", function () {
            sumPrice.innerText = Products.iPhone.spec.price[1];
        });
    document
        .querySelector(".storage-select .storage-256")
        .addEventListener("click", function () {
            sumPrice.innerText = Products.iPhone.spec.price[2];
        });
}

btniPhone.addEventListener("click", function () {
    ProductIPhone();
});

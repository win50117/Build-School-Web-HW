const iPads = {
    space: {
        img: "img/ipad-wifi-select-space-201909_GEO_TW.png",
        spec: [
            {
                storage: "32GB",
                mobiNet: false,
                price: "$10900",
            },
            {
                storage: "128GB",
                mobiNet: false,
                price: "$13900",
            },
            {
                storage: "32GB",
                mobiNet: true,
                price: "$15400",
            },
            {
                storage: "128GB",
                mobiNet: true,
                price: "$18400",
            },
        ],
    },
    silver: {
        img: "img/ipad-wifi-select-silver-201909_GEO_TW.png",
        spec: [
            {
                storage: "32GB",
                mobiNet: false,
                price: "$10900",
            },
            {
                storage: "128GB",
                mobiNet: false,
                price: "$13900",
            },
            {
                storage: "32GB",
                mobiNet: true,
                price: "$15400",
            },
            {
                storage: "128GB",
                mobiNet: true,
                price: "$18400",
            },
        ],
    },
    gold: {
        img: "img/ipad-wifi-select-gold-201909_GEO_TW.png",
        spec: [
            {
                storage: "32GB",
                mobiNet: false,
                price: "$10900",
            },
            {
                storage: "128GB",
                mobiNet: false,
                price: "$13900",
            },
            {
                storage: "32GB",
                mobiNet: true,
                price: "$15400",
            },
            {
                storage: "128GB",
                mobiNet: true,
                price: "$18400",
            },
        ],
    },
};

let picHtml = "";
let mainPic = document.querySelector(".main-pic");
let sumPrice = document.querySelector(".sum-price");
let g32Check;
let g128Check;
let wifiCheck;
let mobiNetCheck;

function CalcPrice(storage, mobiNetC) {
    console.log(storage.value);
    console.log(mobiNetC);
    // console.log(mobiNetC.checked);
    for (let item of iPads.space.spec) {
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

function changeMainPic(imgSrc) {
    picHtml = `
    <img class="img-fluid w-75" src="${imgSrc}" alt="">
    `;
    mainPic.innerHTML = picHtml;
}

document.querySelector(".item-space").addEventListener("click", function () {
    changeMainPic(iPads.space.img);
});

document.querySelector(".item-silver").addEventListener("click", function () {
    changeMainPic(iPads.silver.img);
});

document.querySelector(".item-gold").addEventListener("click", function () {
    changeMainPic(iPads.gold.img);
});

document.querySelector(".storage-32").addEventListener("click", function () {
    getSelect();
    CalcPrice(g32Check, mobiNetCheck);
});

document.querySelector(".storage-128").addEventListener("click", function () {
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

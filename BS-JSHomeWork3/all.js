const iPad = {};

let mainPic = document.querySelector(".main-pic");
let picHtml = "";
let sumPrice = document.querySelector(".sum-price");

function changeMainPic(imgSrc) {
    picHtml = `
    <img class="img-fluid w-75" src="${imgSrc}" alt="">
    `;
    mainPic.innerHTML = picHtml;
}

document.querySelector(".item-space").addEventListener("click", function () {
    changeMainPic("img/ipad-wifi-select-space-201909_GEO_TW.png");
});

document.querySelector(".item-siver").addEventListener("click", function () {
    changeMainPic("img/ipad-wifi-select-silver-201909_GEO_TW.png");
});

document.querySelector(".item-gold").addEventListener("click", function () {
    changeMainPic("img/ipad-wifi-select-gold-201909_GEO_TW.png");
});

document.querySelector(".price-32").addEventListener("click", function () {
    let price = document.querySelector(".price-32 p.price");
    sumPrice.innerHTML = price.innerHTML;
});

document.querySelector(".price-128").addEventListener("click", function () {
    let price = document.querySelector(".price-128 p.price");
    sumPrice.innerHTML = price.innerHTML;
});

document.querySelector(".wifi").addEventListener("click", function () {
    let price = document.querySelector(".wifi p.price");
    sumPrice.innerHTML = price.innerHTML;
});

document.querySelector(".wifimobi").addEventListener("click", function () {
    let price = document.querySelector(".wifimobi p.price");
    sumPrice.innerHTML = price.innerHTML;
});

function displayName(){
    alert("My Name is Kevin");
}

var $title = function (title) {
    console.log('');
    var len = Math.floor((60 - title.length) / 2);
    title = (title.length > 0) ? `${"=".repeat(len)}${title}${"=".repeat(len)}` : "=".repeat(60);
    console.log(title);
}

var $ex = function (title) {
    console.log('');
    var len = Math.floor((50 - title.length) / 2);
    title = (title.length > 0) ? `${".".repeat(len)}${title}${".".repeat(len)}` : "=".repeat(60);
    console.log(title);
}

//選取元素
function $g(selector) {
    //判斷是否為id selector
    if (selector.includes('#') && !selector.includes(' ')) {
        //回傳Element
        return document.querySelector(selector);
    }

    //回傳NodeList集合
    let nodelist = document.querySelectorAll(selector);

    return nodelist.length == 1 ? nodelist[0] : nodelist;
}

//創建元素
function $c(selector){
    return document.createElement(selector);
}

function $ctag(elementType, text){
    let element = document.createElement(elementType);
    element.innerText = text;

    return element;
}


function $log(value){
    console.log(value);
}


function $random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export { displayName, $title, $ex, $g, $c, $ctag ,$log, $random };
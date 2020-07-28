let subInput = document.querySelector(".sub-calc");
let allInput = document.querySelector(".all-calc");

let btnClick = document.querySelector(".row");
let subnum = "";
let regex = /\+|-|\*|\/+/;
btnClick.addEventListener("click", function (e) {
    switch (e.target.textContent) {
        case "=":
            equal();
            // allInput.value += "=";
            break;
        case "C":
            subInput.value = "";
            allInput.value = "";
            break;
        case "CE":
            subInput.value = "";
            break;
        case "<=":
            subInput.value = subInput.value.substr(
                0,
                subInput.value.length - 1
            );
            if (subInput.value.length === 0) {
                subInput.value = "";
            }
            break;
        case "%":
            if (allInput.value.length !== 0 && subInput.value !== "") {
                let pNum = subInput.value;
                let oper = allInput.value[allInput.value.length - 1];
                allInput.value = allInput.value.substr(
                    0,
                    allInput.value.length - 1
                );
                subInput.value = "";
                equal();
                allInput.value += subInput.value;
                allInput.value += oper + allInput.value * (pNum * 0.01);
            }
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            if (subInput.value.length === 0 && e.target.textContent === "-") {
                subInput.value = e.target.textContent;
                return;
            }
            if (subInput.value[subInput.value.length - 1] === ".") {
                return;
            }
            if (!/\d+/.test(subInput.value)) {
                return;
            }
            // if (subInput.value.includes("-") && e.target.textContent === "-") {
            //     subInput.value[0] = "+";
            //     allInput.value += subInput.value;
            //     subInput.value = "";
            //     return;
            // }
            if (allInput.value.length === 0) {
                allInput.value += subInput.value + e.target.textContent;
                subInput.value = "";
            }
            if (
                allInput.value[allInput.value.length - 1] === "-" &&
                e.target.textContent !== "-" &&
                allInput.value.length === 1
            ) {
                allInput.value = "";
            }
            if (
                !regex.test(allInput.value[allInput.value.length - 1]) &&
                subInput.value === ""
            ) {
                allInput.value += e.target.textContent;
                subInput.value = "";
            } else if (!regex.test(allInput.value[allInput.value.length - 1])) {
                allInput.value += e.target.textContent + subInput.value;
                subInput.value = "";
            }
            if (
                regex.test(allInput.value[allInput.value.length - 1]) &&
                subInput.value !== ""
            ) {
                allInput.value += subInput.value + e.target.textContent;
                subInput.value = "";
            }
            break;
        case ".":
            if (!subInput.value.includes(".") && subInput.value.length === 0) {
                subInput.value = "0.";
            }
            if (!subInput.value.includes(".")) {
                subInput.value += ".";
            }
            break;
        case "0":
            if (subInput.value.length === 0 && !subInput.value.includes(".")) {
                subInput.value = e.target.dataset.num;
            } else if (subInput.value.includes(".")) {
                subInput.value += e.target.dataset.num;
            } else if (/1|2|3|4|5|6|7|8|9+/.test(subInput.value)) {
                subInput.value += e.target.dataset.num;
            }
            break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            if (subInput.value === "" || subInput.value === "0") {
                subInput.value = "";
                subInput.value += e.target.dataset.num;
            } else {
                subInput.value += e.target.dataset.num;
            }

            break;
        default:
            break;
    }
});

function equal() {
    if (regex.test(allInput.value) && subInput.value !== "") {
        allInput.value += subInput.value;
        Calc();
    }
    if (regex.test(allInput.value) && subInput.value === "") {
        Calc();
    }
}

function Calc() {
    subInput.value = "";
    allInput.value = eval(allInput.value);
}

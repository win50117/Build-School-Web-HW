let ulAnswer = document.querySelector(".list-group");
let btnStart = document.querySelector(".btn-start");
let quest = [];
let body = document.querySelector("body");

//在任何區塊按Enter也能觸發猜數字功能
body.addEventListener("keydown", function (e) {
    if (e.keyCode == 13) {
        guessNum();
    }
});

// 猜數字按鈕
document.querySelector(".btn-answer").addEventListener("click", function () {
    guessNum();
});

// 猜數字function
function guessNum() {
    let answer = document.querySelector(".input-guess").value;
    let answerAry = [];
    for (let item of answer) {
        //將字串轉成數字陣列
        answerAry.push(parseInt(item));
    }
    let liAnswer = document.createElement("li");

    let regex = /^(?!\d*?(\d)\d*?\1)\d{4}$/;
    if (!regex.test(answer)) {
        alert("請輸入不重複的四位數字");
        return;
    }

    // 取交集，計算a b
    let intersect = quest.filter((value) => answer.includes(value));
    let a = intersect.filter((x) => quest.indexOf(x) == answerAry.indexOf(x))
        .length;
    let b = intersect.length - a;

    liAnswer.setAttribute("Class", "list-group-item");
    liAnswer.innerHTML = `<span>${a}A${b}B</span> ${answer}`;

    ulAnswer.appendChild(liAnswer);
    if (a === 4) {
        let correctSpan = document.querySelector(
            ".list-group li:last-child span"
        );
        correctSpan.setAttribute("Class", "correct");
        correct();
    }
}

// 開始遊戲按鈕
btnStart.addEventListener("click", function () {
    quest = [];
    let number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < number.length; i++) {
        let rnd = Math.floor(Math.random() * 9);
        let temp = number[i];
        number[i] = number[rnd];
        number[rnd] = temp;
    }
    for (let i = 0; i < 4; i++) {
        quest.push(number[i]);
    }
    this.disabled = true;
});

// 查看答案按鈕
document.querySelector(".btn-quest").addEventListener("click", function () {
    //公佈答案
    document.querySelector(".modal-body h2").textContent = quest.join("");
});

// 放棄重來按鈕
document.querySelector(".btn-reset").addEventListener("click", function () {
    quest = [];
    btnStart.disabled = false;
    ulAnswer.innerHTML = "";
    document.querySelector(".input-guess").value = "";
});

// 猜對function
function correct() {
    alert("恭喜答對");
}

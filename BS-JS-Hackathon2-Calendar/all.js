let localdate = new Date();
let nowYear = localdate.getFullYear();
let nowMonth = localdate.getMonth();
let nowDay = localdate.getDate();

let calendarYear = document.querySelector(".calendar-year");
calendarYear.innerText = nowYear;
let calendarMonth = document.querySelector(".calendar-month");
calendarMonth.innerText = nowMonth + 1;

document.querySelector(".prev").addEventListener("click", function () {
    calendarMonth.innerText -= 1;
    localdate.setMonth(calendarMonth.innerText - 1);
    nowYear = localdate.getFullYear();
    nowMonth = localdate.getMonth();
    if (calendarMonth.innerText == 0) {
        calendarMonth.innerText = 12;
        calendarYear.innerText -= 1;
    }
    setTbodyDay();
});

document.querySelector(".next").addEventListener("click", function () {
    calendarMonth.innerText = Number(calendarMonth.innerText) + 1;
    localdate.setMonth(calendarMonth.innerText - 1);
    nowYear = localdate.getFullYear();
    nowMonth = localdate.getMonth();
    // console.log(localdate);
    if (calendarMonth.innerText == 13) {
        calendarMonth.innerText = 1;
        calendarYear.innerText = Number(calendarYear.innerText) + 1;
    }
    setTbodyDay();
});

//存放localStorage資料
let todoItem = [];

function init() {
    setTbodyDay();
}
init();

function setTbodyDay() {
    let tbody = document.querySelector(".calendar tbody");
    tbody.innerHTML = "";

    let allDays = new Date(
        Number(calendarYear.innerText),
        Number(calendarMonth.innerText), //格式規定月從0開始
        0
    ).getDate();
    // console.log(allDays);
    let firstDate = new Date(
        Number(calendarYear.innerText),
        Number(calendarMonth.innerText - 1), //格式規定月從0開始
        1
    ).getDay();

    // console.log(firstDate);
    //3個for
    let firstrow = false;
    // for (let i = 0; i < allDays; i++) {
    let i = 0;
    while (i < allDays) {
        let tr = document.createElement("tr");
        for (let row = 0; row < 7; row++) {
            //填補前面的空格
            if (firstrow == false) {
                for (let j = 0; j < firstDate; j++) {
                    let td = document.createElement("td");
                    tr.appendChild(td);
                    row++;
                }
                firstrow = true;
            }
            let td = document.createElement("td");
            /////////////////////////助教code 參考/////////////////////////////
            // if (localStorage.getItem(`${year}-${month + 1}-${day}`) != null) {
            //     let todoList = JSON.parse(
            //         localStorage.getItem(`${year}-${month + 1}-${day}`)
            //     );

            //     let ul = document.createElement("ul");

            //     todoList.forEach((element, index) => {
            //         let li = document.createElement("li");
            //         li.innerText = element.title;
            //         li.setAttribute("index", index);

            //         li.addEventListener("click", function (e) {
            //             e.stopPropagation();

            //             let index = e.target.getAttributeNode("index").value;
            //             console.log(index);
            //             currentIndex = index;
            //             let date = `${year}-${month + 1}-${
            //                 e.target.offsetParent.childNodes[0].data
            //             }`;
            //             console.log(date);

            //             let todoItem = JSON.parse(localStorage.getItem(date))[
            //                 index
            //             ];
            //             console.log(todoItem);

            //             document.querySelector(
            //                 "#info-area #info-date"
            //             ).value = `${date}`;
            //             document.querySelector(
            //                 "#info-area #info-todo-item"
            //             ).value = `${todoItem.title}`;

            //             $("#infoModal").modal("show");
            //         });
            //         ul.appendChild(li);
            //     });

            //     td.appendChild(ul);
            // }
            //////////////////////////////////////////////////////

            td.innerText = i + 1;

            td.setAttribute("data-date", `${nowYear}-${nowMonth}-${i + 1}`);
            td.setAttribute("data-day", i + 1);
            // console.log(td.dataset.date);
            // 點擊日期表格，開啟新增代辦事項視窗
            td.addEventListener("click", function () {
                setTodo(this);
            });
            tr.appendChild(td);
            i++;
            if (i == allDays) {
                break;
            }
        }
        tbody.appendChild(tr);
    }
}
// year: [],
// month: [],
// date: [],
// things: [],
let thisTdEl;
function setTodo(thisTd) {
    thisTd.setAttribute("data-toggle", "modal");
    thisTd.setAttribute("data-target", "#exampleModal");

    thisTdEl = thisTd;
    nowYear = localdate.getFullYear();
    nowMonth = localdate.getMonth();
    nowDay = thisTd.dataset.day;
    console.log(thisTd);
}

let btnsaveTodo = document.querySelector(".btn-todo-save");
btnsaveTodo.addEventListener("click", function () {
    btnSaveTodof();
});
function btnSaveTodof() {
    let inputTitle = document.querySelector("#exampleModal .todo-title").value;
    let inputThings = document.querySelector("#exampleModal .things").value;
    let inputColor = document.querySelector("#exampleModal .color").value;

    let yearMonthDay = `${nowYear}-${nowMonth}-${nowDay}`;

    saveToLocalStorage(yearMonthDay, inputTitle, inputThings, inputColor);
    showTodoList(yearMonthDay, inputTitle, inputThings, inputColor);
}

function saveToLocalStorage(yearMonthDay, inputTitle, inputThings, inputColor) {
    todoItem.push({
        title: inputTitle,
        things: inputThings,
        color: inputColor,
    });
    localStorage.setItem(yearMonthDay, JSON.stringify(todoItem));
}

function showTodoList(yearMonthDay, inputTitle, inputThings, inputColor) {
    let todoObject1 = JSON.parse(localStorage.getItem(yearMonthDay));

    console.log(todoObject1);

    let p = document.createElement("p");

    p.setAttribute("class", "todo-item");
    p.innerText = inputTitle;
    p.style.color = inputColor;
    p.addEventListener("click", function (e) {
        console.log(e);
        console.log(
            nowYear,
            nowMonth,
            e.target.offsetParent.childNodes[0].textContent
        );
        //彈出modal視窗
        e.stopPropagation();
        $("#todoModal").modal("show");
        //取得localStorage資料
        let todoObject = JSON.parse(
            localStorage.getItem(
                `${nowYear}-${nowMonth}-${e.target.offsetParent.childNodes[0].textContent}`
            )
        );
        console.log(todoObject);
        // document.querySelector();
        // p.style.color = todoObject[0].color;

        document.querySelector("#todoModal .todo-title").innerText =
            todoObject[0].title;
        document.querySelector("#todoModal .todo-things").innerText =
            todoObject[0].things;
        document.querySelector("#todoModal .todo-color").innerText =
            todoObject[0].color;
    });
    thisTdEl.appendChild(p);
}

let localdate = new Date();
let nowYear = localdate.getFullYear();
let nowMonth = localdate.getMonth();
let nowDay = localdate.getDate();
let currentIndex;
let currentDate;

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
        let nextDate = 1;
        for (let row = 0; row < 7; row++) {
            //填補前面的空格
            if (firstrow == false) {
                let predate = new Date(nowYear, nowMonth, 0);
                //取得上個月一共有幾天 減去本月第一天星期-1 就是顯示上月的起始日期
                let allPreDate = predate.getDate();
                allPreDate -= firstDate - 1;
                for (let j = 0; j < firstDate; j++) {
                    let td = document.createElement("td");
                    td.innerText = allPreDate;
                    allPreDate++;
                    td.style.backgroundColor = "#eee";
                    tr.appendChild(td);
                    row++;
                }
                firstrow = true;
            }
            let td = document.createElement("td");
            //填補後面的空格
            if (i >= allDays) {
                td.innerText = nextDate;
                nextDate++;
                td.style.backgroundColor = "#eee";
                tr.appendChild(td);
                i++;
                continue;
            }
            td.innerText = i + 1;

            td.setAttribute("data-date", `${nowYear}-${nowMonth}-${i + 1}`);
            td.setAttribute("data-day", i + 1);
            // console.log(td.dataset.date);
            // 點擊日期表格，開啟新增代辦事項視窗
            td.addEventListener("click", function () {
                setTodo(this);
            });
            //////////////////////////////////////////////////////
            if (
                localStorage.getItem(`${nowYear}-${nowMonth}-${i + 1}`) != null
            ) {
                let todoList = JSON.parse(
                    localStorage.getItem(`${nowYear}-${nowMonth}-${i + 1}`)
                );
                let ul = document.createElement("ul");

                todoList.forEach((element, index) => {
                    // console.log(element);
                    let li = document.createElement("li");
                    li.innerText = element.title;
                    li.style.backgroundColor = element.color;
                    li.setAttribute("index", index);

                    //代辦事項li標題點擊事件
                    li.addEventListener("click", function (e) {
                        e.stopPropagation();

                        currentIndex = index;
                        currentDate = td.dataset.date;

                        document.querySelector(
                            "#todoModal .todo-title"
                        ).value = `${element.title}`;
                        document.querySelector(
                            "#info-area .todo-things"
                        ).value = `${element.things}`;
                        document.querySelector(
                            "#info-area .todo-color"
                        ).value = `${element.color}`;
                        $("#todoModal").modal("show");
                    });
                    //如果index大於3 建立總清單
                    ul.appendChild(li);
                });

                td.appendChild(ul);
            }

            //////////////////////////////////////////////////////
            tr.appendChild(td);
            i++;
        }
        tbody.appendChild(tr);
    }
}

let thisTdEl;
function setTodo(thisTd) {
    thisTd.setAttribute("data-toggle", "modal");
    thisTd.setAttribute("data-target", "#exampleModal");

    thisTdEl = thisTd;
    nowYear = localdate.getFullYear();
    nowMonth = localdate.getMonth();
    nowDay = thisTd.dataset.day;
    // console.log(thisTd);
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
}

function saveToLocalStorage(yearMonthDay, inputTitle, inputThings, inputColor) {
    let todoObj = {
        title: inputTitle,
        things: inputThings,
        color: inputColor,
    };
    //存放localStorage資料
    let todoList = [];
    if (localStorage.getItem(yearMonthDay) == null) {
        todoList.push(todoObj);
    } else {
        let alreadyTodoList = JSON.parse(localStorage.getItem(yearMonthDay));
        alreadyTodoList.push(todoObj);
        todoList = alreadyTodoList;
    }
    localStorage.setItem(yearMonthDay, JSON.stringify(todoList));
    //重新渲染表格
    setTbodyDay();
}

document
    .querySelector("#todoModal .btn-todo-edit")
    .addEventListener("click", function () {
        // console.log(currentIndex);
        // console.log(currentDate);
        let inputTitle = document.querySelector("#todoModal .todo-title").value;
        let inputThings = document.querySelector("#todoModal .todo-things")
            .value;
        let inputColor = document.querySelector("#todoModal .todo-color").value;
        let todoList = JSON.parse(localStorage.getItem(currentDate));
        let todoObj = {
            title: inputTitle,
            things: inputThings,
            color: inputColor,
        };
        //把原本位置的todoObj刪除，插入修改後的todoObj
        todoList.splice(currentIndex, 1, todoObj);
        //重新把資料取代回localStorage
        localStorage.setItem(currentDate, JSON.stringify(todoList));
        //重新渲染表格
        setTbodyDay();
    });

document
    .querySelector("#todoModal .btn-todo-delete")
    .addEventListener("click", function () {
        let todoList = JSON.parse(localStorage.getItem(currentDate));
        todoList.splice(currentIndex, 1);
        if (todoList.length === 0) {
            localStorage.removeItem(currentDate);
        } else {
            localStorage.setItem(currentDate, JSON.stringify(todoList));
        }
        setTbodyDay();
    });

// 上傳圖片
let inputImg = document.querySelector(".file-input");
let imgSrc = "";
inputImg.addEventListener("change", readFile);

function readFile() {
    let file = this.files[0]; //取得input輸入的圖片
    let reader = new FileReader();
    reader.readAsDataURL(file); //轉化為base64資料型別
    reader.onload = function (e) {
        imgSrc = this.result;
        setPuzzleImg(imgSrc);
        // puzzleImg.src = this.result;
    };
}

//---1. 設定原始圖
var whiteImg = new Image();
whiteImg.src = "img/white.png";

//---取得父元素
var puzzleArea = document.getElementById("puzzle-area");

let AreaHeight; //座標寬
let AreaWidth; //座標高

//---設定幾乘幾
let imgBase = 2;
let baseBlock = [0, 1, 2, 3]; //拼圖尺寸預設2X2大小，編號
let localBlock = [0, 1, 2, 3];
document
    .querySelector(".puzzle-size-select")
    .addEventListener("change", function () {
        imgBase = Number(this.value);
        let allPuzzle = Math.pow(imgBase, 2);
        baseBlock.length = 0;
        localBlock.length = 0;

        for (let i = 0; i < allPuzzle; i++) {
            baseBlock.push(i);
            localBlock.push(i);
        }
        console.log(baseBlock);
        console.log(localBlock);
        if (imgSrc.length !== 0) {
            setPuzzleImg(imgSrc);
        }
    });

//設定拼圖
function setPuzzleImg(imgSrc) {
    puzzleArea.innerHTML = "";
    //拼圖設定
    var puzzleImg = new Image();
    puzzleImg.src = imgSrc;
    //確保圖片onload後才繪製到canvas上，才不會報錯
    puzzleImg.onload = function () {
        let maxWitdh = 540;
        let maxHeight = 540;
        let pWidth = puzzleImg.width / imgBase;
        let pHeight = puzzleImg.height / imgBase;
        // console.log(puzzleImg.width);
        // console.log(puzzleImg.height);
        if (puzzleImg.width > maxWitdh || puzzleImg.height > maxHeight) {
            //現有圖片只有寬或高超了預設值就進行js控制
            let w = puzzleImg.width / maxWitdh;
            let h = puzzleImg.height / maxHeight;

            if (w > h) {
                //比值比較大==>寬比高大
                puzzleImg.width = maxWitdh; //定下寬度為width的寬度
                puzzleImg.height = puzzleImg.height / w; //以下為計算高度
            } else {
                //高比寬大
                puzzleImg.height = maxHeight; //定下寬度為height高度
                puzzleImg.width = puzzleImg.width / h; //以下為計算高度
            }
            console.log(puzzleImg.width);
            console.log(puzzleImg.height);
        }
        ///////////////
        let d = 0;
        for (let i = 0; i < imgBase; i++) {
            for (let j = 0; j < imgBase; j++) {
                let canvas = document.createElement("canvas");
                canvas.width = puzzleImg.width / imgBase;
                canvas.height = puzzleImg.height / imgBase;
                AreaWidth = canvas.width; //之後的座標寬
                AreaHeight = canvas.height; //之後的座標高
                canvasContent = canvas.getContext("2d");
                //白色區塊的位置
                if (i == imgBase - 1 && j == imgBase - 1) {
                    canvasContent.drawImage(
                        whiteImg,
                        j * pWidth,
                        i * pHeight,
                        pWidth,
                        pHeight,
                        0,
                        0,
                        pWidth,
                        pHeight
                    );
                    canvas.setAttribute("class", "white");
                    canvas.setAttribute("id", `b${imgBase * imgBase - 1}`);
                    canvas.setAttribute("data-num", imgBase * imgBase - 1);
                } else {
                    canvasContent.drawImage(
                        puzzleImg,
                        j * pWidth,
                        i * pHeight,
                        pWidth,
                        pHeight,
                        0,
                        0,
                        canvas.width,
                        canvas.height
                    );
                    canvas.setAttribute("class", "moveable");
                    canvas.setAttribute("id", `b${d}`);
                    canvas.setAttribute("data-num", d);
                    canvas.addEventListener("click", function () {
                        move(this.dataset.num);
                    });

                    d++;
                }
                //設定canvas絕對定位的xy軸
                canvas.style.top = `${canvas.height * i}px`;
                canvas.style.left = `${canvas.width * j}px`;
                puzzleArea.appendChild(canvas);
            }
        }
        //設定拼圖區域的整體寬高，顯示border用
        puzzleArea.style.display = "block";
        puzzleArea.style.width = `${AreaWidth * imgBase}px`;
        puzzleArea.style.height = `${AreaHeight * imgBase}px`;
        document.querySelector("#shuffleBtn").disabled = false;
    };
}

function move(clickId) {
    let row = imgBase;
    let clickBlock = document.querySelector(`#b${clickId}`);
    let whiteBlock = document.querySelector(".white");
    let clickBLockIndex = localBlock.indexOf(Number(clickId));
    let whiteBlockIndex = localBlock.indexOf(Number(imgBase * imgBase - 1));

    if (
        //點擊方塊不在最上排，且上面是空白方塊，可向上移動
        clickBLockIndex / row !== 0 &&
        clickBLockIndex - row === whiteBlockIndex
    ) {
        console.log("向上移動");
        changeBlock(clickBLockIndex, whiteBlockIndex);
        chageCanvas(clickBlock, whiteBlock);
    } else if (
        //點擊方塊不在最下排，且下面是空白方塊，可向下移動
        clickBLockIndex / row !== row - 1 &&
        clickBLockIndex + row === whiteBlockIndex
    ) {
        console.log("向下移動");
        changeBlock(clickBLockIndex, whiteBlockIndex);
        chageCanvas(clickBlock, whiteBlock);
    } else if (
        //點擊方塊不在最左排，且左面是空白方塊，可向左移動
        clickBLockIndex % row !== 0 &&
        clickBLockIndex - 1 === whiteBlockIndex
    ) {
        console.log("向左移動");
        changeBlock(clickBLockIndex, whiteBlockIndex);
        chageCanvas(clickBlock, whiteBlock);
    } else if (
        //點擊方塊不在最右排，且右面是空白方塊，可向右移動
        clickBLockIndex % row !== row - 1 &&
        clickBLockIndex + 1 === whiteBlockIndex
    ) {
        console.log("向右移動");
        changeBlock(clickBLockIndex, whiteBlockIndex);
        chageCanvas(clickBlock, whiteBlock);
    } else {
        return;
    }
    checkWinGame();
}

//方塊交換
function changeBlock(clickBLockIndex, whiteBlockIndex) {
    let temp;
    temp = localBlock[clickBLockIndex];
    localBlock[clickBLockIndex] = localBlock[whiteBlockIndex];
    localBlock[whiteBlockIndex] = temp;
}

//方塊的canvas畫布圖片位置交換
function chageCanvas(clickBlock, whiteBlock) {
    let temp;
    temp = clickBlock.style.top;
    clickBlock.style.top = whiteBlock.style.top;
    whiteBlock.style.top = temp;
    temp = clickBlock.style.left;
    clickBlock.style.left = whiteBlock.style.left;
    whiteBlock.style.left = temp;
}

//判斷完成拼圖
function checkWinGame() {
    if (localBlock.toString() == baseBlock.toString()) {
        Swal.fire("過關!", `恭喜完成${imgBase} X ${imgBase}拼圖`, "success");
        // inputImg.value = ""; //清空input的value，這樣選同一張圖片才能觸發change事件
        inputImg.disabled = false;
    }
}

//洗亂按鈕事件
document.querySelector("#shuffleBtn").addEventListener("click", shuffle);

//洗亂
function shuffle() {
    let row = imgBase;
    let whiteBlock = document.querySelector(".white");
    let shuffleTimes = Math.pow(imgBase, 2) * 10;

    for (let i = 0; i < shuffleTimes; i++) {
        let whiteBlockIndex = localBlock.indexOf(Number(imgBase * imgBase - 1));
        let moveBlockIndex;
        let moveBlock;
        let randomNum = Math.floor(Math.random() * 4); // 0上 1下 2左 3右
        //上
        if (randomNum === 0 && whiteBlockIndex - row >= 0) {
            moveBlockIndex = whiteBlockIndex - row;
            moveBlock = document.querySelector(
                `#b${localBlock[moveBlockIndex]}`
            );
        }
        //下
        else if (
            randomNum === 1 &&
            whiteBlockIndex + row <= Math.pow(row, 2) - 1
        ) {
            moveBlockIndex = whiteBlockIndex + row;
            moveBlock = document.querySelector(
                `#b${localBlock[moveBlockIndex]}`
            );
        }
        //左
        else if (randomNum === 2 && whiteBlockIndex % row !== 0) {
            moveBlockIndex = whiteBlockIndex - 1;
            moveBlock = document.querySelector(
                `#b${localBlock[moveBlockIndex]}`
            );
        }
        //右
        else if (randomNum === 3 && whiteBlockIndex % row !== row - 1) {
            moveBlockIndex = whiteBlockIndex + 1;
            moveBlock = document.querySelector(
                `#b${localBlock[moveBlockIndex]}`
            );
        } else {
            i--;
            continue;
        }
        changeBlock(moveBlockIndex, whiteBlockIndex);
        chageCanvas(moveBlock, whiteBlock);

        //如果洗排後和答案一樣則重洗。
        if (
            i === shuffleTimes - 1 &&
            localBlock.toString() === baseBlock.toString()
        ) {
            i = 0;
        }
    }
}

//使用預設圖片按鈕
document.querySelector("#startBtn").addEventListener("click", function () {
    setPuzzleImg("img/Capoo1.jpg");
    imgSrc = "img/Capoo1.jpg";
});

let dictionary = new Dictionary();
document.querySelector("#bfs-alg").addEventListener("click", BFS);
function BFS() {
    dictionary = new Dictionary();
    // let queueDict = new Dictionary();
    let visitDict = new Dictionary();
    let row = imgBase;
    let queueArray = []; //佇列
    // let visitArray = []; //已探訪
    let vertex = [];
    let tempAry;
    let temp;
    let whiteBlockIndex;
    queueArray.push(baseBlock.slice(0)); //放入起始節點 完全複製，不然只是參照到原陣列
    // visitArray.push(baseBlock.slice(0)); //起始節點已探訪
    // queueDict.set(baseBlock,ture);
    visitDict.set(baseBlock, "ture"); //起始節點已探訪
    // console.log(visitDict.has(baseBlock));
    // let i = 0;
    while (queueArray.length > 0) {
        // i++;
        vertex = queueArray.shift().slice(0); //取出的頂點
        whiteBlockIndex = vertex.indexOf(Number(Math.pow(imgBase, 2) - 1));

        //如果取出的頂點等於目標localBlock 回傳路徑，不把全部路徑可能記錄
        if (vertex.toString() === localBlock.toString()) {
            autoMove();
            // console.log(i);
            return;
        }
        // 找出臨節點
        // 往上的節點
        if (whiteBlockIndex - row >= 0) {
            tempAry = vertex.slice(0);
            temp = tempAry[whiteBlockIndex];
            tempAry[whiteBlockIndex] = tempAry[whiteBlockIndex - row];
            tempAry[whiteBlockIndex - row] = temp;
            if (!visitDict.has(tempAry)) {
                //加入queue和已探訪
                queueArray.push(tempAry.slice(0));
                // visitArray.push(tempAry.slice(0));
                visitDict.set(tempAry, "ture");
                dictionary.set(tempAry.slice(0), vertex.slice(0));
                // console.log("TEST0");
            }
        }
        //往下的節點
        if (whiteBlockIndex + row <= Math.pow(row, 2) - 1) {
            tempAry = vertex.slice(0);
            temp = tempAry[whiteBlockIndex];
            tempAry[whiteBlockIndex] = tempAry[whiteBlockIndex + row];
            tempAry[whiteBlockIndex + row] = temp;
            if (!visitDict.has(tempAry)) {
                //加入queue和已探訪
                queueArray.push(tempAry.slice(0));
                // visitArray.push(tempAry.slice(0));
                visitDict.set(tempAry, "ture");
                dictionary.set(tempAry.slice(0), vertex.slice(0));
                // console.log("TEST1");
            }
        }
        //往左的節點
        if (whiteBlockIndex % row !== 0) {
            tempAry = vertex.slice(0);
            temp = tempAry[whiteBlockIndex];
            tempAry[whiteBlockIndex] = tempAry[whiteBlockIndex - 1];
            tempAry[whiteBlockIndex - 1] = temp;
            if (!visitDict.has(tempAry)) {
                //加入queue和已探訪
                queueArray.push(tempAry.slice(0));
                // visitArray.push(tempAry.slice(0));
                visitDict.set(tempAry, "ture");
                dictionary.set(tempAry.slice(0), vertex.slice(0));
                // console.log("TEST2");
            }
        }
        //往右的節點
        if (whiteBlockIndex % row !== row - 1) {
            tempAry = vertex.slice(0);
            temp = tempAry[whiteBlockIndex];
            tempAry[whiteBlockIndex] = tempAry[whiteBlockIndex + 1];
            tempAry[whiteBlockIndex + 1] = temp;
            if (!visitDict.has(tempAry)) {
                //加入queue和已探訪
                queueArray.push(tempAry.slice(0));
                // visitArray.push(tempAry.slice(0));
                visitDict.set(tempAry, "ture");
                dictionary.set(tempAry.slice(0), vertex.slice(0));
                // console.log("TEST3");
            }
        }
        // console.log(queueArray);
    }

    // console.log(dictionary.getItems());
    // console.log(localBlock.toString());
    // console.log(dictionary.get(localBlock));
}

let timeOpen = false;
let time;

function autoMove() {
    if (timeOpen === false) {
        time = setInterval(autoMove, 300);
        timeOpen = true;
    }
    if (localBlock.toString() === baseBlock.toString()) {
        window.clearInterval(time);
        timeOpen = false;
        return;
    }
    let nextStep;
    nextStep = dictionary.get(localBlock);
    let whiteBlockIndex = localBlock.indexOf(Number(imgBase * imgBase - 1));
    let nextBlockIndex = nextStep.indexOf(Number(imgBase * imgBase - 1));
    let nextBlock = document.querySelector(`#b${localBlock[nextBlockIndex]}`);
    let whiteBlock = document.querySelector(".white");
    changeBlock(nextBlockIndex, whiteBlockIndex);
    chageCanvas(nextBlock, whiteBlock);
}

//提示下一步
//移動時 可以找目前節點的whiteIndex值 和 下一個路徑的whiteIndex值
//相減判斷是移動上下左右
// document.querySelector("#go-next").addEventListener("click", function () {
//     let row = imgBase;
//     let nextStep;
//     nextStep = dictionary.get(localBlock);
//     let whiteBlockIndex = localBlock.indexOf(Number(imgBase * imgBase - 1));
//     let nextBlockIndex = nextStep.indexOf(Number(imgBase * imgBase - 1));
//     if (whiteBlockIndex - nextBlockIndex === row) {
//         alert("向下滑動");
//     }
//     if (whiteBlockIndex - nextBlockIndex === -row) {
//         alert("向上滑動");
//     }
//     if (whiteBlockIndex - nextBlockIndex === 1) {
//         alert("向右滑動");
//     }
//     if (whiteBlockIndex - nextBlockIndex === -1) {
//         alert("向左滑動");
//     }
//     // autoMove();
//     checkWinGame();
// });

//建立字典
function Dictionary() {
    let items = {};
    this.set = function (key, value) {
        items[key] = value;
    };
    this.remove = function () {
        if (this.has(key)) {
            delete items[key];
            return true;
        }
        return false;
    };
    this.has = function (key) {
        return key in items;
        // 也可以使用 return items.hasOwnProperty(key);
    };
    this.get = function (key) {
        // 先判斷是否存在鍵
        return this.has(key) ? items[key] : undefinded;
    };
    this.clear = function () {
        items = {};
    };
    this.size = function () {
        return length;
    };
    this.keys = function () {
        return Object.keys(items);
    };
    this.values = function () {
        let values = {};
        for (let k in items) {
            if (this.has(k)) {
                values.push(items[k]);
            }
        }
        return values;
    };
    this.getItems = function () {
        return items;
    };
}

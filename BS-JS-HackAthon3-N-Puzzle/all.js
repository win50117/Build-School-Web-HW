// var myCanvas = document.getElementById("myCanvas");

// 上傳圖片
document.querySelector(".file-input").addEventListener("change", readFile);

function readFile() {
    let file = this.files[0]; //取得input輸入的圖片
    // console.log(file);
    let reader = new FileReader();
    reader.readAsDataURL(file); //轉化為base64資料型別
    reader.onload = function (e) {
        puzzleImg.src = this.result;
        // console.log(e);
        // drawToCanvas(this.result);
    };
}

//拼圖設定
//---1. 設定原始圖
var puzzleImg = new Image();
// puzzleImg.src = "./star_540.jpg";
var whiteImg = new Image();
whiteImg.src = "img/white.png";

//---2. 生成切片
//var puzzleItems = document.querySelectorAll('#puzzle-area canvas');
//console.log(puzzleItems);

//---取得父元素
var puzzleArea = document.getElementById("puzzle-area");

let baseBlock = [0, 1, 2, 3]; //大區塊的編號，第8為空白格 3*3
let localBlock = [0, 1, 2, 3];
let baseBlock22 = [0, 1, 2, 3, 0];
//每個區塊可移動的位置
let blockCanMove = new Array(
    [0], //不使用0的陣列位置，比較好判斷
    [2, 4], //區塊1可以移動到區塊2、4的位置
    [1, 3, 5], //區塊2可以移動到區塊1、3、5的位置
    [2, 6],
    [1, 5, 7],
    [2, 4, 6, 8],
    [3, 5, 9],
    [4, 8],
    [5, 7, 9],
    [6, 8]
);

let blockCanMove22 = new Array(
    [0], //不使用0的陣列位置，比較好判斷
    [2, 3], //區塊1可以移動到區塊2、3的位置
    [1, 4], //區塊2可以移動到區塊1、4的位置
    [1, 4],
    [2, 3]
);
let posX; //座標寬
let posY; //座標高

let blockPosXY = new Array(
    [0], //不使用index 0
    [0, 0][(posX, 0)], //第一個表示left,第二個表示top，比如第一塊位置為left:0px ,top:0px
    [posX * 2, 0],
    [0, posY],
    [posX, posY],
    [posX * 2, posY],
    [0, posY * 2],
    [posX, posY * 2],
    [posX * 2, posY * 2]
);
let b = [];

//---設定幾乘幾
let imgBase = 2;

puzzleImg.onload = function (e) {
    puzzleArea.innerHTML = "";
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
    }
    ///////////////
    let d = 0;
    for (let i = 0; i < imgBase; i++) {
        for (let j = 0; j < imgBase; j++) {
            let canvas = document.createElement("canvas");
            canvas.width = puzzleImg.width / imgBase;
            canvas.height = puzzleImg.height / imgBase;
            posX = canvas.width; //之後的座標寬
            posY = canvas.height; //之後的座標高
            canvasContent = canvas.getContext("2d");
            //白色區塊的位置
            if (i == imgBase - 1 && j == imgBase - 1) {
                //我先寫死
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
                d++;
            }
            puzzleArea.appendChild(canvas);
        }
    }
    document.querySelector(".custom-file-input").disabled = true;
    addBlockEvent();
};

//window onload ?? (當圖都長完才抓得到canvas)
function addBlockEvent() {
    var canvasBlocks = document.querySelectorAll(".moveable");
    console.log(canvasBlocks);

    for (let block of canvasBlocks) {
        block.addEventListener("click", function () {
            console.log(this.dataset.num);
            move(this.dataset.num);
            //判斷是否可以被移動
            //--1.判斷自己是否在白色塊上下左右???
            //移動方法
            //--1.白色塊與自己交換'位置'
            //判斷輸贏
        });
    }
}

function move(clickId) {
    let row = imgBase;
    let whiteBlock = document.querySelector(".white");
    let clickBlock = document.querySelector(`#b${clickId}`);
    let clickBLockIndex = localBlock.indexOf(Number(clickId));
    let whiteBlockIndex = localBlock.indexOf(Number(imgBase * imgBase - 1));

    console.log(clickBLockIndex);
    console.log(whiteBlockIndex);
    if (
        clickBLockIndex / row !== 0 &&
        clickBLockIndex - row === whiteBlockIndex
    ) {
        //點擊方塊不在最上排，且上面是空白方塊，可向上移動
        changeBlock(clickBLockIndex, whiteBlockIndex);
    }
    if (
        clickBLockIndex / row !== row - 1 &&
        clickBLockIndex + row === whiteBlockIndex
    ) {
        //點擊方塊不在最下排，且下面是空白方塊，可向下移動
        changeBlock(clickBLockIndex, whiteBlockIndex);
    }
    if (
        clickBLockIndex % row !== 0 &&
        clickBLockIndex - 1 === whiteBlockIndex
    ) {
        //點擊方塊不在最左排，且左面是空白方塊，可向左移動
        changeBlock(clickBLockIndex, whiteBlockIndex);
    }
    if (
        clickBLockIndex % row !== row - 1 &&
        clickBLockIndex + 1 === whiteBlockIndex
    ) {
        //點擊方塊不在最右排，且右面是空白方塊，可向右移動
        changeBlock(clickBLockIndex, whiteBlockIndex);
    }
}

function changeBlock(clickBLockIndex, whiteBlockIndex) {
    // let whiteBlock = document.querySelector(".white");
    // let clickBlock = document.querySelector(`#b${clickId}`);
    let temp;
    temp = localBlock[clickBLockIndex];
    localBlock[clickBLockIndex] = localBlock[whiteBlockIndex];
    localBlock[whiteBlockIndex] = temp;
    console.log(localBlock);
}

// 兩個陣列一個保存答案的固定位置
// 另一個保存要移動的格子位置

// 移動判斷陣列0位置
// row等於總數/幾成幾數字

// 可移動的空白格子上方就是 空白格字的index-row index從0開始
// 如果 空白的index%row 不等於1 (最左邊那排) 可以向右移動的意思
//     空白格子左邊就有可移動格子就是index-1 ，取得這個方塊DOM作操作
// 如果 空白的index%row 不等於0 (最右邊那排) 可以向左移動的意思
//     空白格子右邊就有可移動格子就是index+1
// 如果 空白的index/row 不等於0 (最上邊那排) 可以向下移動的意思
//     空白格子上邊就有可移動格子就是index-row
// 如果 空白的index/row 不等於(row-1) (最下邊那排) 可以向上移動的意思
//     空白格子下邊就有可移動格子就是index+row

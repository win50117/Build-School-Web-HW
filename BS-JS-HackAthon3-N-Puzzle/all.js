// var myCanvas = document.getElementById("myCanvas");

// 上傳圖片
document.querySelector(".file-input").addEventListener("change", readFile);

function readFile() {
    let file = this.files[0]; //取得input輸入的圖片
    console.log(file);
    let reader = new FileReader();
    reader.readAsDataURL(file); //轉化為base64資料型別
    reader.onload = function (e) {
        puzzleImg.src = this.result;
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

let baseBlock = [0, 1, 2, 3, 4, 5, 6, 7, 8, 0]; //大區塊的編號，index0不使用第9為空白格 3*3
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
    let maxWitdh = 540;
    let maxHeight = 540;
    let pWidth = puzzleImg.width / imgBase;
    let pHeight = puzzleImg.height / imgBase;
    if (puzzleImg.width > maxWitdh || puzzleImg.height > maxHeight) {
        //現有圖片只有寬或高超了預設值就進行js控制
        w = puzzleImg.width / maxWitdh;
        h = puzzleImg.height / maxHeight;

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
    let d = 1;
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
                canvas.setAttribute("id", `b${imgBase * 2}`);
                canvas.setAttribute("data-num", imgBase * 2);
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
};

//window onload ?? (當圖都長完才抓得到canvas)
window.onload = function () {
    var canvasBlocks = document.getElementsByTagName(".moveable");
    console.log(canvasBlocks);

    for (let block of canvasBlocks) {
        block.addEventListener("click", function () {
            //判斷是否可以被移動
            //--1.判斷自己是否在白色塊上下左右???
            //移動方法
            //--1.白色塊與自己交換'位置'
            //判斷輸贏
        });
    }
};
// for(let item of puzzleItems)
// {
//   item.width = 500;
//   item.height = 500;

//   let cxt = item.getContext("2d");

//   console.log(cxt);
//   //cxt.clearRect(0, 0, 100, 100);
//   cxt.drawImage(puzzleImg, 0, 0);
// }

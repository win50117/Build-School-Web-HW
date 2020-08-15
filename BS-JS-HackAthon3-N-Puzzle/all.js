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
    });

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
            AreaWidth = canvas.width; //之後的座標寬
            AreaHeight = canvas.height; //之後的座標高
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
    document.querySelector(".custom-file-input").disabled = true;
    document.querySelector("#shuffleBtn").disabled = false;
    document.querySelector("#startBtn").disabled = false;
};

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

function changeBlock(clickBLockIndex, whiteBlockIndex) {
    let temp;
    temp = localBlock[clickBLockIndex];
    localBlock[clickBLockIndex] = localBlock[whiteBlockIndex];
    localBlock[whiteBlockIndex] = temp;
}

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
        alert("過關");
    }
}

//洗亂按鈕事件
document.querySelector("#shuffleBtn").addEventListener("click", function () {
    let row = imgBase;
    let whiteBlock = document.querySelector(".white");

    let canvas = document.querySelectorAll("canvas");

    let shuffleTimes = Math.pow(imgBase, 2) * 10;

    for (let i = 0; i < shuffleTimes; i++) {
        let whiteBlockIndex = localBlock.indexOf(Number(imgBase * imgBase - 1));
        let randomNum = Math.floor(Math.random() * 4); // 0上 1下 2左 3右
        //上
        if (randomNum === 0 && whiteBlockIndex - row >= 0) {
            let topBlock = document.querySelector(
                `#b${localBlock[whiteBlockIndex - row]}`
            );
            changeBlock(whiteBlockIndex - row, whiteBlockIndex);
            chageCanvas(topBlock, whiteBlock);
        }
        //下
        else if (
            randomNum === 1 &&
            whiteBlockIndex + row <= Math.pow(row, 2) - 1
        ) {
            let bottomBlock = document.querySelector(
                `#b${localBlock[whiteBlockIndex + row]}`
            );
            changeBlock(whiteBlockIndex + row, whiteBlockIndex);
            chageCanvas(bottomBlock, whiteBlock);
        }
        //左
        else if (randomNum === 2 && whiteBlockIndex % row !== 0) {
            let leftBlock = document.querySelector(
                `#b${localBlock[whiteBlockIndex - 1]}`
            );
            changeBlock(whiteBlockIndex - 1, whiteBlockIndex);
            chageCanvas(leftBlock, whiteBlock);
        }
        //右
        else if (randomNum === 3 && whiteBlockIndex % row !== row - 1) {
            let rightBlock = document.querySelector(
                `#b${localBlock[whiteBlockIndex + 1]}`
            );
            changeBlock(whiteBlockIndex + 1, whiteBlockIndex);
            chageCanvas(rightBlock, whiteBlock);
        } else {
            i--;
        }

        //如果洗排後和答案一樣則重洗。
        if (
            i === shuffleTimes - 1 &&
            localBlock.toString() === baseBlock.toString()
        ) {
            i = 0;
        }
    }
});

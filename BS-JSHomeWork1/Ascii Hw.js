// 1.檢查不得為空白或非String型別
// 2.一次傳遞完整姓名至function參數
// 3.將結果儲存成Array陣列
// 4.顯示Code
let fullCode = [];
function fullCharCode(name) {
    if (typeof name != "string" || name.length == 0) {
        console.log("不得為空值或非string型別");
        return;
    }
    for (let j = 0; j < name.length; j++) {
        for (let i = 33; i < 65536; i++) {
            if (name[j] == String.fromCharCode(i)) {
                fullCode.push(i);
            }
        }
    }
    console.log(fullCode);
}
fullCharCode("鄭景仁");

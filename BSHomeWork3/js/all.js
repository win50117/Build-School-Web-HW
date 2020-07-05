let html = `
                <div class="popup-container-img">
                        <span class="close-popup">X</span>
                        <div class="popup-check">
                            <span>Don't show again</span>
                        </div>
                </div>                
                `;
setTimeout(function () {
    let Popup = document.querySelector(".popup");
    Popup.innerHTML = html;
    let ClosePopup = document.querySelector(".close-popup");
    ClosePopup.onclick = function () {
        document.querySelector(".popup").style.display = "none";
    };
}, 5000); //延遲 5 秒
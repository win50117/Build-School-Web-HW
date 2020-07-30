let map;
let maskdata; //口罩JSON資料
let points = []; //全部座標
var markers = [];
var infoWindows = [];

window.onload = function () {
    // let xhr = new XMLHttpRequest();
    const url =
        "https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json?fbclid=IwAR03QVRRMDHgQC_XBIR62wBKePkGVs5kRyTMdaCpP032CjtFdu6uiA3m-Gc";

    // xhr.onload = function () {
    //     maskdata = JSON.parse(this.responseText);
    //     initMap();
    //     addCountyList();
    // };
    // xhr.open("GET", url);
    // xhr.send();

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            maskdata = data;
            initMap();
            addCountyList();
        })
        .catch((error) => {
            alert(error);
        });
};
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: 25.0415956,
            lng: 121.5341098,
        },
        zoom: 12,
    });

    // map.data.loadGeoJson(
    //     "https://maskmap.azurewebsites.net/api/mask/getmaskstock"
    // );

    for (let i = 0; i < maskdata.features.length; i++) {
        let masksLeft = maskdata.features[i].properties.mask_adult;
        let childMasksLeft = maskdata.features[i].properties.mask_child;
        let name = maskdata.features[i].properties.name;
        let latP = maskdata.features[i].geometry.coordinates[1];
        let lngP = maskdata.features[i].geometry.coordinates[0];
        let iconPic = "";
        if (masksLeft !== 0 && childMasksLeft !== 0) {
            iconPic = "img/hospital.png";
        }
        if (
            (masksLeft === 0 && childMasksLeft !== 0) ||
            (masksLeft !== 0 && childMasksLeft === 0)
        ) {
            iconPic = "img/alert.png";
        }
        if (masksLeft === 0 && childMasksLeft === 0) {
            iconPic = "img/close.png";
        }
        //加入標示點群組
        markers[i] = new google.maps.Marker({
            position: {
                lat: latP,
                lng: lngP,
            },
            icon: iconPic,
            map: map,
        });
        let contentString = `
        <div id="content">
            <div id="siteNotice"></div>
            <h2 id="firstHeading" class="firstHeading">${name}</h2>
            <div id="bodyContent">
                <p>
                    <b>成人口罩數量：</b>${masksLeft}
                </p>
                <p>
                    <b>兒童口罩數量：</b>${childMasksLeft}
                </p>
            </div>
        </div>
        `;
        // 加入點擊標示彈跳視窗事件
        let infowindow = new google.maps.InfoWindow({
            content: contentString,
        });
        markers[i].addListener("click", () => {
            infowindow.open(map, markers[i]);
        });
    }
    // 群組化
    let markerCluster = new MarkerClusterer(map, markers, {
        imagePath:
            "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    });
}

// function setPoint() {
//     maskdata.features.forEach(function (item) {
//         let latP = Number(item.geometry.coordinates[1]);
//         let lngP = Number(item.geometry.coordinates[0]);
//         let titleP = item.properties.name;
//         let maskLeftP = item.properties.masksLeft;
//         let childMaskLeftP = item.properties.childMasksLeft;
//         points.push({
//             lat: latP,
//             lng: lngP,
//             title: titleP,
//             maskLeft: maskLeftP,
//             childMaskLeft: childMaskLeftP,
//         });
//     });
// }

//縣市選單
let countySelector = document.querySelector(".selectCounty");
let townSelector = document.querySelector(".selectTown");

//縣市選單變換監聽事件
document.querySelector(".selectCounty").addEventListener("change", addTownList);
document.querySelector(".selectTown").addEventListener("change", function (e) {
    renderList(countySelector.value, e.target.value);
});

//加入縣市選單
function addCountyList() {
    let allCounty = [];
    for (let i = 0; i < maskdata.features.length; i++) {
        var countyName = maskdata.features[i].properties.county;
        //和陣列內不重複的才放進陣列並添加到下拉選單
        if (allCounty.indexOf(countyName) == -1 && countyName !== "") {
            allCounty.push(countyName);
            countySelector.options.add(new Option(countyName, countyName));
        }
    }
}

//點擊縣市選單觸發事件，加入鄉鎮選單
function addTownList(e) {
    let allTown = [];
    //鄉鎮區選單清空。
    townSelector.options.length = 0;
    for (let i = 0; i < maskdata.features.length; i++) {
        let TownName = maskdata.features[i].properties.town;
        //和陣列內不重複的才放進陣列並添加到下拉選單
        if (e.target.value == maskdata.features[i].properties.county) {
            if (allTown.indexOf(TownName) == -1 && TownName !== "") {
                allTown.push(TownName);
                townSelector.options.add(new Option(TownName, TownName));
            }
        }
    }
    renderList(e.target.value, townSelector.value);
}

function renderList(city, town) {
    let ary = maskdata.features;
    let list = document.querySelector(".list");
    let listItem = document.querySelector("#list-temp");
    list.innerHTML = "";

    for (var i = 0; i < ary.length; i++) {
        var pharmacyName = ary[i].properties.name; //藥局名稱
        var maskAdult = ary[i].properties.mask_adult; //成人口罩數量
        var maskChild = ary[i].properties.mask_child; //兒童口罩數量
        var lat = ary[i].geometry.coordinates[1]; //經度
        var lng = ary[i].geometry.coordinates[0]; //緯度
        var address = ary[i].properties.address; //地址
        var phone = ary[i].properties.phone; //電話

        if (
            ary[i].properties.county == city &&
            ary[i].properties.town == town
        ) {
            let cloneContent = listItem.content.cloneNode(true);
            let item = cloneContent.querySelector(".list-item");
            item.setAttribute("data-lat", lat);
            item.setAttribute("data-lng", lng);

            cloneContent.querySelector(".list-title").innerText = pharmacyName;
            cloneContent.querySelector(".list-address").innerText = address;
            cloneContent.querySelector(".list-phone").innerText = phone;
            cloneContent.querySelector(
                ".list-adult"
            ).innerText = `成人口罩：${maskAdult}`;
            cloneContent.querySelector(
                ".list-child"
            ).innerText = `兒童口罩：${maskChild}`;

            item.addEventListener("click", function (e) {
                Lat = Number(e.currentTarget.dataset.lat);
                Lng = Number(e.currentTarget.dataset.lng);

                let center = new google.maps.LatLng(Lat, Lng);

                //zoom要先調整 再移動作標 才會正常顯示出地圖
                //點選列表 定位到地圖中央
                map.zoom = 22;
                map.panTo(center);
            });
            list.append(cloneContent);
        }
    }
}

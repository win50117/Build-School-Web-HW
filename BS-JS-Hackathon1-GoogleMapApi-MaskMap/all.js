let map;
let maskdata; //口罩JSON資料
let markers = []; //標示點集合
let stepMarkers = []; //導航標示點集合
let infoWindows = [];
let stepinfoWindows = [];
let userMarkers = [];
let userPos;
// 載入路線服務與路線顯示圖層
let directionsService = new google.maps.DirectionsService();
let directionsDisplay = new google.maps.DirectionsRenderer();

window.onload = function () {
    const url =
        "https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json";

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
    let infowindow = new google.maps.InfoWindow();
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
        let myLatLng = new google.maps.LatLng({
            lat: maskdata.features[i].geometry.coordinates[1],
            lng: maskdata.features[i].geometry.coordinates[0],
        });
        let idNum = maskdata.features[i].properties.id;
        let countyName = maskdata.features[i].properties.county;
        let TownName = maskdata.features[i].properties.town;
        let address = maskdata.features[i].properties.address;
        let phone = maskdata.features[i].properties.phone;
        let note = maskdata.features[i].properties.note;
        let update = maskdata.features[i].properties.updated;
        let count = masksLeft + childMasksLeft;
        let iconPic =
            count < 1000
                ? "img/triangle-red.png"
                : count < 2000
                ? "img/triangle-orange.png"
                : "img/triangle-green.png";
        //加入標示點群組
        markers[i] = new google.maps.Marker({
            position: myLatLng,
            icon: iconPic,
            map: map,
            id: idNum,
            county: countyName,
            town: TownName,
        });
        let contentString = `
        <div id="content">            
            <h2 class="info-title">${name}</h2>
            <div id="bodyContent">
                <p class="pop-adult">
                    <b>成人口罩數量：</b>${masksLeft}
                </p>
                <p class="pop-child">
                    <b>兒童口罩數量：</b>${childMasksLeft}
                </p>
                <p class="pop-address">
                    <i class="fas fa-hospital-alt"></i>${address}
                </p>
                <p class="pop-phone">
                    <i class="fas fa-phone-alt"></i>${phone}
                </p>
                <p class="pop-note">
                    <i class="fas fa-comment-medical"></i>${note}
                </p>
                <p class="pop-update">
                    <b>資料更新時間：${update}</b>
                </p>
            </div>
        </div>
        
        `;
        // let infowindow = new google.maps.InfoWindow({
        //     content: contentString,
        //     maxWidth: 450,
        // });

        // 標示點 點擊事件
        markers[i].addListener("click", () => {
            let county = document.querySelector(".selectCounty");
            let town = document.querySelector(".selectTown");
            // 設定info視窗
            infowindow.setOptions({
                content: contentString,
                maxWidth: 450,
            });
            //打開info視窗
            infowindow.open(map, markers[i]);
            //點擊標示 切換城市、鄉鎮選單，並強制觸發change事件
            county.value = markers[i].county;
            let event = new Event("change");
            county.dispatchEvent(event);
            town.value = markers[i].town;
            town.dispatchEvent(event);

            //列表滾動到和標示點相同的藥局card位置 要加上css效果
            document.getElementById(markers[i].id).scrollIntoView();
        });
    }
    // 群組化
    let markerCluster = new MarkerClusterer(map, markers, {
        imagePath:
            "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
        gridSize: 130, //群集網格內的像素數
        maxZoom: 16,
    });
    getUserLocation();
    initAutocomplete();
}

// 兩地點導航
function directionGuide(originPos, destinationPos) {
    let stepInfowindows = [];

    // 清除上次的路線、放置路線圖層
    directionsDisplay.setMap(null);
    directionsDisplay.setMap(map);

    // 路線相關設定
    let request = {
        origin: originPos,
        destination: destinationPos,
        travelMode: "DRIVING",
    };

    // for (var i = 0; i < markers.length; i++) {
    //     stepMarkers[i].setMap(null);
    // }
    // stepMarkers = [];
    // 繪製路線
    directionsService.route(request, function (result, status) {
        // 清空導航標示點
        if (stepMarkers.length !== 0) {
            for (let i = 0; i < stepMarkers.length; i++) {
                stepMarkers[i].setMap(null);
            }
            stepMarkers = [];
        }

        if (status == "OK") {
            // 回傳路線上每個步驟的細節
            let steps = result.routes[0].legs[0].steps;
            // 兩點導航路徑距離（公尺）
            console.log(result.routes[0].legs[0].distance.value);
            steps.forEach((e, i) => {
                // 加入地圖標記
                stepMarkers[i] = new google.maps.Marker({
                    position: {
                        lat: e.start_location.lat(),
                        lng: e.start_location.lng(),
                    },
                    map: map,
                    label: { text: i + "", color: "#fff" },
                });
                // 加入資訊視窗
                stepinfoWindows[i] = new google.maps.InfoWindow({
                    content: e.instructions,
                });
                // 加入地圖標記點擊事件
                stepMarkers[i].addListener("click", function () {
                    if (stepinfoWindows[i].anchor) {
                        stepinfoWindows[i].close();
                    } else {
                        stepinfoWindows[i].open(map, stepMarkers[i]);
                    }
                });
            });
            directionsDisplay.setDirections(result);
        } else {
            console.log(status);
        }
    });
}
// 使用者輸入地址，取得定位座標
function initAutocomplete() {
    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
    });
    let searchmarkers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }
        // Clear out the old markers.
        userMarkers.forEach((marker) => {
            marker.setMap(null);
        });
        userMarkers = [];
        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();
        places.forEach((place) => {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            // const icon = {
            //     url: place.icon,
            //     size: new google.maps.Size(71, 71),
            //     origin: new google.maps.Point(0, 0),
            //     anchor: new google.maps.Point(17, 34),
            //     scaledSize: new google.maps.Size(25, 25),
            // };
            // Create a marker for each place.
            userMarkers.push(
                new google.maps.Marker({
                    map,
                    icon:
                        "http://maps.google.com/mapfiles/kml/paddle/red-circle.png",
                    title: place.name,
                    position: place.geometry.location,
                })
            );
            userPos = place.geometry.location;

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}

// 取得使用者位置
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                userPos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                userMarkers.push(
                    new google.maps.Marker({
                        position: userPos,
                        icon:
                            "http://maps.google.com/mapfiles/kml/paddle/red-circle.png",
                        map: map,
                    })
                );

                map.setCenter(userPos);
            },
            function () {
                console.log("無法取得位置");
                // handleLocationError(true, infoWindow, map.getCenter());
            }
        );
    } else {
        console.log("未支援定位功能");
        // Browser doesn't support Geolocation
        // handleLocationError(false, infoWindow, map.getCenter());
    }
}

// 地圖中央回到使用者位置
document.querySelector(".move-back").addEventListener("click", function () {
    map.panTo(userPos);
});

//縣市選單
let countySelector = document.querySelector(".selectCounty");
let townSelector = document.querySelector(".selectTown");

//縣市選單變換監聽事件
document.querySelector(".selectCounty").addEventListener("change", addTownList);
document.querySelector(".selectTown").addEventListener("change", changeTown);

function changeTown(e) {
    renderList(countySelector.value, e.target.value);
}

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
    let list = document.querySelector(".card-list");
    let cardItem = document.querySelector("#card-template");
    list.innerHTML = "";

    for (var i = 0; i < ary.length; i++) {
        let idNum = ary[i].properties.id;
        let pharmacyName = ary[i].properties.name; //藥局名稱
        let maskAdult = ary[i].properties.mask_adult; //成人口罩數量
        let maskChild = ary[i].properties.mask_child; //兒童口罩數量
        let lat = ary[i].geometry.coordinates[1]; //經度
        let lng = ary[i].geometry.coordinates[0]; //緯度
        let address = ary[i].properties.address; //地址
        let phone = ary[i].properties.phone; //電話

        if (
            ary[i].properties.county == city &&
            ary[i].properties.town == town
        ) {
            let cloneContent = cardItem.content.cloneNode(true);
            let card = cloneContent.querySelector(".card");
            let adultMaskLeft = cloneContent.querySelector(".adult-mask");
            let childMaskLeft = cloneContent.querySelector(".child-mask");
            card.setAttribute("data-lat", lat);
            card.setAttribute("data-lng", lng);
            card.setAttribute("id", idNum);

            adultMaskLeft.setAttribute(
                "class",
                `adult-mask mask-left ${
                    maskAdult == 0
                        ? "gray"
                        : maskAdult < 1000
                        ? "orange"
                        : "green"
                }`
            );

            childMaskLeft.setAttribute(
                "class",
                `child-left mask-left ${
                    maskChild == 0
                        ? "gray"
                        : maskChild < 1000
                        ? "orange"
                        : "green"
                }`
            );

            cloneContent.querySelector(
                ".mask-left .adult-left"
            ).innerText = maskAdult;
            cloneContent.querySelector(
                ".mask-left .child-left"
            ).innerText = maskChild;

            cloneContent.querySelector(
                ".card-title"
            ).innerHTML = `${pharmacyName}<i class="fas fa-route"></i>`;
            cloneContent.querySelector(
                ".card-address"
            ).innerHTML = `<i class="fas fa-hospital-alt"></i>${address}`;
            cloneContent.querySelector(
                ".card-phone"
            ).innerHTML = `<i class="fas fa-phone-alt"></i>${phone}`;

            card.addEventListener("click", function (e) {
                let Lat = Number(e.currentTarget.dataset.lat);
                let Lng = Number(e.currentTarget.dataset.lng);

                let center = new google.maps.LatLng(Lat, Lng);

                //zoom要先調整 再移動作標 才會正常顯示出地圖
                //點選列表 定位到地圖中央
                map.zoom = 18;
                map.panTo(center);
            });

            let routeIcon = cloneContent.querySelector(".card-title i");

            // 導航圖示點擊事件
            routeIcon.addEventListener("click", function (e) {
                let Lat = Number(card.dataset.lat);
                let Lng = Number(card.dataset.lng);
                let myLatLng = new google.maps.LatLng({
                    lat: Lat,
                    lng: Lng,
                });
                // 執行設置導航路徑
                if (userPos !== undefined) {
                    directionGuide(userPos, myLatLng);
                }
                e.stopPropagation();
            });

            list.append(cloneContent);
        }
    }
}

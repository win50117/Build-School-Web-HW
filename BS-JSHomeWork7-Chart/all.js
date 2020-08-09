// var chartData = {
//     labels: ["美國", "日本", "泰國", "琉球", "紐西蘭", "澳洲"],
//     data: [8, 22, 13, 15, 17, 21]
// };
// console.log(JSON.stringify(chartData))
// var chartData;
var apiUrl =
    "https://raw.githubusercontent.com/win50117/FileStorage/master/ChartData.json";
var failapiUrl =
    "https://raw.githubusercontent.com/win50117/FileStorage/master/ChartData1.json";

var canvas = document.getElementById("barChart");
var canvas2 = document.getElementById("barChart2");
var canvas3 = document.getElementById("barChart3");
var canvas4 = document.getElementById("barChart4");

var myChart = new Chart(canvas, {
    type: "bar", //指定為Bar長條圖
    data: {
        labels: [],
        datasets: [
            {
                label: "旅遊行程投票",
                data: [],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255,99,132,1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    },
    options: {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    },
});

var myChart2 = new Chart(canvas2, {
    type: "bar", //指定為Bar長條圖
    data: {
        labels: [],
        datasets: [
            {
                label: "旅遊行程投票",
                data: [],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255,99,132,1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    },
    options: {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    },
});

var myChart3 = new Chart(canvas3, {
    type: "bar", //指定為Bar長條圖
    data: {
        labels: [],
        datasets: [
            {
                label: "旅遊行程投票",
                data: [],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255,99,132,1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    },
    options: {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    },
});

var myChart4 = new Chart(canvas4, {
    type: "bar", //指定為Bar長條圖
    data: {
        labels: [],
        datasets: [
            {
                label: "旅遊行程投票",
                data: [],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255,99,132,1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    },
    options: {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    },
});

// $.ajax({
//     url: apiUrl,
//     method: "get",
//     dataType: "json",
//     success: function (response) {
//         myChart3.data.labels = response.labels;
//         myChart3.data.datasets[0].data = response.data;
//         myChart3.update();
//         //消除loading動畫
//         $(".loading")[0].style.display = "none";
//     },
//     error: function () {
//         alert("wrong");
//     },
// });

//AJAX 1
$.ajax({
    url: apiUrl,
    method: "get",
    dataType: "json",
})
    .done(function (response) {
        myChart.data.labels = response.labels;
        myChart.data.datasets[0].data = response.data;
        myChart.update();
    })
    .fail(function () {
        alert("wrong");
    })
    .always(function () {
        console.log("AJAX1完成");
    });

//AJAX 2
$.ajax({
    url: failapiUrl,
    method: "get",
    dataType: "json",
})
    .done(function (response) {
        myChart2.data.labels = response.labels;
        myChart2.data.datasets[0].data = response.data;
        myChart2.update();
    })
    .fail(function () {
        $(".error").show();
        console.log("JQuery Ajax2 Error");
    })
    .always(function () {
        console.log("AJAX2完成");
    });

//AJAX 3
$.ajax({
    url: apiUrl,
    method: "get",
    dataType: "json",
})
    .done(function (response) {
        let timeout = setTimeout(function () {
            myChart3.data.labels = response.labels;
            myChart3.data.datasets[0].data = response.data;
            myChart3.update();
            //消除loading動畫
            $(".loading")[0].style.display = "none";
            clearTimeout(timeout);
        }, 3000);
    })
    .fail(function () {
        alert("wrong");
    })
    .always(function () {
        console.log("AJAX3完成");
    });

//AJAX 4
$.ajax({
    url: apiUrl,
    method: "get",
    dataType: "json",
})
    .done(function (response) {
        myChart4.data.labels = response.labels;
        myChart4.data.datasets[0].data = response.data;
        myChart4.update();
        let timeout = setTimeout(function () {
            let newLabels = [
                "台灣",
                "美國",
                "日本",
                "泰國",
                "琉球",
                "紐西蘭",
                "澳洲",
            ];
            let newData = [7, 10, 15, 7, 6, 3, 3];
            myChart4.data.labels = newLabels;
            myChart4.data.datasets[0].data = newData;
            myChart4.update();

            clearTimeout(timeout);
        }, 3000);
    })
    .fail(function () {
        alert("wrong");
    })
    .always(function () {
        console.log("AJAX4完成");
    });

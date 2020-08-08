// var chartData = {
//     labels: ["美國", "日本", "泰國", "琉球", "紐西蘭", "澳洲"],
//     data: [8, 22, 13, 15, 17, 21]
// };
// console.log(JSON.stringify(chartData))
// var chartData;
var apiUrl =
    "https://raw.githubusercontent.com/win50117/FileStorage/master/ChartData.json";

setInterval(test, 3000);
var canvas = document.getElementById("barChart");
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

// var jqxhr = $.ajax(apiUrl)
//     .done(function () {
//         chartData = JSON.parse(jqxhr.responseText)
//         drawChart()
//     })
//     .fail(function () {
//         alert("error");
//     })

function test() {
    $.ajax({
        url: apiUrl,
        method: "get",
        dataType: "json",
        success: function (response) {
            myChart.data.labels = response.labels;
            myChart.data.datasets[0].data = response.data;
            myChart.update();
            //消除loading動畫
            $(".loading")[0].style.display = "none";
        },
        error: function () {
            alert("wrong");
        },
    });
}

var earnings = document.getElementById("earnings-chart").getContext("2d");
var topProducts = document.getElementById("top-products").getContext("2d");
var earningsChart = new Chart(earnings, {
    type: "line",
    data: {
        labels: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
        ],
        datasets: [
            {
                label: "# of Votes",
                data: [
                    100000,
                    200000,
                    232000,
                    310521,
                    150354,
                    300000,
                    400000,
                    305100,
                    246000,
                    333000,
                    275000,
                    255000,
                ],
                backgroundColor: [
                    "rgba(0, 0, 0, 1)",
                    // "rgba(255, 99, 132, 0.2)",
                ],
                borderColor: [
                    "#39c5bb",
                    // "rgba(255, 99, 132, 1)",
                ],
                borderWidth: 3,
                fill: false,
                lineTension: 0,
                pointBackgroundColor: "#39c5bb",
                pointBorderWidth: 10,
                pointHitRadius: 10,
                pointBorderColor: "#39c5bb",
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

var topProductsChart = new Chart(topProducts, {
    type: "doughnut",
    data: {
        labels: ["香水1", "香水2", "香水3", "香水4", "香水5"],
        datasets: [
            {
                label: "# of Votes",
                data: [5, 10, 3, 7, 15],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
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
                // {
                //     ticks: {
                //         beginAtZero: true,
                //     },
                // },
            ],
        },
    },
});

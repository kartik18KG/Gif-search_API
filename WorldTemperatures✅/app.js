const xlabel = [];
const ylabel = [];
chartIt();
async function parseit() {
    const response = await fetch("./data.csv");
    const data = await response.text();
    const row = data.split("\n").slice(1);
    for (i = 0; i < row.length; i++) {
        var tRow = row[i].split(",");
        var year = tRow[0];
        xlabel.push(year);
        var temp = tRow[1];
        ylabel.push(parseFloat(temp) + 14);
        console.log(year, temp);
    }
}

async function chartIt() {
    await parseit();
    var ctx = document.getElementById("chart").getContext("2d");
    var myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: xlabel,
            datasets: [{
                label: "Average World Temperature",
                data: ylabel,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(132, 99, 255, 1)",
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        }
    });
}
console.log(ylabel);
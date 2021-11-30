let $elementrad = document.getElementById("DSCOVR_radialSpeed_6h");

let ctxrad = $elementrad.getContext("2d");

let DSCOVR_radialSpeed_6h;
let data = {},
    processedData = {},
    bz = {},
    speed = {},
    density = {};
let labels = [];

let gradientStroke = ctx.createLinearGradient(0, 0, 0, 300);

let names = [];

let jsonData = $.ajax({url: 'DSCOVR_radialSpeed_6h.json', dataType: 'json',}).done(function(results) {
        processedData = processData(results);
        
        gradientStroke.addColorStop(1, 
        'rgba(' + 
        Math.floor(255 * (Math.max.apply(Math, processedData.data1) - 200)/(400))
        + ',' + 
        (255 - Math.floor(255 * (Math.min.apply(Math, processedData.data1) - 200)/(400)))
        +',0,1)');
        
        gradientStroke.addColorStop(0, 
        'rgba(' + 
        (255 - Math.floor(255 * (Math.max.apply(Math, processedData.data1) - 200)/(400)))
        + ',' + 
        Math.floor(255 * (Math.min.apply(Math, processedData.data1) - 200)/(400))
        +',0,1)');
        
        data = {
            labels: processedData.labels,
            datasets: [{
                label: "Radial wind speed (6 hours)",
                fill: false,
                tension: 0.5,
                data: processedData.data1,
                borderColor: gradientStroke,
                //backgroundColor: processedData.backg,
                borderWidth: 1,
                radius: 0
            }
            ]
        };
    
    DSCOVR_radialSpeed_6h = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
});

let processData = function(jsonData) {
    let label = [];
    let dataset0 = [];
    let dataset1 = [];
    let bgC = [];
    for (let i = 1, total = jsonData.length; i < total; i++) {
        let date = new Date(Date.parse(jsonData[i][0] + "Z"));
        label[i] = ('0'+date.getHours()).slice(-2) + ":" + ('0'+date.getMinutes()).slice(-2);
        
        dataset0[i-1] = jsonData[i][1];
        dataset1[i-1] = jsonData[i][2];
        bgC[i-1] = "rgba(" + Math.floor(255 * (jsonData[i][2] - 200)/(400)) + ", " + (255 - Math.floor(255 * (jsonData[i][2] - 200)/(400))) + ", " + 0 + ", 1)";
    }
    return {
        labels: label,
        data0: dataset0,
        data1: dataset1,
        backg: bgC
    }
};
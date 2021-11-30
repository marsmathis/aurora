// DSCOVR Density 6 hours

let $element_DSCOVR_density_6h = document.getElementById("DSCOVR_density_6h");
let ctx_DSCOVR_density_6h = $element_DSCOVR_density_6h.getContext("2d");

let DSCOVR_density_6h;
let data_DSCOVR_density_6h = {};
let processedData_DSCOVR_density_6h = {};
let labels_DSCOVR_density_6h = [];

let width, height, gradient;
function getGradient(ctx, chartArea) {
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (gradient === null || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, '#00ff00');
    gradient.addColorStop(0.5, '#ffff00');
    gradient.addColorStop(1, '#ff0000');
  }

  return gradient;
}

/*let gradientStroke_DSCOVR_density_6h = ctx_DSCOVR_density_6h.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);*/

let jsonData_DSCOVR_density_6h = $.ajax({
	url: 'plasma_6h.json', 
	dataType: 'json'
}).done(function(results) {
	processedData_DSCOVR_density_6h = processData_DSCOVR_density_6h(results);
	/*gradientStroke_DSCOVR_density_6h.addColorStop(1, 'rgba(' + 
	Math.floor(255 * (Math.max.apply(Math, processedData_DSCOVR_density_6h.data) - 200)/(400)) 
	+ ',' + 
	(255 - Math.floor(255 * (Math.min.apply(Math, processedData_DSCOVR_density_6h.data) - 200)/(400)))
	+',0,1)');
	
	gradientStroke_DSCOVR_density_6h.addColorStop(0, 
	'rgba(' + 
	(255 - Math.floor(255 * (Math.max.apply(Math, processedData_DSCOVR_density_6h.data) - 200)/(400)))
	+ ',' + 
	Math.floor(255 * (Math.min.apply(Math, processedData_DSCOVR_density_6h.data) - 200)/(400))
	+',0,1)');*/
	
	data_DSCOVR_density_6h = {
		labels: processedData_DSCOVR_density_6h.labels,
		datasets: [{
			label: 'Flux density [n/cm³] (6 hours)',
			fill: false,
			tension: 0.5,
			data: processedData_DSCOVR_density_6h.data,
			// borderColor: gradientStroke_DSCOVR_density_6h,
			borderColor: function(context) {
                const chart = context.chart;
                const {ctx, chartArea} = chart;

                if (!chartArea) {
                    // This case happens on initial chart load
                    return null;
                }
                return getGradient(ctx, chartArea);
            },
			borderWidth: 1,
			radius: 0
		}]
	};
	
	DSCOVR_density_6h = new Chart(ctx_DSCOVR_density_6h, {
		type: 'line',
		data: data_DSCOVR_density_6h,
		options: {
			responsive: true,
			scales: {
				yAxis: {
					type: 'logarithmic',
					grid: {
						display: true,
						backgroundColor: '#ffffff'
					}
				}
			}
		}
	});
});

let processData_DSCOVR_density_6h = function(jsonData_DSCOVR_density_6h) {
	let label = [];
	let dataset = [];
	
	for (let i = 1, total = jsonData_DSCOVR_density_6h.length; i < total; i++) {
		let date = new Date(Date.parse(jsonData_DSCOVR_density_6h[i][0] + "Z"));
		label[i - 1] = ('0' + date.getHours()).slice(-2) + ":" + ('0' + date.getMinutes()).slice(-2);
		
		dataset[i - 1] = jsonData_DSCOVR_density_6h[i][1];
	}
	
	return {
		labels: label,
		data: dataset
	}
}

// DSCOVR Radial Speed 6 hours

let $element_DSCOVR_radialSpeed_6h = document.getElementById("DSCOVR_radialSpeed_6h");
let ctx_DSCOVR_radialSpeed_6h = $element_DSCOVR_radialSpeed_6h.getContext("2d");

let DSCOVR_radialSpeed_6h;
let data_DSCOVR_radialSpeed_6h = {};
let processedData_DSCOVR_radialSpeed_6h = {};
let labels_DSCOVR_radialSpeed_6h = [];

let gradientStroke_DSCOVR_radialSpeed_6h = ctx_DSCOVR_radialSpeed_6h.createLinearGradient(0, 0, 0, 300);

let jsonData_DSCOVR_radialSpeed_6h = $.ajax({
	url: 'plasma_6h.json', 
	dataType: 'json'
}).done(function(results) {
	processedData_DSCOVR_radialSpeed_6h = processData_DSCOVR_radialSpeed_6h(results);
	gradientStroke_DSCOVR_radialSpeed_6h.addColorStop(1, 'rgba(' + 
	Math.floor(255 * (Math.max.apply(Math, processedData_DSCOVR_radialSpeed_6h.data) - 200)/(400)) 
	+ ',' + 
	(255 - Math.floor(255 * (Math.min.apply(Math, processedData_DSCOVR_radialSpeed_6h.data) - 200)/(400)))
	+',0,1)');
	
	gradientStroke_DSCOVR_radialSpeed_6h.addColorStop(0, 
	'rgba(' + 
	(255 - Math.floor(255 * (Math.max.apply(Math, processedData_DSCOVR_radialSpeed_6h.data) - 200)/(400)))
	+ ',' + 
	Math.floor(255 * (Math.min.apply(Math, processedData_DSCOVR_radialSpeed_6h.data) - 200)/(400))
	+',0,1)');
	
	data_DSCOVR_radialSpeed_6h = {
		labels: processedData_DSCOVR_radialSpeed_6h.labels,
		datasets: [{
			label: 'Radial speed [km/s] (6 hours)',
			fill: false,
			tension: 0.5,
			data: processedData_DSCOVR_radialSpeed_6h.data,
			borderColor: gradientStroke_DSCOVR_radialSpeed_6h,
			borderWidth: 1,
			radius: 0
		}]
	};
	
	DSCOVR_radialSpeed_6h = new Chart(ctx_DSCOVR_radialSpeed_6h, {
		type: 'line',
		data: data_DSCOVR_radialSpeed_6h,
		options: {
			responsive: true,
		}
	});
});

let processData_DSCOVR_radialSpeed_6h = function(jsonData_DSCOVR_radialSpeed_6h) {
	let label = [];
	let dataset = [];
	
	for (let i = 1, total = jsonData_DSCOVR_radialSpeed_6h.length; i < total; i++) {
		let date = new Date(Date.parse(jsonData_DSCOVR_radialSpeed_6h[i][0] + "Z"));
		label[i - 1] = ('0' + date.getHours()).slice(-2) + ":" + ('0' + date.getMinutes()).slice(-2);
		
		dataset[i - 1] = jsonData_DSCOVR_radialSpeed_6h[i][2];
	}
	
	return {
		labels: label,
		data: dataset
	}
}

// DSCOVR Magnetic field 6 hours

let $element_DSCOVR_mag_6h = document.getElementById("DSCOVR_mag_6h");
let ctx_DSCOVR_mag_6h = $element_DSCOVR_mag_6h.getContext("2d");

let DSCOVR_mag_6h;
let data_DSCOVR_mag_6h = {};
let processedData_DSCOVR_mag_6h = {};
let labels_DSCOVR_mag_6h = [];

let gradientStroke_DSCOVR_mag_6h = ctx_DSCOVR_mag_6h.createLinearGradient(0, 0, 0, 300);

let jsonData_DSCOVR_mag_6h = $.ajax({
	url: 'mag_6h.json', 
	dataType: 'json'
}).done(function(results) {
	processedData_DSCOVR_mag_6h = processData_DSCOVR_mag_6h(results);
	gradientStroke_DSCOVR_mag_6h.addColorStop(0, 'rgba(' + 
	Math.floor(255 * (Math.max.apply(Math, processedData_DSCOVR_mag_6h.data1) - 10)/(20)) 
	+ ',' + 
	(255 - Math.floor(255 * (Math.min.apply(Math, processedData_DSCOVR_mag_6h.data1) - 10)/(20)))
	+',0,1)');
	
	gradientStroke_DSCOVR_mag_6h.addColorStop(1, 
	'rgba(' + 
	(255 - Math.floor(255 * (Math.max.apply(Math, processedData_DSCOVR_mag_6h.data1) - 10)/(20)))
	+ ',' + 
	Math.floor(255 * (Math.min.apply(Math, processedData_DSCOVR_mag_6h.data1) -10)/(20))
	+',0,1)');
	
	data_DSCOVR_mag_6h = {
		labels: processedData_DSCOVR_mag_6h.labels,
		datasets: [{
			label: 'Bz [nT] (6 hours)',
			fill: false,
			tension: 0.5,
			data: processedData_DSCOVR_mag_6h.data1,
			borderColor: gradientStroke_DSCOVR_mag_6h,
			borderWidth: 1,
			radius: 0
		},
		{
			label: 'Bt [nT] (6 hours)',
			fill: false,
			tension: 0.5,
			data: processedData_DSCOVR_mag_6h.data2,
			borderColor: '#666666',
			borderWidth: 1,
			radius: 0
		}	
		]
	};
	
	DSCOVR_mag_6h = new Chart(ctx_DSCOVR_mag_6h, {
		type: 'line',
		data: data_DSCOVR_mag_6h,
		options: {
			responsive: true,
		}
	});
});

let processData_DSCOVR_mag_6h = function(jsonData_DSCOVR_mag_6h) {
	let label = [];
	let dataset = [[],[]];
	
	for (let i = 1, total = jsonData_DSCOVR_mag_6h.length; i < total; i++) {
		let date = new Date(Date.parse(jsonData_DSCOVR_mag_6h[i][0] + "Z"));
		label[i - 1] = ('0' + date.getHours()).slice(-2) + ":" + ('0' + date.getMinutes()).slice(-2);
		
		dataset[0][i - 1] = jsonData_DSCOVR_mag_6h[i][3];
		dataset[1][i - 1] = jsonData_DSCOVR_mag_6h[i][6];
	}
	
	return {
		labels: label,
		data1: dataset[0],
		data2: dataset[1]
	}
}

// ACE EPAM

let $element_ACE_EPAM_24h = document.getElementById("ACE_EPAM_24h");
let ctx_ACE_EPAM_24h = $element_ACE_EPAM_24h.getContext("2d");

let ACE_EPAM_24h;
let data_ACE_EPAM_24h = {};
let processedData_ACE_EPAM_24h = {};
let labels_ACE_EPAM_24h = [];

let gradientStroke_ACE_EPAM_24h = ctx_ACE_EPAM_24h.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);

let jsonData_ACE_EPAM_24h = $.ajax({
	url: 'ace_epam.json', 
	dataType: 'json'
}).done(function(results) {
	processedData_ACE_EPAM_24h = processData_ACE_EPAM_24h(results);
	
	data_ACE_EPAM_24h = {
		labels: processedData_ACE_EPAM_24h.labels,
		datasets: [{
			label: '',
			fill: false,
			tension: 0.5,
			data: processedData_ACE_EPAM_24h.data1,
			borderColor: '#666666',
			borderWidth: 1,
			radius: 0
		},
		{
			label: 'Bt [nT] (6 hours)',
			fill: false,
			tension: 0.5,
			data: processedData_ACE_EPAM_24h.data2,
			borderColor: '#666666',
			borderWidth: 1,
			radius: 0
		},
		{
			label: 'Bt [nT] (6 hours)',
			fill: false,
			tension: 0.5,
			data: processedData_ACE_EPAM_24h.data3,
			borderColor: '#666666',
			borderWidth: 1,
			radius: 0
		},
		{
			label: 'Bt [nT] (6 hours)',
			fill: false,
			tension: 0.5,
			data: processedData_ACE_EPAM_24h.data4,
			borderColor: '#ff0000',
			borderWidth: 1,
			radius: 0
		},
		{
			label: 'Bt [nT] (6 hours)',
			fill: false,
			tension: 0.5,
			data: processedData_ACE_EPAM_24h.data5,
			borderColor: '#ff6600',
			borderWidth: 1,
			radius: 0
		},
		{
			label: 'Bt [nT] (6 hours)',
			fill: false,
			tension: 0.5,
			data: processedData_ACE_EPAM_24h.data6,
			borderColor: '#ffff00',
			borderWidth: 1,
			radius: 0
		},
		{
			label: 'Bt [nT] (6 hours)',
			fill: false,
			tension: 0.5,
			data: processedData_ACE_EPAM_24h.data7,
			borderColor: '#00ff00',
			borderWidth: 1,
			radius: 0
		},
		{
			label: 'Bt [nT] (6 hours)',
			fill: false,
			tension: 0.5,
			data: processedData_ACE_EPAM_24h.data8,
			borderColor: '#008800',
			borderWidth: 1,
			radius: 0
		},
		]
	};
	
	ACE_EPAM_24h = new Chart(ctx_ACE_EPAM_24h, {
		type: 'line',
		data: data_ACE_EPAM_24h,
		options: {
			responsive: true,
			scales: {
				xAxis: {
					reverse: true,
					gridLines: {
						color: '#ff0000'
					}
				},
				yAxis: {
					type: 'logarithmic'
				}
			}
		}
	});
});

let processData_ACE_EPAM_24h = function(jsonData_ACE_EPAM_24h) {
	let label = [];
	let dataset = [[],[],[],[],[],[],[],[]];
	
	for (let i = 0, total = 72; i < total; i++) {
		let date = new Date(Date.parse(jsonData_ACE_EPAM_24h[i].time_tag + "Z"));
		label[i] = ('0' + date.getHours()).slice(-2) + ":" + ('0' + date.getMinutes()).slice(-2);
		
		dataset[0][i] = jsonData_ACE_EPAM_24h[i].p1;
		dataset[1][i] = jsonData_ACE_EPAM_24h[i].p2;
		dataset[2][i] = jsonData_ACE_EPAM_24h[i].p3;
		dataset[3][i] = jsonData_ACE_EPAM_24h[i].p4;
		dataset[4][i] = jsonData_ACE_EPAM_24h[i].p5;
		dataset[5][i] = jsonData_ACE_EPAM_24h[i].p6;
		dataset[6][i] = jsonData_ACE_EPAM_24h[i].p7;
		dataset[7][i] = jsonData_ACE_EPAM_24h[i].p8;
	}
	
	return {
		labels: label,
		data1: dataset[0],
		data2: dataset[1],
		data3: dataset[2],
		data4: dataset[3],
		data5: dataset[4],
		data6: dataset[5],
		data7: dataset[6],
		data8: dataset[7],
		
	}
}

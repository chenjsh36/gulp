/*
    index loadchart.js
*/
/*变量初始化*/
option = {
                color: [
                    '#000'
                ],
				tooltip: {
					show: true
				},
				legend: {
					data:['销量']
				},
				xAxis: [
					{
						type: 'category',
						data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
					}
                    // ,
                    // {
                    //     type: 'category',
                    //     data: ["电视", "电脑", "手机", "汽车"]
                    // }
				],
				yAxis: [{
					type: 'value'
				}],
				series: [
                    {
                        "xAxisIndex": 0, // 指定使用哪个x横坐标
                        "yAxisIndex": 0, // 指定使用哪个y纵坐标
    					"name":"销量",
    					"type":"bar",
    					"data":[5, 20, 40, 10, 10, 20],
    				    "barGap": "100%", //柱子间距
                        "barWidth": "30",
                        "barGategoryGap": "50%",
                        "barMaxWidth": "60",
                        "barMinWidth": "20"
                    }
                    // ,{
                    //     "xAxisIndex": 1,
                    //     "yAxisIndex": 0,
                    //     "name":"销量",
                    //     "type":"bar",

                    //     "data":[12, 20, 30, 20, 14, 40]
                    // }
                ]
};
/*图表初始化*/
function initBarChart(option, theme) {
	theme_color = theme === 'normal' ? 'macarons' : theme;
	require.config({
		paths:{
			echarts: './../../widgets/echarts/echarts/build/dist/'
		}
	});
	require(
		[
			'echarts',
			'echarts/theme/'+ theme_color,
			'echarts/chart/bar'
		],
		function(ec, theme) {
			chart = ec.init(document.getElementById('chart'), theme);
			chart.setOption(option);
		}
	);
}
initBarChart(option, 'normal');

/*事件监听*/
$('.operate').on('click', '.size', function() {
	console.log('click');
	$('#chart').toggleClass('active');
	chart.resize();
});


$('.dropdown-toggle').dropdown();

$('#theme .dropdown-menu').on('click', 'li', function() {

	toggle = $(this).parents('#theme').find('.dropdown-toggle label');
	toggle.eq(0).text($(this).text());
	if ($(this).text() !== 'normal') {
		initBarChart(option, $(this).text());
	} else {
		initBarChart(option, 'normal');
	}
});


$('#bar-width-slider').slider({
    range: false,
    min: 0,
    max: 100,
    step: 1,
    value: 30,
    change: function(event, ui) {
        console.log(ui.value);
        option.series[0].barWidth = ui.value;
        chart.setOption(option);
    },
    slide: function(event, ui) {
        // console.log(ui.value);
        $('#bar-width label').text('barWidth(' + ui.value + '): ');
    }
});
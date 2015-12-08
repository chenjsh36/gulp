/*变量初始化*/
var option = {
    title : {
        text: '漏斗图',
        subtext: '纯属虚构'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}%"
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    legend: {
        data : ['展现','点击','访问','咨询','订单']
    },
    calculable : true,
    series : [
        {
            name:'漏斗图',
            type:'funnel',
            x: '10%',
            y: 60,
            //x2: 80,
            y2: 60,
            width: '80%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort : 'descending', // 'ascending', 'descending', 'none'
            gap : 0, // 数据间距
            itemStyle: {
                normal: {
                    // color: 各异,
                    borderColor: '#fff',
                    borderWidth: 1,
                    label: {
                        show: true,
                        position: 'inside'
                        // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                    },
                    labelLine: {
                        show: false,
                        length: 10,
                        lineStyle: {
                            // color: 各异,
                            width: 1,
                            type: 'solid'
                        }
                    }
                },
                emphasis: {
                    // color: 各异,
                    borderColor: 'red',
                    borderWidth: 5,
                    label: {
                        show: true,
                        formatter: '{b}:{c}%',
                        textStyle:{
                            fontSize:20
                        }
                    },
                    labelLine: {
                        show: true
                    }
                }
            },
            data:[
                {value:60, name:'访问'},
                {value:40, name:'咨询'},
                {value:20, name:'订单'},
                {value:80, name:'点击'},
                {value:100, name:'展现'}
            ]
        }
    ]
},
    theme = 'normal';

                    
/*图表初始化*/
function initChart(option, theme) {
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
			'echarts/chart/funnel'
		],
		function(ec, theme) {
			chart = ec.init(document.getElementById('chart'), theme);
			chart.setOption(option);
			// chart.setTheme(theme);
		}
	);
}
initChart(option, 'normal');

/*事件监听*/
$('.operate').on('click', '.size', function() {
	console.log('click');
	$('#chart').toggleClass('active');
	chart.resize();
});


$('.dropdown-toggle').dropdown();

$('#theme .dropdown-menu').on('click', 'li', function() {

	var toggle = $(this).parents('#theme').find('.dropdown-toggle label');
	toggle.eq(0).text($(this).text());
    theme = $(this).text();
	if (theme !== 'normal') {
		initChart(option, theme);
	} else {
		initChart(option, 'normal');
	}
});

$('#sort').on('change', 'input', function(){
    var newinput = $(this).val();
    console.log(newinput);
    if (/^[A-Za-z]+$/.test(newinput) === true) {
        option.series[0].sort = newinput;
        chart.setOption(option);
        console.log(option.series);
        // initChart(option, theme);
    } else {
        console.log('not true');
    }
});

$('#align').on('click', 'button', function(){
    $(this).addClass('active').siblings().removeClass('active');
    var align = $(this).text();
    console.log('align', align);
    option.series[0].funnelAlign = align;
    chart.setOption(option);
});
$('#legend-hover-link').on('click', 'button', function(){
    $(this).addClass('active').siblings().removeClass('active');
    var legend = $(this).text();
    console.log('#legend-hover-link:', legend);
    option.series[0].legendHoverLink = legend === 'true' ? true : false;
    chart.setOption(option);
});


/*jquery ui slider*/
$('#min-slider').slider({
    range: true,
    min: 0,
    max: 100,
    step: 1,
    values: [0,100],
    change: function(event, ui) {
        console.log(ui.values);
        option.series[0].min = ui.values[0];
        option.series[0].max = ui.values[1];
        chart.setOption(option);
    },
    slide: function(event, ui) {
        console.log(ui.values);
        $('#min label').text('min-max ( ' + ui.values[0] + ' ~ ' + ui.values[1] + ' ):');
    }
});

$('#min-size-slider').slider({
    range: true,
    min: 0,
    max: 100,
    step: 1,
    values: [0,100],
    change: function(event, ui) {
        console.log(ui.values);
        option.series[0].minSize = ui.values[0];
        option.series[0].maxSize = ui.values[1];
        chart.setOption(option);
    },
    slide: function(event, ui) {
        console.log(ui.values);
        $('#min-size label').text('minSize-maxSize (' + ui.values[0] + '% ~ ' + ui.values[1] + '% ):');
    }
});

$('#gap-slider').slider({
    range: false,
    min: 0,
    max: 100,
    step: 1,
    value: 0,
    change: function(event, ui) {
        console.log(ui.value);
        option.series[0].gap = ui.value;
        chart.setOption(option);
    },
    slide: function(event, ui) {
        console.log(ui.value);
        $('#gap label').text('gap(' + ui.value + '): ');
    }
});

$('#x1-slider').slider({
    range: false,
    min: 0,
    max: 100,
    step: 1,
    value: 0,
    change: function(event, ui) {
        console.log(ui.value);
        option.series[0].x = ui.value + '%';
        chart.setOption(option);
    },
    slide: function(event, ui) {
        console.log(ui.value);
        $('#x1 label').text('x(' + ui.value + '%): ');
    }
});


$('#y1-slider').slider({
    range: false,
    min: 0,
    max: 100,
    step: 1,
    value: 0,
    change: function(event, ui) {
        console.log(ui.value);
        option.series[0].y = ui.value + '%';
        chart.setOption(option);
    },
    slide: function(event, ui) {
        console.log(ui.value);
        $('#y1 label').text('y(' + ui.value + '%): ');
    }
});
$('#x2-slider').slider({
    range: false,
    min: 0,
    max: 100,
    step: 1,
    value: 0,
    change: function(event, ui) {
        console.log(ui.value);
        option.series[0].x2 = ui.value + '%';
        chart.setOption(option);
    },
    slide: function(event, ui) {
        console.log(ui.value);
        $('#x2 label').text('x2(' + ui.value + '%): ');
    }
});
$('#y2-slider').slider({
    range: false,
    min: 0,
    max: 100,
    step: 1,
    value: 0,
    change: function(event, ui) {
        console.log(ui.value);
        option.series[0].y2 = ui.value + '%';
        chart.setOption(option);
    },
    slide: function(event, ui) {
        console.log(ui.value);
        $('#y2 label').text('y2(' + ui.value + '%): ');
    }
});
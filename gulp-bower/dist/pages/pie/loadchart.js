/*变量初始化*/
var labelTop = {
    normal : {
        label : {
            show : true,
            position : 'center',
            formatter : '{b}',
            textStyle: {
                baseline : 'bottom'
            }
        },
        labelLine : {
            show : false
        }
    }
};
var labelFromatter = {
    normal : {
        label : {
            formatter : function (params){
                return 100 - params.value + '%';
            },
            textStyle: {
                baseline : 'top'
            }
        }
    }
};
var labelBottom = {
    normal : {
        color: '#ccc',
        label : {
            show : true,
            position : 'center'
        },
        labelLine : {
            show : false
        }
    },
    emphasis: {
        color: 'rgba(0,0,0,0)'
    }
};
var radius = [40, 55];
var option = {
    legend: {
        x : 'center',
        y : 'center',
        data:[
            'GoogleMaps','Facebook','Youtube','Google+','Weixin',
            'Twitter', 'Skype', 'Messenger', 'Whatsapp', 'Instagram'
        ]
    },
    title : {
        text: 'The App World',
        subtext: 'from global web index',
        x: 'center'
    },
    toolbox: {
        show : true,
        feature : {
            dataView : {show: true, readOnly: false},
            magicType : {
                show: true, 
                type: ['pie', 'funnel'],
                option: {
                    funnel: {
                        width: '20%',
                        height: '30%',
                        itemStyle : {
                            normal : {
                                label : {
                                    formatter : function (params){
                                        return 'other\n' + params.value + '%\n';
                                    },
                                    textStyle: {
                                        baseline : 'middle'
                                    }
                                }
                            }
                        } 
                    }
                }
            },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    series : [
        {
            type : 'pie',
            center : ['10%', '30%'],
            radius : [40, 60],
            x: '0%', // for funnel
            itemStyle : labelFromatter,
            // selectedMode: 'sigle',
            data : [
                {name:'other', value:56, itemStyle : labelBottom
            },
                {name:'Facebook', value:44,itemStyle : labelTop}
            ]
        },
        {
            type : 'pie',
            center : ['10%', '30%'],
            radius : [40, 80],
            x:'20%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'other', value:56, itemStyle : {
                                                        normal : {
                                                            color: 'rgba(0,0,0,0)',
                                                            label : {
                                                                show : true,
                                                                position : 'center'
                                                            },
                                                            labelLine : {
                                                                show : false
                                                            }
                                                        },
                                                        emphasis: {
                                                            color: 'rgba(0,0,0,0)'
                                                        }
                                                    }},
                {name:'Facebook', value:44,itemStyle : labelTop}
            ]
        },
        {
            type : 'pie',
            center : ['50%', '30%'],
            radius : radius,
            x:'40%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'other', value:65, itemStyle : labelBottom},
                {name:'Youtube', value:35,itemStyle : labelTop}
            ]
        },
        {
            type : 'pie',
            center : ['70%', '30%'],
            radius : radius,
            x:'60%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'other', value:70, itemStyle : labelBottom},
                {name:'Google+', value:30,itemStyle : labelTop}
            ]
        },
        {
            type : 'pie',
            center : ['90%', '30%'],
            radius : radius,
            x:'80%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'other', value:73, itemStyle : labelBottom},
                {name:'Weixin', value:27,itemStyle : labelTop}
            ]
        },
        {
            type : 'pie',
            center : ['10%', '70%'],
            radius : radius,
            y: '55%',   // for funnel
            x: '0%',    // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'other', value:78, itemStyle : labelBottom},
                {name:'Twitter', value:22,itemStyle : labelTop}
            ]
        },
        {
            type : 'pie',
            center : ['30%', '70%'],
            radius : radius,
            y: '55%',   // for funnel
            x:'20%',    // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'other', value:78, itemStyle : labelBottom},
                {name:'Skype', value:22,itemStyle : labelTop}
            ]
        },
        {
            type : 'pie',
            center : ['50%', '70%'],
            radius : radius,
            y: '55%',   // for funnel
            x:'40%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'other', value:78, itemStyle : labelBottom},
                {name:'Messenger', value:22,itemStyle : labelTop}
            ]
        },
        {
            type : 'pie',
            center : ['70%', '70%'],
            radius : radius,
            y: '55%',   // for funnel
            x:'60%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'other', value:83, itemStyle : labelBottom},
                {name:'Whatsapp', value:17,itemStyle : labelTop}
            ]
        },
        {
            type : 'pie',
            center : ['90%', '70%'],
            radius : radius,
            y: '55%',   // for funnel
            x:'80%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'other', value:89, itemStyle : labelBottom},
                {name:'Instagram', value:11,itemStyle : labelTop}
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
			'echarts/chart/pie'
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
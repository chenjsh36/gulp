

function setVal(elem, path, val) {
	var pathlist = path.split('.'),
		obj = elem,
		i = 0, len
		;
	for(i = 0, len = pathlist.length; i < len - 1; i++) {
		console.log(pathlist[i]);
		if (!obj[pathlist[i]]) {
			obj[pathlist[i]] = {};
		}		
		obj = obj[pathlist[i]];
	}
	console.log('last: ', elem, obj, pathlist[i], val);
	obj[pathlist[i]] = val;
	return elem;
}

$('#background-color').on('change', 'input', function(){
	console.log('change');
	console.log(option);
	setVal(option, 'backgroundColor', $(this).val());
	chart.setOption(option);
});
$('#color').on('change', 'input', function(){
	console.log('change');
	console.log(option);
	var arr = [];
	arr.push($(this).val());
	setVal(option, 'color', arr);
	chart.setOption(option);
	chart.refresh();
});


$('#calculable').on('click', 'button', function(){
	$(this).addClass('active').siblings().removeClass('active');
	setVal(option, 'calculable', $(this).text());
	chart.setOption(option);
});


$('#animation').on('click', 'button', function(){
	$(this).addClass('active').siblings().removeClass('active');
	setVal(option, 'animation', $(this).text());
	chart.setOption(option);
});


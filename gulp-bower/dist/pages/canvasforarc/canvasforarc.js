function drawProcess() {
    // 选出页面上所有class为process的canvas元素,然后迭代每一个元素画图(这里用Jquery的选择器选的)
	$('canvas.process').each(function() {
            // 第一部先拿到canvas标签中间的文字,就是那个61%(这里的stringTrim方法是我自己的方法,去前后空格的方法很多的,这里就不贴出来了)
		// var text = commonutil.stringTrim($(this).text());
		var text = $(this).text().trim();
		var process = text.substring(0, text.length-1);
                
            // 一个canvas标签
		var canvas = this;
            // 拿到绘图上下文,目前只支持"2d"
		var context = canvas.getContext('2d');
		// 将绘图区域清空,如果是第一次在这个画布上画图,画布上没有东西,这步就不需要了
		context.clearRect(0, 0, 48, 48);
		
		// ***开始画一个灰色的圆
		context.beginPath();
           // &nbsp;// 坐标移动到圆心
		context.moveTo(24, 24);
            // 画圆,圆心是24,24,半径24,从角度0开始,画到2PI结束,最后一个参数是方向顺时针还是逆时针
		context.arc(24, 24, 24, 0, Math.PI * 2, false);
		context.closePath();
            // 填充颜色
		context.fillStyle = '#ddd';
		context.fill();
            // ***灰色的圆画完
		
		// 画进度
		context.beginPath();
            // 画扇形的时候这步很重要,画笔不在圆心画出来的不是扇形
		context.moveTo(24, 24);
            // 跟上面的圆唯一的区别在这里,不画满圆,画个扇形
		context.arc(24, 24, 24, 0, Math.PI * 2 * process / 100, false);
		context.closePath();
		context.fillStyle = '#e74c3c';
		context.fill();

		// 画内部空白
		context.beginPath();
		context.moveTo(24, 24);
		context.arc(24, 24, 21, 0, Math.PI * 2, true);
		context.closePath();
		context.fillStyle = 'rgba(255,255,255,1)';
		context.fill();
		
		// 画一条线
		context.beginPath();
		context.arc(24, 24, 18.5, 0, Math.PI * 2, true);
		context.closePath();
        // 与画实心圆的区别,fill是填充,stroke是画线
		context.strokeStyle = '#ddd';
		context.stroke();
		
        //在中间写字
	    context.font = "bold 9pt Arial";
	    context.fillStyle = '#e74c3c';
	    context.textAlign = 'center';
	    context.textBaseline = 'middle';
	    context.moveTo(24, 24);
	    context.fillText(text, 24, 24);
	});
}
drawProcess();
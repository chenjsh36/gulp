###
	hover 按钮效果js
###
flipWrap = ()->
	@flip_w = 0
	@flip_h = 0
	@flip_html = '<div class="line-top"></div><div class="line-right"></div><div class="line-bottom"></div><div class="line-left"></div>'
	@flip_elem = undefined
	return @

flipWrap.prototype =
	init: (obj)->
		console.log(obj)
		@flip_elem = obj
		# @flip_w = @flip_elem.outerWidth()
		# @flip_h = @flip_elem.outerHeight()
		@flip_elem.append(@flip_html)
		@flip_elem.addClass('flip-wrap')
		context = @
		@flip_elem.hover(
				()->
					context.lineIn($(this))
				,
				()->
					context.lineOut($(this))
			)
		return @
	lineIn: (obj)->
		obj.find('.line-top').css('left', '100%')
		obj.find('.line-right').css('top', '-100%')
		obj.find('.line-bottom').css('left', '-100%')
		obj.find('.line-left').css('top', '100%')

	lineOut: (obj)->
		obj.find('.line-top').css('left', '-100%')
		obj.find('.line-right').css('top', '100%')
		obj.find('.line-bottom').css('left', '100%')
		obj.find('.line-left').css('top', '-100%')
# test example 
		# console.log(flipWrap);
		# console.log(flipWrap.prototype);
		# flip_1 = new flipWrap();
		# flip_1.init($('.img-wrap'));

		# flip_2 = new flipWrap();
		# flip_2.init($('.text-item'));
# 四边梯形的初始化
window_ms = {
	w: $('body').width(),
	h: $('body').height()
}
triangle_ms = {
	w: parseInt($('.window-left .triangle-bottomleft').css('border-bottom').split(' ')[0]),
	h: parseInt($('.window-left .triangle-bottomleft').css('border-bottom').split(' ')[0]),
}
$('.window-left').find('.rectangular').height((window_ms.h - 2 * triangle_ms.h) + 'px');


# 左边梯形列表的初始化
list_items = $('.select-list .select-item')

console.log(list_items)
for item in list_items
	console.log item
	flip = new flipWrap()
	flip.init($(item))
# for (i = 0, len = list_items.length; i < len; i++) {
# 	flip.init(list_items[i]);
# }


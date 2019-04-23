//content1
$('.content1 .div_right_ul li').hover(function(){
	$(this).find('.li_1').hide();
	$(this).find('.li_2').show();
	$(this).siblings().find('.li_1').show();
	$(this).siblings().find('.li_2').hide();
},function(){});
//content2 3 4
$('.content2 .left li,.content3 li,.content4 li').hover(function(){
	$(this).find('p').css({'bottom':'10px'});
},function(){
	$(this).find('p').css({'bottom':'-40px'});
})
//content6
$('#content6_lunbo_prev').on('click',function(){
	var para = $('#content6_lunbo ul li:first')
	$('#content6_lunbo ul').append(para)
})
$('#content6_lunbo_next').on('click',function(){
	var para = $('#content6_lunbo ul li:last')
	$('#content6_lunbo ul').prepend(para)
})

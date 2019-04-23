
//content4
$('.content4 .div_right_ul li').hover(function(){
	$(this).find('.li_1').hide();
	$(this).find('.li_2').show();
	$(this).siblings().find('.li_1').show();
	$(this).siblings().find('.li_2').hide();
},function(){});

//content5	
var element = $('#content5_lunbo_list')
$('#content5_lunbo_prev').on('click',function(){
	var para = $('#content5_lunbo_list div:first')
	element.append(para)
})
$('#content5_lunbo_next').on('click',function(){
	var para = $('#content5_lunbo_list div:last')
	element.prepend(para)
})
var timer1;
function play1() {
	timer1 = setInterval(function () {
		$('#content5_lunbo_next').click()
	}, 2000)
}
play1();
function stop1() {
	clearInterval(timer1);
}
var container1 = document.getElementById('content5_lunbo');
container1.onmouseover = stop1;
container1.onmouseout = play1;
//content6
$('.content6 .left .main_nav li').hover(function(){
	var thisIndex = $(this).index()
	$(this).addClass('on');
	$(this).siblings().removeClass('on')
	$('.content6 .left .main_list ul:eq('+ thisIndex +')').show().siblings().hide()
})
//content7
var el = $('.content7 .xwdt ul');
plays(el,1500);

$('.content7 .main .left li').hover(function(){
	$(this).find('p').css({'bottom':'10px'});
},function(){
	$(this).find('p').css({'bottom':'-40px'});
})
//content8
$('.content8 .ysj_xxk_nav li').hover(function(){
	var thisIndex = $(this).index()
	$(this).addClass('on').find('.list ,.ysj_xxk_img').removeClass('dn');
	$(this).siblings().removeClass('on').find('.list ,.ysj_xxk_img').addClass('dn');
})
//content10
var el = $('.content10 .xwdt ul');
plays(el,1500);

$('.content10 .main .right li').hover(function(){
	$(this).find('p').css({'bottom':'10px'});
},function(){
	$(this).find('p').css({'bottom':'-40px'});
})
//content11
$(".content11 .main_nav li").on("click",function(){
	$(this).addClass('on').siblings().removeClass('on')
	$(".content11 .main_list .main_listdiv:eq("+$(this).index()+")").show().siblings().hide();
})

$('.qml_lunbo_prev').on('click',function(){
	var thisUl = $(this).parents(".qml_lunbo") .find("ul")
	console.log(thisUl)
	var para = thisUl.find('li:first')
	thisUl.append(para)
})
$('.qml_lunbo_next').on('click',function(){
	var thisUl = $(this).parents(".qml_lunbo") .find("ul")
	var para = thisUl.find('li:first')
	thisUl.append(para)
})
//content15
var el = $('.content15 .xwdt ul');
plays(el,1500);


$(function(){
	
//content_zxss_left 	
$(".content_zxss_left li").hover(function(){
	$(this).find('.div_2').stop().animate({top:'0'},300)
},function(){
	$(this).find('.div_2').stop().animate({top:'142px'},300)
});
//content_tjxx
$('.content_tjxx li').hover(function(){
	$(this).find('.li_top_div2').stop().animate({top:'0'})
},function(){
	$(this).find('.li_top_div2').stop().animate({top:'228px'})
})

});
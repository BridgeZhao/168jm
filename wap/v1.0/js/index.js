
//创头条 start
function AutoScroll(obj) {
	$(obj).find("ul:first").animate({
		marginTop: "-26px"
	}, 500, function() {
		$(this).css({
			marginTop: "0px"
		}).find("li:first").appendTo(this);
	});
} 
$(document).ready(function() {
	setInterval('AutoScroll("#ctt")', 2000)
});
//创头条 end

$('.main_2 .main_2_nav').on('click','li',function(){
	var thisIndex = $(this).index()
	$(this).addClass('on').siblings('li').removeClass('on')
	$('.main_2 .main_2_list ul').eq(thisIndex).show().siblings('ul').hide()
})
$('.main_4 .main_4_nav').on('click','li',function(){
	var thisIndex = $(this).index()
	$(this).addClass('on').siblings('li').removeClass('on')
	$('.main_4 .main_4_list ul').eq(thisIndex).show().siblings('ul').hide()
})


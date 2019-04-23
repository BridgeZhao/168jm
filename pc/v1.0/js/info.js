//餐饮排行榜
$('.right_div1 .right_div1_ul li').hover(function(){
	$(this).find('.li_1').hide();
	$(this).find('.li_2').show();
	$(this).siblings().find('.li_1').show();
	$(this).siblings().find('.li_2').hide();
},function(){});
//换一批
$('.content #clickHuan h4 span').on('click',function(){
	var para = $('#clickHuan').find('ul').last();
	$('#clickHuan .clickHuan_main').prepend(para)
})

//nav 滚动事件
var navPfTop = $('.positionF').offset().top; 
var navPfH = $('.positionF').outerHeight();
var content1H = $('.content').outerHeight();
var navInner = navPfTop + content1H - navPfH;

$(document).scroll(function(){
	var scroH = $(document).scrollTop();
	if(scroH >= navPfTop){
		if(scroH < navInner){
			$('.positionF').css({'top':scroH - navPfTop})
		}else{
			return false;
		}
	}else{
		$('.positionF').css({'top':'0'})
	}
})
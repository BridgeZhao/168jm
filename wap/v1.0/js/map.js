window.onload=function(){
	$('#main_detail_nav').on('click','li',function(){
		var this_ = $(this)
		$('.main_detail_bottom .zksq').click();
		this_.addClass('active').siblings().removeClass('active')
		var thisListTop = $('.main_detail_content .list').eq(this_.index()).offset().top 
		var mainNavH = $('#main_detail_nav').outerHeight()
		$(document).scrollTop(thisListTop - mainNavH) 
	})
	var mainDH = $('.main_detail').outerHeight()
	var mainDT = $('.main_detail').offset().top
	$(document).scroll(function(){
	  	var docTop = $(document).scrollTop()
//	  	console.log(docTop,mainDT,mainDT + mainDH)
//	  	console.log(docTop > mainDT , docTop < mainDT + mainDH)
	  	if(docTop > mainDT && docTop < mainDT + mainDH){
	  		$('.main_detail #main_detail_nav').addClass('positionF')
	  	}else{
	  		$('.main_detail #main_detail_nav').removeClass('positionF')
	  	}
	})
	//展开收起
	$('.main_detail_bottom .zksq').on('click',function(){
		$(this).hide()
		$('.main_detail_bottom .zksq1').show()
		$('.main_detail_content').removeClass('maxheight5')
	})
	$('.main_detail_bottom .zksq1').on('click',function(){
		$(this).hide()
		$('.main_detail_bottom .zksq').show()
		$('.main_detail_content').addClass('maxheight5')
	})
}
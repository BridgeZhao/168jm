$("#cpy_def_click").on('click',function(){
	if( $(".cpy_def_text").hasClass('maxheight')){
		$(this).text("收起>>");
		$(".cpy_def_text").removeClass("maxheight")
	}else{
		$(this).text("查看更多>>");
		$(".cpy_def_text").addClass("maxheight")
	}
	
})

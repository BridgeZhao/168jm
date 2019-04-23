$(".section_tab #section_tab_span1").on('click',function(){
	$(this).addClass('active');
	$(".section_tab #section_tab_span2").removeClass('active')
	$('#remen').show()
	$('#fenlei').hide()
})
$(".section_tab #section_tab_span2").on('click',function(){
	$(this).addClass('active');
	$(".section_tab #section_tab_span1").removeClass('active')
	$('#remen').hide()
	$('#fenlei').show()
})

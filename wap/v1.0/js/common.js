(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
$(function(){
	$("body").show();
});
//header start
$('header .header_div_right').on('click',function(){
	$('.bg').show()
	$('.header_right_list').slideDown();
})
$('.bg').on('click',function(){
	$(this).hide()
	$('.header_right_list').slideUp();
})
$('.header_div_center').on('click',function(){
	$('.hdc_search_div').show()
})
$('.hdc_search_div .left').on('click',function(){
	$('.hdc_search_div').hide()
})
function search(){
    window.location.href = "m.168jm.cn?q=" + $("#searchPage").val();
}
//header end
//下拉加载
var myScroll=null;
function newScroll(){
    myScroll = new IScroll(".wrap-ctn", {
        mouseWheel: true,
        preventDefault: false,
        preventDefaultException: {tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A)$/},
    });
    
    document.addEventListener('touchmove', function (e) {
//      e.preventDefault();
    }, false);
}
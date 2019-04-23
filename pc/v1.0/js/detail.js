
//品牌首页，详情，咨询切换 start
$('.content_nav_center li').on('click',function(){
    $(this).addClass('on').siblings('li').removeClass('on');
    var thisId = $(this).attr("data_id");
    if(thisId == 'ppsy'){
        $('.content_main_1').show();
        $('.content_main_2').hide();
    }else{
        $('.content_main_1').hide();
        $('.content_main_2').show();
        if(thisId == 'ppxq'){
            $('.content_main_2main').show();
            $('.content_main_3main').hide();

        }else{
            $('.content_main_2main').hide();
            $('.content_main_3main').show();
        }
    }
})
//品牌首页，详情，咨询切换 end
//品牌详情  nav start
var ulH = $('.cm2ml_nav ul').outerHeight()
var listlen = $('.cm2ml_main div').length
$(document).on('scroll',function(){
    var a = $('.cm2_main_left'), b =a.offset();
    var docTop = $(document).scrollTop();
    var domH   = a.outerHeight();
    var	domBottom = b.top + domH;
    if(docTop >= b.top && docTop < domBottom){
        $('.cm2ml_nav ul').css({'position':'fixed','top':'0px', 'left': b.left});
        for(i = 0 ; i < listlen ; i++){
        	if(docTop >= $('.cm2ml_main div').eq(i).offset().top - ulH){
        		$('.cm2ml_nav li').eq(i).addClass('on').siblings('li').removeClass('on');
       		}
        }
       
    }else{
        $('.cm2ml_nav ul').css({'position':'absolute','top':'0px', 'left': '0px'});
    }
})
$('.cm2ml_nav li').on('click',function(){
    var thisIndex = $(this).index()
    $(this).addClass('on').siblings('li').removeClass('on');
    $(document).scrollTop($('.cm2ml_main div').eq(thisIndex).offset().top - ulH)
})
//品牌详情  nav end
// 资料页``````````````````````左边展示切换图 start
$('#cm2tl_lun .swiper-wrapper img').eq(0).show();
var i = 0;
var dl = setInterval(mov, 3000);
var dcar = $('#cm2tl_lun .swiper-wrapper img').length
for (var a = 1; a <= dcar; a++ ) {
    var html = '';
    html += '<span>'+a+'</span>';
    $('#cm2tl_lun__buttons').append(html);
    $('#cm2tl_lun__buttons span').eq(0).addClass('active')
}

function dtcar(i) {
    $('#cm2tl_lun .swiper-wrapper img').eq(i).show().siblings().hide();
    $('#cm2tl_lun__buttons span').eq(i).addClass('active').siblings().removeClass('active')
}
function mov() {
    if (i < dcar - 1) {
        i++
    } else {
        i = 0
    }
    dtcar(i);
}
// 鼠标移入时候
$('#cm2tl_lun .swiper-wrapper img').hover(function() {
    clearInterval(dl);
}, function() {
    dl = setInterval(mov, 3000);
})
$('#cm2tl_lun__buttons').on('click','span', function(){
    i = $(this).index();
    dtcar(i);
    clearInterval(dl);
});
// 资料页``````````````````````左边展示切换图 end
//底部 form 表单
$('.footer_form .footer_form_close').on('click', function(){
	footer_form()
})
$('.footer_form_sq').on('click',function(){
	footer_form()
})
function footer_form(){
	$('.footer_form').slideToggle();
	$('.footer_form_sq').slideToggle();
}

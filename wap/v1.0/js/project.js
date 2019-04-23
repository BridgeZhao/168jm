var HG, navbut, headsearch;
$(function () {
    setTimeout(function(){
       nhg()  
    },5) 
    
    function nhg() {
        HG = document.documentElement.clientHeight;//可视区域高度
        navbut = $('.pf_footer').outerHeight(true);//底部导航栏高度
        headsearch = $('.header_div').outerHeight(true);//顶部搜索栏高度
        $('body').height(HG).css({'overflow': 'hidden'});
        $('html').height(HG).css({'overflow': 'hidden'});

        $('.project-left').height(HG - (navbut + headsearch)).css({'overflow-y': 'auto'});//project-left高度
        // 项目快高度
        $('.project-right').height(HG - (navbut + headsearch)).css({'overflow-y': 'auto'});
        //project-nav定位    
    }
})
$('.project-left ul li a').click(function () {
    $(this).parent().addClass('active').siblings().removeClass('active');
    var thisIndex = $(this).parent().index()
    $('.project-right .item').eq(thisIndex).show().siblings().hide()
})

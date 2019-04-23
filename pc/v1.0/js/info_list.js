//餐饮排行榜
//$('.right_div1 .right_div1_ul li').hover(function(){
//	$(this).find('.li_1').hide();
//	$(this).find('.li_2').show();
//	$(this).siblings().find('.li_1').show();
//	$(this).siblings().find('.li_2').hide();
//},function(){});
//换一批
$('.content #clickHuan h4 span').on('click',function(){
	var para = $('#clickHuan').find('ul').last();
	$('#clickHuan .clickHuan_main').prepend(para)
})
//分页
var inlist_id = $('#id').val();
var url = '';
if(inlist_id != ''){
    url = 'https://www.168jm.cn/home/index/inlist/id/'+inlist_id+'/p/';

}else {
    url = 'https://www.168jm.cn/home/index/inlist/p/';
}

$("#Paging").page({
    totalPages:$("#page_count").val(),//分页总数
    initPage: $("#p").val(),//初始页数
    liNums:5,//分页的数字按钮数(建议取奇数)
    activeClass: 'active',//active类
    firstPage: '首页',//首页按钮名称
    lastPage: '尾页',//末页按钮名称
    prv: '上一页',//前一页按钮名称
    next: '下一页',//后一页按钮名称
    hasFirstPage: true,//是否有首页按钮
    hasLastPage: true,//是否有末页按钮 
    hasPrv: true,//是否有前一页按钮
    hasNext: true,//是否有后一页按钮
    activeClass: 'pagenow', //active 类样式定义
    PageLink:url,
    callBack: function (Page) {	
        LoadPageNow(Page);
        $("html,body").animate({scrollTop: $("#header").offset().top}, 300);
    }
});
function LoadPageNow(page){
    var str = window.location.href.split('/');
    if(page == 1){
        window.location.href = '/'+str[3]+ '/index.html';
    }else {
        window.location.href = '/'+str[3]+ '/index_'+page+'.html';
    }
}
$('#Paging .PageMain li').each(function(){
	var str = window.location.href.split('/');
	var thisA = $(this).find('a');
	if(thisA.text() == 1){
        thisA.attr('href',str[0] +'/'+str[1] +'/'+str[2]+'/'+str[3]+'/index.html');
    }else {
        thisA.attr('href',str[0] +'/'+str[1]+'/'+str[2]+'/'+str[3]+'/index_'+ thisA.text() +'.html');
    }
});
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
//nav
var abc = "0";

var industryOnIndex = $('.content1_nav .industry a.on').index();
$('.content1_nav .sub_industry .industry_list_div').eq(industryOnIndex-2).show().siblings('.industry_list_div').hide();

$('.content1_nav .nav_list').on('click' ,'a',function(){
    $(this).addClass('on').siblings().removeClass('on');
    var quanbuOn = $('.content1_nav .industry .quanbu').hasClass('on')
    var industryclick = $(this).parents('.nav_list').hasClass('industry')
    if(!quanbuOn){
        $('.content1_nav .sub_industry').show()
        if(industryclick){
            var thisIndex = $(this).index();
            $('.content1_nav .sub_industry .industry_list_div').eq(thisIndex-2).show().siblings('.industry_list_div').hide();
        }
    }else{
        $('.content1_nav .sub_industry').hide()
    }

    var thisId = $(this).attr('data-id');
    $(this).parents('.nav_list').find('.hide_input').val(thisId)
    var data_msg = {
        'category_1' : $('.hide_input.category_1').val(),
        'category_2' : $('.hide_input.category_2').val(),
        'invest_money' : $('.hide_input.invest_money').val(),
        'name':$('#name').val(),
        'p':$("#Paging").attr("dataPi"),
    };
    listAjax(data_msg);
})

function listAjax(data_msg){
    if(data_msg['category_1'] == undefined){
        data_msg['category_1'] = '';
    }
    if(data_msg['category_2'] == undefined){
        data_msg['category_2'] = '';
    }
    if(data_msg['invest_money'] == undefined){
        data_msg['invest_money'] = '';
    }
   /* if(data_msg['province'] == undefined){
        data_msg['province'] = '';
    }*/
    if(data_msg['name'] == undefined){
        data_msg['name'] = '';
    }
    if(data_msg['p'] == ''){
        data_msg['p']=1;
    }
    $.ajax({
        type : "post",
        url : "/home/index/search",
        data : {
            'category_1' : data_msg['category_1'],
            'category_2' : data_msg['category_2'],
            'invest_money' : data_msg['invest_money'],
           /* 'province' : data_msg['province'],*/
            'name':data_msg['name'],
            'p':data_msg['p']
        },
        success : function(data) {
            //分页
            $("#page_count").val(data['page_count']);
            $("#p").val(data['p']);
            $(".hide_input.category_1").val(data['search']['category_1']);
            $(".hide_input.category_2").val(data['search']['category_2']);
            $('.hide_input.invest_money').val(data['search']['invest_money']);
            $('#name').val(data['search']['name']);


            var htmls = '<p class="site">当前位置： '+data['title']+'</p>';
            $("#site").html(htmls);
            var htm = '';
                htm += '为你找到<span class="span_f18">'+data['total_count']+'</span>个商家·品牌项目';
                htm += '<span class="input">';
                htm += '<span class="input_prev"><a href="#"><</a></span>';
                htm += '<span class="span1"><span class="number">'+data['p']+'</span>/'+data['page_count']+'</span> ';
                htm += '<span class="input_next"><a href="#">></a></span>';
                htm += '</span>';
            $("#info_search").html(htm);
            var html='';
            if (data['data'].length > 0) {
                for (var i = 0; i < data['data'].length; i++) {
                    html += '<li><a href="'+data["data"][i]["url"]+'">';
                    if(data["data"][i]["logo"]){
                        html += '<img class="li_img fl" src="'+data["data"][i]["logo"]+'"/>';
                    }else {
                        html += '<img class="li_img fl" src="/Public/Home/icon/jiamologo1.jpg" alt="www.168jm.com" />';
                    }
                    html += '<div class="li_text fl">';
                    html += '<h6>'+data["data"][i]["name"]+'</h6>';
                    html += '<p class="p1">'+data["data"][i]["company_name"]+'</p>';
                    html += '<p class="p2"><span>'+data["data"][i]["pro_province"];
                    if(data["data"][i]["pro_city"]){
                        html += ' - '+data["data"][i]["pro_city"]+'';
                    }
                    html += '</span>';
                    html += '<span>'+data["data"][i]["category_name_1"]+' - '+data["data"][i]["category_name_2"]+'</span></p>';
                    html += '<p class="p3">投资金额：<span>'+data["data"][i]["invest_money"]+'</span></p>';
                    html += '</div><div class="li_right fr">';
                    html += '<p class="p1">留言咨询</p>';
                    html += '<p class="p2">已咨询<span>'+data["data"][i]["att_number"]+'</span>人</p>';
                    html += '</div></a></li>';
                }
            } else {
                html += '';
            }
            $("#body").html(html);
            fenye();
            abc = "1";
            var pageMainLen = $('.PageMain li').length;
            if(pageMainLen>$("#page_count").val() ){
                // console.log(pageMainLen)
                // console.log($("#page_count").val())
                for ( i = $("#page_count").val() ; i < pageMainLen ; i++ ){
                    console.log(i)
                    $('.PageMain li').eq(i).empty();
//                  $('.PageMain').find('li:eq(i)').remove();
                }
            }
        }
    });
}
var data_msg1 = {
    'category_1' : $('.hide_input.category_1').val(),
    'category_2' : $('.hide_input.category_2').val(),
    'invest_money' : $('.hide_input.invest_money').val(),
    'name':$('#name').val(),
    'p':$('#p').val()
}
listAjax(data_msg1);


//function  fenye (){
//  if(abc == "0"){
//      $("#Paging").page({
//          totalPages:$("#page_count").val(),//分页总数
//          initPage:$("#p").val(),//初始页数
//          liNums:5,//分页的数字按钮数(建议取奇数)
//          activeClass: 'active',//active类
//          firstPage: '首页',//首页按钮名称
//          lastPage: '尾页',//末页按钮名称
//          prv: '上一页',//前一页按钮名称
//          next: '下一页',//后一页按钮名称
//          hasFirstPage: true,//是否有首页按钮
//          hasLastPage: true,//是否有末页按钮
//          hasPrv: true,//是否有前一页按钮
//          hasNext: true,//是否有后一页按钮
//          PageLink:'http://47.99.93.86/home/index/project/p/',
//          activeClass: 'pagenow', //active 类样式定义
//          callBack: function (Page) {
//              LoadPageNow(Page);
//              $("html,body").animate({scrollTop: $("#header").offset().top}, 300);
//          }
//      });
//  };
//}
var el = $('.left_top_l .left_top_llist');
plays(el,1500);

//项目列表
$('.left_top_r .input_prev').on('click', function(){
    $("#Paging .PrvPage ").click()
})
$('.left_top_r .input_next').on('click', function(){
    $("#Paging .NextPage  ").click()
})



//function LoadPageNow(page){
//  var data = {
//      'category_1' : $('.hide_input.category_1').val(),
//      'category_2' : $('.hide_input.category_2').val(),
//      'invest_money' : $('.hide_input.invest_money').val(),
//      'name':$('#name').val(),
//      'p':page
//  };
// listAjax(data)
//}
//fenyebox(1) strat
function pageFenye(){
    var pageStr = $("#Paging").attr("dataPage")
    var pageStr1 = $("#Paging").attr("dataPi")
    //console.log(pageStr,pageStr1)
    for( var i = 1;i <= pageStr; i++){
    	 var pageStrNew = pageStr - i + 1
    	 if(pageStrNew == pageStr1){
    	 	$("#Paging_pre").after("<a href='https://168jm.cn/news/index_"+ pageStrNew + ".html' class='button3 select' onclick='goPage(" + pageStrNew + ")'>" + pageStrNew + "</a>");
    	 }else{
    	 	$("#Paging_pre").after("<a href='https://168jm.cn/news/index_"+ pageStrNew + ".html' class='button3 dn' onclick='goPage(" + pageStrNew + ")'>" + pageStrNew + "</a>");
    	 };
   	};
     //页数为1的时候隐藏···
    if(pageStr <= 3){
   		$(".Paging .link-text").hide();
    }else{
    	$(".Paging .link-text").show();
    };
    //显示选中页前2与后2
    $(".Paging .select").prev().removeClass("dn").prev().removeClass("dn");
    $(".Paging .select").next().removeClass("dn").next().removeClass("dn");
};
pageFenye();
//fenyebox  end

// $("#Paging ").on("click",".button3" function(){
//     $('#p').val( $(this).text())
// })
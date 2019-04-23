//头部网站导航
$(function() {
    function main() {
        var pageNavEl = $(".page_topnav");
        pageNavEl.find(".link-nav").hover(function() {
            pageNavEl.find(".div-cat-popup").stop().slideDown()
        }, function() {});
        pageNavEl.hover(function() {}, function() {
            pageNavEl.find(".div-cat-popup").stop().slideUp()
        })
    }
    main()
});
//微信
//$(function() {
//	function main() {
//		var pageNavEl = $(".page_topnav");
//		pageNavEl.find(".link-wechat").hover(function() {
//			pageNavEl.find(".div-popup-wechat").stop().slideDown()
//		}, function() {});
//		pageNavEl.hover(function() {}, function() {
//			pageNavEl.find(".div-popup-wechat").stop().slideUp()
//		})
//	}
//	main()
//});
//search 行业
$('.selectdropdown').on('click',function(){
    $('.selectdropdown .icon1').hide()
    $('.selectdropdown .icon2').show()
    $('.selectboxdown1').stop().slideDown()
})
$('.selectboxdown1 ul li').on("click", function(){
    $('.selectboxdown1').stop().slideUp();
    $('.selectdropdown .icon2').hide();
    $('.selectdropdown .icon1').show();
    $('.selectdropdown p').text($(this).text())
    $('#searchCatalogInnerCode').val($(this).attr('data-id'))

})
$('.header_search').hover(function(){},function(){
    $('.selectboxdown1').stop().slideUp()
    $('.selectdropdown .icon2').hide()
    $('.selectdropdown .icon1').show()
})
//search start
$(function(){
    function search(){
        $(".btn-submit").click(function(){
            params = {
                "pageIndex":"",
                "innerCode":$("#searchCatalogInnerCode").val(),
                "query":$("#selectinput").val(),
            };
            AllSearch(params);
        });
        $("#selectinput").focus(function(){
            $(document).keyup(function(event){
                if(event.keyCode ==13){
                    $(".btn-submit").trigger("click");
                }
            });
        });
    };
    search();
});

function AllSearch(params){
    var p = params.pageIndex||'1';
    var c = params.innerCode||'';
    var q = params.query||'';
    var url = '';
    if(c != '' && q != ''){
        url = '/home/index/project/category_1/'+c+'/name/'+q;
    }else if(c != ''){
        url = '/home/index/project/category_1/'+c;
    }else if(q != ''){
        url = '/home/index/project/name/'+q;
    }else {
        url = '/home/index/project.html';
    }
    window.location.href = url;
}
//search end

//footer_二维码
$('#footer_ewm ul li').hover(function(){
    var thisIndex = $(this).index();
    $('#footer_ewm .right_ewm div:eq('+ thisIndex +')').show().siblings().hide()
})
//footer_滚动条
var timers;
function plays(el,time) {
    timers = setInterval(function () {
        var para = el.find('li').last();
        el.prepend(para)
    }, time)
}
var el = $('.footer .footer_top h4 ul');
plays(el,2000);
//公用右侧
$('#common_right #clickHuan h4 span').on('click',function(){
    var para = $('#common_right #clickHuan').find('ul').last();
    $('#common_right #clickHuan .clickHuan_main').prepend(para)
})

$('#common_right .right_div1_ul li').hover(function(){
    $(this).find('.li_1').hide();
    $(this).find('.li_2').show();
    $(this).siblings().find('.li_1').show();
    $(this).siblings().find('.li_2').hide();
},function(){});


//表单提交留言
$(".cfr_main_kjly").on('click','li',function(){
    var thisText = $(this).text();
    $('.content_form_right #message').val(thisText)
})
$('#cfr_submit').on('click',function(){
    formsubmit();
})
function formsubmit() {
    //判断是否选中
    if($('.content_form_right #form_clause').prop('checked') === false) {
        alert("请阅读并同意《168加盟网服务条款》！");
        return false;
    }
    //是否含有中文（也包含日文和韩文）
    var reName = /^[a-zA-Z\u4e00-\u9fa5\uF900-\uFA2D ]{1,20}$/;
    if(reName.test($("#form_name").val()) === false) {
        alert("请输入正确的姓名！");
        $("#form_name").focus().select();
        return false;
    }
    //支持手机号码，3-4位区号，7-8位直播号码，1－4位分机号
    var reTel = /^1[3|4|5|7|8|9]\d{9}$/;
    if(reTel.test($("#form_tel").val()) === false) {
        alert("请输入正确的电话号码！");
        $("#form_tel").focus().select();
        return false;
    }
    $("#cfr_submit").val("正在提交...");
    //var form_radiobutton = $('.radiobutton[name="radiobutton"]:checked').val() == 0 ? '男' : '女';
    var data  = {
        id : $("#id").val(),
        name : $("#form_name").val(),
        tel : $("#form_tel").val(),
        sex : $('.radiobutton[name="radiobutton"]:checked').val(),
        intro : $('#message').val(),
        number : $('#weixin_QQ').val(),
        invest_money : $('#form_memoney').val(),
        type: $("#type").val() == '2' ? $("#type").val() : "1"
    }
    $.ajax({
        type: "post",
        url:"/home/index/leave",
        data:data,
        success: function(data) {
            alert(data);
            $("#cfr_submit").val("提交咨询");
        },
        error: function() {
            alert('提交失败');
        }
    });
}
//月份榜单
function month(){
	tmpDate = new Date();
	date = tmpDate.getDate();
	month = tmpDate.getMonth() + 1 ;
	$(".168_month").text(month+'月打榜')
}
month()
//底部留言提交
$('#footer_form_submit').on('click',function(){
	//支持手机号码，3-4位区号，7-8位直播号码，1－4位分机号
    var reTel = /^1[3|4|5|7|8|9]\d{9}$/;
    if(reTel.test($(".footer_form_tel").val()) === false) {
        alert("请输入正确的电话号码！");
        $(".footer_form_tel").focus().select();
        return false;
    }
	var data  = {
        id : $("#id").val(),
        tel : $(".footer_form_tel").val(),
    }
	$.ajax({
        type: "post",
        url:"/home/index/leave",
        data:data,
        success: function(data) {
            alert(data);
        },
        error: function() {
            alert('提交失败');
        }
    });
})

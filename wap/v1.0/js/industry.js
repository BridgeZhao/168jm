var HG, navbut, headsearch, nav_h, ds;
var isloading = false;
$(function () {
    setTimeout(function () {
        nhg()
    }, 5);
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
        nav_h = $(".project-nav").offset().top - headsearch;
        
        $('.project-right').on('touchmove',function(){
           if ($('.project-right').scrollTop() >= nav_h) {
                $(".project-fixed").show()
                $(".project-nav").remove().appendTo(".project-fixed");
            }
            if ($('.project-right').scrollTop() < nav_h) {
               $(".project-fixed").hide();
               $(".project-nav").remove().appendTo(".project-nav-ctn"); 
            } 
        })
        $('.project-right').scroll(function () {
            //var scTop = $(".project-right").scrollTop();
            var scTop = $(window).scrollTop();
            var _top = $(".top-load").offset().top;
            var winHeight = $(window).height();
            //console.log(scTop, _top, winHeight);
            if ($(".project-right").scrollTop() >= $(".project-nav").offset().top) {
                $(".project-fixed").show()
                $(".project-nav").remove().appendTo(".project-fixed");
                if (scTop >= (_top - winHeight + $(".header_div").height()*2) && isloading === false) {
                    console.log(scTop, (_top - winHeight + $(".header_div").height()));
                    if (!$(".top-load").hasClass("no-more")) {
                        console.log("load");
                        $(".top-load").html("数据加载中...");
                        httpGetMore(".top-load");
                    }
                }
            }

            if ($('.project-right').scrollTop() < nav_h) {
                $(".project-fixed").hide();
                $(".project-nav").remove().appendTo(".project-nav-ctn"); 
            }
        })
    }
});
function linkClick(el) {
    var index = $(el).parent().index();
    var dohg1 = $(document).scrollTop();
    $('.nav-div').remove();
    if ($(el).parent().hasClass('active')) {
        $('.nav-pos .pronav').addClass('dn');
        $(el).parent().removeClass('active');
        $('.nav-i').remove();
        $('.nav-div').remove();
        $('.project-right').css({'overflow-y': 'auto'})
        $('.project-right').bind('touchmove')
    } else {
        $('.project-right').unbind('touchmove')
        $('.project-right').css({'overflow-y': 'hidden'});
        $(el).parent().addClass('active').siblings().removeClass('active');
        $('.nav-pos .pronav').eq(index).removeClass('dn').siblings().addClass('dn');
        $('.pronav ul li a').append('<i class="nav-i"></i>');
        var syHg1 = $('.project-nav').offset().top;//到body顶部的高度
        var shadehg1 = HG - syHg1+20;
        $('.project-nav').append('<div class="nav-div"></div>');
        $('.nav-div').height(shadehg1);
		$('.pronav').on('click','ul li a' , function(){
		    var _this = $(this).parents('.pronav').index();
		    var _text = $('.navigation li a span').eq(_this).text();
		    if($(this).parents('.pronav').hasClass('industry')){
		    	$(this).parents('.industry').find('li').removeClass('active')
		    	$(this).parent().addClass('active')
		    }else{
		    	$(this).parent().addClass('active').siblings().removeClass('active');
		    }
		    
		    $('.navigation li a span').eq(_this).text($(this).text());
		    fun();
		    sort=$(".composite .active a").attr("data-s");
		    investamount=$(".money .active a").attr("data-in");
		    category_2 = $('.industry .active a').attr('data-cataloginnercode');
		    if(sort===sortPre&&investamount===investamountPre&&category_2===category_2Pre){
		    	return;
		    }else{
		    	sortPre=sort;
		    	investamountPre=investamount;
		        category_2Pre===category_2;
		    	$(".top-load").attr("data-pageindex","1").removeClass("no-more")
		//  	if(isloading === false){
		    		selectClick=true;
		    		$(".top-load").html("数据加载中...");
		            httpGetMore(".top-load");
		//  	}
		    }
		});
        $('.nav-pos').on("click", function () {
            fun()
        });
        $('.nav-div').on("click", function () {
            fun()
        })

    }
}


// $('.project-nav .navigation li a') 下面共有方法
function fun() {
    $('.nav-pos .pronav').addClass('dn');
    $('.project-nav .navigation li').removeClass('active');
    $('.nav-i').remove();
    $('.nav-div').remove();
    $('.project-right').css({'overflow': 'auto'})
    $('.project-right').bind('touchmove')
}

function showDataList(arr, moreEl) {
    var html = '';
    for (var i = 0; i < arr.length; i++) {
        var o = arr[i];
        //var ind = $.inArray(o.investmentamount, ["1", "3", "5", "10", "20", "50", "100", "200"]);
        var ind = $.inArray(o.investmentamount, ["0", "30", "15", "530", "310", "80", "550", "15200", "1", "3", "5", "10", "20", "50", "100", "200"]);
        var money = ["0", "30万以上", "1-5万", "5-30万", "3-10万", "80-200万", "5-50万", "15-200万", "1万以下", "1-3万", "3-5万", "5-10万", "10-20万", "20-50万", "50-100万", "100万以上"];
        //console.log(o.investmentamount)
        //console.log(ind)
        //console.log(money[ind])
        if (o.adimage != '' && o.adimage != null) {
        		html += '<li class="clearfix"><a href="' + o.link + '">';
	            html += '<img class="li_img fl" src="' + prefix + o.logofile + '">';
	            html += '<div class="li_text fl">';
	            html += '<h6>' + o.title + '</h6>';
	            html += '<p class="p1">' + o.companyname + '</p>';
	            html += '<p class="p1">门店数量<span>666</span>家</p>';
	            html += '<p class="p2"><span>' + money[ind] + '</span>万</p></div>';
	            html += '</a></li>';
        }else{
        	html += '<li class="clearfix"><a href="' + o.link + '">';
            html += '<img class="li_img fl" src="' + prefix + o.logofile + '">';
            html += '<div class="li_text fl">';
            html += '<h6>' + o.title + '</h6>';
            html += '<p class="p1">' + o.companyname + '</p>';
            html += '<p class="p1">门店数量<span>666</span>家</p>';
            html += '<p class="p2"><span>' + money[ind] + '</span>万</p></div>';
            html += '</a></li>';

        }
    }
    if(selectClick){
//  	$(".top-load").remove();
    	$('.project-right').scrollTop(0,0);
    	$(moreEl).html("");

    	selectClick=false;
    	$(moreEl).append(html);
    }else{
    	$(moreEl).append(html);
    }
    
}
var sort = "",  investamount = "", category_2="";
var sortPre =$(".composite .active a").attr("data-s"), investamountPre = $(".money .active a").attr("data-in") , category_2Pre = $('.industry .active a').attr('data-cataloginnercode');;
var selectClick=false;
function httpGetMore(moreEl) {
    isloading = true;
    //console.log("加载");
    
    var pageIndex = parseFloat($(moreEl).attr("data-pageindex"));
    var pageSize = parseFloat($(moreEl).attr("data-pagesize"));
    
    sort=$(".composite .active a").attr("data-s");
    investamount=$(".money .active a").attr("data-in");
    category_2 = $('.industry .active a').attr('data-cataloginnercode');
    $.ajax({
        url: "/wap/index/search",
        type: "post",
        data: {
            sort: sort,//综合搜索值,
            investamount: investamount,//投资金额
            publishtargetid: "Html5",
            pageindex: pageIndex,
            pagesize: pageSize,
        },
        dataType: "json",
        success: function (data) {
            console.log(data);
            $(moreEl).attr("data-pageindex", pageIndex + 1);
            var arr = data._RESULT;
            showDataList(arr, ".sift-pro ul");
            //$(".ic-load").hide();
            $(".top-load").html("上拉加载数据");
            isloading = false;
            if (data.pagesize * data.pageindex >= data.total) {
                $(".top-load").html("我是有底线的").addClass("no-more");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert(XMLHttpRequest.status);
            //alert(XMLHttpRequest.readyState);
            //alert(textStatus);
            $(".top-load").html("我是有底线的").addClass("no-more");
        },
        complete: function () {
        }
    });
}


//新增 行业分类逻辑 
$('.nav-pos .pronav_left').on('click','p',function(){
	$(this).addClass('active').siblings().removeClass('active')
	var thisIndex = $(this).index()
	$('.nav-pos .pronav_right ul').eq(thisIndex).show().siblings().hide()
	return false;
})

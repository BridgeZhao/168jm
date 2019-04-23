
//控制显示行数
    newScroll();//创建iscroll
    var isloading = false;
    $(document).on("touchend", function () {
    	console.log(myScroll)
        if ($(".get-info").length === 1) {
            return;
        }
        if (myScroll.y + 40 < myScroll.maxScrollY && isloading === false) {
            if (!$(".load").hasClass("no-more")) {
                //console.log(myScroll.y, myScroll.maxScrollY);
                $(".ic-load").show();
                $(".load-text").html("数据加载中...");
                httpGetMore($(".load"));
            }
        }
    });
//var myScroll = null;
function showDataList(arr, moreEl) {
    var html = '';
    for (var i = 0; i < arr.length; i++) {
        var o = arr[i];
        var editor = o.editor ? o.editor : "小A";
        var publishDate = new Date(o.publishdate).format("yyyy-MM-dd");
        var showimages = [];
        if (o.logofile != null) {
            html += '<li class="clearfix"><a href="#">'
			html += '<img class="li_img fl" src="images/tu1@3x.png" />'
			html += '<div class="li_text fl">'
			html += '<h6>11-20万中餐项目加盟，你会如何选择靠谱项目加盟？</h6>'
			html += '<p class="p1">对方是个负担感回到法国和风格化的分隔号使得法国和省电费干哈杀的惯犯阿萨德割发代首弗格森的风格深度覆盖深度覆盖</p>'
			html += '<p class="p2 clearfix"><span>文/zhangshan</span> <span class="fr"><i></i>2018-07-04</span></p>'
			html += '</div>'
			html += '</a></li>'
        }
    }
    $(moreEl).before(html);
    $(".news-tit").each(rowNum);//控制标题  内容行数
    myScroll.refresh();
}
function httpGetMore(moreEl) {
    isloading = true;
    var catalogId = parseFloat($(moreEl).attr("data-catalogid"));
    var pageIndex = parseFloat($(moreEl).attr("data-pageindex"));
    var pageSize = parseFloat($(moreEl).attr("data-pagesize"));
	console.log(111)
    $.ajax({
        url: "",
        type: "GET",
        data: {
            catalogid: catalogId,
            //catalogid: 17210,
            level: "CurrentAndChild",
            ordertype: "Recent",
            loadcontent: true,
            contenttype: "Article",
            pageindex: pageIndex,
            pagesize: pageSize,
            randomtime:true,
            columns: "id,link,title,publishDate,summary,editor,logofile"
        },
        dataType: "json",
        success: function (data) {
            $(moreEl).attr("data-pageindex", pageIndex + 1);

            var arr = data._RESULT;
            showDataList(arr, moreEl);
            $(".ic-load").hide();
            $(".load-text").html("上拉加载数据");
            isloading = false;
            if (data.pagesize * (data.pageindex + 1) >= data.total) {
                $(".load").html("没有更多数据了");
                $(".load").addClass("no-more")
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert(XMLHttpRequest.status);
            //alert(XMLHttpRequest.readyState);
            //alert(textStatus);
            $(".load").html("没有更多数据了");
            $(".load").addClass("no-more")
        },
        complete: function () {
        }
    });
}
//new fenye  处理与pc同步事项 start
function pageFenye(){
    var pageStr = $("#Paging").attr("dataPage");
    var pageStr1 = $("#Paging").attr("dataPi");
    //console.log(pageStr,pageStr1)
    for( var i = 1;i <= pageStr; i++){
    	 var pageStrNew = pageStr - i + 1
    	 if(pageStrNew == pageStr1){
    	 	$("#Paging_pre").after("<a href='https://168jm.cn/news/index_"+ pageStrNew + ".html' class='button3 select' onclick='goPage(" + pageStrNew + ")'>" + pageStrNew + "</a>");
    	 }else{
    	 	$("#Paging_pre").after("<a href='https://168jm.cn/news/index_"+ pageStrNew + ".html' class='button3 dn' onclick='goPage(" + pageStrNew + ")'>" + pageStrNew + "</a>");
    	 };
   	};
   	var Paging_pre = parseInt(pageStr1)-1;
   	var Paging_next = parseInt(pageStr1)+1;
   	console.log(Paging_pre,Paging_next)
   	$("#Paging_pre").attr('href','https://168jm.cn/news/index_'+ Paging_pre + '.html');
   	$("#Paging_next").attr('href','https://168jm.cn/news/index_'+ Paging_next + '.html');
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
//function goPage(str){
//	var pageStr1 = $("#Paging").attr("dataPi");
//	var str = pageStr1 + str;
//  window.location.href = 'http://m.168jm.cn/news/index_'+ str+'.html';
//}
pageFenye();
//new fenye  处理与pc同步事项 end

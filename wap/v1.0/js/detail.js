window.onload=function(){
	$('#main_detail_nav').on('click','li',function(){
		var this_ = $(this)
		$('.main_detail_bottom .zksq').click();
		this_.addClass('active').siblings().removeClass('active')
		var thisListTop = $('.main_detail_content .list').eq(this_.index()).offset().top 
		var mainNavH = $('#main_detail_nav').outerHeight()
		$(document).scrollTop(thisListTop - mainNavH) 
	})
	var mainDH = $('.main_detail').outerHeight()
	var mainDT = $('.main_detail').offset().top
	$(document).scroll(function(){
	  	var docTop = $(document).scrollTop()
//	  	console.log(docTop,mainDT,mainDT + mainDH)
//	  	console.log(docTop > mainDT , docTop < mainDT + mainDH)
	  	if(docTop > mainDT && docTop < mainDT + mainDH){
	  		$('.main_detail #main_detail_nav').addClass('positionF')
	  	}else{
	  		$('.main_detail #main_detail_nav').removeClass('positionF')
	  	}
	})
	//展开收起
	$('.main_detail_bottom .zksq').on('click',function(){
		$(this).hide()
		$('.main_detail_bottom .zksq1').show()
		$('.main_detail_content').removeClass('maxheight5')
	})
	$('.main_detail_bottom .zksq1').on('click',function(){
		$(this).hide()
		$('.main_detail_bottom .zksq').show()
		$('.main_detail_content').addClass('maxheight5')
	})
}

//form start
	//在线留言提交数据
	var agreebol=true;//是否同意将自己的联系方式、推荐给商家
	var user,mobile,message;
	$("#form .formbox .agreebox").on("click",function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on");
			agreebol=false
		}else{
			$(this).addClass("on");
			agreebol=true
		}
	})
	$(".submitmessagebtn").on("click",function(){
		if(!agreebol){
			alert("请同意将我的联系方式推荐给商家")
			return false;
		}
		user=$("input[id='user']").val()
		mobile=$("input[id='mobile']").val()
		message=$("input[id='message']").val()	
		var data = {
            URL: window.location.href,
            URLTitle: document.title,
//          ProjectID: ProjectID,
            Name: user,
            Tel: mobile,
            Message: message
        };
        var queryString = "";	
		if(checkuser(user)&&checkmobile(mobile)&&checkmessage(message)){
		$.ajax({
            type: "post",
            url: "www.168jm.cn",
            dataType: "json", //数据类型为jsonp
            data:data,
            success: function (data) {
                alert(data.msg);
                $("#form-free-msg .btn-reset").click();
                $("#form-footer-msg").show();
            },
            error: function () {
                alert('fail');
            }
       });
		}else{
			alert("提交格式错误，请重新输入！")
		}
	})
	$("input[id='user']").blur(function(){
		user=$("input[id='user']").val()
		checkuser(user)
	})
	$("input[id='mobile']").blur(function(){
		mobile=$("input[id='mobile']").val()
		checkmobile(mobile)
	})
	$("input[id='message']").blur(function(){
		message=$("input[id='message']").val()
		checkmessage(message)
	})
	function checkuser(user){
		if(user==''){
			$("#form .formbox .inputbox .tip").eq(0).show()
			return false;
		}
		$("#form .formbox .inputbox .tip").eq(0).hide()
		return true;
	}
	function checkmobile(mobile){
		var reg=/^1[3|4|5|7|8|9][0-9]\d{4,8}$/;
		if(!reg.test(mobile)){
			$("#form .formbox .inputbox .tip").eq(1).show()
			return false;
		}
		$("#form .formbox .inputbox .tip").eq(1).hide()
		return true;
	}
	function checkmessage(message){
		$("#form .formbox .inputbox .tip").eq(2).hide()
		return true;
	}
//form end
function getEvaluationWord(name,index){
	switch(index){
		case 1:
			$(name).find(".evaluation-word").text("很差");//定义一星评价词
			break;
		case 2:
			$(name).find(".evaluation-word").text("较差");//定义二星评价词
			break;
		case 3:
			$(name).find(".evaluation-word").text("还行");//定义三星评价词
			break;
		case 4:
			$(name).find(".evaluation-word").text("推荐");//定义四星评价词
			break;
		case 5:
			$(name).find(".evaluation-word").text("力荐");//定义五星评价词
			break;
		default:
			$(name).find(".evaluation-word").text("");//评价词设置为空
			break;
	}
}
function setLayerCenter(){
	var top = ($(window).height()-$(".layer-bg").height())/2;//设置元素距浏览器顶部距离
	var left = ($(window).width()-$(".layer-bg").width())/2;//设置元素距浏览器左侧距离
	var scrolltop = $(window).scrollTop();//获取垂直滚动条位置
	var scrollleft = $(window).scrollLeft();//获取水平滚动条位置
	//设置弹出层位置
	$("#show-layer").css({"top":top+scrolltop,"left":left+scrollleft}).show();
}
$(document).ready(function(){
	var flag = 1,tips = "";
	$("#first .wantto").click(function(){
		flag = 1;
		setLayerCenter();//设置弹出层居中
		$(window).on("scroll resize",function(){setLayerCenter();});//添加事件处理程序
		$("#seen").hide();//隐藏元素
		$("#show-layer .title").html("添加收藏:我想看这部电影");//设置弹出层标题
		$("#wantto").show();//显示元素
		$("input[name='movietip']").val("");//设置电影标签为空
		$(".tip li").removeClass("active");//移除标签样式
	});
	$("#show-layer .x").click(function(){
		$("#show-layer").hide();//隐藏弹出层
		$(window).off();//移除事件处理程序
	});
	$(".tip li").click(function(){
		if(!$(this).hasClass("active")){//如果当前标签不具有该样式
			$(this).addClass("active");//为当前标签添加样式
			tips = $("input[name='movietip']").val();//获取文本框中的电影标签
			tips += $(this).text()+" ";//当前标签后添加空格
			$("input[name='movietip']").focus();//文本框获得焦点
			$("input[name='movietip']").val(tips);//显示电影标签
		}else{
			$(this).removeClass("active");//移除当前标签样式
			var t = $(this).text()+" ";//当前标签后添加空格
			tips = $("input[name='movietip']").val().replace(t,"");//删除选择的标签
			$("input[name='movietip']").val(tips);//显示电影标签
			$("input[name='movietip']").focus();//文本框获得焦点
		}
	});
	$(".layer-bottom input").click(function(){
		if(flag == 1){
			$("#show-layer").hide();//隐藏弹出层
			$(window).off();//移除事件处理程序
			$("#first").hide();//隐藏元素
			$("#second").show();//显示元素
			if(tips != "")
				$(".show-tips").text("标签:"+tips);//设置文本内容
		}else{
			$("#show-layer").hide();//隐藏弹出层
			$(window).off();//移除事件处理程序
			$("#first").hide();//隐藏元素
			$("#third").show();//显示元素
			$(".show-evaluation").show();//显示评价词
			//所有星星变暗
			$(".show-evaluation .star span").find(".bright").css("z-index",0);
			//根据星级数目使星星变亮
			$(".show-evaluation .star span:lt("+star_level+")").find(".bright").css("z-index",1);
			getEvaluationWord(".show-evaluation",star_level);//输出评价词
			$(".show-evaluation .star span").mouseover(function(){
				$(this).prevAll().find(".bright").css("z-index",1);//前面的星星变亮
				$(this).find(".bright").css("z-index",1);//当前星星变亮
				$(this).nextAll().find(".bright").css("z-index",0);//后面的星星变暗
				var index = $(this).index()+1;//当前索引加1
				getEvaluationWord(".show-evaluation",index);//输出评价词
			});
			$(".show-evaluation .star").mouseout(function(){
				$(this).find(".bright").css("z-index",0);//所有星星变暗
				$(this).next().text("");//评价词设置为空
				//根据星级数目使星星变亮
				$(".show-evaluation .star span:lt("+star_level+")").find(".bright").css("z-index",1);
				getEvaluationWord(".show-evaluation",star_level);//输出评价词
			});
			$(".show-evaluation .star span").click(function(){
				star_level = $(this).index()+1;//获取评价的星级
			});
		}
		var nowdate = new Date();//定义日期对象
		var year = nowdate.getFullYear();//获取当前年份
		var month = nowdate.getMonth()+1;//获取当前月份
		var date = nowdate.getDate();//获取当前日期
		$(".now-time").html(year+"-"+month+"-"+date);//输出年月日
	});
	
	var star_level = 0;//定义表示星级的变量
	$("#first .star span").mouseover(function(){
		$(this).prevAll().find(".bright").css("z-index",1);//前面的星星变亮
		$(this).find(".bright").css("z-index",1);//当前星星变亮
		$(this).nextAll().find(".bright").css("z-index",0);//后面的星星变暗
		var index = $(this).index()+1;//当前索引加1
		getEvaluationWord("#first",index);//输出评价词
	});
	$("#first .star").mouseout(function(){
		$(this).find(".bright").css("z-index",0);//所有星星变暗
		$(this).next().text("");//评价词设置为空
	});
	$("#first .star span").click(function(){
		flag = 2;
		setLayerCenter();//设置弹出层居中
		$(window).on("scroll resize",function(){setLayerCenter();});//添加事件处理程序
		$("#wantto").hide();//隐藏元素
		$("#seen").show();//显示元素
		$("#show-layer .title").html("添加收藏:我看过这部电影");//设置弹出层标题
		$("#seen .star span").find(".bright").css("z-index",0);//所有星星变暗
		star_level = $(this).index()+1;//获取评价的星级
		//根据星级数目使星星变亮
		$("#seen .star span:lt("+star_level+")").find(".bright").css("z-index",1);
		getEvaluationWord("#seen",star_level);//输出评价词
	});
	
	$("#first .seen").click(function(){
		flag = 2;
		setLayerCenter();//设置弹出层居中
		$(window).on("scroll resize",function(){setLayerCenter();});//添加事件处理程序
		$("#wantto").hide();//隐藏元素
		$("#show-layer .title").html("添加收藏:我看过这部电影");//设置弹出层标题
		$("#seen").show();//显示元素
		star_level = 0;//重置变量
		$("#seen .star span").find(".bright").css("z-index",0);//所有星星变暗
		$("#seen .evaluation-word").text("");//评价词设置为空
	});
	$("#seen .star span").mouseover(function(){
		$(this).prevAll().find(".bright").css("z-index",1);//前面的星星变亮
		$(this).find(".bright").css("z-index",1);//当前星星变亮
		$(this).nextAll().find(".bright").css("z-index",0);//后面的星星变暗
		var index = $(this).index()+1;//当前索引加1
		getEvaluationWord("#seen",index);//输出评价词
	});
	$("#seen .star").mouseout(function(){
		$(this).find(".bright").css("z-index",0);//所有星星变暗
		$(this).next().text("");//评价词设置为空
		//根据星级数目使星星变亮
		$("#seen .star span:lt("+star_level+")").find(".bright").css("z-index",1);
		getEvaluationWord("#seen",star_level);//输出评价词
	});
	$("#seen .star span").click(function(){
		star_level = $(this).index()+1;//获取评价的星级
	});
	
	$("#second .del,#third .del").click(function(){
		if(window.confirm("真的要删除这个收藏？")){
			tips = "";//变量设置为空
			$(".show-tips").text("");//电影标签设置为空
			$("#first").show();//显示元素
			$("#second").hide();//隐藏元素
			$("#third").hide();//隐藏元素
		}
	});
});
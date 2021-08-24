// JavaScript Document
$(document).ready(function(){
	$("form :input").blur(function(){
		$(this).parent().find("span").remove();
		if($(this).is("#name")){
			if(this.value==""){
		   		var show=$("<span class='error'>用户名不能为空</span>");
	   	   		$(this).parent().append(show);
			}else if(this.value.length<3){
		   		var show=$("<span class='error'>用户名不能小于3位</span>");
	   	   		$(this).parent().append(show);
			}else{
		   		var show=$("<span class='right'>正确</span>");
	   	   		$(this).parent().append(show);	
			}
		}
		if($(this).is("#password")){
			if(this.value==""){
		   		var show=$("<span class='error'>密码不能为空</span>");
	   	   		$(this).parent().append(show);
			}else if(this.value.length<6){
		   		var show=$("<span class='error'>密码不能小于6位</span>");
	   	   		$(this).parent().append(show);
			}else{
		   		var show=$("<span class='right'>正确</span>");
	   	   		$(this).parent().append(show);
			}
		}
		if($(this).is("#passwords")){
			if(this.value==""){
		   		var show=$("<span class='error'>确认密码不能为空</span>");
	   	   		$(this).parent().append(show);
			}else if(this.value!=$("#password").val()){
		   		var show=$("<span class='error'>两次密码不相等</span>");
	   	   		$(this).parent().append(show);
			}else{
		   		var show=$("<span class='right'>正确</span>");
	   	   		$(this).parent().append(show);
			}
		}
	});
	$("#send").click(function(){
	   	$("form :input").trigger("blur");
		if($(".error").length){
		   	return false;	
		}else{
		   	alert("注册成功！");	
		}
	});
	$("#res").click(function(){
		$("span").remove();
	});
});
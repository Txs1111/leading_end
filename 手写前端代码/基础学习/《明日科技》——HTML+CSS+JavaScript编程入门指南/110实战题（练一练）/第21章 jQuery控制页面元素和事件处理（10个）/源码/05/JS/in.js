$(document).ready(function(){
	$("select").change(function(){
		var value = $(this).val();
		if(value == ""){
			alert("请选择性别");	
		}else{
			if(value == "nan"){
				$("#o").empty();
				$("#o").append("<select id='one'><option value='pic/1.jpg'>头像1</option><option value='pic/2.jpg'>头像2</option><option value='pic/3.jpg'>头像3</option><option value='pic/4.jpg'>头像4</option><option value='pic/9.jpg'>头像5</option></select>");
				$("#n").empty();
				$("#n").append("<img src='pic/1.jpg'>");
				$("#one").change(function(){
					var va = $(this).val();
					$("#n").empty();
					$("#n").append("<img src="+va+">");
				});
			}else{
				$("#o").empty();
				$("#o").append("<select id='one'><option value='pic/5.jpg'>头像1</option><option value='pic/6.jpg'>头像2</option><option value='pic/7.jpg'>头像3</option><option value='pic/8.jpg'>头像4</option><option value='pic/10.jpg'>头像5</option></select>");
				$("#n").empty();
				$("#n").append("<img src='pic/5.jpg'>");
				$("#one").change(function(){
					var va = $(this).val();
					$("#n").empty();
					$("#n").append("<img src="+va+">");
				});
			}
		}
	});						   
});


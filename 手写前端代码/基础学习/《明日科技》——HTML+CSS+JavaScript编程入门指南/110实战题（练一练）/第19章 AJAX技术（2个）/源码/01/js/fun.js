// JavaScript Document
function chkUsername(){
	var username = form_register.username.value;
	if(username==''){     //判断用户名是否为空
	    alert('请输入用户名！');	
	}else{
        var xmlObj;     //定义XMLHttpRequest对象
	    if(window.ActiveXObject){     //如果是浏览器支持ActiveXObjext则创建ActiveXObject对象
	        xmlObj = new ActiveXObject("Microsoft.XMLHTTP");
	    }else if(window.XMLHttpRequest){     //如果浏览器支持XMLHttpRequest对象则创建XMLHttpRequest对象
		    xmlObj = new XMLHttpRequest();
	    }	
	    xmlObj.onreadystatechange = callBackFun;    //指定回调函数
	    xmlObj.open('GET', 'username.txt', true);     //使用GET方法调用username.txt文件
	    xmlObj.send(null);     //不发送任何数据
	    function callBackFun(){     //定义回调函数
	        if(xmlObj.readyState == 4 && xmlObj.status == 200){   //如果服务器已经传回信息并没发生错误
				var nameArr = xmlObj.responseText.split('|');//将返回值分割为数组
				var result = true;//定义变量
				for(var i=0;i<nameArr.length;i++){
					if(nameArr[i] == username){//判断用户名是否在数组中已存在
						result = false;//为变量重新赋值
						break;//退出for循环
					}
				}
			    if(!result){    //如果输入的用户名在数组中已存在
				    alert('该用户名已被他人使用！');
			    }else{       //如果输入的用户名在数组中不存在
			        alert('恭喜，该用户名未被使用！');	
			    }
		    }	
	    }
	}
}
var ImgW=parseInt(float.width);						//获取浮动窗口的宽度
function permute(tfloor,Top,left){
	//获取纵向滚动条滚动的距离
	var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
    buyTop=Top+scrollTop;								//获取图片在垂直方向的绝对位置
    document.all[tfloor].style.top=buyTop+"px";			//设置图片在垂直方向的绝对位置
	//获取横向滚动条滚动的距离
	var scrollLeft=document.documentElement.scrollLeft || document.body.scrollLeft;
    var buyLeft=scrollLeft+document.body.clientWidth-ImgW;	//获取图片在水平方向的绝对位置
    document.all[tfloor].style.left=buyLeft-left+"px";		//设置图片在水平方向的绝对位置
}
setInterval('permute("float",300,50)',1);			//每隔1毫秒就执行一次permute()函数

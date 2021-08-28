// JavaScript Document
var len = document.getElementsByName("i");//获取name属性值为i的元素
var pos = 0;//定义变量值为0
function changeimage(){
    len[pos].style.display = "none";//隐藏元素
    pos++;//变量值加1
    if(pos == len.length) pos=0;//变量值重新定义为0
    len[pos].style.display = "block";//显示元素
}
setInterval("changeimage()",3000);//每隔3秒钟执行一次changeimage()函数
function addclass(id){
    document.getElementById(id).className = 'nav_cur';
}
function removeclass(id){
    document.getElementById(id).className = 'd';
}
var video;									/*声明变量*/
function init() 
{
    video = document.getElementById("video1");
    video.addEventListener("ended", function() 	/*监听视频播放结束事件*/
    {
      alert("播放结束。");
    }, true);
}
function play() 
{
    video.play();								/*播放视频*/
}
function pause() 
{
    video.pause();					          /*暂停视频*/
}
function load()
{
	video.load()							/*重载视频*/
	
	}
$(function(){
//    1.监听歌曲的移入移出事件
    $('.list_music').hover(function(){
        $(this).find('.list_menu').stop().fadeIn(100);
        $(this).find('.list_time a').stop().fadeIn(100);
        $(this).find('.list_time span').stop().fadeOut(100);
    },function(){
        $(this).find('.list_menu').stop().fadeOut(100);
        $(this).find('.list_time a').stop().fadeOut(100);
        $(this).find('.list_time span').stop().fadeIn(100);
    })
// 2.监听复选框的点击事件
    $('.list_check').click(function(){
        $(this).toggleClass('list_checked');
    })
    
    
})

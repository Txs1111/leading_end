$(function(){
     // 0.自定义滚动条
    $(".content_list").mCustomScrollbar();
//    1.监听歌曲的移入移出事件
    $(".content_list").delegate('.list_music','mouseenter',function(){
        $(this).find('.list_menu').stop().fadeIn(100);
        $(this).find('.list_time a').stop().fadeIn(100);
        $(this).find('.list_time span').stop().fadeOut(100);
    })
    $(".content_list").delegate('.list_music','mouseleave',function(){
        $(this).find('.list_menu').stop().fadeOut(100);
        $(this).find('.list_time a').stop().fadeOut(100);
        $(this).find('.list_time span').stop().fadeIn(100);
    })
  
// 2.监听复选框的点击事件
    $(".content_list").delegate('.list_check','click',function(){
        $(this).toggleClass('list_checked'); //这里不用加 点
    })

 //图标切换 
    var $musicPlay=$('.music_play');
    $(".content_list").delegate('.list_menu_play','click',function(){
        var $item = $(this).parents('.list_music');

        $(this).toggleClass('list_menu_play2');
        $item.siblings().find('.list_menu_play').removeClass('list_menu_play2');

        if($(this).attr('class').indexOf('list_menu_play2')!=-1){
            $musicPlay.addClass('music_play2');
            $item.find('div').css('color','#fff')
            $item.siblings().find("div").css("color", "rgba(255,255,255,0.5)");
        }
        else{
            $musicPlay.removeClass('music_play2');
            $item.find('div').css('color','rgba(255,255,255,0.5)')
        }

        $item.find('.list_number').toggleClass('list_number2');
        $item.siblings().find('.list_number').removeClass('list_number2');
    })

    getPlayerList();
    function getPlayerList(){
        $.ajax({
            url:"./source/musiclist.json",
            dataType:'json',
            success:function(data){
                var $musicList=$('.content_list ul');
                $.each(data,function(index,ele){
                    var $item=crateMusicItem(index,ele);
                    $musicList.append($item);
                })
            },
            error: function (e) {
                console.log(e);
            }
        })
    }
    function crateMusicItem(index, music){
        var $item = $(                       
        '<li class="list_music">'+
        '<div class="list_check"><i></i></div>'+
        '<div class="list_number">'+(index+1)+'</div>'+
        '<div class="list_name">'+music.name+
            '<div class="list_menu">'+
                '<a href="#" title="播放" class="list_menu_play"></a>'+
                '<a href="javascript;" title="添加"></a>'+
                '<a href="javascript;" title="下载"></a>'+
                '<a href="javascript;" title="分享"></a>'+
            '</div>'+
        '</div>'+
        '<div class="list_singer">'+music.singer+'</div>'+
        '<div class="list_time">'+
            '<span>'+music.time+'</span>'+
            '<a href="javascript;" title="删除"></a>'+
        '</div>'+
    '</li>'
    )
    return $item;
    }
    
    
})

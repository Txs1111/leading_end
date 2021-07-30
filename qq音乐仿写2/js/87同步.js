$(function(){
     // 0.自定义滚动条
    $(".content_list").mCustomScrollbar();

    var $audio=$('audio');
    var player=new Player($audio);
    var progress;
    var $progressBar = $(".music_progress_bar");
    var $progressLine = $(".music_progress_line");
    var $progressDot = $(".music_progress_dot");
    progress = Progress($progressBar,$progressLine,$progressDot);
    progress.progressClick();
    progress.progressMove();
     // 1.加载歌曲列表
    getPlayerList();
    function getPlayerList(){
        $.ajax({
            url:"./source/musiclist.json",
            dataType:'json',
            success:function(data){
                player.musicList=data;
                var $musicList=$('.content_list ul');
                $.each(data,function(index,ele){
                    var $item=crateMusicItem(index,ele);
                    $musicList.append($item);
                })
                initMusicInfo(data[0]);
            },
            error: function (e) {
                console.log(e);
            }
        })
    }
// 2.初始化歌曲信息
    function initMusicInfo(music){
        var $musicImage = $(".song_info_pic img");
        var $musicName = $(".song_info_name a");
        var $musicSinger = $(".song_info_singer a");
        var $musicAblum = $(".song_info_ablum a");
        var $musicProgressName = $(".music_progress_name");
        var $musicProgressTime = $(".music_progress_time");
        var $musicBg = $(".mask_bg");
        $musicImage.attr('src', music.cover);
        $musicName.text(music.name);
        $musicSinger.text(music.singer);
        $musicAblum.text(music.album);
        $musicProgressName.text(music.name +" / "+ music.singer);
        $musicProgressTime.text("00:00 / "+ music.time);
        $musicBg.css("background", "url('"+music.cover+"')");
    }

    // 5.初始化事件监听
    initEvents();
    function initEvents(){
        // 1.监听歌曲的移入移出事件
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
            // console.log($item.get(0).index);
            // console.log($item.get(0).music);
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

            player.playMusic($item.get(0).index, $item.get(0).music);
            // 3.5切换歌曲信息
            initMusicInfo($item.get(0).music);
        })

        // 4.监听底部控制区域播放按钮的点击
        $musicPlay.click(function(){
            if(player.currentIndex==-1){
                $('.list_music').eq(0).find('.list_menu_play').trigger('click')
            }
            else{
                $('.list_music').eq(player.currentIndex).find('.list_menu_play').trigger('click')
            }
        })
        $(".music_pre").click(function(){
            $('.list_music').eq(player.preIndex()).find('.list_menu_play').trigger('click')
        })
        $(".music_next").click(function(){
            $('.list_music').eq(player.nextIndex()).find('.list_menu_play').trigger('click')
        })
        $(".content_list").delegate('.list_menu_del','click',function(){
            var $item=$(this).parents('.list_music');
            if($item.get(0).index==player.currentIndex){
                $(".music_next").trigger('click');
            }
            $item.remove();
            player.changeMusic($item.get(0).index);
// 从删除的这条开始 到 结束 重新排序
            $(".list_music").each(function(index,ele){
                ele.index=index;
                $(ele).find(".list_number").text(index+1);
            })
        })
        //监听播放的进度
        player.$audio.on('timeupdate',function(){
            var duration=player.getMusicDuration();
            var currentTime=player.getMusicCurrentTime();
            var timeStr=formatDate(currentTime,duration);
            $('.music_progress_time').text(timeStr);
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
            '<a href="#" title="删除" class="list_menu_del"></a>'+
        '</div>'+
    '</li>'
    )

    $item.get(0).index=index;
    $item.get(0).music = music;
    return $item;
    }
// 格式化时间
    function formatDate(currentTime,duration){
        var endMin=parseInt(duration/60);
        var endSec=parseInt(duration%60);
        if(endMin<10){
            endMin='0'+endMin;
        }
        if(endSec<10){
            endSec='0'+endSec;
        }
        var startMin=parseInt(currentTime/60);
        var startSec=parseInt(currentTime%60);
        if(startMin<10){
            startMin='0'+startMin;
        }
        if(startSec<10){
            startSec='0'+startSec;
        }
        return startMin+':'+startSec+' / '+endMin+':'+endSec;
    }
    
    
})

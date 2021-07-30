//核心JS
$(function(){
    
    //0.使用框架自定义滚动条
    $(".content_list").mCustomScrollbar();
    

    var $audio = $("audio");         //获取到audio赋值给$audio
    var player = new Player($audio); //新建了一个以传入了$audio参数的播放音乐Player构造函数为原型对象的player对象  可以使用原型构造函数的方法
    var progress;                    //声明progress对象       播放音乐进度条
    var voiceProgress;               //声明voiceProgress对象  声音控制进度条
    var voiceProgressNow;            //声明默认音量对象
    var lyric;                       //声明lyric对象          歌词对象
    var clear = true;                //声明clear对象为true    清除状态用以判定清空列表按钮的点击
    var reset = false;               //声明reset对象为false   重置状态用以在清空列表后恢复列表
    var random = false;              //声明random对象为false  随机播放状态 切换播放模式时可用
    var single = false;              //声明single对象为false  单曲循环状态 切换播放模式时可用



    //1.加载歌曲列表
    getPlayerList();
    function getPlayerList(){
        //发送ajax请求
        $.ajax({
            url:"./audio/musicList.json", //获取提前定义好的json数据 目前暂时只能在wamp服务器上运行 本地无法获取
            dataType:"json",
            success: function(data){
                // console.log("json获取正常");
                player.musicList = data;  //把json数据保存到Player方法里定义的数组里
                //1.1遍历获取到的数据,创建每一条音乐
                //获取歌曲列表
                var $musicListInfo =$(".content_list ul");
                $.each(data,function(index,ele){
                    // 使用创建音乐方法创建一条音乐
                    var $item = createMusicItem(index,ele);
                    // 添加音乐到列表中
                    $musicListInfo.append($item);
                });
                //初始化歌曲信息  此处的data[0]为json数组中的第一条音乐对象
                initMusicInfo(data[0]);
                //初始化歌词信息
                initMusicLyric(data[0]);
            },
            error: function(e){
                console.log(e);
            }
        });
    }

    //2.初始化歌曲信息
    function initMusicInfo(music){
        //获取对应的元素
        var $musicImage = $(".song_info_pic img");              //专辑图片
        var $musicName = $(".song_info_name a");                //歌曲名
        var $musicSinger = $(".song_info_singer a");            //歌手名
        var $musicAlbum = $(".song_info_album a");              //专辑图
        var $musicProgressName = $(".music_progress_name");     //进度条上的歌曲名+歌手名
        var $musicProgressTime = $(".music_progress_time");     //进度条上的播放时间
        var $musicBg = $(".mask_bg");                           //背景图片

        //把获取到的元素赋值给页面元素
        $musicImage.attr("src",music.cover);
        $musicName.text(music.name);
        $musicSinger.text(music.singer);
        $musicAlbum.text(music.album);
        $musicProgressName.text(music.name+"/"+music.singer);
        $musicProgressTime.text("00:00"+" / "+music.time);
        $musicBg.css("background","url('"+music.cover+"')");
    }

    //3.初始化歌词信息
    function initMusicLyric(music){
        //lyric对象现在是一个新的以传入了music对象的link_lrc数据的歌词组件Lyric构造函数为原型对象的新的对象 可以使用原型构造函数的方法
        lyric = new Lyric(music.link_lrc);
        //获取歌词列表
        var $lyricContainer = $(".song_lyric");
        //清空上一首音乐的歌词
        $lyricContainer.html("");
        //使用加载歌词方法
        lyric.loadLyric(function(){
            //创建歌词列表
            $.each(lyric.lyrics,function(index,ele){
                //创建一条歌词
                var $item = $("<li>"+ele+"</li>");
                //添加到歌词列表中
                $lyricContainer.append($item);
            });
        });
    }

    initProgress();
    //4.初始化播放音乐和调节音量的进度条
    function initProgress(){
        //获取播放音乐的进度条 背景条 小圆点
        var $progressBar = $(".music_progress_bar");
        var $progressLine = $(".music_progress_line");
        var $progressDot = $(".music_progress_dot");
        //progress对象现在是一个调用了Progress构造函数并传入了三个参数的对象  虽然不是new的对象 也可以使用构造函数里方法
        progress = Progress($progressBar,$progressLine,$progressDot);
        //使用进度条点击方法
        progress.ProgressClick(function(value){
            //使用修改音乐进度方法 用返回的value修改修改音乐进度
            player.musicSeekTo(value);
        });
        // console.log("主页js执行正常");
        //使用进度条拖拽方法
        progress.ProgressMove(function(value){
            player.musicSeekTo(value);
        });

        //获取cookie中保存的音量
        voiceProgressNow = parseFloat(getCookie("voice"));
        //初始化音量
        player.musicVoiceSeekTo(voiceProgressNow);
        //获取调节音量的进度条 背景条 小圆点
        var $voiceBar = $(".music_voice_bar");
        var $voiceLine = $(".music_voice_line");
        var $voiceDot = $(".music_voice_dot");
        //voiceProgress对象现在是一个调用了Progress构造函数并传入了三个参数的对象   可以使用构造函数里方法
        voiceProgress = Progress($voiceBar,$voiceLine,$voiceDot);
        voiceProgress.ProgressClick(function(value){
            //使用修改音量的方法 用返回的value修改修改修改音量
            player.musicVoiceSeekTo(value);
            //保存当前设定音量以在点击音量图标时切换回来
            voiceProgressNow = value;
            addCookie("voice",voiceProgressNow,7,"/","127.0.0.1");
        });
        voiceProgress.ProgressMove(function(value){
            player.musicVoiceSeekTo(value);
            //保存当前设定音量以在点击音量图标时切换回来
            voiceProgressNow = value;
            addCookie("voice",voiceProgressNow,7,"/","127.0.0.1");
        });
        
    }
    

    //5.初始化事件监听
    initEvents();
    function initEvents(){
        //1.监听歌曲的移入移出事件
        $(".content_list").delegate(".list_music","mouseenter",function(){
            //显示子菜单 
            $(this).find(".list_menu").stop().fadeIn(100);
            $(this).find(".list_time a").stop().fadeIn(100);
            //隐藏时长
            $(this).find(".list_time span").stop().fadeOut(100);
        });
        $(".content_list").delegate(".list_music","mouseleave",function(){
            //隐藏子菜单 显示时长
            $(this).find(".list_menu").stop().fadeOut(100);
            $(this).find(".list_time a").stop().fadeOut(100);
            $(this).find(".list_time span").stop().fadeIn(100);
        });



        //2.监听复选框的点击事件
        $(".content_list").delegate(".list_check","click",function(){
            //切换点击状态
            $(this).toggleClass("list_checked");
        });

        //3.添加子菜单播放按钮的监听
        //获取底部的播放按钮
        var $musicPlay = $(".music_play");
        //给子菜单播放按钮添加点击事件
        $(".content_list").delegate(".list_menu_play","click",function(){
            //获取到歌曲列表里的这条音乐
            var $item =$(this).parents(".list_music");
            // console.log($item.get(0).index);
            // console.log($item.get(0).music);
            //3.0 获取对应序号的红心状态
            var loveYN = getCookie("'"+$item.get(0).index+"'");
            //判断 如果通过对应播放歌曲的序号获取到了红心状态则底部添加红心 没有则移除红心
            if(loveYN == "love"){
                $(".music_fav").addClass("music_fav2");
            }else{
                $(".music_fav").removeClass("music_fav2");
            }
            //3.1 切换播放图标
            $(this).toggleClass("list_menu_play2");
            //3.2 复原列表里其他音乐的播放图标
            $item.siblings().find(".list_menu_play").removeClass("list_menu_play2");
            //3.3 同步底部的播放按钮
            if($(this).hasClass("list_menu_play2")){
                //当前播放按钮是播放状态  让底部也是播放状态
                $musicPlay.addClass("music_play2");
                //让本行音乐的文字高亮  兄弟行的变暗
                $item.find("div").css("color","#fff");
                $item.siblings().find("div").css("color","rgba(225,225,225,0.5)");
            }else{
                //当前播放按钮不是播放状态  移除底部的播放状态
                $musicPlay.removeClass("music_play2");
                //让文字和兄弟行的一致
                $item.find("div").css("color","rgba(225,225,225,0.5)");

            }
            //3.4切换序号的状态 播放时为波浪线
            $item.find(".list_number").toggleClass("list_number2");
            $item.siblings().find(".list_number").removeClass("list_number2");
            
            //3.5播放音乐  调用player对象的playMusic方法 传入这条音乐的序号和数据
            player.playMusic($item.get(0).index,$item.get(0).music);

            //3.6切换歌曲信息
            initMusicInfo($item.get(0).music);
            //3.7切换歌词信息
            initMusicLyric($item.get(0).music)
        });

        //4.监听底部控制区域播放按钮的点击
        $musicPlay.click(function(){
            //判断有没有播放过音乐
            if(player.currentIndex == -1){
                //没有播放过音乐 播放第一首音乐
                $(".list_music").eq(0).find(".list_menu_play").trigger("click");
            }else{
                //已经播放过音乐 播放已经播放过的音乐
                $(".list_music").eq(player.currentIndex).find(".list_menu_play").trigger("click");
            }
        });

        //5.监听底部控制区域上一首按钮的点击
        $(".music_pre").click(function(){
            //判断随机播放开启状态
            if(random){
                //播放用player的随机音乐方法返回的随机序号的音乐
                $(".list_music").eq(player.musicRandom()).find(".list_menu_play").trigger("click");
            }else if(single){
                //调用单曲循环方法
                player.musicSingle();
            }else{
                //播放用player的上一首音乐方法返回的序号的音乐
                $(".list_music").eq(player.preIndex()).find(".list_menu_play").trigger("click");
            }
        });

        //6.监听底部控制区域下一首按钮的点击
        $(".music_next").click(function(){
            //判断随机播放开启状态
            if(random){
                //播放用player的随机音乐方法返回的随机序号的音乐
                $(".list_music").eq(player.musicRandom()).find(".list_menu_play").trigger("click");
            }else if(single){
                //调用单曲循环方法
                player.musicSingle();
            }else{
                //播放用player的下一首音乐方法返回的序号的音乐
                $(".list_music").eq(player.nextIndex()).find(".list_menu_play").trigger("click");
            }
        });

        //7.监听子菜单删除按钮的点击
        $(".content_list").delegate(".list_menu_del","click",function(){
            //找到被点击的音乐
            var $item = $(this).parents(".list_music");

            //判断当前删除的音乐是否是正在播放的音乐
            if($item.get(0).index == player.currentIndex){
                $(".music_next").trigger("click");
            }
            $item.remove();
            //使用删除音乐的方法删除掉json里对应的数据
            player.changeMusic($item.get(0).index);

            //重新排序
            $(".list_music").each(function(index,ele){
                ele.index = index;
                $(ele).find(".list_number").text(index+1);
            });
        });

        //8.实时监听播放进度
        player.musicTimeUpdate(function(currentTime,duration,timeStr){
            //同步歌曲时间
            $(".music_progress_time").text(timeStr);
            //计算播放比例
            var value = currentTime / duration *100;
            //同步进度条 
            progress.setProgress(value);
            //如果进度条满则播放下一首
            if(value == 100 && random == false&& single == false){
                $(".list_music").eq(player.nextIndex()).find(".list_menu_play").trigger("click");
            }
            //如果随机播放开启进度条满则播放随机序号的音乐
            if(value == 100 && random == true){
                $(".list_music").eq(player.musicRandom()).find(".list_menu_play").trigger("click");
            }
            //如果单曲循环开启进度条满则重新播放本音乐
            if(value == 100 && single == true){
                player.musicSingle();
            }
            //实现歌词同步
            //使用lyric的获取当前歌词序号方法获得序号
            var index =lyric.currentIndex(currentTime);

            // 当歌词序号发生改变时使用改变歌词方法
            //找到对应序号的那一条歌词
            var $item = $(".song_lyric_container .song_lyric li").eq(index);
            var $clearM = $(".clearMode .song_lyric li").eq(index);
            //添加高亮变色效果
            $item.addClass("cur");
            $clearM.addClass("cur");
            //移除其他兄弟歌词的高亮变色
            $item.siblings().removeClass("cur");
            $clearM.siblings().removeClass("cur");

            //当前歌词大于前三条时开始改元素位置 让歌词内容始终只显示7条
            if(index <= 2) return;
            $(".song_lyric_container .song_lyric").css({
                marginTop: (-index + 2) * 30
            });
            $(".clearMode .song_lyric").css({
                marginTop: (-index + 3) * 75
            });

        });
        //9.监听声音图标按钮的点击
        $(".music_voice_icon").click(function(){
            //图标切换
            $(this).toggleClass("music_voice_icon2");
            //声音的切换
            if($(this).hasClass("music_voice_icon2")){
                //变为没有声音
                player.musicVoiceSeekTo(0);
            }else{
                //切换回静音前的音量
                player.musicVoiceSeekTo(voiceProgressNow);
            }
        });

        //10.监听顶部删除按钮的点击
        $("#del").click(function(){
            //找到被勾选的音乐
            var $item = $(".list_checked").parents(".list_music");
            //没有音乐被勾选时直接返回结束此次事件
            if($item.get(0) == undefined) return;
            
            //判断当前删除的音乐是否是正在播放的音乐 是就触发播放下一首
            if($item.get(0).index == player.currentIndex){
                $(".music_next").trigger("click");
            }
            $item.remove();
            //勾选多个的情况下用循环处理 每次都使用删除音乐的方法
            for(var i= 0;i<$item.length;i++){
                player.changeMusic($item.get(i).index);
            }
            
            //重新排序
            $(".list_music").each(function(index,ele){
                ele.index = index;
                $(ele).find(".list_number").text(index+1);
            });
        });

        //11. 监听顶部清空列表&重置列表的点击
        $("#clear").click(function(){
            //判断清空状态是否可用
            if(clear){
                //移除歌曲列表
                $(".list_music").remove();
                //添加重置类
                $(this).addClass("reset");
                //改变显示文字为重置列表
                $(this).html("<i></i>重置列表");
            }else{
                //当清空状态不可用时 重置状态可用
                reset =true;
            }
           
            
        });
        $(".content_toolbar").delegate(".reset","click",function(){
            //当有重置类时判断重置状态
            if(reset){
                //重新加载歌曲列表
                getPlayerList();
                //移除重置类
                $("#clear").removeClass("reset");
                //改变显示文字为清空列表
                $("#clear").html("<i></i>清空列表");
                //清空状态恢复可用
                clear = true;
                //重置状态不可用 
                reset = false;
            } 
            
        });
        
        //12.更改播放顺序
        $(".music_mode").click(function(){
            if($(this).hasClass("music_mode3")!=true && $(this).hasClass("music_mode4")!=true ){
                //当为全体循环时 点击切换至随机播放
                $(this).addClass("music_mode3");
                random = true;
                return;
            }else if($(this).hasClass("music_mode3") && $(this).hasClass("music_mode4")!=true){
                //当为随机播放时 点击切换至单曲循环
                $(this).addClass("music_mode4");
                $(this).removeClass("music_mode3");
                random = false;
                single = true;
                return;
            }else{
                //当为单曲循环时 点击切换至全体循环
                $(this).removeClass("music_mode4");
                single = false;
            }
            
        });
        //13.切换简洁模式
        $(".music_only").click(function(){
            //切换图标的显示
            $(this).toggleClass("music_only2");
            //切换界面的显示
            $(".content_in").toggleClass("hide1");
            $(".clearMode").toggleClass("hide1");
        });
        //14.1 点击底部红心按钮
        $(".music_fav").click(function(){
            //如果歌曲已有红心
            if($(this).hasClass("music_fav2")){
                //移除红心图标
                $(this).removeClass("music_fav2");
                //删除对应的cookie
                delCookie("'"+player.currentIndex+"'","/");
            //如果歌曲没有红心
            }else{
                //添加红心图标
                $(this).addClass("music_fav2");
                //保存红心状态到cookie
                addCookie("'"+player.currentIndex+"'","love",7,"/","127.0.0.1");
            }
            
        });
        //14.2 监听顶部收藏按钮的点击
        $("#save").click(function(){
            //找到被勾选的音乐
            var $item = $(".list_checked").parents(".list_music");
            //没有音乐被勾选时直接返回结束此次事件
            if($item.get(0) == undefined) return;
            for(var i= 0;i<$item.length;i++){
                //保存红心状态到cookie
                addCookie("'"+$item.get(i).index+"'","love",7,"/","127.0.0.1");
            }
        });
        
    }
    
    


    //定义一个方法创建一条音乐
    function createMusicItem(index,music){
        var $item = $("<li class=\"list_music\">\n"+
        "<div class=\"list_check\"><i></i></div>\n"+
        "<div class=\"list_number\">"+(index+1)+"</div>\n"+
        "<div class=\"list_name\">"+music.name+
        "<div class=\"list_menu\">\n"+
        "<a href=\"javascript:;\" title=\"播放\" class=\"list_menu_play\"></a>\n"+
        "<a href=\"javascript:;\" title=\"添加\"></a>\n"+
        "<a href=\"javascript:;\" title=\"下载\"></a>\n"+
        "<a href=\"javascript:;\" title=\"分享\"></a>\n"+
        "</div>\n"+
        "</div>\n"+
        "<div class=\"list_singer\">"+music.singer+"+</div>\n"+
        "<div class=\"list_time\">\n"+
        "<span>"+music.time+"</span>\n"+
            "<a href=\"javascript:;\" title=\"删除\" class=\"list_menu_del\"></a>\n"+
            "</div>\n"+
            "</li>");

        $item.get(0).index = index;
        $item.get(0).music = music;
        return $item;
    }

    //保存cookie的方法
    function addCookie(key,value,day,path,domain){
        //1.处理默认保存的路径
        var index =window.location.pathname.lastIndexOf("/");
        var currentPath= window.location.pathname.slice(0,index);
        path = path || currentPath;
        // 2.处理默认保存的domain
        domain = domain || document.domain;
        // 3.处理默认的过期时间
        if(!day){
            document.cookie = key+"="+value+";path="+path+";domain="+domain+";";
        }else{
            var date = new Date();
            date.setDate(date.getDate()+day);
            document.cookie = key+"="+value+";expires="+date.toGMTString()+";path="+path+";domain="+domain+";";
        }
        
    }

    //获取cookie的方法
    function getCookie(key){
        var res = document.cookie.split(";");
        for(var i = 0 ; i<res.length;i++){
            var temp = res[i].split("=");
            if(temp[0].trim() === key){ //trim去除前后空格
                return temp[1];
            }
        }
    }
    //删除cookie的方法
    //默认情况下只能删除默认路径中保存的cookie  传入指定路径以删除指定路径的cookie
    function delCookie(key,path){
        addCookie(key,getCookie(key),-1,path);
    }
});
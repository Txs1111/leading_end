//播放音乐组件代码
(function(window){
    function Player($audio){
        return new Player.prototype.init($audio);
    }
    Player.prototype = {
        constructor:Player,
        musicList: [],
        init: function ($audio){
            this.$audio = $audio;
            this.audio = $audio.get(0);
        },
        currentIndex: -1,
        ran0:-2,   //声明ran0至ran3的对象   
        ran1:-3,   //用以保存随机过的歌曲 防止随机播放下两次点击的下一曲是已播放过的三首音乐 
        ran2:-4,   //此伪随机 当音乐列表的歌曲小于3首时会出现bug
        ran3:-5,
        //播放音乐
        playMusic: function (index,music){
            //判断是否是同一首音乐
            if(this.currentIndex == index){
                //同一首音乐
                if(this.audio.paused){
                    //如果是暂停状态就播放 不是就暂停
                    this.audio.play();
                }else{
                    this.audio.pause();
                }
            }else{
                //不是同一首音乐
                this.$audio.attr("src",music.link_url);
                this.audio.play();
                this.currentIndex = index;
            }
        },
        //播放上一首音乐
        preIndex: function(){
            var index = this.currentIndex - 1;
            if(index < 0){
                index=this.musicList.length-1;
            }
            return index;
        },
        //播放下一首音乐
        nextIndex: function(){
            var index = this.currentIndex + 1;
            if(index > this.musicList.length -1){
                index= 0;
            }
            return index;
        },
        //删除音乐
        changeMusic:function(index){
            //删除对应的数据
            this.musicList.splice(index,1);

            //判断当前删除的是否是正在播放的音乐的前面的音乐
            if(index<this.currentIndex){
                this.currentIndex = this.currentIndex-1;
            }

        },
        //设置播放音乐的时间
        musicTimeUpdate: function(callBack){
            var $this = this;
            this.$audio.on("timeupdate",function(){
                //获取这首歌的总时间和已播放的时间
                var duration = $this.audio.duration || 0;
                var currentTime =$this.audio.currentTime;
                //使用格式化时间的方法把时间转化为播放页面需要的字符串格式
                var timeStr = $this.formatDate(currentTime,duration);
                callBack(currentTime,duration,timeStr);
            });
        },
        //格式化时间
        formatDate:function(currentTime,duration){
            var endMin = parseInt(duration / 60);
            var endSec = parseInt(duration % 60);
            if(endMin < 10){
                endMin = "0"+endMin;
            }
            if(endSec < 10){
                endSec = "0"+endSec;
            }

            var startMin = parseInt(currentTime / 60);
            var startSec = parseInt(currentTime % 60);
            if(startMin < 10){
                startMin = "0"+startMin;
            }
            if(startSec < 10){
                startSec = "0"+startSec;
            }

            return startMin+":"+startSec+" / "+endMin+":"+endSec;
        },
        //调整音乐播放进度
        musicSeekTo:function(value){
            if(isNaN(value)) return;  //单独点击进度条有判定问题 会引起报错 故value值不正确时不执行 
            //已播放的时长 = 总时长*进度条计算的百分比
            this.audio.currentTime = this.audio.duration * value;
        },
        //调整播放音量
        musicVoiceSeekTo:function(value){
            if(isNaN(value)) return; 
            if(value < 0 ||value >1) return;
            // 此原生audio音量属性的值为0至1
            this.audio.volume =value;
        },
        //播放伪随机音乐
        musicRandom:function(){
            //循环获取歌曲序号 直到ran0不是当前的歌曲和上两次随机的歌曲为止
            do{
                this.ran0 = parseInt(Math.random()* $(".list_music").length);
            }while(this.ran0+1 == this.currentIndex ||this.ran0 == this.ran2||this.ran0 == this.ran1 ||this.ran0 == this.ran3);
            //分步骤保存上一次随机的数据  三次随机播放后ran1 ran2 ran3都会有不同的值了
            this.ran3 = this.ran2;
            this.ran2 = this.ran1;
            this.ran1 = this.ran0;
            return this.ran0;
        },
        //单曲循环
        musicSingle:function(){
            this.audio.load();
            this.audio.play();
        }
    }
    Player.prototype.init.prototype = Player.prototype;
    window.Player = Player;
})(window);
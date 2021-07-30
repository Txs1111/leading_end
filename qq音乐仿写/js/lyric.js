//歌词组件代码
(function(window){
    function Lyric(path){
        return new Lyric.prototype.init(path);
    }
    Lyric.prototype = {
        constructor:Lyric,
        init: function (path){
            this.path = path;
        },
        times:[],  //保存时间的数组
        lyrics:[], //保存歌词的数组
        index:-1,  //默认索引值为-1
        //加载歌词 通过ajax访问歌词文件并获得数据
        loadLyric:function(callBack){
            var $this = this;
            $.ajax({
                url:$this.path,
                dataType:"text",
                success: function(data){
                   $this.parseLyric(data);
                   callBack();
                },
                error: function(e){
                    console.log(e);
                }
            });
        },
        //把获得的歌词文件切割保存为时间和歌词
        parseLyric:function(data){
            var $this = this;
            //清空上一首歌曲的歌词和时间信息
            $this.times = [];
            $this.lyrics = [];
            var array = data.split("\n");
            // console.log(array);
            //[00:00.00]
            var timeReg = /\[(\d*:\d*\.\d*)\]/;
            //遍历取出每一条歌词
            $.each(array,function(index,ele){
                //处理歌词  切割
                var lrc = ele.split("]")[1];
                //排除空字符串(没有歌词的)
                if(lrc.length <= 1)return true;
                $this.lyrics.push(lrc);
                
                
                //处理时间 
                var res =timeReg.exec(ele);
                // console.log(res);
                if(res == null) return true;
                var timeStr = res[1]; //[00:00.00]
                var res2 =timeStr.split(":");
                var min =parseInt(res2[0])*60;
                var sec =parseFloat(res2[1]);
                //先把秒和秒的浮点数加在一起变成数字类型  再用修正截到小数点后2位为止(此时为字符串类型)  
                //再用parseFloat转换一次数字类型
                var time =parseFloat(Number(min+sec).toFixed(2)); 
                //保存歌词对应的时间
                $this.times.push(time);
                
            });
        },
        //判断当前歌曲进度获取对应进度的歌词序号
        currentIndex:function(currentTime){
            if(currentTime >= this.times[0]){
               
                this.index++  //索引值+1 = 0 即读取第一条歌词  第二次进来后索引值+1=1  即读取第二条歌词
                this.times.shift(); //数组的shift方法 用来删除最前面的元素  这样每次进来判断的时间都会变化
            }
            return this.index;
        },
    }
    Lyric.prototype.init.prototype = Lyric.prototype;
    window.Lyric = Lyric;
})(window);
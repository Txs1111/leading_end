//播放器进度条组件代码
(function(window){
    function Progress($progressBar,$progressLine,$progressDot){
        return new Progress.prototype.init($progressBar,$progressLine,$progressDot);
    }
    Progress.prototype = {
        constructor:Progress,
        init: function ($progressBar,$progressLine,$progressDot){
            this.$progressBar = $progressBar;
            this.$progressLine = $progressLine;
            this.$progressDot = $progressDot;
        },
        isMove: false,
        //播放进度条点击事件的方法
        ProgressClick:function(callBack){
            var $this = this; //此时的this是主页js里调用此原型方法函数的progress
            //监听背景的点击
            this.$progressBar.click(function(event){ 
                //此时的this是调用此函数的$progressBar  所以需要提前保存this
                //获取背景距离窗口默认的位置
                var normalLeft = $(this).offset().left;
                //获取点击的位置距离窗口的位置
                var eventLeft = event.pageX;
                //设置前景的宽度和小圆点的位置 
                $this.$progressLine.css("width",eventLeft - normalLeft);
                $this.$progressDot.css("left",eventLeft - normalLeft);
                //计算进度条的比例
                var value = (eventLeft - normalLeft) / $(this).width();
                callBack(value);
            });

        },
        //进度条拖拽事件的方法
        ProgressMove:function(callBack){
            var $this = this;
            var normalLeft = $this.$progressBar.offset().left;    //获取背景距离窗口默认的位置
            var barWidth = $this.$progressBar.width(); //获取进度条窗口的宽度
            var eventSLeft;  //设定拖拽后的距离窗口的位置 让其最后回调的值在0和1之间
            var mouseMove =false; //当鼠标按下后才进行鼠标抬起事件的判定 
            //1.监听鼠标的按下事件
            this.$progressDot.mousedown(function(){
                $this.isMove = true;  
                mouseMove =true; 
                //2.监听鼠标按下后的移动事件
                $(document).mousemove(function(event){
                    //获取点击的位置距离窗口的位置
                    var eventLeft =event.pageX;

                    //设置前景的宽度和小圆点的位置  设置判断限制小圆点的移动范围
                    if(eventLeft - normalLeft <= 0){ 
                        $this.$progressLine.css("width",0);
                        $this.$progressDot.css("left",0);
                        eventSLeft = normalLeft;
                    }else if(eventLeft - normalLeft >= barWidth){
                        $this.$progressLine.css("width",barWidth);
                        $this.$progressDot.css("left",barWidth);
                        eventSLeft = normalLeft+barWidth;
                    }else{
                        $this.$progressLine.css("width",eventLeft - normalLeft);
                        $this.$progressDot.css("left",eventLeft - normalLeft);
                        eventSLeft = eventLeft;
                    }
                    return eventSLeft;
                    // // 计算进度条的比例
                    // var value = (eventLeft - normalLeft) / barWidth;
                    // callBack(value);
                });
                
                //3.监听鼠标的抬起事件
                    $(document).mouseup(function(event){
                    if(mouseMove){
                        // //获取点击的位置距离窗口的位置
                        // var eventLeft =event.pageX;
                        $(document).off("mousemove");
                        $this.isMove = false;
                        // 计算进度条的比例
                        var value = (eventSLeft - normalLeft) / barWidth;
                        callBack(value);
                        // console.log(value);
                        mouseMove =false;
                    }
                });
            });

            
        },
        //设置进度条长度的方法
        setProgress: function (value) {
            if(this.isMove) return;
            if(value < 0 || value > 100) return;
            this.$progressLine.css({
                width: value+"%"
            });
            this.$progressDot.css({
                left: value+"%"
            });
        }
    }
    Progress.prototype.init.prototype = Progress.prototype;
    window.Progress = Progress;
})(window);
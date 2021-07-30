(function(window){
    function Progress($progressBar,$progressLine,$progressDot){
        return new Progress.prototype.init($progressBar,$progressLine,$progressDot);
    }
    Progress.prototype={
        constructor:Progress,
        init:function($progressBar,$progressLine,$progressDot){
            this.$progressBar = $progressBar;
            this.$progressLine = $progressLine;
            this.$progressDot = $progressDot;
        },
        isMove: false,
        progressClick:function(callback){
            var $this=this;
            this.$progressBar.click(function(event){
                var normalLeft=$(this).offset().left;
                var eventLeft = event.pageX;
                $this.$progressLine.css('width',eventLeft-normalLeft);
                $this.$progressDot.css('left',eventLeft-normalLeft);
                var value=(eventLeft-normalLeft)/$(this).width();
                callback(value);
            })
        },
        progressMove:function(callback){
            var $this=this;
            var barWidth=this.$progressBar.width();
            var normalLeft=this.$progressBar.offset().left;
            var eventLeft ;
            this.$progressBar.mousedown(function(){
                $this.isMove = true;
                $(document).mousemove(function(event){
                    eventLeft = event.pageX;
                    var offset = eventLeft - normalLeft;
                    if(offset>0 && offset<barWidth){
                         $this.$progressLine.css('width',offset);
                         $this.$progressDot.css('left',offset);   
                    }                                      
                })
            })
            $(document).mouseup(function(){
                $(document).off("mousemove");
                $this.isMove = false;
                var value=(eventLeft-normalLeft)/$(this).width();
                callback(value);   
            })
        },
        setProgress:function(value){
            if(this.isMove) return;
            if(value<0||value>100) return;
            this.$progressLine.css({
                width:value+'%'
            });
            this.$progressDot.css({
                left: value+"%"
            });
        }
    }
    Progress.prototype.init.prototype=Progress.prototype;
    window.Progress=Progress;
})(window);
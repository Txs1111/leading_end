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
        progressClick:function(){
            var $this=this;
            this.$progressBar.click(function(event){
                var normalLeft=$(this).offset().left;
                var eventLeft = event.pageX;
                $this.$progressLine.css('width',eventLeft-normalLeft);
                $this.$progressDot.css('left',eventLeft-normalLeft);
            })
        },
        progressMove:function(){
            var $this=this;
            var normalLeft=this.$progressBar.offset().left;
            this.$progressBar.mousedown(function(){
                $(document).mousemove(function(event){
                    var eventLeft = event.pageX;
                    $this.$progressLine.css('width',eventLeft-normalLeft);
                    $this.$progressDot.css('left',eventLeft-normalLeft);    
                })
            })
            $(document).mouseup(function(){
                $(document).off("mousemove");
            })
        }
    }
    Progress.prototype.init.prototype=Progress.prototype;
    window.Progress=Progress;
})(window);
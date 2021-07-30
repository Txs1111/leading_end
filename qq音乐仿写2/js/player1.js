(function(window){
    function Player(){
        return new Player.prototype.init();
    }
    Player.prototype={
        constructor:Player,
        init:function(){

        }
    }
    Player.prototype.init.prototype=Player.prototype;
    window.Player=Player;
})(window);
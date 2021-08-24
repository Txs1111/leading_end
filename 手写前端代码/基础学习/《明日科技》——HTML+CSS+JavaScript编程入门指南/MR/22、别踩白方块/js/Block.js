function Block(container) {
    this.container = container; //定义容器div
    this.mainW = this.container.parentNode.clientWidth; //定义父元素宽度
    this.mainH = this.container.parentNode.clientHeight; //定义父元素高度
    this.scale = 1.58; //黑块的高宽比
    this.height = parseInt(this.mainW / 4 * this.scale); //定义黑块儿高度
    this.top = -this.height;
    this.speed = 2; //定义速度
    this.maxSpeed = 20; //定义最大速度
    this.timer = null; //定时器id
    this.state = true; //游戏状态
    this.sum = 0; //分数
}
Block.prototype = {
    init: function() {
        var _t = this;
        _t.mark(); //显示初始分数
        _t.container.addEventListener("click", function(e) {
            if (!_t.state) {
                return false;
            }
            e = e || window.event; //获取事件对象
            var target = e.target || e.srcElement; //获取触发事件的元素
            if (target.className.indexOf('block') != -1) {
                _t.sum++; //分数加1
                document.getElementsByClassName("mark")[0].innerHTML = _t.sum; //显示分数
                target.className = 'blank'; //设置类名
            } else {
                _t.state = false; //变量赋值
                clearInterval(_t.timer); //停止移动
                _t.end(); //游戏结束
                return false;
            }
        });
    },
    //创建一行
    addRow: function() {
        var oRow = document.createElement('div'); //创建div元素
        oRow.className = 'row'; //设置类名
        oRow.style.height = this.height + 'px'; //设置元素高度
        var blanks = ['blank', 'blank', 'blank', 'blank']; //定义数组
        var s = Math.floor(Math.random() * 4); //获取0~3的随机数
        blanks[s] = "blank block"; //为指定下标的数组元素赋值
        var oBlank = null;
        for (var i = 0; i < 4; i++) {
            oBlank = document.createElement('div'); //创建div元素
            oBlank.className = blanks[i]; //设置类名
            oRow.appendChild(oBlank); //添加元素
        }
        var fChild = this.container.firstChild; //获取第一个子元素
        if (fChild == null) {
            this.container.appendChild(oRow); //在末尾添加元素
        } else {
            this.container.insertBefore(oRow, fChild); //在最前面添加元素
        }
    },
    judge: function() {
        var _t = this;
        if (_t.top >= 0) {
            _t.top = -this.height; //设置top值
            _t.container.style.top = _t.top + 'px'; //设置元素位置
            _t.addRow(); //添加一行
        }
        _t.speed = (parseInt(_t.sum / 5) + 1) * 2; //根据单击的黑块总数提高速度
        if (_t.speed >= _t.maxSpeed) { _t.speed = _t.maxSpeed; } //设置移动速度为最大速度
        var blocks = document.getElementsByClassName('block'); //获取黑块儿
        for (var j = 0; j < blocks.length; j++) {
            if (blocks[j].offsetTop >= _t.mainH) { //如果黑块儿移动到底部
                _t.state = false;
                clearInterval(_t.timer); //停止移动
                _t.end(); //游戏结束
            }
        }
    },
    //移动
    move: function() {
        this.top += this.speed; //设置top值
        this.container.style.top = this.top + 'px'; //设置元素位置
    },
    //显示分数
    mark: function() {
        var oMark = document.createElement("div"); //创建div元素
        oMark.className = "mark"; //设置类名
        oMark.innerHTML = this.sum; //设置HTML内容
        this.container.parentNode.appendChild(oMark); //添加元素
    },
    //游戏开始
    start: function() {
        var _t = this;
        for (var i = 0; i < 4; i++) {
            _t.addRow(); //添加一行
        }
        _t.timer = setInterval(function() {
            _t.move(); //向下移动
            _t.judge(); //游戏判断
        }, 30);
    },
    //游戏结束  
    end: function() {
        var _t = this;
        if (!document.getElementById("result")) {
            var result = document.createElement('div'); //创建div元素
            result.className = 'result'; //设置类名
            result.id = 'result'; //设置id
            result.innerHTML = '<h1>GAME OVER</h1><h2 id="score">分数：' + _t.sum + '</h2><span id="restart">重新开始</span>'; //设置HTML内容
            _t.container.parentNode.appendChild(result); //添加元素
        } else {
            var result = document.getElementById("result"); //获取元素
            result.style.display = "block"; //显示元素
            var score = document.getElementById("score"); //获取元素
            score.innerHTML = "分数：" + _t.sum; //设置HTML内容
        }
        var restart = document.getElementById("restart"); //获取元素
        restart.onclick = function() {
            _t.again(); //重新游戏
            result.style.display = "none"; //隐藏元素
            return false;
        }
    },
    //重新游戏
    again: function() {
        this.mainW = this.container.parentNode.clientWidth; //定义父元素宽度
        this.mainH = this.container.parentNode.clientHeight; //定义父元素高度
        this.scale = 1.58; //黑块的高宽比
        this.height = parseInt(this.mainW / 4 * this.scale); //定义黑块儿高度
        this.top = -this.height;
        this.speed = 2; //定义速度
        this.timer = null; //定时器id
        this.state = true; //游戏状态
        this.sum = 0; //分数
        var _t = this;
        _t.container.innerHTML = ""; //清空HTML内容
        document.getElementsByClassName('mark')[0].innerHTML = _t.sum; //显示初始分数
        _t.start(); //开始游戏
    }
}

// function Block(container) {
//     this.container = container; //定义容器div
//     this.mainW = this.container.parentNode.clientWidth; //定义父元素的宽度
//     this.mainH = this.container.parentNode.clientHeight; //定义父元素的高度
//     this.scale = 1.58; //黑块的高宽比
//     this.height = parseInt(this.mainW / 4 * this.scale); //定义黑块的高度
//     this.top = -this.height;
//     this.speed = 2; //定义速度
//     this.maxSpeed = 20; //定义最大速度
//     this.timer = null; //定时器id
//     this.state = true; //游戏状态
//     this.sum = 0; //分数
// }
// Block.prototype ={
// 	init:function(){
// 		var_t = this;
// 		_t.mark;
// 		-t.container.addEventListener("click",function(e){
// 			if(!_t.status){
// 				return false;
// 			}
// 			e=e||window.event;
// 			var target = e.target || e.srcElement;
// 			if(target.className.indexOf('block')!=-1){
// 				_t.sum++;
// 			}
// 		})
// 	}
// }
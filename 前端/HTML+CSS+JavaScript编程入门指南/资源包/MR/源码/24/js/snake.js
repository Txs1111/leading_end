function Snake(){
    this.rows = 21;//21行
    this.cols = 21;//21列
    this.speed = 200;//前进速度
    this.curKey = 0;//当前方向按键键码值
    this.timer = 0;
    this.pos = [];//蛇身位置
    this.foodPos = {"x":-1,"y":-1};
    this.foodNum = 0;//吃掉食物数量
    this.dom = document.getElementById("map");//地图元素
    this.pause = 1;//1表示暂停，-1表示开始
}
Snake.prototype.map = function(){//创建地图
	if(this.dom.firstChild){
		this.dom.removeChild(this.dom.firstChild);//重新开始 删除之前创建的tbody
	}
    for( j = 0; j < this.rows; j++ ){
        var tr = this.dom.insertRow(-1);//插入一行
        for( i = 0; i < this.cols; i++ ){
            tr.insertCell(-1);//插入一列
        }
    }
}
Snake.prototype.food = function(){//生成食物
    do{
        this.foodPos.y = Math.floor( Math.random()*this.rows );
        this.foodPos.x = Math.floor( Math.random()*this.cols );
    }while( this.dom.rows[this.foodPos.y].cells[this.foodPos.x].className != "" )//防止食物生成在蛇身上
    this.dom.rows[this.foodPos.y].cells[this.foodPos.x].className="snakefood";//设置食物样式
    document.getElementById("foodNum").innerHTML=this.foodNum++;//设置分数
}
Snake.prototype.init = function(){
    this.map();//创建地图
    arguments[0] ? this.speed=arguments[0] : false;//选择速度
    this.pos = [{"x":2,"y":0},{"x":1,"y":0},{"x":0,"y":0}];//定义蛇身位置
    for(var j=0; j<this.pos.length; j++ ){//显示蛇身
        this.dom.rows[this.pos[j].y].cells[this.pos[j].x].className="snakebody";
    }
    this.dom.rows[this.pos[0].y].cells[this.pos[0].x].className="snakehead";//为蛇头设置样式
    this.curKey = 0;//当前方向按键键码值
    this.foodNum = 0;//吃掉食物数量
    this.food();//生成食物
    this.pause = 1;//1表示暂停，-1表示开始
}
Snake.prototype.trigger = function(e){
	var _t=this;
    var e = e || event;
    var eKey = e.keyCode;//获取按键键码值
    if( eKey>=37 && eKey<=40 && eKey!=this.curKey && !( (this.curKey == 37 && eKey == 39) || (this.curKey == 38 && eKey == 40) || (this.curKey == 39 && eKey == 37) || (this.curKey == 40 && eKey == 38) ) && this.pause==-1 ){//如果按下的是方向键，并且不是当前方向，也不是反方向和暂停状态
        this.curKey = eKey;        //设置当前方向按键键码值        
    }else if( eKey==32 ){
        this.curKey = (this.curKey==0) ? 39 : this.curKey;
		this.pause*=-1;
		if(this.pause==-1){
			this.timer=window.setInterval(function(){_t.move()},this.speed);//蛇身移动
		}else{
			window.clearInterval(this.timer);//停止
		}
    }
}
Snake.prototype.move = function(){//移动
    switch(this.curKey){
        case 37: //左方向
            if( this.pos[0].x <= 0 ){ //蛇头撞到边界
				this.over(); 
				return; 
			}else{ 
				this.pos.unshift( {"x":this.pos[0].x-1,"y":this.pos[0].y}); //添加元素
			}
            break;
        case 38: //上方向
            if( this.pos[0].y <= 0 ){ 
				this.over(); 
				return; 
			}else{ 
				this.pos.unshift( {"x":this.pos[0].x,"y":this.pos[0].y-1}); 
			}
            break;
        case 39://右方向
            if( this.pos[0].x >= this.cols-1 ){ 
				this.over(); 
				return; 
			}else{ 
				this.pos.unshift( {"x":this.pos[0].x+1,"y":this.pos[0].y}); 
			}
            break;
        case 40: //下方向
            if( this.pos[0].y >= this.rows-1 ){ 
				this.over(); 
				return; 
			}else{ 
				this.pos.unshift( {"x":this.pos[0].x,"y":this.pos[0].y+1}); 
			}
            break;
    }
    if( this.pos[0].x == this.foodPos.x && this.pos[0].y == this.foodPos.y ){//蛇头位置与食物重叠
        this.food();//生成食物
    }else if( this.curKey != 0 ){
        this.dom.rows[this.pos[this.pos.length-1].y].cells[this.pos[this.pos.length-1].x].className="";
        this.pos.pop();//删除蛇尾
    }
    for(i=3;i<this.pos.length;i++){//从蛇身的第四节开始判断是否撞到自己
        if( this.pos[i].x == this.pos[0].x && this.pos[i].y == this.pos[0].y ){ 
            this.over();//游戏结束
            return;
        }
    }
    this.dom.rows[this.pos[0].y].cells[this.pos[0].x].className="snakehead";//画新蛇头
    this.dom.rows[this.pos[1].y].cells[this.pos[1].x].className="snakebody";//原蛇头变为蛇身
}
Snake.prototype.over = function(){
    alert("游戏结束");
    window.clearInterval(this.timer);//停止
    this.init();//重置游戏
}
window.onload = function(){
    var snake = new Snake();//创建对象实例
    snake.init();//调用初始化方法
    document.onkeydown = function(e){ 
		snake.trigger(e); //按下按键时调用方法
	}
    document.getElementById("setSpeed").onchange = function(){ 
		this.blur(); 
		snake.init(this.value); 
	}
}
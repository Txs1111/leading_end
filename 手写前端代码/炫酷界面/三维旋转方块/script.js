 // 咱们JS需要做的就是监听鼠标的拖拽，然后改变ｂｏｘ这个盒子的旋转值即可做到旋转功能
 // 第一步，监听鼠标的拖拽
 // 第二步，为了做到鼠标与正方体的联动，咱们需要统计鼠标的位移量，在平面空间内，我们能拿到x,y值
 // 第三步，咱们用一个函数把咱们的鼠标拖拽事件能包裹起来，避免代码过于乱
 // 第四步，咱们需要一个函数来处理，把咱们鼠标变化的量转化为正方体的旋转
 // 第五步，清空一下console.log，一般在项目中我们会把console.log都去掉或注释的

let cube = document.querySelector('#cube')
// 定义一个旋转初始量
let init = {
  x: -21,
  y: 38
}

// 正常工作
this.handleMove()

// 鼠标拖拽包装
function handleMove() {
  let canMove = false
  // 监听鼠标左键点击事件【鼠标按下】
  window.addEventListener('mousedown', (e_down) => {
    let down = {
      x: e_down.clientX,
      y: e_down.clientY
    }
    let transform = cube.style.transform
    if (transform) {
      let array = transform.split(' ')
      // 使用正则提取x,y的值
      // console.log(array[1].match(/rotateY\((.*)deg\)/)[1])
      let nowXY = {
        x: array[0].match(/rotateX\((.*)deg\)/)[1],
        y: array[1].match(/rotateY\((.*)deg\)/)[1]
      }
      // nowXY就是当前多次点击之后，真实的transform 的 rotateX 与 rotateY的值，把初始值盖掉
      // 值为什么会过大，因为我们下面是无限往上加的
      // 这时候我们知道每360度是一个循环，那就用360取余处理即可
      init = {
        x: nowXY.x % 360,
        y: nowXY.y % 360
      }
    }
    // console.log(transform)
    // console.log('down')
    // console.log(down)
    canMove = true
    // 监听鼠标移动事件【拖拽】
    window.addEventListener('mousemove', (e_move) => {
      // 可以看出，当鼠标松开的时候，move事件还处于工作状态，而我们需要的是鼠标松开，move事件关闭
      if (canMove) { // 如果canMove为真时，即表示move正常工作
        let move = {
          x: e_move.clientX,
          y: e_move.clientY
        }
        // console.log('move')
        // console.log(move)
        rotateXY(down, move)
      }
    })
  })
  // 监听鼠标左键松开事件
  window.addEventListener('mouseup', (e_up) => {
    let up = {
      x: e_up.clientX,
      y: e_up.clientY
    }
    // console.log('up')
    // console.log(up)
    canMove = false
  })
  function rotateXY(down, move) {
    let x = move.x - down.x, // x,y为偏移量，通过速度变量来控制偏移量即可
        y = move.y - down.y,
        speed = 0.5 // 速度控制器
    // console.log(x , y)
    // 旋转，x轴上的值是y, y轴上的值是x，想一下旋转的概念就理解了
    let result = {
      x: init.x + speed * y + 'deg',
      y: init.y + speed * x + 'deg'
    }
    // 看一下效果
    // 有旋转，但是旋转是不是有点怪，过于快，还有开始的时候带有跳的感觉
    // 页面刚进来时旋转是不是没跳的感觉了，但是第二次，第三次进行旋转的时候，旋转又有跳的感觉了，这是因为我们点击的时候应该获取最新的坐标，这才对
    // 我们旋转的时候发现速度过于快了，这时候我们怎么来控制速度呢
    // 看操作
    cube.style.transform = `rotateX(${ result.x }) rotateY(${ result.y }) rotateZ(0deg) translate3d(38px, 0px, 200px)`
  }
}

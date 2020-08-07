<template>
  <div>
    <canvas id="Canvas" />
    <div class="rightButton">
      <el-card class="box-card">
        <div v-for="o in 4" :key="o" class="text item">
          {{ '列表内容 ' + o }}
        </div>
      </el-card>
      <el-button @click="addPointCreate">编辑事件</el-button>
      <el-button @click="removePointCreate">去除编辑事件</el-button>
      <el-button @click="addPointClick">点位触发事件</el-button>
      <el-button @click="drawLine">画线</el-button>
      <el-button @click="drawCreate">画设备</el-button>
      <el-button @click="boardClear">清除画布</el-button>
    </div>

  </div>

</template>
<script>
let canvas
var boardWidth = '1200'
var boardHeight = '800'
let ctx
var postition = []
var fu = ''
function pointClick(e) { // 触发点位事件
  // console.log(e)

  var x = event.clientX - canvas.getBoundingClientRect().left
  var y = event.clientY - canvas.getBoundingClientRect().top
  console.log('X:', x, 'Y:', y)
  console.log(isInsideCircle(x, y, 8, 528, 277))
}
function isInsideCircle(x0, y0, r, x, y) {
  return ((x - x0) * (x - x0) + (y - y0) * (y - y0)) < r * r
}
function pointCreate(e) { // 创建编辑点位
  // console.log(e)

  var x = event.clientX - canvas.getBoundingClientRect().left
  var y = event.clientY - canvas.getBoundingClientRect().top
  console.log('X:', x, 'Y:', y)
  drawArc(x, y)
}
function drawArc(x, y) { // 画圆
  ctx.beginPath()
  ctx.lineWidth = 1
  ctx.arc(x, y, 8, 0, Math.PI * 2, true) // 绘制
  ctx.stroke()
  postition.push({ x: x, y: y })
  drawLine()
}

function drawCreate(x = 528, y = 277) { // 画点位
  ctx.beginPath()
  ctx.arc(x, y, 6, 0, 2 * Math.PI)
  ctx.fillStyle = 'red'
  ctx.font = '30px'
  ctx.fillText('Hello World!', x + 10, y + 4)
  ctx.closePath()
  ctx.fill()
  console.log(fu)
}

function drawLine() { // 画路径
  ctx.beginPath()
  ctx.lineWidth = 10
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  for (let i = 0; i < postition.length; i++) {
    ctx.lineTo(postition[i].x, postition[i].y)
  }

  ctx.stroke()
}
function init() {
  canvas.width = boardWidth
  canvas.height = boardHeight
  ctx.fillStyle = '#ddd'
  ctx.fillRect(0, 0, boardWidth, boardHeight)
  var img = new Image()
  img.src = require('@img/company.jpg')

  img.onload = function(e) {
    // 将图片画到canvas上面上去！
    console.log('图片的宽' + img.width, '图片的高' + img.height)
    ctx.drawImage(img, (boardWidth - img.width) / 2, (boardHeight - img.height) / 2, img.width, img.height)
  }
}
function boardClear() {
  ctx.clearRect(0, 0, boardWidth, boardHeight)
  init()
}
export default {

  name: 'Canvas',
  mounted() {
    fu = this
    postition = []
    this.initCanvas()
  },
  methods: {
    initCanvas() {
      canvas = document.getElementById('Canvas')
      ctx = canvas.getContext('2d')

      init()
    },
    addPointCreate() {
      canvas.addEventListener('click', pointCreate, false)
    },
    addPointClick() {
      canvas.addEventListener('click', pointClick, false)
    },
    removePointCreate() {
      canvas.removeEventListener('click', pointCreate, false)
    },
    drawLine() {
      drawLine()
    },
    drawCreate() {
      drawCreate()
    },
    boardClear() {
      boardClear()
    }
  }
}
</script>
<style scoped>
#Canvas{
  margin: 50px 20px 50px 50px;
  float: left;
}
.rightButton{
  margin-top: 50px;
}
</style>

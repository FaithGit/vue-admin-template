<template>
  <div>
    <canvas id="Canvas" />
    <el-button @click="drawSmile">drawSmile</el-button>
    <el-button @click="addListenerClick">addListenerClick</el-button>
    <el-button @click="removeListenerClick">removeListenerClick</el-button>
    <el-button @click="drawLine">drawLine1</el-button>

  </div>

</template>
<script>
let canvas
let ctx
var postition = []
function pointClick(e) {
  // console.log(e)
  var rect = canvas.getBoundingClientRect()
  var x = event.clientX - rect.left * (canvas.width / rect.width)
  var y = event.clientY - rect.top * (canvas.height / rect.height)
  console.log('X:', x, 'Y:', y)
  drawArc(x, y)
}
function drawArc(x, y) {
  ctx.beginPath()
  ctx.lineWidth = 1
  ctx.arc(x, y, 8, 0, Math.PI * 2, true) // 绘制
  ctx.stroke()
  postition.push({ x: x, y: y })
  drawLine()
}
function drawLine() {
  ctx.beginPath()
  ctx.lineWidth = 10
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  for (let i = 0; i < postition.length; i++) {
    ctx.lineTo(postition[i].x, postition[i].y)
  }

  ctx.stroke()
}

export default {

  name: 'Canvas',
  mounted() {
    postition = []
    this.initCanvas()
  },
  methods: {
    initCanvas() {
      canvas = document.getElementById('Canvas')
      ctx = canvas.getContext('2d')
      canvas.width = 1200
      canvas.height = 800
      ctx.fillStyle = '#ddd'
      ctx.fillRect(0, 0, 1200, 800)
      var img = new Image()
      img.onload = function() {
        // 将图片画到canvas上面上去！
        ctx.drawImage(img, 0, 0)
      }
      img.src = require('@img/company.jpg')
    },
    drawSmile() {
      ctx.beginPath()
      ctx.arc(75, 75, 50, 0, Math.PI * 2, true) // 绘制
      ctx.moveTo(110, 75)
      ctx.arc(75, 75, 35, 0, Math.PI, false) // 口(顺时针)
      ctx.moveTo(65, 65)
      ctx.arc(60, 65, 5, 0, Math.PI * 2, true) // 左眼
      ctx.moveTo(95, 65)
      ctx.arc(90, 65, 5, 0, Math.PI * 2, true) // 右眼
      ctx.stroke()
    },
    addListenerClick() {
      canvas.addEventListener('click', pointClick, false)
    },
    removeListenerClick() {
      canvas.removeEventListener('click', pointClick, false)
    },
    drawLine() {
      drawLine()
    }
  }
}
</script>

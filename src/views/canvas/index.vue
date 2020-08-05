<template>
  <div>
    <canvas id="Canvas" />
    <el-button @click="drawSmile" />

  </div>

</template>
<script>
let canvas
let ctx
export default {

  name: 'Canvas',
  mounted() {
    console.log('Canvas start')
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
    }
  }
}
</script>

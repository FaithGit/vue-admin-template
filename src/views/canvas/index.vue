<template>
  <div class="app-container">
    <div class="leftButton">
      <canvas id="Canvas" />
    </div>

    <div class="rightButton">
      <el-card class="box-card">
        <el-collapse accordion @change="handleChange">
          <el-collapse-item v-for="(item,itemIndex) in company" :key="'company'+itemIndex" :name="itemIndex">
            <template slot="title">
              {{ item.name }}
              <el-badge :value="200" :max="99" class="item">
                <i class="header-icon el-icon-info" />
              </el-badge>
            </template>
            <div v-for="(device,deviceIndex) in item.deviceList" :key="'device'+deviceIndex">
              <svg-icon icon-class="yuandian" :class="{greenYuan:device.deviceStatus==1,redYuan:device.deviceStatus==0}" />
              {{ device.deviceName }}
              <svg-icon v-if="device.deviceX" icon-class="dianwei" />
              <svg-icon v-if="isPostiton(device.postiton)" icon-class="luxian" />
            </div>
          </el-collapse-item>

        </el-collapse>
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
var pointR = 6
let ctx
var postition = [{ x: 99, y: 299 }, { x: 299, y: 99 }]
var fu = ''
function pointClick(e) { // 触发点位事件
  // console.log(e)
  // console.log(fu._data.company[fu._data.nowComIndex])
  var x = event.clientX - canvas.getBoundingClientRect().left
  var y = event.clientY - canvas.getBoundingClientRect().top
  let havePoint = false
  let havePointIndex = 0
  for (let i = 0; i < fu._data.company[fu._data.nowComIndex].deviceList.length; i++) {
    const _obj = fu._data.company[fu._data.nowComIndex].deviceList[i]
    if (_obj.deviceX && _obj.deviceY) {
      if (isInsideCircle(x, y, pointR, _obj.deviceX, _obj.deviceY)) { // 判断本次点击是否所在点位里触发
        havePoint = true
        havePointIndex = i
      }
    }
  }
  if (havePoint) {
    console.log('是谁:' + fu._data.company[fu._data.nowComIndex].deviceList[havePointIndex].deviceName)
    drawLine()
  } else {
    console.log('没有点位')
    fu.handleChange(havePointIndex)
  }
  console.log('地图模式下的点击：X:', x, 'Y:', y)
  // console.log(isInsideCircle(x, y, 8, 528, 277))
}
function isInsideCircle(x0, y0, r, x, y) { // X0 Y0 接受的点位 x,y是点位点
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
  console.log(postition)
  drawLine()
}

function drawCreate(x = 528, y = 277, name = 'test', status = 1) { // 画点位
  if (status === 0) {
    // console.log('red')
    ctx.fillStyle = 'red'
  } else {
    // console.log('green')
    ctx.fillStyle = 'green'
  }

  ctx.beginPath()
  ctx.arc(x, y, pointR, 0, 2 * Math.PI)

  ctx.font = '30px'
  ctx.fillText(name, x + 10, y + 4)
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
function init(imgsrc) {
  return new Promise(
    /* 执行器 executor */
    function(resolve, reject) { // 一段耗时很长的异步操作
      canvas.width = boardWidth
      canvas.height = boardHeight
      ctx.fillStyle = '#ddd'
      ctx.fillRect(0, 0, boardWidth, boardHeight)
      var img = new Image()
      img.src = imgsrc
      img.onload = function(e) {
        // 将图片画到canvas上面上去！
        console.log('图片的宽' + img.width, '图片的高' + img.height)
        ctx.drawImage(img, (boardWidth - img.width) / 2, (boardHeight - img.height) / 2, img.width, img.height)
        resolve() // 数据处理完成
      }
      // reject() // 数据处理出错
    }
  )
}
function boardClear() {
  ctx.clearRect(0, 0, boardWidth, boardHeight)
  init()
}
export default {

  name: 'Canvas',
  data() {
    return {
      nowComIndex: 0, // 当前显示的公司index
      company: [
        {
          name: '模拟公司1',
          img: require('@img/company.jpg'),
          deviceList: [
            {
              deviceName: '生产1',
              deviceStatus: 1
            },
            {
              deviceName: '生产2',
              deviceStatus: 0,
              deviceX: 300,
              deviceY: 100,
              postiton: [
                {
                  x: 100, y: 300
                }
              ]
            },
            {
              deviceName: '治理1',
              deviceStatus: 1,
              deviceX: 350,
              deviceY: 20
            }
          ]
        }
      ]
    }
  },
  mounted() {
    fu = this
    this.initCanvas()
  },
  methods: {
    isPostiton(arr) {
      if (arr !== undefined && arr.length > 0) {
        return true
      } else {
        return false
      }
    },
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
    drawCreate(x, y, name, status) {
      drawCreate(x, y, name, status)
    },
    boardClear() {
      boardClear()
    },
    handleChange(val) {
      this.nowComIndex = val
      console.log('当前公司的index：' + this.nowComIndex)
      if (this.nowComIndex !== '') {
        // console.dir('查看：' + this.company[this.nowComIndex])
        init(this.company[this.nowComIndex].img).then(() => { // 图加载好，生成点位
          for (let i = 0; i < this.company[this.nowComIndex].deviceList.length; i++) {
            const obj = this.company[this.nowComIndex].deviceList[i]
            if (obj.deviceX && obj.deviceY) {
              this.drawCreate(obj.deviceX, obj.deviceY, obj.deviceName, obj.deviceStatus)
            }
          }
          canvas.addEventListener('click', pointClick, false) // 侦听点位的点击事件
        })
      }
    }
  }
}
</script>
<style scoped>
.app-container{
  padding: 20px;
  overflow: auto;
}
.leftButton{
  margin: 50px 20px 50px 20px;
  float: left;
  width: 1200px;
  height: 800px;
}
.rightButton{
  margin-top: 50px;
}
.box-card{
  margin-bottom: 50px;
}
.greenYuan{
  fill: green;
}
.redYuan{
  fill: red;
}
</style>

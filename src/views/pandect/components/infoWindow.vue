<template>
  <div class="infowindow-main">
    <div style="overflow: hidden;">
      <div class="leftImg">
        <img :src="isImgUrL(deviceInfos.comImage)" alt="" style="width:210px">
        <!-- <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2464079983,2760388720&fm=26&gp=0.jpg" alt="" style="width:210px"> -->
      </div>

      <div class="rightText">
        <div class="comName"> {{ deviceInfos.comName }}</div>
        <div> <span class="infoLable">企业类型</span> {{ deviceInfos.comStyle }}</div>
        <div> <span class="infoLable">详细地址</span> {{ deviceInfos.adress }}</div>
        <div> <span class="infoLable">环保负责人</span> {{ deviceInfos.envPerson }}</div>
        <div> <span class="infoLable">联系电话</span> {{ deviceInfos.envPersonTel }}</div>
      </div>
    </div>
    <div>
      <el-table border :data="tableData" :span-method="arraySpanMethod">
        <el-table-column label="企业" align="center">
          <template slot-scope="scope">
            {{ scope.row.comName }}
          </template>
        </el-table-column>
        <el-table-column label="组号" align="center">
          <template slot-scope="scope">
            {{ scope.row.groupName }}
          </template>
        </el-table-column>
        <el-table-column label="生产设备开关" align="center">
          <template slot-scope="scope">
            <span v-for="sc in scope.row.scData " :key="sc.id">
              <el-popover
                placement="top-start"
                :title="sc.device_name"
                width="200"
                trigger="hover"
                :content="'生产设备开关:'+(sc.switch_data ==true?'开':'关')"
              >
                <svg-icon slot="reference" icon-class="create" :class="[sc.switch_data==true?'greenSvg':'redSvg']" style="margin:0 5px" />
              </el-popover>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="治理设施名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.device_name }}
          </template>
        </el-table-column>
        <el-table-column label="工艺名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.PROCESS }}
          </template>
        </el-table-column>
        <el-table-column label="时间" align="center" width="154px">
          <template slot-scope="scope">
            <div v-if="scope.row.data_time">
              <svg-icon icon-class="anpei" />
              {{ scope.row.data_time }}
            </div>
            <div v-else>
              /
            </div>
          </template>
        </el-table-column>
        <el-table-column label="水喷淋" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.water_spray">
              <span v-for=" (_water,_index) in formatData(scope.row.water_spray)" :key="'water_spray'+_index">
                <svg-icon icon-class="water_switch" :class="[_water=='1'?'greenSvg':'huiSvg']" />
              </span>

            </div>
            <div v-else>
              /
            </div>
          </template>
        </el-table-column>
        <el-table-column label="风机电流(A)" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.fans_current">
              <div v-for=" (_fan,_index) in formatData(scope.row.fans_current)" :key="'fans_current'+_index">
                <svg-icon icon-class="anpei" />
                {{ _fan }}
              </div>
            </div>
            <div v-else>
              /
            </div>
          </template>
        </el-table-column>
        <el-table-column label="风机负荷(Hz)" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.fans_load">
              <div v-for=" (_fan,_index) in formatData(scope.row.fans_load)" :key="'fans_load'+_index">
                <svg-icon icon-class="fuhe" />
                {{ _fan }}
              </div>
            </div>
            <div v-else>
              /
            </div>
          </template>
        </el-table-column>
        <el-table-column label="净化器电流(A)" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.purifier_current">
              <svg-icon icon-class="anpei" />
              {{ scope.row.purifier_current }}
            </div>
            <div v-else>
              /
            </div>
          </template>
        </el-table-column>
        <el-table-column label="净化负荷(Hz)" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.purifier_load">
              <svg-icon icon-class="fuhe" />
              {{ scope.row.purifier_load }}
            </div>
            <div v-else>
              /
            </div>
          </template>
        </el-table-column>
        <el-table-column label="风量(m³/s)" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.fans_volume">
              <svg-icon icon-class="fan" />
              {{ scope.row.fans_volume }}
            </div>
            <div v-else>
              /
            </div>
          </template>
        </el-table-column>
        <el-table-column label="功率(KW)" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.active_power">
              <svg-icon icon-class="powerss" />
              {{ scope.row.active_power }}
            </div>
            <div v-else>
              /
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    deviceInfos: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      tableData: []
    }
  },
  watch: {
    deviceInfos: {
      immediate: true, // 这句重要
      handler(val) {
        console.log('值改变', val)
        this.deviceInfos = val
        this.init()
      }
    }
  },
  methods: {
    isImgUrL(url) {
      if (url === null || url === '' || url === ' ' || url === undefined) {
        return require('@img/comImgNull.png')
      } else {
        return url
      }
    },
    formatData(fa) {
      return fa.split(',')
    },
    init() {
      this.tableData = []
      this.tableData.push(this.deviceInfos)
      console.log('hello')
      console.log(this.tableData)
      const getDate = [] // 存储新表格数据
      const typeIndex = [0] // 保存id,地区需要合并的值
      const nameIndex = [0] // 保存类型需要合并的值
      let a // id,地区需要合并的行是所有类型的长度
      this.tableData.forEach((v, index) => {
        if (v.groups && v.groups.length) {
          a = 0
          v.groups.forEach((subV, i, typeData) => {
            if (subV.zlData && subV.zlData.length) {
              subV.zlData.forEach((ss, k, data) => {
                if (k === data.length - 1) {
                  typeIndex.push(data.length) // 把每一个类型下面数据长度存起来
                  a += data.length // 把所有类型下面的数据长度相加
                  if (i === typeData.length - 1) {
                    nameIndex.push(a) // 类型循环完成后把数据长度存起来
                  }
                }

                getDate.push({ // 这里是表格得展示数据
                  // id: v.id,
                  comName: v.comName,
                  govern: subV.govern,
                  create: subV.create,
                  groupName: subV.groupName,
                  abnormal: ss.abnormal,
                  switch_data: ss.switch_data, // 生产设备开关
                  title: ss.title, // 设备名称
                  device_name: ss.device_name, // 设备名称
                  device_id: ss.device_id,
                  data_time: ss.data_time,
                  fans_volume: ss.fans_volume,
                  emission_tem_in: ss.emission_tem_in,
                  fans_load: ss.fans_load,
                  purifier_current: ss.purifier_current,
                  emission_tem_out: ss.emission_tem_out,
                  purifier_load: ss.purifier_load,
                  fans_current: ss.fans_current,
                  water_spray: ss.water_spray,
                  active_power: ss.active_power,
                  scData: subV.scData,
                  PROCESS: ss.PROCESS
                })
              })
            }
          })
        }
      })

      console.log(nameIndex)
      // [0, 5, 4]
      // 看一下打印出来的规律,除去第一项,5是第一次需要合并的行
      // 第二次合并又是从第五行开始合并4行

      console.log(typeIndex)
      // [0, 2, 3, 2, 2]
      // 类型的数据存储规律也是一样,第一次合并2行
      // 第二次从2行开始,合并3行,以此类推

      // 根据这个规则,只需要给数据加上两个额外的属性控制是否合并就OK
      let k = 0
      let t = 0
      nameIndex.forEach((v, i, nameArr) => {
        if (nameArr[i + 1]) {
          getDate[k].nameIndex = nameArr[i + 1]
          k += nameArr[i + 1]
        }
      })

      typeIndex.forEach((v, i, typeArr) => {
        if (typeArr[i + 1]) {
          getDate[t].typeIndex = typeArr[i + 1]
          t += typeArr[i + 1]
        }
      })
      this.tableData = getDate
      console.log(getDate)
    },
    // 表格合并方法
    arraySpanMethod({
      row,
      column,
      rowIndex,
      columnIndex
    }) {
      if (columnIndex === 0 || columnIndex === 1) {
        if (row.nameIndex) { // 如果有值,说明需要合并
          return [row.nameIndex, 1]
        } else return [0, 0]
      }
      if (columnIndex === 2) {
        if (row.typeIndex) {
          return [row.typeIndex, 1]
        } else return [0, 0]
      }
      if (columnIndex === 3) {
        if (row.typeIndex) {
          return [row.typeIndex, 1]
        } else return [0, 0]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.infowindow-main{
  width: 760px;
  height: 350px;
}
.leftImg{
  display: inline;
}
.rightText{
   width: 350px;
  display: inline-block;
  vertical-align: top;
  padding-left: 10px;
}
*{
  padding: 0;
  margin: 0;
}
.comName{
  color: #007BD9;
  font-size: 16px;
  margin-bottom: 15px;
}
.infoLable{
  margin-right: 4px;
}
.redSvg{
  color: rgb(92, 92, 92);
  font-size: 20px;
}
.greenSvg{
  color: green;
  font-size: 20px;
}
</style>

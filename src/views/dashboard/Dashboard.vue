<template>
  <div class="dashboard">
    <grid-layout
      :layout.sync="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :responsive="true"
      :margin="[5, 5]"
      :use-css-transforms="true"
    >
      <grid-item v-for="item in layout"
                 @moved="movedEvent"
                 :x="item.x"
                 :y="item.y"
                 :w="item.w"
                 :h="item.h"
                 :i="item.i"
                 :key="item.i">
        <v-chart :autoresize="true" :options="polar" />
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout';
/* eslint-disable */
const testLayout = [{"x":0,"y":0,"w":6,"h":10,"i":"0","moved":false},{"x":0,"y":10,"w":6,"h":8,"i":"1","moved":false},{"x":0,"y":18,"w":12,"h":7,"i":"2","moved":false},{"x":6,"y":0,"w":4,"h":8,"i":"3","moved":false},{"x":8,"y":8,"w":4,"h":6,"i":"4","moved":false},{"x":10,"y":0,"w":2,"h":8,"i":"5","moved":false},{"x":6,"y":8,"w":2,"h":10,"i":"9","moved":false},{"x":8,"y":14,"w":4,"h":4,"i":"10","moved":false}];
/* eslint-disable */
export default {
  name: 'Dashboard',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },
  data() {
    let data = [];
    for (let i = 0; i <= 360; i++) {
      let t = i / 180 * Math.PI;
      let r = Math.sin(2 * t) * Math.cos(2 * t);
      data.push([r, i])
    }
    return {
      layout: testLayout,
      polar: {
        title: {
          text: '数值轴',
          top: 10,
          left: 10,
          show: true,
        },
        color: ['#1394F8', '#F88311', '#3BC464', '#F53566', '#8042DF'],
        legend: {
          show: false,
          data: ['OUY']
        },
        polar: {
          center: ['50%', '50%'],
          radius: '80%',
        },
        tooltip: {
          trigger: 'item',
          show: true,
          confine: true,
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          // show: true,
          // top: '20%',
          // left: '20%',
          // bottom: '20%',
          // right: '20%',
        },
        angleAxis: {
          type: 'value',
          startAngle: 0
        },
        radiusAxis: {
          min: 0
        },
        series: [
          {
            coordinateSystem: 'polar',
            name: 'OUY',
            type: 'line',
            showSymbol: false,
            data: data,
          }
        ],
        animationDuration: 2000
      },
    };
  },
  methods: {
    movedEvent: function () {
      console.log(JSON.stringify(this.layout));
    }
  },
  mounted() {
    // const vm = this;
    // vm.polar = polar;
  },
  created() {
    // const vm = this;
    // vm.polar = polar;
  }
};
</script>

<style lang="scss" scoped>
.dashboard{
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  .vue-grid-layout{
    .vue-grid-item{
      background: #f2f2f2;
      border: 1px solid rgba(0,0,0,.1);
      border-radius: 4px;
      box-shadow: 0 0 4px rgba(0,0,0,.2);
    }
  }
}
</style>
<style lang="scss">
  .vue-grid-layout{
    .vue-grid-placeholder{
      background: #F88311;
      border: 0;
      opacity: 0.6;
      border-radius: 4px;
    }
    .vue-grid-item{
      .echarts{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>

<template>
  <div class="dashboard">
    <el-scrollbar :native=false :noresize=false tag="section">
      <grid-layout
        :layout.sync="layout"
        :col-num="12"
        :row-height="30"
        :is-draggable="true"
        :is-resizable="true"
        :is-mirrored="false"
        :vertical-compact="true"
        :responsive="true"
        :margin="[8, 8]"
        :use-css-transforms="true">
        <grid-item v-for="item in layout"
                   @moved="movedEvent"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :i="item.i"
                   :key="item.i">
          <v-chart ref="vchart" :autoresize="true" :options="option" />
        </grid-item>
      </grid-layout>
    </el-scrollbar>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout';
/* eslint-disable */
const testLayout = [{"x":0,"y":0,"w":6,"h":10,"i":"0","moved":false},{"x":0,"y":10,"w":6,"h":12,"i":"1","moved":false},{"x":0,"y":22,"w":12,"h":7,"i":"2","moved":false},{"x":6,"y":0,"w":4,"h":8,"i":"3","moved":false},{"x":6,"y":8,"w":4,"h":6,"i":"4","moved":false},{"x":10,"y":0,"w":2,"h":8,"i":"5","moved":false},{"x":10,"y":8,"w":2,"h":14,"i":"9","moved":false},{"x":6,"y":14,"w":4,"h":8,"i":"10","moved":false}];
const color = [ '#418AB3','#A6B727', '#F88311', '#DF5327', '#FEC360', '#5E5E5E', '#1394F8', '#FF5733', '#3BC464', '#8042DF', '#40E0D0', '#8B008B', '#F08080', '#8B4513', '#51D9B5','#D95B5B', '#318C80', '#F2CF61', '#A6E582', '#1394F8', '#BFBFBF'];
/* eslint-disable */
export default {
  name: 'Dashboard',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },
  data() {
    return {
      layout: testLayout,
      option: {
        title: {
          text: 'Dashboard',
          top: 10,
          left: 10,
          textStyle: {
            fontSize: 16,
            fontWeight: 'lighter'
          }
        },
        legend: {
          top: 10,
          right: 30,
          icon: "roundRect",   //  字段控制形状  类型包括 circle，rect,line，roundRect，triangle，diamond，pin，arrow，none
          itemWidth: 15,  // 设置宽度
          itemHeight: 10, // 设置高度
          itemGap: 10, // 设置间距
          textStyle: {
            padding: [3, 0, 0, 0],
          }
        },
        toolbox: {
          show: true,
        },
        color: color,
        backgroundColor: '#ffffff',
        grid: {
          top: 50,
          bottom: 36,
          left: 60,
          right: 30,
        },
        tooltip: {
          trigger: 'axis',
          show: true,
          showContent: true
        },
       animation: false,
       // animationDuration: 0,
        dataset: {
          source: [
            ['years', '2012', '2013', '2014', '2015', '2016', '2017'],
            ['A', 11.1, 30.4, 65.1, 53.3, 83.8, 98.7],
            // ['B', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
            // ['C', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
            // ['D', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
          ]
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            align: 'center',
          },
          axisTick: {
            inside: true,
            alignWithLabel: true,
          }
        },
        yAxis: {
          gridIndex: 0,
          nameLocation: 'end',
        },
        series: [
          {type: 'line', smooth: true, seriesLayoutBy: 'row', symbol: 'none', lineStyle: { width: 1, }},
          // {type: 'line', smooth: false, seriesLayoutBy: 'row', symbol: 'none'},
          // {type: 'line', smooth: false, seriesLayoutBy: 'row', symbol: 'none'},
          // {type: 'line', smooth: false, seriesLayoutBy: 'row', symbol: 'none'},
          // {
          //   type: 'pie',
          //   id: 'pie',
          //   radius: '30%',
          //   center: ['50%', '25%'],
          //   label: {
          //     formatter: '{b}: {@2012} ({d}%)'
          //   },
          //   encode: {
          //     itemName: 'product',
          //     value: '2012',
          //     tooltip: '2012'
          //   }
          // }
        ],
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
    const vm = this;
    const source = vm.option.dataset.source;
    setInterval(function(){
      source.forEach(function (el, index) {
        // el.hideLoading();
        if (el.length >= 500) {
          el.splice(1,1);
        }
        if (index === 0) {
          el.push(Number(el[el.length - 1]) + 1);
        } else {
          el.push(Math.random() * (100));
        }
      });
    }, 100);
    // vm.$refs.vchart.showLoading();
    setTimeout(function(){
      // vm.$refs.vchart.forEach(function(el){
      //   el.showLoading({
      //     text: 'Loading',
      //     textColor: '#333',
      //     color: '#DF5327',
      //     maskColor: '#fff'
      //   });
      // });
      // console.log(vm.$refs);
    });
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
  .el-scrollbar{
    .el-scrollbar__wrap{
      overflow-x: hidden;
    }
  }
}
</style>
<style lang="scss">
  .vue-grid-layout{
    .vue-grid-placeholder{
      background: #F88311!important;
      border: 0;
      opacity: 0.7;
      border-radius: 4px;
    }
    .vue-grid-item{
      .echarts{
        width: 100%;
        height: 100%;
      }
    }
  }
  .dashboard{
    >.el-scrollbar{
      .el-scrollbar__wrap{
        overflow-x: hidden;
      }
    }
  }
</style>

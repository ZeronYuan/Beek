<template>
  <div class="topo-warp">
    <div id='info-cube'>
      <p class="title">设备信息</p>
      <p><span>名称：</span></p>
      <p><span>序列号：</span></p>
      <p><span>UUID：</span></p>
      <p><span>软件版本：</span></p>
      <p><span>硬件版本：</span></p>
      <p><span>最近升级时间：</span>2019年12月12日12:22:22</p>
      <p class="title">当前插卡信息</p>
      <p><span>序列号：</span></p>
      <p><span>版本号：</span></p>
      <p><span>批次：</span></p>
      <p><span>功能：</span></p>
    </div>
    <div id="cube"></div>
    <img id="m1" src="../../assets/img/topo/M1.png" alt=""/>
    <img id="o" src="../../assets/img/topo/o.png" alt=""/>
    <img id="r1" @load="loaded" src="../../assets/img/topo/R1.png" alt=""/>
  </div>
</template>

<script>
const { zrender } = window;
export default {
  name: 'ToPo',
  data() {
    return {
      // eslint-disable-next-line global-require
      // mImgSrc: require('../../assets/img/topo/M1.png'),
      // eslint-disable-next-line global-require
      // rImgSrc: require('../../assets/img/topo/R1.png'),
      cube: '',
      ZR: '',
      allGroup: '',
      R1: '',
    };
  },
  mounted() {
  },
  created() {
  },
  methods: {
    loaded() {
      const vm = this;
      vm.init();
      vm.drawR();
      vm.initEnd();
    },
    init() {
      const vm = this;
      const r = window.devicePixelRatio || 2;
      vm.cube = document.querySelector('#cube');
      vm.ZR = zrender.init(vm.cube, {
        renderer: 'canvas',
        devicePixelRatio: r,
      });
      vm.allGroup = new zrender.Group();
    },
    initEnd() {
      const vm = this;
      let resize_time = null;
      window.onresize = function () {
        clearTimeout(resize_time);
        resize_time = setTimeout(() => {
          vm.ZR.resize();
        }, 600);
      };
      vm.ZR.dragData = { drag: false, pos: [0, 0] };
      vm.ZR.on('mousedown', (e) => {
        vm.ZR.dragData.pos = [e.event.zrX, e.event.zrY];
        vm.ZR.dragData.drag = true;
      });
      vm.ZR.on('mouseup', () => {
        vm.ZR.dragData.drag = false;
      });
      vm.ZR.on('mousemove', (e) => {
        if (!vm.ZR.dragData.drag) return;
        const new_pos = [e.event.zrX, e.event.zrY];
        const pos = [new_pos[0] - vm.ZR.dragData.pos[0], new_pos[1] - vm.ZR.dragData.pos[1]];
        vm.allGroup.attr({
          position: [vm.allGroup.position[0] + pos[0], vm.allGroup.position[1] + pos[1]],
        });
        vm.ZR.dragData.pos = [e.event.zrX, e.event.zrY];
      });
      vm.ZR.scale = 1.0;
      const zr_w = vm.ZR.getWidth();
      const zr_h = vm.ZR.getHeight();
      vm.ZR.on('mousewheel', (e) => {
        const newScale = vm.ZR.scale + e.wheelDelta / 10;
        if (newScale < 0.1 || newScale > 5) return;
        vm.ZR.scale = newScale;
        vm.allGroup.attr({
          scale: [vm.ZR.scale, vm.ZR.scale],
          origin: [zr_w / 2, zr_h / 2],
        });
        vm.ZR.refresh();
      });
      vm.ZR.add(vm.allGroup);
      vm.ZR.refreshImmediately();
    },
    drawR() {
      const vm = this;
      const width = vm.cube.clientWidth;
      const height = vm.cube.clientHeight;
      const r1 = document.querySelector('#r1');
      vm.R1 = new zrender.Image({
        zlevel: 1,
        style: {
          image: r1,
          x: width / 2 - 39,
          y: height / 2 - 80,
          width: 78 * 1.2,
          height: 102 * 1.2,
        },
      });
      vm.allGroup.add(vm.R1);
      vm.ZR.add(vm.allGroup);
    },
  },
  beforeDestroy() {
  },
};
</script>

<style scoped lang="scss">
.topo-warp{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  #r1,#m1,#o{
    position: absolute;
    left: -2018px;
    top: -2018px;
    width:175px;
    height:231px;
    transform: scale(3);
  }
  #cube {
    width: 100%;
    height: 100%;
    background: #fff;
  }
  #info-cube{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    width: 266px;
    min-height: 380px;
    box-shadow: #ddd 1px 1px 6px;
    background: #fff;
    border-radius: 4px;
    padding:20px;
    display: none;
    p{
      font-size: 14px;
      color: #bbb;
      line-height: 1.5;
      padding: 5px 0;
      word-break: break-all;
    }
    .title{
      height: 36px;
      line-height: 36px;
      padding: 0;
      color: #333;
    }
  }
}
</style>

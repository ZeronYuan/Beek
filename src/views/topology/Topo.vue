<template>
  <div class="warp">
    <div id="cube">
      <p>基础信息</p>
      <ul>
        <li>SN：234234</li>
        <li>卡型号：23423</li>
        <li>卡SN：2342</li>
        <li>开机时间：234234</li>
      </ul>
      <p>运行状态</p>
      <ul>
        <li>STA：</li>
        <li>485：</li>
        <li>BUS：</li>
      </ul>
    </div>
    <div id="notepad"></div>
  </div>
</template>

<script>
let { Raphael } = window; // SVG插件Raphael
let scale = 1;// 缩放尺寸
let speed = 0.05;// 缩放速度
export default {
  name: 'ToPo',
  data() {
    return {
      // eslint-disable-next-line global-require
      mImgSrc: require('../../assets/img/topo/M1.png'),
    };
  },
  mounted() {},
  methods: {
    init() {
      const node = document.querySelector('#notepad');
      const cube = document.querySelector('#cube');
      const paper = Raphael(node, '100%', '100%');
      let width = node.clientWidth;
      let height = node.clientHeight;
      let x = 0;
      let y = 0;
      paper.setViewBox(x, y, width * scale, height * scale, true);
      if (node.addEventListener) {
        // Ie9+和chrome下 绑定鼠标滚轮事件
        node.addEventListener('mousewheel', fnscroll, false);
        // firefox下 绑定鼠标滚轮事件
        node.addEventListener('DOMMouseScroll',  fnscroll, false);
      } else {
        // Ie8以下
        node.attachEvent('onmousewheel',  fnscroll);
      }
    },
  },
  beforeDestroy() {
    Raphael = null;
  },
};
</script>

<style scoped lang="scss">
.warp{
  width: 100%;
  height: 100%;
  #notepad{
    width: 100%;
    height: 100%;
    background: #f2f2f2;/*rgba(241, 241, 241, 1);*/
    cursor:url(../../assets/img/topo/Cursor-Grab.png),auto;
  }
  #cube{
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10086;
    width: 290px;
    height: 450px;
    background:rgba(255,255,255,.9);
    box-shadow: #ccc 5px 5px 15px;
    border-radius: 3px;
    transition: all .1s;
    padding: 30px 0;
    color: #333;
    font-size:16px ;
    p{
      text-align: left;
      text-indent: 30px;
      margin: 10px 0;
      font-weight: 600;
    }
    ul{
      margin-left: 40px;
      li{
        text-align: left;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
      }
    }
  }
}
</style>

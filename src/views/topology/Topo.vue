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
/* eslint-disable */
let scale = 1;// 缩放尺寸
let speed = 0.05;// 缩放速度
export default {
  name: 'ToPo',
  data() {
    return {
      mImgSrc: require('../../assets/img/topo/M1.png'),
    };
  },
  mounted() {},
  methods: {
    init() {
    },
  },
  beforeDestroy() {
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

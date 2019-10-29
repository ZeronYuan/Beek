<template>
  <header class="ff-head">
    <div class="logo"><img src="../../assets/img/logo.png" alt="FireFinch"></div>
    <el-menu
      :default-active="activeIndex"
      class="router-list"
      mode="horizontal"
      @select="handleSelect"
      background-color="#1b2744"
      text-color="#fff"
      :router="true"
      active-text-color="#f88311">
      <el-menu-item index="/Dashboard"><i class="el-icon-s-grid"></i>主页</el-menu-item>
      <el-menu-item index="/ToPo"><i class="el-icon-share"></i>设备拓扑</el-menu-item>
      <el-menu-item index="/Device"><i class="el-icon-s-help"></i>设备库</el-menu-item>
    </el-menu>
    <el-dropdown placement="bottom-start" class="user-info" :hide-timeout=666 @command="exitOut">
      <span class="el-dropdown-link">
        <i class="el-icon-s-custom"></i>&nbsp;&nbsp;Admin&nbsp;<i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="exitOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="full-screen" @click="openFull">
      <el-tooltip class="item" effect="dark" :content="fullScreen" placement="bottom">
        <div class="inner">
          <img v-if="!isFull" src="../../assets/img/fullScreen.png" alt="开">
          <img v-else src="../../assets/img/closeScreen.png" alt="关">
        </div>
      </el-tooltip>
    </div>
    <div class="system-setting" @click="openSet">
      <i class="el-icon-s-tools"></i>
    </div>
    <el-drawer
      title="设置"
      size="460px"
      custom-class="ff-bubble"
      :lock-scroll=false
      :visible.sync=drawer
      :direction=direction>
      <system-set></system-set>
    </el-drawer>
  </header>
</template>

<script>
import systemSet from './SystemSet.vue';

export default {
  name: 'Head',
  data() {
    return {
      activeIndex: '/',
      fullScreen: '开启全屏',
      isFull: false,
      drawer: false,
      direction: 'rtl',
    };
  },
  created() {
    this.activeIndex = this.$route.fullPath;
  },
  components: {
    systemSet: systemSet,
  },
  watch: {
    $route() {
      const vm = this;
      vm.activeIndex = vm.$route.fullPath;
    },
  },
  mounted() {
    // console.log(this.$route);
  },
  methods: {
    handleSelect: function (key, keyPath) {
      console.log(key, keyPath);
    },
    exitOut: function (command) {
      const vm = this;
      if (command === 'exitOut') {
        vm.$router.push('/Login');
      }
    },
    openFull: function () {
      const vm = this;
      const el = document.documentElement;
      const rfs = el.requestFullScreen || el.webkitRequestFullScreen
        || el.mozRequestFullScreen || el.msRequestFullScreen; // 开启全屏对象
      const el_document = document;
      const cfs = el_document.cancelFullScreen || el_document.webkitCancelFullScreen
        || el_document.mozCancelFullScreen || el_document.exitFullScreen; // 关闭全屏对象
      if (rfs && !vm.isFull) { // typeof rfs != "undefined" && rfs
        rfs.call(el);
        vm.isFull = true;
        vm.fullScreen = '关闭全屏';
      } else if (cfs && vm.isFull) {
        cfs.call(el_document);
        vm.isFull = false;
        vm.fullScreen = '开启全屏';
      } else if (typeof window.ActiveXObject !== 'undefined') {
        // 兼容IE，模拟按下键盘的F11，使浏览器开关全屏
        const { ActiveXObject } = window.ActiveXObject;
        const wscript = new ActiveXObject('WScript.Shell');
        if (wscript != null) {
          wscript.SendKeys('{F11}');
        }
      }
    },
    openSet: function () {
      const vm = this;
      vm.drawer = !vm.drawer;
    },
  },
};
</script>

<style lang="scss" scoped>
  .ff-head{
    height: 51px;
    background-color: #1b2744;
    color: #fff;
    .logo{
      width: 200px;
      float: left;
      height: 50px;
      line-height: 50px;
      text-align: center;
      margin-right: 10px;
      img{
        display: inline-block;
        width: 80%;
      }
    }
    .router-list{
      height: 51px;
      float: left;
      >li{
        height: 50px;
        line-height: 50px;
        i{
          margin-top: -3px;
          margin-top: 0\0;
        }
      }
      .is-active{
        border-bottom: 5px solid #F88311;
      }
      >.el-submenu{
        height: 50px;
        line-height: 50px;
        .el-submenu__title{
          height: 50px;
          line-height: 50px;
        }
      }
    }
    .full-screen{
      float: right;
      height: 50px;
      line-height: 50px;
      padding: 0 15px;
      cursor: pointer;
      .inner{
        width: 100%;
        height: 100%;
        >img{
          display: inline-block;
          width: 20px;
          margin: 0 auto;
        }
      }
    }
    .user-info{
      float: right;
      height: 50px;
      line-height: 50px;
      margin-right: 10px;
      padding: 0 15px;
      color: #fff;
      cursor: pointer;
      span{
        display: block;
        height: 50px;
        line-height: 50px;
      }
    }
    .system-setting{
      float: right;
      height: 50px;
      line-height: 50px;
      padding: 0 10px;
      cursor: pointer;
      >i{
        display: inline-block;
        font-size: 20px;
        margin-top: 16px;
      }
    }
  }
</style>

<template>
  <div class="head">
    <el-menu
      :default-active="activeIndex"
      class="ff-head"
      mode="horizontal"
      @select="handleSelect"
      background-color="#1b2744"
      text-color="#fff"
      :router="true"
      active-text-color="#f88311">
      <div class="logo"><img src="../../assets/img/logo.png" alt="FireFinch"></div>
      <el-menu-item index="/">主页</el-menu-item>
      <el-menu-item index="/about">设备管理</el-menu-item>
      <el-menu-item index="/test">模板管理</el-menu-item>
      <el-menu-item index="/login">系统设置</el-menu-item>
      <el-dropdown>
        <span class="el-dropdown-link">
          下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Head',
  data() {
    return {
      activeIndex: '/',
    };
  },
  created() {
    this.activeIndex = this.$route.fullPath;
    console.log(this.$route);
  },
  mounted() {
    console.log(this.$route);
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      console.log(this.$route);
    },
  },
};
</script>

<style lang="scss">
  .head{
    height: 51px;
    background-color: #1b2744;
    color: #fff;
    .ff-head{
      height: 51px;
      >li{
        height: 50px;
        line-height: 50px;
      }
      >.el-submenu{
        height: 50px;
        line-height: 50px;
        .el-submenu__title{
          height: 50px;
          line-height: 50px;
        }
      }
      .logo{
        width: 200px;
        float: left;
        height: 50px;
        line-height: 50px;
        text-align: center;
        img{
          display: inline-block;
        }
      }
    }
  }
</style>

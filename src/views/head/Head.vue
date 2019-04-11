<template>
  <div class="head">
    <el-menu
      :default-active="activeIndex"
      class="ff-head"
      mode="horizontal"
      @select="handleSelect"
      background-color="#1b2744"
      text-color="#fff"
      :router=index
      active-text-color="#f88311">
      <div class="logo"><img src="../../assets/img/logo.png" alt="FireFinch"></div>
      <el-menu-item index="/">主页</el-menu-item>
      <el-menu-item index="/about">设备管理</el-menu-item>
      <el-menu-item index="/test">模板管理</el-menu-item>
      <el-menu-item index="/login">系统设置</el-menu-item>
      <el-submenu index="/about">
        <template slot="title">Admin</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Head',
  data() {
    return {
      index: true,
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

<template>
  <div class="head">
    <div class="logo"><img src="../../assets/img/logo.png" alt="FireFinch"></div>
    <el-menu
      :default-active="activeIndex"
      class="ff-head"
      mode="horizontal"
      @select="handleSelect"
      background-color="#1b2744"
      text-color="#fff"
      :router="true"
      active-text-color="#f88311">
      <el-menu-item index="/">主页</el-menu-item>
      <el-menu-item index="/device">设备管理</el-menu-item>
      <el-menu-item index="/test">模板管理</el-menu-item>
      <el-menu-item index="/login">系统设置</el-menu-item>
    </el-menu>
    <el-dropdown placement="bottom-end" class="user-info" :hide-timeout=600>
      <span class="el-dropdown-link">
        Admin<i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
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
    // console.log(this.$route);
  },
  watch: {
    $route() {
      this.activeIndex = this.$route.fullPath;
    },
  },
  mounted() {
    // console.log(this.$route);
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      // console.log(this.$route);
    },
  },
};
</script>

<style lang="scss">
  .head{
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
      }
    }
    .ff-head{
      height: 51px;
      float: left;
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
    }
    .user-info{
      float: right;
      height: 50px;
      line-height: 50px;
      margin-right: 30px;
      color: #fff;
      cursor: pointer;
      span{
        display: block;
        height: 50px;
        line-height: 50px;
      }
    }
  }
</style>

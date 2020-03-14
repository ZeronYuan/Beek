<template>
  <section class="pool">
   <div class="index">
     <div class="nav">
       <el-breadcrumb separator="/">
         <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item v-for="(item, index) in navList" :key="index" :to="{ path: item.path }">{{item.title}}</el-breadcrumb-item>
       </el-breadcrumb>
     </div>
     <div class="main">
       <transition name="fade" appear mode="out-in">
         <keep-alive>
           <router-view/>
         </keep-alive>
       </transition>
     </div>
   </div>
  </section>
</template>

<script>
import baseUtil from '../../util/baseUtil';

export default {
  name: 'Pool',
  data() {
    return {
      navList: [],
    };
  },
  watch: {
    $route(to, from) {
      const vm = this;
      console.log(to, from);
      baseUtil.each(vm.navList, (el, index) => {
        if (el.path === to.path) {
          vm.navList.splice(index, 1);
        }
      });
      vm.navList.push({
        path: to.path,
        title: to.meta.title,
      });
      console.log(vm.navList);
    },
  },
  created() {
    const vm = this;
    vm.navList.push({
      path: vm.$route.path,
      title: vm.$route.meta.title,
    });
    console.log(vm.navList);
  },
  mounted() {
  },
  methods: {
  },
};
</script>

<style lang="scss">
.pool{
  background: #f0f0f0;
  height: 100%;
  .index{
    width: 100%;
    height: 100%;
    .nav{
      .el-breadcrumb{
        height: 40px;
        line-height: 40px;
      }
      padding-left: 20px;
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      text-align: left;
      background: #fff;
    }
    .main{
      width: 100%;
      height: calc(100% - 40px);
    }
  }
}
</style>

<template>
  <section id="pool">
   <div class="index">
     <div class="nav">
       <el-breadcrumb separator="/">
         <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item :to="{ path: '/Pool/Index' }">资源库</el-breadcrumb-item>
       </el-breadcrumb>
     </div>
     <div class="main">
       <transition name="fade" appear mode="out-in">
         <router-view/>
       </transition>
     </div>
   </div>
  </section>
</template>

<script>
export default {
  name: 'Pool',
  data() {
    return {};
  },
  created() {
  },
  mounted() {
  },
  methods: {
  },
};
</script>

<style lang="scss">
#pool{
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

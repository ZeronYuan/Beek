<template>
  <div class="not-found">
    <div class="text">
      <p>404 NOT FOUND</p>
      <p>未找到页面</p>
      <el-button @click="back" round class="not-found-button">返回上一页</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Error404',
  methods: {
    back: function () {
      const vm = this;
      vm.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.not-found{
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 100;
  background-color: #1b2744;
  .text{
    margin-top: 10%;
    p{
      font-size: 46px;
      color: #F88311;
      line-height: 1.5;
      text-align: center;
    }
    .not-found-button{
      margin-top: 30px;
    }
  }
}
</style>

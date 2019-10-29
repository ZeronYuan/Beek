<template>
  <div class="base-set">
    <p class="title">基础信息</p>
    <div class="item-set">
      <span>语言</span>
      <el-select v-model="lang" placeholder="请选择">
        <el-option
          label="中文"
          value="zh_CN">
        </el-option>
        <el-option
          label="英文"
          value="en_US">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'based',
  data() {
    return {
      lang: 'zh_CN',
    };
  },
};
</script>

<style scoped lang="scss">
.base-set{
  .title{
    height: 50px;
    line-height: 50px;
    text-indent: 28px;
    font-size: 16px;
  }
}
</style>

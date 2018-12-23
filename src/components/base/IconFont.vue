<template>
  <i class="iconfont" :class="'icon-' + name" :style="[{fontSize:size},{color}]"></i>
</template>

<script>
export default {
  name: 'IconFont',
  props: {
    name: {
      type: String,
      default: '',
      required: true,
    },
    size: {
      type: String,
      default: 'inherit',
      required: true,
      validator: v => (v === 'inherit' || /px/.test(v)),
    },
    color: {
      type: String,
      default: 'inherit',
      required: true,
    },
  },
};
</script>

<style  src="../../assets/font/iconfont.css"></style>
<style lang="scss" rel="stylesheet/scss" scoped>
  i{
    cursor: default;
  }
</style>

<template>
  <div class="title">
    <span>{{name}}</span>
    <i @click="closePop($event)" class="el-icon-close"></i>
  </div>
</template>

<script>
import bus from '../../../plugins/eventBus/index';

export default {
  name: 'titles',
  props: {
    name: {
      type: String,
      default: '**',
      required: true,
    },
  },
  methods: {
    closePop($event) {
      bus.$emit('closePop', $event);
    },
  },
};
</script>

<style scoped lang="scss">
.title{
  width: 100%;
  height: 56px;
  line-height: 56px;
  font-size:16px;
  font-weight:400;
  color:rgba(0,0,0,1);
  opacity:0.85;
  padding:0 20px;
  position: relative;
  >span{
    font-size:16px;
  }
  >i{
    font-size:16px;
    position: absolute;
    top: 50%;
    right: 20px;
    margin-top: -8px;
    cursor: pointer;
  }
}
</style>

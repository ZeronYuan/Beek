<template>
  <div class="dashboard">
    <grid-layout
      :layout.sync="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[5, 5]"
      :use-css-transforms="true"
    >
      <grid-item v-for="item in layout"
                 @moved="movedEvent"
                 :x="item.x"
                 :y="item.y"
                 :w="item.w"
                 :h="item.h"
                 :i="item.i"
                 :key="item.i">
        {{ item.i }}::::{{ item.h }}
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout';

/* eslint-disable */
const testLayout = [{"x":0,"y":0,"w":6,"h":10,"i":"0","moved":false},{"x":0,"y":10,"w":6,"h":8,"i":"1","moved":false},{"x":0,"y":18,"w":12,"h":7,"i":"2","moved":false},{"x":6,"y":0,"w":4,"h":8,"i":"3","moved":false},{"x":8,"y":8,"w":4,"h":6,"i":"4","moved":false},{"x":10,"y":0,"w":2,"h":8,"i":"5","moved":false},{"x":6,"y":8,"w":2,"h":10,"i":"9","moved":false},{"x":8,"y":14,"w":4,"h":4,"i":"10","moved":false}];
/* eslint-disable */
export default {
  name: 'Dashboard',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },
  data() {
    return {
      layout: testLayout,
    };
  },
  methods: {
    movedEvent: function () {
      console.log(JSON.stringify(this.layout));
    }
  },
};
</script>

<style lang="scss" scoped>
.dashboard{
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  .vue-grid-layout{
    .vue-grid-item{
      background: #f2f2f2;
      border: 1px solid rgba(0,0,0,.1);
      border-radius: 4px;
      box-shadow: 0 0 4px rgba(0,0,0,.2);
    }
  }
}
</style>
<style lang="scss">
  .vue-grid-layout{
    .vue-grid-placeholder{
      background: #F88311;
      border: 0;
      opacity: 0.6;
      border-radius: 4px;
    }
  }
</style>

<template>
  <div id="Firefinch">
    <Head></Head>
    <div class="main">
      <transition name="fade" appear mode="out-in">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import Head from './views/head/Head.vue';

export default {
  name: 'FirefinchInit',
  data() {
    return {
      isInit: false,
    };
  },
  components: {
    Head,
  },
};
</script>

<style lang="scss">
 @import "assets/sass/FUI";
  #Firefinch {
    text-align: center;
    color: #ccc;
    position: relative;
    .main{
      position: fixed;
      left: 0;
      top: 50px;
      right: 0;
      bottom: 0;
      margin: 0 auto;
      background: #f2f2f2;
    }
  }
</style>

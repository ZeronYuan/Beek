<template>
  <section id="Firefinch">
    <Head><title/></Head>
    <main class="ff-main">
      <transition name="fade" appear mode="out-in">
        <router-view/>
      </transition>
      <Foot/>
    </main>
  </section>
</template>

<script>
import Head from './views/head/Head.vue';
import Foot from './views/foot/Foot.vue';

export default {
  name: 'FirefinchInit',
  data() {
    return {
      isInit: false,
    };
  },
  components: {
    Head,
    Foot,
  },
};
</script>

<style lang="scss" scoped>
  #Firefinch {
    text-align: center;
    position: relative;
    .ff-main{
      position: fixed;
      left: 0;
      top: 50px;
      right: 0;
      bottom: 40px;
      margin: 0 auto;
      background: #f2f2f2;
      z-index: 1;
    }
  }
</style>

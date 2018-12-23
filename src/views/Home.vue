<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/img/logo.png">
    <HelloWorld msg="Welcome to FireFinch R1 App" />
    <img alt="Vue logo" src="../assets/img/fingerprint.jpg">
    <br />
    <IconFont v-for="n in 20" :key="n" :name="(n - 1).toString()" size="58px" color="#42b983">
    </IconFont>
  </div>
</template>

<script>
// import http from '../plugins/http/http';
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import IconFont from '@/components/base/IconFont.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    IconFont,
  },
  created() {
    // `this` 指向 vm 实例
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
  .home{
    .icon-19{
      font-size: 48px;
    }
  }
</style>

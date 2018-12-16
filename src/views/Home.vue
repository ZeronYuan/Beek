<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/img/logo.png">
    <HelloWorld msg="Welcome to FireFinch R1 App" />
    <img alt="Vue logo" src="../assets/img/fingerprint.jpg">
    <br />
    <i class="fa-glass fa"></i>
  </div>
</template>

<script>
// import http from '../plugins/http/http';
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  created() {
    // `this` 指向 vm 实例
  },
  methods: {},
};
</script>

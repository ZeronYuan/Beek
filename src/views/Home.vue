<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/img/logo.png">
    <HelloWorld msg="Welcome to FireFinch R1 APP" />
    <img alt="Vue logo" src="../assets/img/fingerprint.jpg">
    <br />
    <el-button @click="changeEn">EN</el-button>
    <el-button type="primary" @click="changeZh">中文</el-button>
    <IconFont v-for="n in 10" :key="n" :name="(n - 1).toString()" size="58px" color="#42b983">
    </IconFont>
    <div class="block">
      <span class="demonstration">{{ $t('ff.test') }}</span>
      <el-date-picker
        type="datetimerange"
        start-placeholder="开始111日期"
        end-placeholder="结束日期"
        :default-time="['12:00:00']">
      </el-date-picker>
    </div>
    <div class="block">
      <span class="demonstration">121zx</span>
      <el-date-picker
        type="datetimerange"
        align="right"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['12:00:00', '08:00:00']">
      </el-date-picker>
    </div>
  </div>
</template>

<script>
// import http from '../plugins/http/http';
// @ is an alias to /src
import Vue from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';
import IconFont from '@/components/base/IconFont.vue';


export default {
  name: 'Home',
  data() {
    return {
      radio: '1',
    };
  },
  components: {
    HelloWorld,
    IconFont,
  },
  created() {
    // `this` 指向 vm 实例
    // console.log(this);
  },
  methods: {
    changeZh() {
      Vue.config.lang = 'zh-cn';
    },
    changeEn() {
      Vue.config.lang = 'en';
    },
  },
};
</script>

<style lang="scss" scoped>
  .home{
    .icon-19{
      font-size: 48px;
    }
  }
</style>

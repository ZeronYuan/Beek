<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/img/logo.png">
    <br />
    <img alt="Vue logo" src="../assets/img/fingerprint.jpg">
    <br />
    <el-button @click="changeEn">EN</el-button>
    <el-button type="primary" @click="changeZh">中文</el-button>
    <br />
    <br />
    <div class="block">
      <span class="demonstration">{{ $t('ff.test') }}</span>
      <el-date-picker
        v-model="value6"
        type="datetimerange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['12:00:00']">
      </el-date-picker>
    </div>
    <br />
    <div class="block">
      <span class="demonstration">起始时间</span>
      <el-date-picker
        v-model="value7"
        type="datetimerange"
        align="right"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['12:00:00', '08:00:00']">
      </el-date-picker>
    </div>
    <IconFont v-for="n in 20" :key="n" :name="(n - 1).toString()" size="58px" color="#cf1c1c">
    </IconFont>
    <br />
    <img alt="Vue logo" src="../assets/img/fingerprint.jpg">
    <br />
    <img alt="Vue logo" src="../assets/img/fingerprint.jpg">
    <br />
    <img alt="Vue logo" src="../assets/img/fingerprint.jpg">
    <br />
    <img alt="Vue logo" src="../assets/img/fingerprint.jpg">
    <br />
    <img alt="Vue logo" src="../assets/img/fingerprint.jpg">
    <br />
    <img alt="Vue logo" src="../assets/img/fingerprint.jpg">
    <br />
    <img alt="Vue logo" src="../assets/img/fingerprint.jpg">
    <br />
    <img alt="Vue logo" src="../assets/img/fingerprint.jpg">
    <br />
    <img alt="Vue logo" src="../assets/img/fingerprint.jpg">
    <br />
    <img alt="Vue logo" src="../assets/img/fingerprint.jpg">
    <br />
  </div>
</template>

<script>
// import http from '../plugins/http/http';
// @ is an alias to /src
import Vue from 'vue';
import IconFont from '@/components/base/IconFont.vue';


export default {
  name: 'Home',
  data() {
    return {
      radio: '1',
      value6: '',
      value7: '',
    };
  },
  components: {
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

<template>
  <div class="home">
    GOOD
    <!--<transition name="fade" appear mode="out-in">
      <div id="view">
        <router-view></router-view>
      </div>
    </transition>-->
  </div>
</template>

<script>
// import http from '../plugins/http/http';
// @ is an alias to /src
import Vue from 'vue';
// import IconFont from '@/components/base/IconFont.vue';


export default {
  name: 'Home',
  data() {
    return {
      value6: '',
      value7: '',
    };
  },
  components: {
    // IconFont,
  },
  created() {
    // `this` 指向 vm 实例
    // console.log(this);
  },
  methods: {
    changeZh() {
      Vue.config.lang = 'zh_CN';
      this.$message({
        message: this.$t('lang'),
        type: 'success',
      });
    },
    changeEn() {
      Vue.config.lang = 'en_US';
      this.$message({
        message: this.$t('lang'),
        type: 'warning',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#view{
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
}
</style>

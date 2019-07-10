<template>
  <div class="test">
    <div class="ip" v-for="item in ip" :key="item.id">
      <p>{{ item.alisa }}</p>
      <p>{{ item.uuid }}</p>
      <p>{{ item.softVersion }}</p>
    </div>
  </div>
</template>

<script>
import http from '../plugins/http/http';

export default {
  name: 'Test',
  data() {
    return {
      ip: {},
    };
  },
  created() {
    // `this` 指向 vm 实例
    this.init();
  },
  methods: {
    init() {
      const vm = this;
      const httpList = http.apiList;
      http.api[httpList.GETNODELISTINFO]({
        method: 'get',
        params: {
          action: 'getNodeListInfo',
          busID: 0,
        },
        success(response) {
          console.log(response);
          vm.ip = response;
        },
      });
    },
  },
  destroyed() {
  },
};
</script>

<style lang="scss" scoped>
.test{
  // background: #4d4d4d;
  .ip{
    border-bottom: #4d4d4d 1px solid;
  }
}
</style>

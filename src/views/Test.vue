<template>
  <div>
    {{ $t('ff.test') }}
    <p>{{ ip.ip }}</p>
    <p>{{ ip.country }}</p>
    <p>{{ ip.region }}</p>
    <p>{{ ip.city }}</p>
  </div>
</template>

<script>
import http from '../plugins/http/http';

let httpLoop;
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
        },
      });
      http.api[httpList.TEST2]({
        method: 'get',
        params: {
          name: '李白',
        },
        success(response) {
          console.log(response);
        },
      });
      httpLoop = http.loop(httpList.TEST1, {
        method: 'get',
        params: {
          ip: '63.223.108.42',
        },
        success(response) {
          console.log(response);
          vm.ip = response;
        },
      }, http.loop.channel.TWO_MINUTE);
    },
  },
  destroyed() {
    http.loop.remove(...httpLoop);
  },
};
</script>

<style scoped>

</style>

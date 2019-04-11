<template>
  <div class="test">
    {{ $t('lang') }}
    <p>{{ ip.ip }}</p>
    <p>{{ ip.country }}</p>
    <p>{{ ip.region }}</p>
    <p>{{ ip.city }}</p>
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
    },
  },
  destroyed() {
  },
};
</script>

<style lang="scss" scoped>
.test{
  background: #4d4d4d;
}
</style>

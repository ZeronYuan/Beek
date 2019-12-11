<template>
  <div class="test">
    TEST
    <div class="ip" v-for="item in ip" :key="item.id">
      <p>{{ item.alisa }}</p>
      <p>{{ item.uuid }}</p>
      <p>{{ item.softVersion }}</p>
    </div>
  </div>
</template>

<script>

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
    },
  },
  destroyed() {
  },
};
</script>

<style lang="scss" scoped>
.test{
  height: 100%;
  // background: #4d4d4d;
  .ip{
    border-bottom: #4d4d4d 1px solid;
  }
}
</style>

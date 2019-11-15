<template>
    <div class="cloud-set">
      <titles name="云设置"></titles>
      <el-form :model="cloudForm" ref="cloudForm" label-width="160px" label-position="left" size="small" class="cloud-form">
        <el-form-item label="注册状态">
          <el-input :disabled="true" :class="{ re: cloudForm.status, un: !cloudForm.status }" v-text="cloudForm.status?'已注册':'未注册'"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="cloudForm.ip"></el-input>
        </el-form-item>
        <el-form-item label="端口">
          <el-input v-model="cloudForm.port"></el-input>
        </el-form-item>
        <el-button class="sub" type="primary" @click="onSubmit">
          <span v-if="cloudForm.status">注销</span>
          <span v-else>注册</span>
        </el-button>
      </el-form>
    </div>
</template>

<script>
import Titles from './Title.vue';

export default {
  name: 'Cloud',
  data() {
    return {
      cloudForm: {
        status: false,
        ip: '192.168.1.1',
        port: '80',
      },
    };
  },
  components: {
    Titles: Titles,
  },
  methods: {
    onSubmit() {
      const vm = this;
      this.$message({
        message: JSON.stringify(vm.cloudForm),
        type: 'success',
      });
    },
  },
};
</script>

<style scoped lang="scss">
.cloud-set{
  height: 100%;
  .cloud-form{
    padding: 20px;
    .re{
      color: #4F7D21;
      text-align: right;
    }
    .un{
      color: #FF6700;
      text-align: right;
    }
    .sub{
      display: block;
      height: 36px;
      line-height: 36px;
      width: 100%;
      margin: 0 auto;
      margin-top: 35px;
      padding: 0;
    }
  }
}
</style>

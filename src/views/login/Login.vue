<template>
  <div class="login">
    <div class="form-warp">
      <p class="title">Firefinch R1 系统</p>
      <el-form ref="form" :model="form" label-width="0">
        <el-form-item label="">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input prefix-icon="el-icon-search" type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="sub" type="primary" @click="onSubmit">登&nbsp;&nbsp;录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      Copyright&nbsp;©&nbsp;<span class="time">2019</span>&nbsp;shenzhen&nbsp;Cybertron&nbsp;Technology&nbsp;Co.,Ltd&nbsp;深圳市思博创科技有限公司&nbsp;版权所有
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        name: '',
        password: '',
      },
    };
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
  .login{
    background: url("../../assets/img/login/LoginBj.png") no-repeat center;
    background-size: cover;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    .canvas{
      background: rgba(0,0,0,0);
    }
    #bg{
      height: 100%;
      width: 100%;
    }
    .form-warp{
      width: 356px;
      padding: 0 20px;
      position: absolute;
      top: 50%;
      left: 60%;
      transform: translate(-50%,-50%);
      .title{
        text-align: center;
        font-size: 36px;
        font-weight: 600;
        letter-spacing: 1px;
        color: #fff;
        margin-bottom: 30px;
        text-shadow: #dadfe9 0 0 5px;
      }
      .sub{
        width: 100%;
        >span{
          font-size: 20px;
        }
      }
    }
    .footer{
      position: absolute;
      left: 0;
      bottom: 0;
      background: rgba(11,40,80,.6);
      width: 100%;
      height: 60px;
      line-height: 60px;
      font-size: 12px;
      color: #4da7f5;
      text-align: center;
    }
  }
</style>

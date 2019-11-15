<template>
  <div class="ff-login">
    <canvas id="bubbles"></canvas>
    <div class="form-warp" @keyup.enter="onSubmit('ruleForm')">
      <p class="title"><img src="../../assets/img/login/Firefinch_logo2.png" alt=""> R1 系统</p>
      <el-form :model="form" status-icon :rules="rules" ref="ruleForm" label-width="0">
        <img class="angular" src="../../assets/img/login/LeftUp.png" alt="">
        <img class="angular" src="../../assets/img/login/LeftDown.png" alt="">
        <img class="angular" src="../../assets/img/login/RightUp.png" alt="">
        <img class="angular" src="../../assets/img/login/RightDown.png" alt="">
        <img class="form-logo" src="../../assets/img/login/LoginLogo2.png" alt="">
        <el-form-item label="" prop="name">
          <el-input prefix-icon="el-icon-user" v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input prefix-icon="el-icon-lock" type="password" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="sub" type="primary" :loading="loading" @click="onSubmit('ruleForm')">登&nbsp;&nbsp;录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      Copyright&nbsp;©&nbsp;<span class="time">2010-Present</span>&nbsp;Shenzhen&nbsp;Cybertron&nbsp;Technology&nbsp;Co.,Ltd&nbsp;  深圳市思博创科技有限公司&nbsp;版权所有
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      rules: {
        name: [
          { required: true, message: '请输用户名', trigger: 'blur' },
          {
            min: 3, max: 12, message: '请输入3到12位数的账号', trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 5, message: '请输入不少于5位数的密码', trigger: 'blur',
          },
        ],
      },
      form: {
        name: '',
        password: '',
      },
    };
  },
  methods: {
    onSubmit(formName) {
      const vm = this;
      vm.$refs[formName].validate((valid) => {
        if (valid) {
          vm.loading = true;
          vm.$router.push('/');
        }
      });
    },
  },
  mounted() {
  // Canvas Init
  /*
    const c = document.getElementById('bubbles');
    const ctx = c.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    const particles = 36; // 气泡数量
    const minRadius = 2; // 气泡最小半径
    const maxRadius = 18; // 气泡最大半径
    const speed = 0.01; // 初始速度累加
    const x = width / particles;

    // Bubbles
    const Bubbles = [];

    for (let i = 0; i < particles; i++) {
      Bubbles.push({
        x: i * x,
        y: height * Math.random(),
        r: minRadius + Math.random() * (maxRadius - minRadius),
        speed: 5 * Math.random(),
      });
    }

    function bubble() {
      c.width = width;
      c.height = height;
      for (let i = 0; i < Bubbles.length; i++) {
        const b = Bubbles[i];
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);

        b.alpha = 0.5 * (b.y / height);
        b.speed += speed;

        ctx.strokeStyle = 'rgba(255, 255, 255, .5)';
        ctx.stroke();
        ctx.fillStyle = `hsla(203, 75%, 69%,${b.alpha})`;
        ctx.fill();
        b.y -= b.speed;
        if (b.y < 0) {
          b.y = height;
          b.speed = Math.random() * 2;
        }
      }
    }

    // Draw
    function draw() {
      bubble();
      window.requestAnimationFrame(draw);
    }

    // Resize Canvas
    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      c.width = width;
      c.height = height;
      ctx.clearRect(100, 100, width, height);
      draw();
    }
    resizeCanvas();
    */
    // window.addEventListener('resize', resizeCanvas, false);
  },
  activated() {
    const vm = this;
    vm.loading = false;
    vm.$refs.ruleForm.resetFields();
  },
};
</script>

<style lang="scss">
  .ff-login{
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
    z-index: 20201010;
    #bubbles{
      height: 100%;
      width: 100%;
      background: rgba(0,0,0,0);
    }
    >.form-warp{
      width: 400px;
      padding: 0 20px;
      position: absolute;
      top: 45%;
      left: 66%;
      transform: translate(-50%,-50%);
      user-select:none;
      .title{
        height: 60px;
        text-align: center;
        font-size: 32px;
        line-height: 60px;
        color: #fff;
        font-weight: 600;
        margin-bottom: 20px;
        img{
          width: 160px;
          display: inline-block;
          transform: translateY(-7px);
        }
      }
      >.el-form{
        background-color: rgba(7,23,59,.8);
        border: 1px solid #406086;
        padding: 0 34px 46px 34px;
        position: relative;
        .form-logo{
          max-width: 100%;
          margin: 30px auto;
        }
        .angular{
          position: absolute;
          z-index: 1;
          &:nth-child(1){
            right: 0;
            top: 0;
          }
          &:nth-child(2){
            right: 0;
            bottom: 0;
          }
          &:nth-child(3){
            left: 0;
            top: 0;
          }
          &:nth-child(4){
            left: 0;
            bottom: 0;
          }
        }
        .el-form-item{
          &:last-child{
            margin-bottom: 0;
          }
          >.el-form-item__content{
            .el-input{
              .el-input__inner{
                background-color: #0b2850;
                border-radius: 3px;
                border: 1px solid #406086;
                color: #fff;
                padding-left: 34px;
                &:focus{
                  box-shadow: #406086 0 0 16px;
                }
              }
              .el-input__prefix{
                color: #4da7f5;
                i{
                  font-size: 18px;
                  margin-top: 3px\0;
                }
              }
              .el-input__suffix{
                .el-input__icon{
                  color: #4da7f5;
                }
                .el-icon-circle-close{
                  display: none;
                }
              }
            }
            .el-form-item__error{
              color: #4da7f5;
            }
            .sub{
              width: 100%;
              background: #4da7f5;
              border: 0;
              //font-size: 18px;
              span{
                font-size: 18px;
              }
            }
          }
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
      .time{
        font-size: 12px;
        // font-weight: 600;
      }
    }
  }
</style>

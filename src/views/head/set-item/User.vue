<template>
  <div class="user-set">
    <transition name="slide-fade">
      <div class="user-list" v-show="set">
        <div class="title">
          用户设置
          <el-tooltip effect="dark" content="新建用户" placement="left">
            <i class="add-user el-icon-circle-plus-outline"></i>
          </el-tooltip>
        </div>
        <ul class="list">
          <li>
            <p>User01</p>
            <p>anan@qq.com</p>
            <div class="to-set-user" @click="setUser('name')">
              <span>管理员</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
        </ul>
      </div>
    </transition>
    <transition name="slide-fade">
      <div class="user-dec" v-show="!set">
        <div class="tool"><i @click="setUser" class="el-icon-arrow-left"></i>编辑用户信息<span class="del-user">删除用户</span></div>
        <el-form :model="infoForm" ref="infoForm" label-width="160px" label-position="left" size="small" class="info-form">
          <el-form-item label="用户名">
            <el-input v-model="infoForm.name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="账户">
            <el-input v-model="infoForm.account" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="infoForm.password" :type="inputType">
              <i slot="suffix" @mouseenter="inputType = 'text'" @mouseleave="inputType = 'password'" class="el-input__icon el-icon-view"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="权限">
            <el-select v-model="infoForm.root" placeholder="请选择权限">
              <el-option label="管理员" value="1"></el-option>
              <el-option label="查看者" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" @click="submitForm" class="sub">提交</el-button>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      set: true,
      infoForm: {
        name: '1212',
        account: 'anan@qq.com',
        password: '1231',
        root: '2',
      },
      inputType: 'password',
    };
  },
  methods: {
    setUser: function (info) {
      const vm = this;
      vm.set = !vm.set;
      if (info) {
        console.log(vm.set);
      }
    },
    submitForm() {
      console.log(this.infoForm);
      this.$message({
        message: JSON.stringify(this.infoForm),
        type: 'success',
      });
    },
  },
};
</script>

<style scoped lang="scss">
.user-set{
  height: 100%;
  .user-list{
    height: 100%;
    .title{
      width: 100%;
      height: 50px;
      line-height: 50px;
      color: #4d4d4d;
      font-size: 16px;
      padding:0 28px;
      font-weight: 600;
      // background-color: #f2f2f2;
      .add-user{
        float: right;
        height: 50px;
        line-height: 52px;
        cursor: pointer;
        text-align: center;
        color: #4d4d4d;
        font-size: 20px;
        transition: all .5s;
        &:hover{
          color: #FF6700;
        }
      }
    }
    .list{
      li{
        height: 60px;
        position: relative;
        transition: all .5s;
        &:hover{
          background: #f2f2f2;
        }
        p{
          height: 30px;
          line-height:40px;
          text-indent: 30px;
          &:nth-child(2){
            line-height: 20px;
            color: #999;
          }
        }
        .to-set-user{
          cursor: pointer;
          position: absolute;
          top: 50%;
          right: 20px;
          transform: translateY(-50%);
          span{
            margin-right: 10px;
          }
        }
      }
    }
  }
  .user-dec{
    height: 100%;
    .tool{
      height: 50px;
      line-height: 50px;
      color: #4d4d4d;
      padding:0 28px;
      padding-left: 0;
      font-size: 16px;
      i{
        width: 50px;
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        text-align: center;
        cursor: pointer;
        &:hover{
          color: #FF6700;
        }
      }
      .del-user{
        font-size: 16px;
        cursor: pointer;
        color: #C20000;
        float: right;
      }
    }
    .info-form{
      padding: 20px;
      .sub{
        display: block;
        height: 36px;
        line-height: 36px;
        width: 80%;
        margin: 0 auto;
        margin-top: 35px;
        padding: 0;
      }
    }
  }
}
  .el-icon-view{
    &:hover{
      color: #42b983;
    }
  }
</style>

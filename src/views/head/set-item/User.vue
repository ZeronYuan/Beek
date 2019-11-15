<template>
  <div class="user-set">
    <transition-group name="slide-fade">
      <titles :key='1111' v-show="set" name="用户信息"></titles>
      <div :key='2222' class="user-list" v-show="set">
        <div class="add-user">
            <i class="el-icon-plus"></i>
            添加
        </div>
        <ul class="list">
          <el-scrollbar :native=false :noresize=false tag="section">
          <li>
            <p>User01</p>
            <p>anan@qq.com</p>
            <div class="to-set-user" @click="setUser('name')">
              <span>管理员</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          <li>
            <p>User01</p>
            <p>anan@qq.com</p>
            <div class="to-set-user" @click="setUser('name')">
              <span>管理员</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          <li>
            <p>User01</p>
            <p>anan@qq.com</p>
            <div class="to-set-user" @click="setUser('name')">
              <span>管理员</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          <li>
            <p>User01</p>
            <p>anan@qq.com</p>
            <div class="to-set-user" @click="setUser('name')">
              <span>管理员</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          <li>
            <p>User01</p>
            <p>anan@qq.com</p>
            <div class="to-set-user" @click="setUser('name')">
              <span>管理员</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          <li>
            <p>User01</p>
            <p>anan@qq.com</p>
            <div class="to-set-user" @click="setUser('name')">
              <span>管理员</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          <li>
            <p>User01</p>
            <p>anan@qq.com</p>
            <div class="to-set-user" @click="setUser('name')">
              <span>管理员</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          <li>
            <p>User01</p>
            <p>anan@qq.com</p>
            <div class="to-set-user" @click="setUser('name')">
              <span>管理员</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          <li>
            <p>User01</p>
            <p>anan@qq.com</p>
            <div class="to-set-user" @click="setUser('name')">
              <span>管理员</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          <li>
            <p>User01</p>
            <p>anan@qq.com</p>
            <div class="to-set-user" @click="setUser('name')">
              <span>管理员</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          <li>
            <p>User01</p>
            <p>anan@qq.com</p>
            <div class="to-set-user" @click="setUser('name')">
              <span>管理员</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          <li>
            <p>User01</p>
            <p>anan@qq.com</p>
            <div class="to-set-user" @click="setUser('name')">
              <span>管理员</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          <li>
            <p>User01</p>
            <p>anan@qq.com</p>
            <div class="to-set-user" @click="setUser('name')">
              <span>管理员</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          <li>
            <p>User01</p>
            <p>anan@qq.com</p>
            <div class="to-set-user" @click="setUser('name')">
              <span>管理员</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          <li>
            <p>User01</p>
            <p>anan@qq.com</p>
            <div class="to-set-user" @click="setUser('name')">
              <span>管理员</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          <li>
            <p>User01</p>
            <p>anan@qq.com</p>
            <div class="to-set-user" @click="setUser('name')">
              <span>管理员</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          <li>
            <p>User01</p>
            <p>anan@qq.com</p>
            <div class="to-set-user" @click="setUser('name')">
              <span>管理员</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          <li>
            <p>User01</p>
            <p>anan@qq.com</p>
            <div class="to-set-user" @click="setUser('name')">
              <span>管理员</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          <li>
            <p>User01</p>
            <p>anan@qq.com</p>
            <div class="to-set-user" @click="setUser('name')">
              <span>管理员</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          <li>
            <p>User01</p>
            <p>anan@qq.com</p>
            <div class="to-set-user" @click="setUser('name')">
              <span>管理员</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          <li>
            <p>User01</p>
            <p>anan@qq.com</p>
            <div class="to-set-user" @click="setUser('name')">
              <span>管理员</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          <li>
            <p>User01</p>
            <p>anan@qq.com</p>
            <div class="to-set-user" @click="setUser('name')">
              <span>管理员</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          <li>
            <p>User01</p>
            <p>anan@qq.com</p>
            <div class="to-set-user" @click="setUser('name')">
              <span>管理员</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          <li>
            <p>User01</p>
            <p>anan@qq.com</p>
            <div class="to-set-user" @click="setUser('name')">
              <span>管理员</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          <li>
            <p>User01</p>
            <p>anan@qq.com</p>
            <div class="to-set-user" @click="setUser('name')">
              <span>管理员</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          <li>
            <p>User01</p>
            <p>anan@qq.com</p>
            <div class="to-set-user" @click="setUser('name')">
              <span>管理员</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          <li>
            <p>User01</p>
            <p>anan@qq.com</p>
            <div class="to-set-user" @click="setUser('name')">
              <span>管理员</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          <li>
            <p>User01</p>
            <p>anan@qq.com</p>
            <div class="to-set-user" @click="setUser('name')">
              <span>管理员</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          <li>
            <p>User01</p>
            <p>anan@qq.com</p>
            <div class="to-set-user" @click="setUser('name')">
              <span>管理员</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          <li>
            <p>User01</p>
            <p>anan@qq.com</p>
            <div class="to-set-user" @click="setUser('name')">
              <span>管理员</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          <li>
            <p>User01</p>
            <p>anan@qq.com</p>
            <div class="to-set-user" @click="setUser('name')">
              <span>管理员</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          </el-scrollbar>
        </ul>
      </div>
    </transition-group>
    <transition name="slide-fade">
      <div class="user-dec" v-show="!set">
        <div class="tool"><i @click="setUser" class="el-icon-arrow-left"></i>编辑用户信息<span class="del-user">删除用户</span></div>
        <el-form :model="infoForm" ref="infoForm" label-width="160px" label-position="left" size="small" class="info-form">
          <el-form-item label="用户名">
            <el-input v-text="infoForm.name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="账户">
            <el-input v-text="infoForm.account" :disabled="true"></el-input>
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
import Titles from './Title.vue';

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
  components: {
    Titles: Titles,
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

<style lang="scss">
.user-set{
  height: 100%;
  overflow: hidden;
  .user-list{
    height: calc(100% - 56px);
    .add-user{
      // width: 100%;
      padding: 0 20px;
      text-align: center;
      height: 32px;
      line-height: 32px;
      cursor: pointer;
      transition: all .5s;
      border: 1px rgba(0,0,0,.85) dashed;
      border-radius: 2px;
      margin: 20px;
      font-size: 14px;
      &:hover{
        color: #FF6700;
        border-color: #FF6700;
      }
    }
    .list{
      height: calc(100% - 74px);
      >.el-scrollbar{
        >.el-scrollbar__wrap{
          overflow-x:hidden;
        }
      }
      li{
        height: 60px;
        position: relative;
        transition: all .5s;
        color: rgba(0,0,0,.85);
        font-size:14px;
        &:hover{
          background: #f2f2f2;
        }
        p{
          height: 30px;
          line-height:40px;
          text-indent: 20px;
          &:nth-child(2){
            line-height: 20px;
            color: rgba(0,0,0,.65);
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
    height: calc(100% - 56px);
    .tool{
      height: 50px;
      line-height: 50px;
      color: #4d4d4d;
      padding:0 20px;
      padding-left: 0;
      font-size: 16px;
      i{
       padding: 0 10px 0 20px;
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
        color: #FF6700;
        float: right;
      }
    }
    .info-form{
      padding: 20px;
      .el-form-item{
        &:nth-child(1),&:nth-child(2){
          .el-form-item__content{
            text-align: right;
          }
        }
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
}
  .el-icon-view{
    &:hover{
      color: #42b983;
    }
  }
</style>

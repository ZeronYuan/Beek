<template>
  <div class="head-set-box">
    <div class="set-list-box">
      <ul class="set-list">
        <li v-for="item in setList" :key="item.icon" :class="{active:item.active}" @click="setItem(item.name)">
          <el-tooltip class="item" effect="dark" :openDelay=200 :content=item.title placement="left">
            <div class="inner">
              <i :class=item.icon></i>
            </div>
          </el-tooltip>
        </li>
      </ul>
    </div>
    <div class="set-main">
      <transition-group name="slide-fade">
        <user    v-if="actItem === 'user'"    :key="1"></user>
        <net     v-if="actItem === 'net'"     :key="2"></net>
        <cloud   v-if="actItem === 'cloud'"   :key="3"></cloud>
        <based   v-show="actItem === 'base'"    :key="4"></based>
        <control v-if="actItem === 'control'" :key="5"></control>
        <log     v-if="actItem === 'log'"     :key="6"></log>
        <about   v-if="actItem === 'about'"   :key="7"></about>
      </transition-group>
    </div>
  </div>
</template>

<script>
import User from './set-item/User.vue';
import Net from './set-item/Net.vue';
import Cloud from './set-item/Cloud.vue';
import Based from './set-item/Based.vue';
import Control from './set-item/Control.vue';
import Log from './set-item/Log.vue';
import About from './set-item/About.vue';
import baseUtil from '../../util/baseUtil';
// import http from '../../plugins/http/http';
//
// const httpList = http.apiList;
export default {
  name: 'SystemSet',
  data() {
    return {
      setList: [
        {
          name: 'user', title: '用户信息', icon: 'el-icon-user', active: true,
        },
        {
          name: 'net', title: '网络设置', icon: 'el-icon-s-promotion', active: false,
        },
        {
          name: 'cloud', title: '云设置', icon: 'el-icon-cpu', active: false,
        },
        {
          name: 'base', title: '基础信息', icon: 'el-icon-s-ticket', active: false,
        },
        {
          name: 'control', title: '控制', icon: 'el-icon-mouse', active: false,
        },
        {
          name: 'log', title: '日志', icon: 'el-icon-s-operation', active: false,
        },
        {
          name: 'about', title: '关于', icon: 'el-icon-set-up', active: false,
        }],
      actItem: 'user',
    };
  },
  props: {},
  created() {
  },
  components: {
    User: User,
    Net: Net,
    Cloud: Cloud,
    Based: Based,
    Control: Control,
    Log: Log,
    About: About,
  },
  methods: {
    setItem: function (name) {
      const vm = this;
      baseUtil.each(vm.setList, (el) => {
        el.active = el.name === name;
        if (el.name === name) {
          vm.actItem = 'default';
          setTimeout(() => {
            vm.actItem = name; // 为了重复选择时能重新渲染右侧内容
          });
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.head-set-box{
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: rgba(0,0,0,.85);
  .set-list-box{
    width: 60px;
    height: 100%;
    float: left;
    background:#ECECEC;
    position: relative;
    .set-list{
      width: 60px;
      text-align: left;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      li{
        width: 60px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
        text-align: center;
        .inner{
          width: 100%;
          height: 100%;
          line-height: 66px;
          i{
            font-size: 18px;
            color: #F88311;
          }
        }
        &:hover{
          background-color: rgba(248,131,17,.1);
          /*color: #fff;*/
          /*border-bottom: 0.5px solid rgba(236,236,236,1);*/
          /*border-top: 0.5px solid rgba(236,236,236,1);*/
          .inner{
            i{
             // color: #fff;
            }
          }
        }
        /*&:first-child{*/
        /*  &:hover{*/
        /*    border-top: none;*/
        /*  }*/
        /*}*/
      }
      .active{
        background-color: #F88311;
        &:hover,.inner{
          i{
            color: #fff;
          }
        }
        &:hover{
          background-color: #F88311;
          i{
            color: #fff;
          }
        }
      }
    }
  }
  .set-main{
    height: 100%;
    margin-left: 60px;
    overflow: auto;
    overflow-x: hidden;
    text-align: left;
  }
}
</style>

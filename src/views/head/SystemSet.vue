<template>
  <div class="set-box">
    <ul class="set-list">
      <li v-for="item in setList" :key="item.icon" :class="{active:item.active}" @click="setItem(item.name)">
        <el-tooltip class="item" effect="dark" :openDelay=200 :content=item.title placement="left">
          <div class="inner">
            <i :class=item.icon></i>
          </div>
        </el-tooltip>
      </li>
    </ul>
    <div class="set-main">
      <transition name="slide-fade">
        <user v-if="actItem === 'user'"></user>
      </transition>
      <transition name="slide-fade">
        <net v-if="actItem === 'net'"></net>
      </transition>
      <transition name="slide-fade">
        <cloud v-if="actItem === 'cloud'"></cloud>
      </transition>
      <transition name="slide-fade">
        <based v-if="actItem === 'base'"></based>
      </transition>
      <transition name="slide-fade">
        <control v-if="actItem === 'control'"></control>
      </transition>
      <transition name="slide-fade">
        <log v-if="actItem === 'log'"></log>
      </transition>
      <transition name="slide-fade">
        <about v-if="actItem === 'about'"></about>
      </transition>
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
  created() {},
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
          vm.actItem = name;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.set-box{
  width: 100%;
  height: 100%;
  overflow: hidden;
  .set-list{
    width: 60px;
    height: 100%;
    float: left;
    background-color: rgba(228, 228, 228, 1);
    li{
      width: 60px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      cursor: pointer;
      transition: all .3s;
      &:hover{
        background-color: rgba(215, 215, 215, 1);
      }
      .inner{
        width: 100%;
        height: 100%;
        line-height: 66px;
        i{
          font-size: 18px;
          font-weight: 600;
          color: #999;
        }
      }
    }
    .active{
      background-color: rgba(215, 215, 215, 1);
    }
  }
}
.set-main{
  height: 100%;
  margin-left: 60px;
  overflow: auto;
}
</style>

<template>
  <div class="about">
    <titles name="关于"></titles>
    <div class="logo">
      <img src="../../../../src/assets/img/cmlogo.png" alt="">
      <p>深圳市思博创科技有限公司</p>
    </div>
    <ul class="list">
      <li><span>设备名称</span><span>{{info.name}}</span></li>
      <li><span>型号</span><span>{{info.model}}</span></li>
      <li><span>UUID</span><span :title=info.uuid>{{info.uuid}}</span></li>
      <li><span>序列号</span><span :title=info.serialNumber>{{info.serialNumber}}</span></li>
      <li><span>注册时间</span><span>{{info.registerTime}}</span></li>
      <li><span>CPU数量</span><span>{{info.cpuCore}}</span></li>
      <li @click="openVersion = !openVersion"><span>版本</span><span>{{info.version}}</span><i v-if="!openVersion" class="el-icon-arrow-down"></i><i v-if="openVersion" class="el-icon-arrow-up"></i></li>
      <li class="other-version" v-show="openVersion">
        <ul>
          <li><span>资源库</span><span>{{info.otherVersion.resource}}</span></li>
          <li><span>数据库</span><span>{{info.otherVersion.database}}</span></li>
          <li><span>系统</span><span>{{info.otherVersion.os}}</span></li>
          <li><span>内核</span><span>{{info.otherVersion.kernel}}</span></li>
          <li><span>硬件</span><span>{{info.otherVersion.hareware}}</span></li>
        </ul>
      </li>
      <li><span>累计运行时间</span><span>{{info.time}}</span></li>
    </ul>
  </div>
</template>

<script>
import Titles from './Title.vue';
import http from '../../../plugins/http/http';

const httpList = http.apiList;

export default {
  name: 'About',
  data() {
    return {
      info: {
        time: '',
        otherVersion: {},
      },
      openVersion: false,
    };
  },
  components: {
    Titles: Titles,
  },
  created() {
    const vm = this;
    http.api[httpList.GetSystemInformation]({
      method: 'get',
      success(response) {
        let runTime = response.totalRunTime;
        let h = parseInt(runTime / 60, 10);
        let m = runTime - (h * 60);
        h = h < 10 ? `0${h}` : h;
        m = m < 10 ? `0${m}` : m;
        runTime = `${h}小时${m}分钟`;
        vm.info = response;
        vm.info.time = runTime;
      },
    });
  },
};
</script>

<style scoped lang="scss">
.about{
  .logo{
    width: 100%;
    margin: 40px 0;
    img{
      display: block;
      width: 50%;
      margin: 0 auto;
    }
    p{
      text-align: center;
      margin-top: 10px;
      color: #666666;
    }
  }
  .list{
    width: 100%;
    padding: 28px;
    float: left;
    li{
      margin: 20px 0;
      overflow: hidden;
      position: relative;
      span{
        float: left;
        width: 30%;
        &:nth-child(2){
          width: 70%;
          text-align: right;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
      }
      &:nth-child(7){
        cursor: pointer;
        span{
          &:nth-child(2){
            padding-right: 25px;
          }
        }
      }
      i{
        position: absolute;
        right: 0;
        top:5px;
      }
    }
    .other-version{
      margin: 0;
      ul{
        padding-left: 20px;
        li{
          &:first-child{
            margin-top: 0;
          }
          &:last-child{
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
</style>

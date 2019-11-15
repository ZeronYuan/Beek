<template>
<footer class="ff-footer">
  <div class="time line"><span>{{time}}</span></div>
  <ul class="net line">
    <li>ETH1</li>
    <li>ETH2</li>
    <li>
      <el-popover
      placement="top"
      width="220"
      popper-class="wifi"
      trigger="click">
        <div class="title">
          <span class="dec">WLAN</span>
          <i @click="getWlanList" class="el-icon-refresh-right" :class="{'active-rotate': refresh}"></i>
          <el-switch
            @change="onOffWlan"
            class="wlan-sw"
            v-model=wlan
            :width=36
            active-color="#13ce66"
            inactive-color="#999">
          </el-switch>
        </div>
        <el-scrollbar :native=false :noresize=false tag="section">
        <ul class="wlan-list">
          <li v-for="item in wlanList" :key="item.BSSID" @click="wlanConnect(item.BSSID)">
            <i class="el-icon-connection icon"></i>
            <p class="name">
              <span :title="item.SSID">{{item.SSID}}</span>
              <br>
              <span v-if="item.active">已连接</span>
              <span v-else-if="item.hold && !item.active">已保存</span>
            </p>
            <i class="el-icon-lock icon"></i>
          </li>
        </ul>
        </el-scrollbar>
        <span slot="reference" @click="visible = !visible">WIFI</span>
      </el-popover>
    </li>
    <li>4G</li>
  </ul>
  <ul class="bus">
    <li>FF-BUS</li>
    <li><span></span></li>
    <li><span></span></li>
    <li><span></span></li>
    <li><span></span></li>
  </ul>
</footer>
</template>

<script>
import format from '../../util/format';
import baseUtil from '../../util/baseUtil';
import http from '../../plugins/http/http';

const httpList = http.apiList;
export default {
  name: 'foot',
  data() {
    return {
      visible: false,
      time: format.date(new Date(), 'yyyy/MM/dd hh:mm:ss'),
      wlan: false,
      wlanList: [],
      refresh: false,
    };
  },
  created() {
    const vm = this;
    setInterval(() => {
      const t = new Date();
      vm.time = format.date(t, 'yyyy/MM/dd hh:mm:ss');
    }, 1000);
    vm.getWlanList();
  },
  methods: {
    wlanConnect(id) {
      const vm = this;
      baseUtil.each(vm.wlanList, (el) => {
        if (el.BSSID === id && !el.active && !el.hold) {
          this.$prompt('请输入密码', `连接无线网络  ${el.SSID}`, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputType: 'password',
            inputPattern: /^\w{8,18}$/,
            inputErrorMessage: '请输入至少8位字符的密码',
          }).then(({ value }) => {
            this.$message({
              type: 'success',
              message: `密码: ${value}`,
            });
          }).catch(() => {});
        }
      });
    },
    getWlanList() { // 获取WiFi列表
      const vm = this;
      vm.refresh = true;
      http.api[httpList.IsOpened]({
        success(response) {
          vm.wlan = response;
        },
      });
      http.api[httpList.GetScanResult]({
        method: 'get',
        success(response) {
          vm.wlanList = response;
          vm.GetConnectedHotpad();
        },
      });
    },
    GetConnectedHotpad() { // 获取已连接WiFi
      const vm = this;
      http.api[httpList.GetConnectedHotpad]({
        method: 'get',
        success(response) {
          setTimeout(() => {
            vm.refresh = false;
          }, 2600);
          baseUtil.each(response, (el) => {
            baseUtil.each(vm.wlanList, (el2) => {
              el2.active = el.SSID === el2.SSID;
              if (el.BSSID === el2.BSSID) {
                el2.hold = el.Selected;
              } else {
                el2.hold = false;
              }
            });
          });
          console.log(vm.wlanList);
        },
      });
    },
    onOffWlan(status) { // 监听wlan开关
      console.log(status);
    },
  },
  destroyed() {
    this.visible = false;
  },
};
</script>

<style lang="scss">
.ff-footer{
  position: fixed;
  bottom: 0;
  z-index: 1;
  height: 40px;
  width: 100%;
  background: #2B3134;
  color: #f2f2f2;
  .bus{
    float: right;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    li{
      float: left;
      display: inline-block;
      &:first-child{
        padding-right: 10px;
      }
      &:not(:first-child){
        >span{
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 100%;
          background: #4F7D21;
          margin:0 10px;
        }
      }
    }
  }
  .net{
    float: right;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    li{
      float: left;
      display: inline-block;
      padding: 0 10px;
      cursor: pointer;
      span{
        display: inline-block;
        height: 28px;
        line-height: 28px;
      }
    }
  }
  .time{
    float: right;
    width: 180px;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .line{
    position: relative;
    &:before{
      content: '';
      height: 20px;
      width: 1px;
      background: #ffffff;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
.wifi{
  color: #f2f2f2;
  background: rgba(0,0,0,.8);
  padding: 0;
  padding-top: 6px;
  &[x-placement^="top"] .popper__arrow::after {
    bottom: 0;
    border-top-color: rgba(0,0,0,.8);
  }
  >.title{
    width: 90%;
    margin: 0 auto;
    text-align: right;
    height: 30px;
    line-height: 30px;
    padding-bottom: 3px;
    box-sizing: content-box;
    border-bottom: 1px solid #f2f2f2;
    .dec{
      float: left;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
    }
    .wlan-sw{
      margin-top: -4px;
    }
    .el-icon-refresh-right{
      font-size: 18px;
      margin-right: 20px;
      cursor: pointer;
      top: 2px;
      position: relative;
    }
    .active-rotate{
      animation: rotating 2.6s linear infinite;
    }
  }
  .wlan-list{
    height: 280px;
    padding-bottom: 17px;
   // overflow-y: auto;
    li{
      padding:15px 10px;
      position: relative;
      cursor: pointer;
      &:last-child{
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
        padding-bottom: 17px;
      }
      &:hover{
        background: #666666;
      }
      .icon{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
      .el-icon-lock{
        right: 10px;
      }
      .name{
        width: calc(100% - 35px);
        margin-left: 25px;
        span{
          display: inline-block;
          width: 90%;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          &:first-child{
            margin-top: 3px;
          }
        }
      }
    }
  }
}
.el-scrollbar{
  .el-scrollbar__warp{
    overflow-x: hidden;
  }
}

</style>

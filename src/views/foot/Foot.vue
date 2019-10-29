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
          <el-switch
            class="wlan-sw"
            v-model="wlan"
            :width=36
            active-color="#13ce66"
            inactive-color="#999">
          </el-switch>
        </div>
        <el-scrollbar :native=false :noresize=false tag="section">
        <ul class="wlan-list">
          <li v-for="item in wlanList" :key="item.id" @click="wlanConnect(item.id)">
            <i class="el-icon-connection icon"></i>
            <p class="name">
              <span :title="item.name">{{item.name}}</span>
              <br>
              <span v-if="item.connect">已连接</span>
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

export default {
  name: 'foot',
  data() {
    return {
      visible: false,
      time: format.date(new Date(), 'yyyy/MM/dd hh:mm:ss'),
      wlan: true,
      wlanList: [{ name: 'wewerwewerwewerwewerw', connect: false, id: '123sd' }, { name: 'FFFF', connect: true, id: '12334sd' }, { name: 'EEEE', connect: false, id: '12773sd' }, { name: 'GGGG', connect: false, id: '12rr3sd' }, { name: 'GGGG', connect: false, id: '12rr783sd' }, { name: 'GGGG', connect: false, id: '18782rr3sd' }, { name: 'GGGG', connect: false, id: '12rr3878sd' }],
    };
  },
  created() {
    const vm = this;
    setInterval(() => {
      const t = new Date();
      vm.time = format.date(t, 'yyyy/MM/dd hh:mm:ss');
    }, 1000);
  },
  methods: {
    wlanConnect(id) {
      const vm = this;
      baseUtil.each(vm.wlanList, (el) => {
        if (el.id === id) {
          this.$prompt('请输入密码', `连接无线网络  ${el.name}`, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputType: 'password',
            inputPattern: /^\w{6,18}$/,
            inputErrorMessage: '密码太短',
          }).then(({ value }) => {
            this.$message({
              type: 'success',
              message: `密码: ${value}`,
            });
          }).catch(() => {});
        }
      });
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

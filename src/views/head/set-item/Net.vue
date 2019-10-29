<template>
    <div class="net-set">
      <div class="net-list" v-show="!setBus && !setEth && !set4g && !setWlan && !wlanDec">
        <div class="title">网络设置</div>
        <ul class="net-item">
          <li>
            <div class="open" @click="showBus = !showBus">FF-BUS <i v-if="!showBus" class="el-icon-arrow-down"></i><i v-if="showBus" class="el-icon-arrow-up"></i></div>
            <div class="bus-list">
              <transition name="slide-fade">
                <ul v-show="showBus" class="inner-bus">
                  <li>FF-BUS1 <i @click="setBus = !setBus" class="el-icon-arrow-right"></i> <span>已开启</span></li>
                  <li>FF-BUS2</li>
                  <li>FF-BUS3</li>
                  <li>FF-BUS4</li>
                </ul>
              </transition>
            </div>
          </li>
          <li>
            <div class="open" @click="showEth = !showEth">有线网络 <i v-if="!showEth" class="el-icon-arrow-down"></i><i v-if="showEth" class="el-icon-arrow-up"></i></div>
            <div class="bus-list">
              <transition name="slide-fade">
                <ul v-show="showEth" class="inner-bus">
                  <li>ETH1<i class="el-icon-arrow-right"></i> <span>已开启</span></li>
                  <li>ETH2<i class="el-icon-arrow-right"></i> <span>已开启</span></li>
                </ul>
              </transition>
            </div>
          </li>
          <li>
            <div class="other-net">
              WLAN
              <i @click="setWlan = !setWlan" class="el-icon-arrow-right"></i>
              <span>Cybertron-net</span>
            </div>
          </li>
          <li>
            <div class="other-net">
              4G
              <i @click="set4g = !set4g" class="el-icon-arrow-right"></i>
              <span>已开启</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="set-bus" v-show="setBus">
          <div class="bus-dec">
            <div class="tool"><i @click="setBus = !setBus" class="el-icon-arrow-left"></i>编辑FF-BUS1</div>
            <el-form :model="setBusForm" ref="setBusForm" label-width="160px" label-position="left" size="small" class="info-form">
              <el-form-item label="状态">
                <el-switch v-model="setBusForm.status"></el-switch>
              </el-form-item>
              <el-form-item label="电源开关">
                <el-switch v-model="setBusForm.open"></el-switch>
              </el-form-item>
              <el-form-item label="闲时节点自动升级">
                <el-switch v-model="setBusForm.autoUpdate"></el-switch>
              </el-form-item>
              <el-form-item label="距离">
                <el-select v-model="setBusForm.distance" placeholder="请选择距离">
                  <el-option label="100米" value="1"></el-option>
                  <el-option label="500米" value="2"></el-option>
                  <el-option label="1000米" value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
      </div>
      <div class="set-wlan" v-show="setWlan">
        <div class="wlan-list">
          <div class="tool"><i @click="setWlan = !setWlan" class="el-icon-arrow-left"></i>WLAN</div>
          <div class="status">
            状态
            <el-switch
            v-model="walnStatus">
          </el-switch>
          </div>
          <p class="title">附近的网络</p>
          <ul class="wlan-item">
            <li v-for="item in wlanList" :key="item.id" @click="wlanInfo(item)">
              <i class="el-icon-connection icon"></i>
                <span :title="item.name">{{item.name}}</span>
                <br>
                <span v-if="item.connect">已连接</span>
              <i class="el-icon-lock icon"></i>
              <i class="el-icon-arrow-right icon"></i>
            </li>
          </ul>
        </div>
      </div>
      <div class="wlan-dec" v-show="wlanDec">
        <div class="tool"><i @click="showSetWlan" class="el-icon-arrow-left"></i>WLAN连接信息 <span class="del-user">删除网络</span></div>
        <ul class="item-info">
          <li><span>连接状态</span><span class="connect">已连接</span></li>
          <li><span>信号强度</span><span>--</span></li>
          <li><span>连接速度</span><span>--</span></li>
          <li><span>频率</span><span>--</span></li>
          <li><span>加密方式</span><span>--</span></li>
          <li><span>IP设置</span>
            <el-select v-model="ipModel" @change="ipStatus" size="small" placeholder="请选择">
              <el-option label="静态" value="1"></el-option>
              <el-option label="DHCP" value="2"></el-option>
            </el-select>
          </li>
        </ul>
        <ul class="ip-info" v-show="ipModel === '1'">
          <li><span>IP地址</span><span>--</span></li>
          <li><span>路由器</span><span>--</span></li>
          <li><span>前缀长度</span><span>--</span></li>
          <li><span>DNS1</span><span>--</span></li>
          <li><span>DNS2</span><span>--</span></li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Net',
  data: function () {
    return {
      showBus: false,
      setBus: false,
      setBusForm: {
        status: false,
        open: false,
        autoUpdate: false,
        distance: '1',
      },
      showEth: false,
      setEth: false,
      setWlan: false,
      setInWlan: false,
      walnStatus: false,
      wlanDec: false,
      wlanList: [{ name: 'wewerwewerwewerwewerwwewerwewerwewerwewerwwewerwewerwewerwewerw', connect: false, id: '123sd' }, { name: 'FFFF', connect: true, id: '12334sd' }, { name: 'EEEE', connect: false, id: '12773sd' }, { name: 'GGGG', connect: false, id: '12rr3sd' }, { name: 'GGGG', connect: false, id: '12rr783sd' }, { name: 'GGGG', connect: false, id: '18782rr3sd' }, { name: 'GGGG', connect: false, id: '12rr3878sd' }],
      ipModel: '1',
      set4g: false,
    };
  },
  created() {},
  methods: {
    wlanInfo(info) {
      const vm = this;
      vm.setWlan = false;
      vm.wlanDec = true;
      console.log(info);
    },
    ipStatus(value) {
      console.log(value);
      console.log(this.ipModel);
    },
    showSetWlan() {
      const vm = this;
      vm.wlanDec = false;
      vm.setWlan = true;
    },
  },
};
</script>

<style scoped lang="scss">
.net-set{
  .net-list{
    .title{
      height: 50px;
      line-height: 50px;
      text-indent: 28px;
      font-size: 16px;
    }
    .net-item{
      li{
        transition: all .3s;
        cursor: pointer;
        padding-left: 28px;
        &:hover{
          background: #f2f2f2;
        }
        .open{
          height: 50px;
          line-height: 50px;
          transition: all .3s;
          i{
            width: 50px;
            height: 50px;
            line-height: 53px;
            float: right;
            text-align: center;
            margin-right: 20px;
          }
        }
        .bus-list{
          .inner-bus{
            li{
              height: 45px;
              line-height: 45px;
              i,span{
                float: right;
                height: 45px;
                line-height: 45px;
              }
              i{
                width: 45px;
                line-height: 48px;
                text-align: center;
                margin-right: 20px;
              }
            }
          }
        }
        .other-net{
          height: 50px;
          line-height: 50px;
          i,span{
            float: right;
            height: 50px;
            line-height: 50px;
          }
          i{
            width: 50px;
            line-height: 53px;
            text-align: center;
            margin-right: 20px;
          }
        }
      }
    }
  }
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
  .set-bus,.set-wlan{
    .bus-dec,.wlan-list{
      .info-form{
        padding: 0 20px;
      }
    }
    .wlan-list{
      .status{
        padding:0 30px;
        height: 50px;
        line-height: 50px;
        .el-switch{
          float: right;
          margin-top: 16px;
        }
      }
      .title{
        padding:0 30px;
        height: 50px;
        line-height: 50px;
        font-weight: 600;
        font-size: 16px;
      }
      .wlan-item{
        li{
          padding:10px;
          position: relative;
          cursor: pointer;
          &:hover{
            background: #f2f2f2;
          }
          .icon{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
          }
          .el-icon-arrow-right{
            right: 20px;
          }
          .el-icon-lock{
            right: 40px;
          }
            span{
              width: calc(100% - 75px);
              margin-left: 25px;
              display: inline-block;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              margin-top: 6px;
              &:first-child{
                margin-top: 3px;
              }
            }
        }
      }
    }
  }
  .wlan-dec{
    .item-info,.ip-info{
      li{
        height: 46px;
        line-height: 46px;
        padding: 0 25px;
        span{
          &:last-child{
            float: right;
            height: 46px;
            line-height: 46px;
          }
        }
        .connect{
          color: #42b983;
        }
        .el-select{
          float: right;
        }
      }
    }
    .ip-info{
      padding-left: 30px;
    }
  }
}
</style>

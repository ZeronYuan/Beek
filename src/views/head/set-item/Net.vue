<template>
    <div class="net-set">
      <div class="net-list" v-show="!bus.show && !eth.show && !wlan.show && !mobile.show">
        <titles name="网络设置"/>
        <ul class="net-item">
          <li>
            <div class="open" @click="netList.bus = !netList.bus">
              FF-BUS
              <i v-if="!netList.bus" class="el-icon-arrow-down"/>
              <i v-if="netList.bus" class="el-icon-arrow-up"/>
            </div>
            <div class="bus-list">
              <transition name="slide-fade">
                <ul v-show="netList.bus" class="inner-bus">
                  <li v-for="(val, name, index) in bus.busList" :key="index">
                    {{name}}
                    <i @click="getBusInfo(val.id),bus.show = !bus.show" class="el-icon-arrow-right"/>
                    <span v-if="val.status">已开启</span>
                    <span v-else>关闭</span>
                  </li>
                </ul>
              </transition>
            </div>
          </li>
          <li>
            <div class="open" @click="netList.eth = !netList.eth">
              有线网络
              <i v-if="!netList.eth" class="el-icon-arrow-down"/>
              <i v-if="netList.eth" class="el-icon-arrow-up"/>
            </div>
            <div class="bus-list">
              <transition name="slide-fade">
                <ul v-show="netList.eth" class="inner-bus">
                  <li>
                    ETH1
                    <i class="el-icon-arrow-right" @click="() => {eth.show = !eth.show;showEthData('eth0')}"/>
                    <span v-if="eth.data.eth0.status">已开启</span>
                    <span v-else>已关闭</span>
                  </li>
                  <li>
                    ETH2
                    <i class="el-icon-arrow-right" @click="() => {eth.show = !eth.show;showEthData('eth1')}"/>
                    <span v-if="eth.data.eth1.status">已开启</span>
                    <span v-else>已关闭</span>
                  </li>
                </ul>
              </transition>
            </div>
          </li>
          <li>
            <div class="other-net">
              WLAN
              <i @click="wlan.show = !wlan.show" class="el-icon-arrow-right"/>
              <span v-text="wlan.activeName"/>
            </div>
          </li>
          <li>
            <div class="other-net">
              移动网络
              <i @click="mobile.show = !mobile.show" class="el-icon-arrow-right"/>
              <!--<span>已开启</span>-->
            </div>
          </li>
        </ul>
      </div>
      <div class="set-bus" v-show="bus.show">
          <div class="bus-dec">
            <div class="tool">
              <i @click="bus.show = !bus.show" class="el-icon-arrow-left"/>
              编辑FF-BUS1
            </div>
            <el-form :model="bus.form" ref="setBusForm" label-width="160px" label-position="left" size="small" class="info-form">
              <el-form-item label="状态">
                <el-switch @change="setBusInfo('SetSwitchStatus', 'status')" v-model="bus.form.status"/>
              </el-form-item>
              <el-form-item label="电源开关">
                <el-switch @change="setBusInfo('SetPowerStatus', 'power_status')" v-model="bus.form.power_status"/>
              </el-form-item>
              <el-form-item label="闲时节点自动升级">
                <el-switch @change="setBusInfo('SetAutoUpgprade', 'auto_upgrade')" v-model="bus.form.auto_upgrade"/>
              </el-form-item>
              <el-form-item label="距离">
                <el-select @change="setBusInfo('SetDistance', 'distance')" v-model="bus.form.distance" placeholder="请选择距离">
                  <el-option label="40米" value="40"/>
                  <el-option label="100米" value="100"/>
                  <el-option label="250米" value="250"/>
                  <el-option label="500米" value="500"/>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
      </div>
      <div class="set-eth" v-show="eth.show">
        <div class="wlan-list" v-show="!eth.editEth">
          <div class="tool"><i @click="eth.show = !eth.show" class="el-icon-arrow-left"/>{{eth.showData.name}}</div>
          <div class="status">
            状态
            <el-switch v-if="eth.showData.paramName === 'eth1'" @change="ethStatusChange" v-model="eth.showData.status"/>
            <el-switch v-else v-model="eth.showData.status" disabled/>
          </div>
          <p class="title" @click="eth.ethDecShow = !eth.ethDecShow">
            连接详情
            <i v-if="!eth.ethDecShow" class="el-icon-arrow-down"/>
            <i v-if="eth.ethDecShow" class="el-icon-arrow-up"/>
          </p>
          <ul class="item-info" v-show="eth.ethDecShow">
            <li><span>网口状态</span><span class="connect" v-if="eth.showData.isPlugin">已连接</span><span class="connect un" v-else>未连接</span></li>
            <li><span>物理地址</span><span>{{eth.showData.macAddress}}</span></li>
            <li><span>IP地址</span><span>{{eth.showData.ipv4.address}}</span></li>
            <li><span>子网掩码</span><span>{{eth.showData.ipv4.netmask}}</span></li>
            <li><span>默认网关</span><span>{{eth.showData.ipv4.gateway}}</span></li>
            <!-- <li><span>附加网关</span><span></span></li>-->
            <li>
              <span>DNS列表</span>
              <div class="dns-list">
                <p v-for="(item,index) in eth.showData.dns" :key=index>{{item}}</p>
              </div>
            </li>
          </ul>
          <p class="title" @click="() => {eth.editEth = !eth.editEth;getEthIpv4(eth.showData.paramName);}">设置
            <i class="el-icon-arrow-right"/></p>
        </div>
        <div class="wlan-list model-select" v-if="eth.editEth">
          <div class="tool"><i @click="eth.editEth = !eth.editEth" class="el-icon-arrow-left"/>{{eth.showData.name}}设置</div>
          <div class="select">
            <span>设置</span>
            <el-select v-model="eth.decForm.autoDHCP" @change="ethDhcpChange" size="small" placeholder="请选择">
              <el-option label="静态" :value=false />
              <el-option label="DHCP" :value=true />
            </el-select>
          </div>
          <el-form v-show="!eth.decForm.autoDHCP" label-position="left" class="dec-form" size="small" ref="ethForm" :rules="rules" :model="eth.decForm" label-width="40%">
            <el-form-item label="IP" prop="address">
              <el-input v-model="eth.decForm.address"/>
            </el-form-item>
            <el-form-item label="子网掩码" prop="netmask">
              <el-input v-model="eth.decForm.netmask"/>
            </el-form-item>
            <el-form-item label="默认网关" prop="gateway">
              <el-input v-model="eth.decForm.gateway"/>
            </el-form-item>
<!--            <el-form-item label="附加网关">-->
<!--              <el-input v-model="eth.decForm.addGateWay"></el-input>-->
<!--            </el-form-item>-->
            <el-form-item label="主DNS" prop="primaryDNS">
              <el-input v-model="eth.decForm.primaryDNS"/>
            </el-form-item>
            <el-form-item label="子DNS" prop="secondaryDNS">
              <el-input v-model="eth.decForm.secondaryDNS"/>
            </el-form-item>
            <el-button type="primary" @click="subEthDec">提交</el-button>
          </el-form>
        </div>
      </div>
      <div class="set-wlan" v-show="wlan.show">
        <div class="wlan-list" v-show="!wlan.wlanDecShow&&!wlan.decShow">
          <div class="tool"><i @click="wlan.show = !wlan.show" class="el-icon-arrow-left"/>WLAN</div>
          <div class="status">
            状态
            <el-switch @change="setWlanStatus" v-model="wlan.status">
            </el-switch>
          </div>
          <p class="title">附近的网络</p>
          <ul class="wlan-item">
            <li v-for="(item, index) in wlanList" :key="item.BSSID" @click="wlanInfo(item, index)">
              <i class="el-icon-connection icon"/>
              <span :title="item.SSID">{{item.SSID}}</span>
              <br>
              <span v-if="item.Status===7">已连接</span>
          <!--<span v-else-if="item.Status===0">未连接</span>-->
              <span v-else-if="item.Status===1">未激活</span>
              <span v-else-if="item.Status===2">扫描中</span>
              <span v-else-if="item.Status===3">连接中</span>
              <span v-else-if="item.Status===4">已保存</span>
              <span v-else-if="item.Status===8">待机中</span>
              <span v-else-if="item.Status===9">未发现网络</span>
              <span v-else-if="item.Hold&&item.Status!==7">已保存</span>
              <i class="el-icon-lock icon"/>
              <i class="el-icon-arrow-right icon"/>
            </li>
          </ul>
        </div>
        <div class="wlan-list wlan-dec" v-show="wlan.wlanDecShow">
          <div class="tool"><i @click="wlan.wlanDecShow = false" class="el-icon-arrow-left"/>WLAN连接信息 <span v-if="wlan.decShowData.Hold" @click="delWLAN" class="del-wlan">删除网络</span></div>
          <p class="title" @click="wlan.decOpen = !wlan.decOpen">
            连接详情
            <i v-if="!wlan.decOpen" class="el-icon-arrow-down"/>
            <i v-if="wlan.decOpen" class="el-icon-arrow-up"/>
          </p>
          <ul class="item-info" v-show="wlan.decOpen">
            <li>
              <span class="name">名称</span>
              <span>{{wlan.decShowData.SSID}}</span>
            </li>
            <li>
              <span class="name">连接状态</span>
              <span class="connect" v-if="wlan.decShowData.Status===7">已连接</span>
              <span v-else>未连接</span>
            </li>
            <li>
              <span class="name">信号强度</span>
              <span v-if="wlan.decShowData.SingalStrength === 0">弱</span>
              <span v-else-if="wlan.decShowData.SingalStrength === 1">中</span>
              <span v-else-if="wlan.decShowData.SingalStrength === 2">强</span>
              <span v-else />
            </li>
            <li>
              <span class="name">物理地址</span>
              <span>{{wlan.decShowData.BSSID}}</span>
            </li>
            <li>
              <span class="name">频率</span>
              <span v-if="wlan.decShowData.Freq === 0">未知</span>
              <span v-else-if="wlan.decShowData.Freq === 1">2.4G</span>
              <span v-else-if="wlan.decShowData.Freq === 2">5G</span>
              <span v-else />
            </li>
            <li>
              <span class="name">加密方式</span>
              <span v-if="wlan.decShowData.AuthType === 0">未知</span>
              <span v-else-if="wlan.decShowData.EncryptionType === 1">无</span>
              <span v-else-if="wlan.decShowData.EncryptionType === 2">WPA_PSK</span>
              <span v-else-if="wlan.decShowData.EncryptionType === 3">WPA_EAP</span>
              <span v-else-if="wlan.decShowData.EncryptionType === 4">IEEE8021X</span>
              <span v-else />
            </li>
          </ul>
          <p v-if="wlan.decShowData.Hold" class="title" @click="setWLANIPV4(wlan.decShowData.NetID)">
            设置
            <i class="el-icon-arrow-right"/>
          </p>
          <el-button v-if="wlan.decShowData.Status !== 7" @click="connectWLAN('on')" :loading="wlan.loading" type="primary">连接</el-button>
          <el-button v-else @click="connectWLAN('off')" type="primary">断开连接</el-button>
        </div>
        <div class="wlan-list model-select" v-show="wlan.decShow">
          <div class="tool">
            <i @click="()=>{wlan.wlanDecShow = !wlan.wlanDecShow;wlan.decShow=!wlan.decShow}" class="el-icon-arrow-left"/>
            WLAN设置
          </div>
          <div class="select">
            <span>安全</span>
          </div>
          <el-form  label-position="left" class="dec-form" ref="form" size="small" :model="wlan.decForm" label-width="40%">
            <el-form-item label="自动连接">
              <el-switch v-model="wlan.decForm.autoConnect">
              </el-switch>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="wlan.decForm.password" show-password/>
            </el-form-item>
          </el-form>
          <div class="select">
            <span>IPV4</span>
            <el-select v-model="wlan.decForm.autoDHCP" size="small" placeholder="请选择">
              <el-option label="静态" :value=false />
              <el-option label="DHCP" :value=true />
            </el-select>
          </div>
          <el-form v-show="!wlan.decForm.autoDHCP" label-position="left" class="dec-form" ref="form" size="small" :model="wlan.decForm" label-width="41%">
            <el-form-item label="IP">
              <el-input v-model="wlan.decForm.ipv4.address"/>
            </el-form-item>
            <el-form-item label="子网掩码">
              <el-input v-model="wlan.decForm.ipv4.netmask"/>
            </el-form-item>
            <el-form-item label="默认网关">
              <el-input v-model="wlan.decForm.ipv4.gateway"/>
            </el-form-item>
<!--            <el-form-item label="附加网关">-->
<!--              <el-input v-model="wlan.decForm.addGateWay"/>-->
<!--            </el-form-item>-->
            <el-form-item label="主DNS">
              <el-input v-model="wlan.decForm.primaryDNS"/>
            </el-form-item>
            <el-form-item label="子DNS">
              <el-input v-model="wlan.decForm.secondaryDNS"/>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="subWlanDec(wlan.decShowData.NetID)">提交</el-button>
        </div>
      </div>
      <div class="set-mobile" v-show="mobile.show">
        <div class="tool"><i @click="mobile.show = !mobile.show" class="el-icon-arrow-left"/>移动网络</div>
        <div class="wlan-list wlan-dec">
          <div class="status">
            连接状态
            <el-switch @change="changeMobileStatus"  v-model="mobile.decData.ConnectStatus"/>
          </div>
          <ul class="item-info">
            <li>
              <span class="name">SIM卡状态</span>
              <span v-if="mobile.decData.SIMStatus" class="connect">已连接</span>
              <span v-else>未连接</span>
            </li>
            <li>
              <span class="name">网口状态</span>
              <span v-if="mobile.decData.IsPlugin">已插入</span>
              <span v-else>未插入</span>
            </li>
            <li>
              <span class="name">GPRS网络状态</span>
              <span v-if="mobile.decData.GPRSStatus === 0">异常</span>
              <span v-else-if="mobile.decData.GPRSStatus === 1">正常</span>
              <span v-else />
            </li>
            <li>
              <span class="name">网络类型</span>
              <span v-if="mobile.decData.DataCap === 'LTE'">4G</span>
              <span v-else-if="mobile.decData.DataCap === 'UTM'">3G</span>
              <span v-else-if="mobile.decData.DataCap === 'UNKNOW'">未知</span>
              <span v-else />
            </li>
            <li>
              <span class="name">信号强度</span>
              <span v-if="mobile.decData.SignalStrength === 0">无信号</span>
              <span v-else-if="mobile.decData.SignalStrength === 1">差</span>
              <span v-else-if="mobile.decData.SignalStrength === 2">一般</span>
              <span v-else-if="mobile.decData.SignalStrength === 3">好</span>
              <span v-else-if="mobile.decData.SignalStrength === 4">非常好</span>
              <span v-else />
            </li>
            <li>
              <span class="name">IP</span>
              <span>{{mobile.decData.Address}}</span>
            </li>
            <li>
              <span class="name">子网掩码</span>
              <span>{{mobile.decData.Netmask}}</span>
            </li>
            <li>
              <span class="name">默认网关</span>
              <span>{{mobile.decData.Gateway}}</span>
            </li>
            <li>
              <span class="name">DNS</span>
              <div class="dns-list">
                <p v-for="(item,index) in mobile.decData.DNS" :key=index>{{item}}</p>
              </div>
            </li>
            <li>
              <span class="name">物理地址</span>
              <span>{{mobile.decData.MacAddress}}</span>
            </li>
          </ul>
<!--          <el-form ref="mobileForm" label-position='left' :model="mobile.msg" class="mobileForm" label-width="120px">-->
<!--            <el-form-item label="短信内容">-->
<!--              <el-input type="textarea" v-model="mobile.msg.Message"/>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="手机号码">-->
<!--              <el-input v-model="mobile.msg.PhoneNumber"/>-->
<!--            </el-form-item>-->
<!--            <el-button type="primary" @click="sendMsg">发送</el-button>-->
<!--          </el-form>-->
        </div>
      </div>
    </div>
</template>

<script>
import {
  mapState,
} from 'vuex';
import http from '../../../plugins/http/http';
import Titles from './Title.vue';
import { baseUtil } from '../../../util';
import {
  checkIP,
  checkNetmask,
} from '../../../element/rules';

const httpList = http.apiList;

export default {
  name: 'Net',
  data: function () {
    return {
      rules: {
        address: [{ validator: checkIP, trigger: 'blur' }],
        gateway: [{ validator: checkIP, trigger: 'blur' }],
        netmask: [{ validator: checkNetmask, trigger: 'blur' }],
        primaryDNS: [{ validator: checkIP, trigger: 'blur' }],
        secondaryDNS: [{ validator: checkIP, trigger: 'blur' }],
      },
      netList: {
        bus: false,
        eth: false,
      },
      bus: {
        busList: {
          'FF-BUS1': {
            id: 1,
            status: false,
          },
          'FF-BUS2': {
            id: 2,
            status: false,
          },
          'FF-BUS3': {
            id: 3,
            status: false,
          },
          'FF-BUS4': {
            id: 4,
            status: false,
          },
        },
        show: false,
        editBus: false,
        form: {
          bus_id: '',
          status: false,
          power_status: false,
          auto_upgrade: false,
          distance: '1',
        },
      },
      eth: {
        show: false,
        editEth: false,
        ethDecShow: true,
        data: {
          eth0: {
            ipv4: {
              address: '',
              netmask: '',
              gateway: '',
            },
            dns: [],
            status: '',
            isPlugin: '',
            macAddress: '',
            autoDHCP: '',
          },
          eth1: {
            ipv4: {
              address: '',
              netmask: '',
              gateway: '',
            },
            dns: [],
            status: '',
            isPlugin: '',
            macAddress: '',
            autoDHCP: '',
          },
        },
        showData: {
          name: '',
          paramName: '',
          ipv4: {
            address: '',
            netmask: '',
            gateway: '',
          },
          dns: [],
          status: '',
          isPlugin: '',
          macAddress: '',
          autoDHCP: '',
        },
        decForm: {
          autoDHCP: false,
          address: '',
          netmask: '',
          gateway: '',
          primaryDNS: '',
          secondaryDNS: '',
        },
      },
      wlan: {
        show: false,
        status: false,
        wlanList: [],
        wlanDecShow: false,
        activeName: '',
        decOpen: true,
        decShow: false,
        loading: false,
        decShowData: {
          AuthType: '',
          EncryptionType: '',
          Frequence: '',
          SingalStrength: '',
          SSID: '',
          active: '',
          Hold: '',
          BSSID: '',
          NetID: '',
        },
        decForm: {
          autoConnect: false,
          autoDHCP: true,
          password: '',
          primaryDNS: '',
          secondaryDNS: '',
          ssid: '',
          ipv4: {
            address: '',
            gateway: '',
            netmask: '',
          },
        },
      },
      mobile: {
        show: false,
        msg: {
          Message: '',
          PhoneNumber: '',
        },
        decData: {
          DNS: [],
          Address: '',
          GateWay: '',
          Netmask: '',
          MacAddress: '',
          IsPlugin: '',
          GPRSStatus: '',
          DataCap: '',
          SignalStrength: '',
          SIMStatus: '',
          ConnectStatus: '',
        },
      },
    };
  },
  computed: {
    ...mapState({
      wlanList: (state) => state.common.wlanList,
      wlanStatus: (state) => state.common.wlanStatus,
    }),
  },
  watch: {
    wlanStatus: function (value) {
      this.wlan.status = value;
    },
    wlanList: function (value) {
      const vm = this;
      baseUtil.each(value, (el) => {
        if (el.active) {
          vm.wlan.activeName = el.SSID;
        }
      });
    },
  },
  components: {
    Titles: Titles,
  },
  created() {
    const vm = this;
    vm.getEthData();
    vm.getMobileInfo();
    vm.wlan.status = vm.wlanStatus;
  },
  methods: {
    getEthData() {
      const eth = ['eth0', 'eth1'];
      const vm = this;
      baseUtil.each(eth, (el) => {
        http.api[httpList.GetConnectDetailed]({
          method: 'post',
          params: {
            Name: el,
          },
          success(response) {
            vm.eth.data[el] = { ...response };
          },
        });
      });
    },
    getEthIpv4(name) {
      const vm = this;
      http.api[httpList.GetIPV4Address]({
        method: 'post',
        params: {
          Name: name,
        },
        success(response) {
          http.api[httpList.GetDNSAddress]({
            method: 'post',
            params: {
              Name: name,
            },
            success(response2) {
              vm.eth.decForm = { ...response2, ...response };
            },
          });
        },
      });
    },
    showEthData(index) {
      const vm = this;
      vm.eth.showData = vm.eth.data[index];
      vm.eth.showData.name = index === 'eth0' ? 'ETH1' : 'ETH2';
      vm.eth.showData.paramName = index;
    },
    ethStatusChange(value) {
      const vm = this;
      http.api[httpList.SetStatus]({
        method: 'post',
        params: {
          Name: vm.eth.showData.paramName,
          Status: value,
        },
        success() {
          vm.$message({
            message: '状态修改成功',
            type: 'success',
          });
        },
        fail() {
          vm.eth.showData.status = !value;
        },
      });
    },
    ethDhcpChange() {
      const vm = this;
      const decp = vm.eth.decForm;
      http.api[httpList.SetIPV4Address]({
        method: 'post',
        params: {
          Name: vm.eth.showData.paramName,
          AutoDHCP: decp.autoDHCP,
          IP: decp.address,
          Netmask: decp.netmask,
          Gateway: decp.gateway,
        },
        success() {
          vm.$message({
            message: '修改成功',
            type: 'success',
          });
        },
      });
    },
    subEthDec() {
      const vm = this;
      const decp = vm.eth.decForm;
      console.log(decp);
      const ipv4Param = {
        Name: vm.eth.showData.paramName,
        AutoDHCP: decp.autoDHCP,
        IP: decp.address,
        Netmask: decp.netmask,
        Gateway: decp.gateway,
      };
      http.api[httpList.SetDNSAddress]({
        method: 'post',
        params: {
          Name: vm.eth.showData.paramName,
          Primary: decp.primaryDNS,
          Secondary: decp.secondaryDNS,
        },
      });
      // eslint-disable-next-line consistent-return
      vm.$refs.ethForm.validate((valid) => {
        if (valid) {
          http.api[httpList.SetIPV4Address]({
            method: 'post',
            params: ipv4Param,
            success() {
              vm.$message({
                message: '修改成功',
                type: 'success',
              });
            },
          });
        } else {
          return false;
        }
      });
    },
    getBusInfo(id) {
      const vm = this;
      http.api[httpList.GetBusConfigure]({
        method: 'post',
        params: {
          bus_id: id,
        },
        success(response) {
          vm.bus.form = response;
          vm.bus.form.id = id;
        },
      });
    },
    setBusInfo(action, type) {
      const vm = this;
      console.log(type, vm.bus.form);
      http.api[httpList[action]]({
        method: 'post',
        params: {
          bus_id: vm.bus.form.id,
          value: vm.bus.form[type],
        },
        success() {
          vm.$message({
            type: 'success',
            message: '修改成功',
          });
        },
      });
    },
    setWlanStatus(value) {
      const vm = this;
      let url = httpList.OpenWLAN;
      if (!value) {
        url = httpList.CloseWLAN;
      }
      http.api[url]({
        success() {
          vm.$store.dispatch('GET_WLANSTATUS');
          vm.$message({
            message: '修改成功',
            type: 'success',
          });
        },
      });
    },
    wlanInfo(info, index) {
      const vm = this;
      vm.wlan.wlanDecShow = true;
      vm.wlan.decShowData = { ...info };
      console.log(index);
    },
    connectWLAN(type) {
      const vm = this;
      const param = vm.wlan.decShowData;
      if (!param.Hold) {
        vm.$prompt('请输入密码', `连接无线网络  ${param.SSID}`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputType: 'password',
          inputPattern: /^\w{8,18}$/,
          inputErrorMessage: '请输入至少8位字符的密码',
        }).then(({ value }) => {
          http.api[httpList.AddNewHotpad]({
            method: 'post',
            params: {
              SSID: param.SSID,
              BSSID: param.BSSID,
              Password: value,
              EncryptionType: param.EncryptionType,
              Priority: 0,
            },
            success() {
              vm.$store.dispatch('GET_WLANSTATUS');
              vm.$store.dispatch('GET_WLANLIST');
              vm.$message({
                message: '连接成功',
                type: 'success',
              });
            },
          });
        }).catch(() => {});
        return;
      }
      let url = httpList.ConnectWLAN;
      let text = '连接成功';
      if (type === 'off') {
        url = httpList.DisconnectWLAN;
        text = '已断开连接';
      }
      http.api[url]({
        method: 'post',
        params: {
          NetID: param.NetID,
        },
        success() {
          vm.$store.dispatch('GET_WLANSTATUS');
          vm.$store.dispatch('GET_WLANLIST');
          vm.$message({
            message: text,
            type: 'success',
          });
        },
      });
      // console.log(type);
    },
    delWLAN() {
      const vm = this;
      http.api[httpList.RemoveAddedHotpad]({
        method: 'post',
        params: {
          NetID: vm.wlan.decShowData.NetID,
        },
        success() {
          vm.$store.dispatch('GET_WLANSTATUS');
          vm.$store.dispatch('GET_WLANLIST');
          vm.$message({
            message: '删除成功',
            type: 'success',
          });
        },
      });
    },
    setWLANIPV4(param) {
      const vm = this;
      // console.log(param);
      vm.wlan.wlanDecShow = !vm.wlan.wlanDecShow;
      vm.wlan.decShow = !vm.wlan.decShow;
      vm.wlan.decForm = {
        autoConnect: false,
        autoDHCP: true,
        password: '',
        primaryDNS: '',
        secondaryDNS: '',
        ssid: '',
        ipv4: {
          address: '',
          gateway: '',
          netmask: '',
        },
      };
      http.api[httpList.GetWLANConfigure]({
        method: 'post',
        params: {
          NetID: param,
        },
        success(response) {
          vm.wlan.decForm = { ...response };
        },
      });
    },
    subWlanDec(param) {
      const vm = this;
      http.api[httpList.SetWLANConfigure]({
        method: 'post',
        params: {
          NetID: param,
          value: vm.wlan.decForm,
        },
        success() {
          vm.$message({
            message: '修改成功',
            type: 'success',
          });
        },
      });
    },
    getMobileInfo() {
      const vm = this;
      http.api[httpList.getMobileInfo]({
        success(response) {
          vm.mobile.decData = { ...response };
          vm.mobile.decData.ConnectStatus = response.ConnectStatus !== 1;
          console.log(response);
        },
      });
    },
    changeMobileStatus(value) {
      const vm = this;
      http.api[httpList.dataOpen]({
        method: 'post',
        params: {
          enable: value,
        },
        success() {
          vm.$message({
            message: '修改成功',
            type: 'success',
          });
        },
      });
    },
    sendMsg() {
      const vm = this;
      http.api[httpList.sendMessage]({
        method: 'post',
        params: { ...vm.mobile.msg },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.net-set{
  .net-list{
    .net-item{
      // padding-top: 20px;
      li{
        transition: all .3s;
        cursor: pointer;
        padding-left: 20px;
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
                padding: 0 20px 0 10px;
                line-height: 48px;
                text-align: center;
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
            padding: 0 20px 0 10px;
            line-height: 53px;
            text-align: center;
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
    .del-user, .del-wlan{
      font-size: 16px;
      cursor: pointer;
      color: #C20000;
      float: right;
    }
  }
  .set-bus,.set-wlan,.set-eth,.set-mobile{
    .bus-dec,.wlan-list,.wlan-dec{
      .info-form{
        padding: 20px;
        .el-form-item{
          .el-form-item__content{
            text-align: right;
            .el-switch{
              float: right;
            }
          }
        }
      }
      .item-info{
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
          .un{
            color: #FF6700;
          }
          .el-select{
            float: right;
          }
        }
      }
      .mobileForm{
        padding: 0 28px;
        button{
          width: 100%;
          height: 40px;
          line-height: 40px;
          padding: 0;
        }
      }
    }
    .wlan-list,.wlan-dec{
      .status{
        padding:0 20px;
        margin-top: 10px;
        height: 50px;
        line-height: 50px;
        .el-switch{
          float: right;
          margin-top: 16px;
        }
      }
      .title{
        padding:0 20px;
        height: 50px;
        line-height: 50px;
        cursor: pointer;
        font-weight: 600;
        i{
          float: right;
          margin-top: 22px;
        }
      }
      .wlan-item{
        li{
          padding:10px 20px;
          min-height: 54px;
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
            right: 45px;
          }
            span{
              width: calc(100% - 95px);
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
      button{
        display: block;
        width: 90%;
        margin: 20px auto;
      }
    }
    .model-select{
      .select{
        margin: 15px 0;
        span{
          display: inline-block;
          height: 40px;
          line-height: 40px;
          text-indent: 20px;
          font-weight: 600;
        }
        .el-select{
          float: right;
          margin-right: 20px;
          margin-top: 4px;
        }
      }
      .dec-form{
        padding: 0 20px;
        .el-form-item{
          padding-left: 30px;
          .el-switch{
            float: right;
            margin-top: 6px;
          }
        }
        >button{
          width: 100%;
          height: 36px;
          line-height: 36px;
          padding: 0;
          margin-top: 20px;
        }
      }
      >button{
        width: 90%;
        height: 36px;
        display: block;
        margin: 0 auto;
        line-height: 36px;
        padding: 0;
        margin-top: 40px;
      }
    }
  }
  .set-eth,.set-mobile{
    .wlan-list{
      .title{
        cursor: pointer;
        font-weight: 600;
        i{
          float: right;
          margin-top: 22px;
        }
      }
      .item-info{
        li{
          height: auto;
          padding-left: 40px;
          min-height: 46px;
          overflow: hidden;
          .dns-list{
            float: right;
          }
        }
      }
    }
  }
  .set-mobile {
    .wlan-list {
      .item-info {
        li {
          padding-left: 20px;
        }
      }
    }
  }
}
</style>

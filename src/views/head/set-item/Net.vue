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
                  <li>
                    FF-BUS1
                    <i @click="bus.show = !bus.show" class="el-icon-arrow-right"/>
                    <span>已开启</span>
                  </li>
                  <li>FF-BUS2</li>
                  <li>FF-BUS3</li>
                  <li>FF-BUS4</li>
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
              4G
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
                <el-switch v-model="bus.form.status"/>
              </el-form-item>
              <el-form-item label="电源开关">
                <el-switch v-model="bus.form.open"/>
              </el-form-item>
              <el-form-item label="闲时节点自动升级">
                <el-switch v-model="bus.form.autoUpdate"/>
              </el-form-item>
              <el-form-item label="距离">
                <el-select v-model="bus.form.distance" placeholder="请选择距离">
                  <el-option label="100米" value="1"/>
                  <el-option label="500米" value="2"/>
                  <el-option label="1000米" value="3"/>
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
            <li v-for="item in wlanList" :key="item.BSSID" @click="wlanInfo(item)">
              <i class="el-icon-connection icon"/>
                <span :title="item.SSID">{{item.SSID}}</span>
                <br>
                <span v-if="item.active">已连接</span>
                <span v-if="item.hold&&!item.active">已保存</span>
              <i class="el-icon-lock icon"/>
              <i class="el-icon-arrow-right icon"/>
            </li>
          </ul>
        </div>
        <div class="wlan-list wlan-dec" v-show="wlan.wlanDecShow">
          <div class="tool"><i @click="wlan.wlanDecShow = false" class="el-icon-arrow-left"/>WLAN连接信息 <span v-if="wlan.decShowData.hold" @click="delWLAN" class="del-wlan">删除网络</span></div>
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
              <span v-if="wlan.decShowData.active" class="connect">已连接</span>
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
              <span v-if="wlan.decShowData.Frequence === 0">未知</span>
              <span v-else-if="wlan.decShowData.Frequence === 1">2.4G</span>
              <span v-else-if="wlan.decShowData.Frequence === 2">5G</span>
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
          <p v-if="wlan.decShowData.hold" class="title" @click="()=>{wlan.wlanDecShow = !wlan.wlanDecShow;wlan.decShow=!wlan.decShow}">
            设置
            <i class="el-icon-arrow-right"/>
          </p>
          <el-button v-if="!wlan.decShowData.active" @click="connectWLAN('on')" type="primary">连接</el-button>
          <el-button v-if="wlan.decShowData.active" @click="connectWLAN('off')" type="primary">断开连接</el-button>
        </div>
        <div class="wlan-list model-select" v-show="wlan.decShow">
          <div class="tool">
            <i @click="()=>{wlan.wlanDecShow = !wlan.wlanDecShow;wlan.decShow=!wlan.decShow}" class="el-icon-arrow-left"/>
            WLAN设置
          </div>
          <div class="select">
            <span>安全</span>
          </div>
          <el-form  label-position="left" class="dec-form" ref="form" size="small" :model="wlan.safeForm" label-width="40%">
            <el-form-item label="加密方式">
              <el-select v-model="wlan.safeForm.type" size="small" placeholder="请选择">
                <el-option label="WAP" value="1"/>
                <el-option label="DHCP" value="2"/>
              </el-select>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="wlan.safeForm.password" show-password/>
            </el-form-item>
          </el-form>
          <div class="select">
            <span>IPV4</span>
            <el-select v-model="wlan.model" size="small" placeholder="请选择">
              <el-option label="静态" value="1"/>
              <el-option label="DHCP" value="2"/>
            </el-select>
          </div>
          <el-form v-show="wlan.model === '1'" label-position="left" class="dec-form" ref="form" size="small" :model="wlan.decForm" label-width="41%">
            <el-form-item label="IP">
              <el-input v-model="wlan.decForm.ip"/>
            </el-form-item>
            <el-form-item label="子网掩码">
              <el-input v-model="wlan.decForm.mask"/>
            </el-form-item>
            <el-form-item label="默认网关">
              <el-input v-model="wlan.decForm.gateWay"/>
            </el-form-item>
            <el-form-item label="附加网关">
              <el-input v-model="wlan.decForm.addGateWay"/>
            </el-form-item>
            <el-form-item label="主DNS">
              <el-input v-model="wlan.decForm.dns"/>
            </el-form-item>
            <el-form-item label="子DNS">
              <el-input v-model="wlan.decForm.Subdns"/>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="subWlanDec">提交</el-button>
        </div>
      </div>
      <div class="set-mobile" v-show="mobile.show">
        <div class="tool"><i @click="mobile.show = !mobile.show" class="el-icon-arrow-left"/>4G</div>
        <div class="wlan-list wlan-dec">
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
              <span v-if="wlan.decShowData.active" class="connect">已连接</span>
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
              <span v-if="wlan.decShowData.Frequence === 0">未知</span>
              <span v-else-if="wlan.decShowData.Frequence === 1">2.4G</span>
              <span v-else-if="wlan.decShowData.Frequence === 2">5G</span>
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
          <p v-if="wlan.decShowData.hold" class="title" @click="()=>{wlan.wlanDecShow = !wlan.wlanDecShow;wlan.decShow=!wlan.decShow}">
            设置
            <i class="el-icon-arrow-right"/>
          </p>
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
        show: false,
        editBus: false,
        form: {
          status: false,
          open: false,
          autoUpdate: false,
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
        decShowData: {
          AuthType: '',
          EncryptionType: '',
          Frequence: '',
          SingalStrength: '',
          SSID: '',
          active: '',
          hold: '',
          BSSID: '',
          NetID: '',
        },
        decForm: {
          ip: '',
          mask: '',
          gateWay: '',
          addGateWay: '',
          dns: '',
          Subdns: '',
        },
        safeForm: {
          type: '1',
          password: '',
        },
      },
      mobile: {
        show: false,
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
    setWlanStatus(value) {
      const vm = this;
      let url = httpList.OpenWLAN;
      if (!value) {
        url = httpList.CloseWLAN;
      }
      http.api[url]({
        success() {
          vm.$store.dispatch('GET_WLANSTATUS');
        },
      });
    },
    wlanInfo(info) {
      const vm = this;
      vm.wlan.wlanDecShow = true;
      vm.wlan.decShowData = { ...info };
    },
    connectWLAN(type) {
      const vm = this;
      const param = vm.wlan.decShowData;
      if (!param.hold) {
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
            },
          });
        }).catch(() => {});
        return;
      }
      let url = httpList.ConnectWLAN;
      if (type === 'off') {
        url = httpList.DisconnectWLAN;
      }
      http.api[url]({
        method: 'post',
        params: {
          NetID: param.NetID,
        },
        success() {
          vm.$store.dispatch('GET_WLANSTATUS');
          vm.$store.dispatch('GET_WLANLIST');
        },
      });
      console.log(type);
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
        },
      });
    },
    subWlanDec() {
      console.log(this);
    },
    getMobileInfo() {
      // const vm = this;
      http.api[httpList.getMobileInfo]({
        success(response) {
          console.log(response);
        },
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
        // font-size: 16px;
      }
      .title{
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
  .set-eth{
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
}
</style>

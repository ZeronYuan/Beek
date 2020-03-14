<template>
  <section class="device">
    <div class="index">
      <div class="nav">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/ToPo' }">设备拓扑</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/ToPo' }">统计列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="nav-back"><i class="el-icon-arrow-left"></i> 统计列表</div>
      </div>
      <div class="main">
        <ul class="device-count">
          <li>
            <div class="icon"><i class="el-icon-coin"></i></div>
            <div class="num">
              <p>M1总数量</p>
              <p>{{ mNum }}台</p>
            </div>
          </li>
          <li>
            <div class="icon"><i class="el-icon-coin"></i></div>
            <div class="num">
              <p>M2总数量</p>
              <p>**</p>
            </div>
          </li>
          <li>
            <div class="icon"><i class="el-icon-coin"></i></div>
            <div class="num">
              <p>总监控项数量</p>
              <p>{{ itemCount }}个</p>
            </div>
          </li>
          <li>
            <div class="icon"><i class="el-icon-coin"></i></div>
            <div class="num">
              <p>设备总故障/设备总数量</p>
              <p>{{breakNum}}/{{totalNum}}</p>
            </div>
          </li>
        </ul>
        <div class="device-list">
          <div class="seach-form">
            <el-form ref="seachForm" :model="seachForm" label-position="left" label-width="82px" size="mini">
              <el-form-item label="设备名称：">
                <el-input v-model="seachForm.name" @change="seachName" />
              </el-form-item>
              <!--             <el-form-item label="物理接口：">-->
              <!--               <el-select v-model="seachForm.interface" placeholder="请选择接口">-->
              <!--                 <el-option label="1" value="shanghai"/>-->
              <!--                 <el-option label="2" value="beijing"/>-->
              <!--               </el-select>-->
              <!--             </el-form-item>-->
            </el-form>
          </div>
          <div class="handle">
            <el-button size="small" @click="openDevicePop(true)">添加设备</el-button>
          </div>
          <div class="total">共  {{total}}  条数据</div>
          <div class="table">
            <el-table
              :data="tableData"
              border
              :lazy="true"
              :height="tableHeight"
              @row-click="toLink"
              style="width: 100%">
              <el-table-column
                type="selection"
                align="center"
                width="46">
              </el-table-column>
              <el-table-column
                prop="id"
                label="设备ID"
                align="center"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="设备名称"
                align="center"
                width="180">
              </el-table-column>
              <el-table-column
                align="center"
                label="启用状态">
                <template slot-scope="scope">
                  <span class="open-status" v-if="scope.row.usage_status">已启用</span>
                  <span class="close-status" v-else>未启用</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="device_type"
                align="center"
                label="设备型号">
              </el-table-column>
              <el-table-column
                prop="position"
                align="center"
                label="接口位置">
                <template slot-scope="scope">
                  <span>{{ scope.row.position.tag }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="assert_number"
                align="center"
                label="资产编号">
              </el-table-column>
              <el-table-column
                align="center"
                label="同步状态">
                <template slot-scope="scope">
                  <span class="open-status" v-if="scope.row.sync_state">已同步</span>
                  <span class="close-status" v-else>未同步</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <div class="handle-row">
                    <span @click.stop="editDevice(scope.row)">编辑</span>
                    <span @click.stop="setCopyForm(scope.row),getReList(scope.row.id),dialogVisible = !dialogVisible">复制</span>
                    <el-popover
                      :key="scope.row.id"
                      placement="top"
                      width="160"
                      trigger="manual"
                      v-model="scope.row.tableDeleVis">
                      <p>确定删除吗？</p>
                      <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="scope.row.tableDeleVis = false">取消</el-button>
                        <el-button type="primary" size="mini" @click="deleteDevice(scope.row.id),scope.row.tableDeleVis = false">确定</el-button>
                      </div>
                      <span slot="reference" @click.stop="scope.row.tableDeleVis = true">删除</span>
                    </el-popover>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="page">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handlePageChange"
              :page-sizes="[20, 30, 40, 50, 100]"
              layout="prev, pager, next, sizes, jumper"
              :total=total>
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div class="pop">
      <el-drawer
        :title.sync="deviceInfoForm.title"
        custom-class="ff-drawer device-add-edit-device"
        :visible.sync="drawer"
        :wrapperClosable=true
        :modal=true
        size="450px"
        :append-to-body=true
        @closed="resetForm('device-info-form')"
        :direction="direction">
        <div class="info">
          <el-image
            style="width: 100%; height: 200px"
            :src= devicceImg
            fit="scale-down">
            <div slot="error" class="error-image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <el-form ref="device-info-form" label-width="120px" label-position="left" size="small" :model="deviceInfoForm">
            <el-form-item label="启用状态" prop="usage_status">
              <el-switch v-model="deviceInfoForm.usage_status"></el-switch>
            </el-form-item>
            <el-form-item label="设备名称" prop="name">
              <el-input v-model="deviceInfoForm.name" placeholder="填写设备名称"></el-input>
            </el-form-item>
            <el-divider></el-divider>
            <p class="form-title">基础信息</p>
            <el-form-item class="is-watch" label="资产编号" prop="assert_number">
              <el-input v-model="deviceInfoForm.assert_number" placeholder="填写资产编号"></el-input>
              <el-tooltip class="item" effect="dark" content="重点关注" placement="top-end">
                <div class="mark" @click="deviceInfoForm.is_watch = !deviceInfoForm.is_watch">
                  <i v-if="deviceInfoForm.is_watch" class="el-icon-star-on"></i>
                  <i v-else class="el-icon-star-off"></i>
                </div>
              </el-tooltip>
            </el-form-item>
            <el-form-item label="安装日期" prop="install_time">
                <el-date-picker type="date" placeholder="选择安装日期" v-model="deviceInfoForm.install_time" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="有效时间" prop="avaiable_time">
              <el-input v-model="deviceInfoForm.avaiable_time" placeholder="填写有效时间"></el-input>
            </el-form-item>
            <el-form-item v-if="deviceInfoForm.addEdit" label="接口位置" prop="interface_id">
              <el-select v-model="deviceInfoForm.interface_id" placeholder="选择接口位置" @change="changeDevicePosi">
                <el-option v-for="(item, key) in devicePosi" :key="key" :label="item.tag" :value="item.interface_id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="!deviceInfoForm.addEdit" label="接口位置" prop="position.tag">
              <el-input v-model="deviceInfoForm.position.tag" placeholder="" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="使用协议" prop="config_type">
              <el-select v-if="deviceInfoForm.addEdit" v-model="deviceInfoForm.config_type" placeholder="选择协议" @change="changeDeviceProtocol">
                <el-option v-for="(item, key) in deviceProtocolList" :key="key" :label="item" :value="item"></el-option>
              </el-select>
              <el-input v-if="!deviceInfoForm.addEdit" v-model="deviceInfoForm.config_type" placeholder="" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="设备型号" prop="res_id" v-if="deviceInfoForm.addEdit">
              <el-cascader
                placeholder="厂商/设备类型/设备型号"
                ref="casType"
                v-model="deviceInfoForm.res_id"
                :key="casKey"
                :options="deviceType"
                :clearable="true"
                @change="changeDeviceType"
                :props="{expandTrigger:'click', value:'id', label:'name', checkStrictly:true, emitPath:false}"></el-cascader>
            </el-form-item>
            <el-form-item label="设备型号" v-if="!deviceInfoForm.addEdit" prop="device_type">
              <el-input v-model="deviceInfoForm.device_type" placeholder="" :disabled="true"></el-input>
            </el-form-item>
            <el-divider></el-divider>
            <p class="form-title">配置</p>
            <el-form-item v-show="deviceInfoForm.addEdit" label="从机地址" prop="config_content.address">
              <el-select v-model="deviceInfoForm.config_content.address">
                <el-option v-for="(item, key) in 31" :key="key" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="!deviceInfoForm.addEdit" label="从机地址" prop="modbus_config.address">
              <el-select v-model="deviceInfoForm.modbus_config.address">
                <el-option v-for="(item, key) in 31" :key="key" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">提交</el-button>
              <el-button @click="resetForm('device-info-form')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-drawer>
      <el-dialog
        title="复制设备"
        custom-class="ff-dialog copy-device"
        :modal-append-to-body=false
        :visible.sync="dialogVisible"
        width="42%">
        <div class="main">
          <div class="info-form">
            <el-form ref="copy-device-form" :model="copyDeviceForm" label-width="120px" label-position="left" size="small">
              <el-form-item label="设备名称">
                <el-input :disabled="true" v-model="copyDeviceForm.name"></el-input>
              </el-form-item>
              <el-form-item :rules=rurleRequired prop="new_name" label="新设备名称">
                <el-input v-model="copyDeviceForm.new_name"></el-input>
              </el-form-item>
              <el-form-item label="设备型号">
                <el-input :disabled="true" v-model="copyDeviceForm.device_type"></el-input>
              </el-form-item>
              <el-form-item label="新设备名称" :style="'visibility:hidden'">
                <el-input v-model="copyDeviceForm.name"></el-input>
              </el-form-item>
              <el-form-item label="资产编号">
                <el-input :disabled="true" v-model="copyDeviceForm.assert_number"></el-input>
              </el-form-item>
              <el-form-item :rules=rurleRequired prop="new_assert_number" class="is-watch" label="资产编号">
                <el-input v-model="copyDeviceForm.new_assert_number"></el-input>
                <el-tooltip class="item" effect="dark" content="重点关注" placement="top-end">
                  <div class="mark" @click="copyDeviceForm.is_watch = !copyDeviceForm.is_watch">
                    <i v-if="copyDeviceForm.is_watch" class="el-icon-star-on"></i>
                    <i v-else class="el-icon-star-off"></i>
                  </div>
                </el-tooltip>
              </el-form-item>
            </el-form>
          </div>
          <div class="info-table">
            <el-table
              :border="true"
              height="260px"
              :data="copyDeviceTable"
              @selection-change="copySelect"
              style="width: 100%">
              <el-table-column
                type="selection"
                align="center"
                width="46">
              </el-table-column>
              <el-table-column
                type="index"
                label="序号"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="监控项类别"
                width="180">
              </el-table-column>
              <el-table-column
                label="内容">
                <template slot-scope="scope">
                  <el-checkbox style="pointer-events:none;cursor:not-allowed;" v-model="scope.row.selected_item">监控项</el-checkbox>
                  <el-checkbox v-model="scope.row.selected_alert">告警规则</el-checkbox>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="subCopyDevice">确 定</el-button>
      </span>
      </el-dialog>
    </div>
  </section>
</template>

<script>
import http from '../../plugins/http/http';
import baseUtil from '../../util/baseUtil';

const httpList = http.apiList;

export default {
  name: 'Device',
  data() {
    return {
      drawer: false,
      dialogVisible: false,
      direction: 'rtl',
      rurleRequired: [{ required: true, message: '不能为空' }],
      mNum: '***',
      breakNum: '***',
      totalNum: '***',
      itemCount: '***',
      total: 0,
      pageSize: 20,
      tableHeight: 0,
      seachForm: {
        name: '',
        interface: '',
      },
      tableData: [],
      deviceInfoForm: {
        addEdit: true, // 编辑false/添加true模式切换
        title: '添加设备', // 编辑/添加时的弹窗标题
        id: '',
        name: '',
        usage_status: false,
        is_watch: false,
        assert_number: '',
        break_time: '',
        install_time: '',
        avaiable_time: '',
        config_type: '',
        interface_id: '',
        res_id: '', // 设备类型
        run_state: 0,
        config_content: {
          address: '',
        },
        modbus_config: {
          address: '',
        },
        position: {
          bus_id: '',
          interface_id: '',
          slave_id: '',
          tag: '',
        },
        slave_id: '',
        desc: '',
        device_type: '', // 设备编辑时使用
      },
      devicceImg: '', // 设备图片
      devicePosi: [], // 接口位置
      deviceProtocolList: [], // 协议列表（从接口位置中动态获取）
      deviceType: [], // 设备类型（根据协议列表选中项，从接口动态获取）
      casKey: 0, // 解决cascader组件重新赋值报错的Bug
      copyDeviceForm: {
        name: '',
        new_name: '',
        assert_number: '',
        new_assert_number: '',
        is_watch: false,
      },
      copyId: '',
      copyDeviceTable: [],
      selectedCopyDeviceTable: [],
    };
  },
  created() {
    const vm = this;
    vm.getDeviceList();
    vm.getM();
    http.api[httpList.GetInterfacePositionInfoList]({ // 获取接口位置
      success(response) {
        vm.devicePosi = response;
      },
    });
  },
  mounted() {
    const vm = this;
    vm.$nextTick(() => {
      const tableBox = document.querySelector('.table');
      vm.tableHeight = getComputedStyle(tableBox).height.toString();
    });
  },
  methods: {
    toLink(row) {
      const vm = this;
      vm.$router.push({
        name: 'MonitorItems',
        query: {
          id: row.id,
          name: row.name,
        },
      });
    },
    getM() {
      const vm = this;
      http.api[httpList.GetM1CollectorNumber]({
        method: 'post',
        success(response) {
          vm.mNum = response;
        },
      });
      http.api[httpList.GetDeviceStatisticSpecify]({
        method: 'post',
        success(response) {
          // console.log(response);
          vm.totalNum = response.total_number;
          vm.breakNum = response.break_number;
        },
      });
      http.api[httpList.GetDeviceItemsCount]({
        method: 'post',
        success(response) {
          vm.itemCount = response;
        },
      });
    },
    getDeviceList() {
      const vm = this;
      http.api[httpList.GatewayViewGetDeviceList]({
        method: 'get',
        success(response) {
          vm.tableData = response;
        },
      });
    },
    seachName() {
    },
    // 数据表单操作
    handleCheckAllChange() {
    },
    handleCheckedTypeChange() {
    },
    handleSizeChange() {
    },
    handlePageChange() {
    },
    // 设备添加/编辑的操作
    resetForm(refName) {
      this.devicceImg = '';
      this.$refs[refName].resetFields();
    },
    openDevicePop(bool) {
      const vm = this;
      vm.drawer = true;
      vm.deviceInfoForm.addEdit = bool;
      vm.deviceInfoForm.title = '编辑设备';
      if (bool) {
        vm.deviceInfoForm.title = '添加设备';
      }
    },
    changeDevicePosi(val) {
      const vm = this;
      vm.deviceInfoForm.config_type = '';
      vm.deviceInfoForm.res_id = '';
      vm.devicceImg = '';
      vm.deviceType = [];
      ++vm.casKey;
      baseUtil.each(vm.devicePosi, (el) => {
        if (el.interface_id === val) {
          vm.deviceInfoForm.slave_id = el.slave_id;
          vm.deviceProtocolList = el.avaiable_protocol_list;
        }
      });
    },
    changeDeviceProtocol(val) {
      const vm = this;
      vm.deviceInfoForm.res_id = '';
      vm.devicceImg = '';
      http.api[httpList.checkResourceInfoByProtocol]({
        method: 'post',
        params: {
          protocol_type: val,
        },
        success(response) {
          let data = JSON.stringify(response);
          data = data.replace(/device_type/gmi, 'children').replace(/device_model/gmi, 'children');
          vm.deviceType = JSON.parse(data) || [];
          ++vm.casKey;
        },
      });
    },
    changeDeviceType() {
      const vm = this;
      vm.devicceImg = vm.$refs.casType.getCheckedNodes()[0].data.url;
    },
    onSubmit() { // 提交添加/编辑设备后的表单数据
      const vm = this;
      if (vm.deviceInfoForm.addEdit) {
        http.api[httpList.AddDevice]({
          method: 'post',
          params: vm.deviceInfoForm,
          success() {
            vm.$message({
              message: '添加成功',
              type: 'success',
            });
            vm.resetForm('device-info-form');
            vm.getDeviceList();
          },
        });
      } else {
        http.api[httpList.EditDeviceInfo]({
          method: 'post',
          params: vm.deviceInfoForm,
          success() {
            vm.$message({
              message: '编辑成功',
              type: 'success',
            });
            vm.getDeviceList();
          },
        });
      }
    },
    editDevice(data) { // 编辑设备时的数据回显
      const vm = this;
      const vmData = baseUtil.copy(data);
      vm.devicceImg = vmData.image_url;
      vm.openDevicePop(false);
      vm.$nextTick(() => {
        vm.deviceInfoForm = { ...vm.deviceInfoForm, ...vmData };
      });
    },
    deleteDevice(id) {
      const vm = this;
      http.api[httpList.DeleteDevice]({
        method: 'post',
        params: {
          id: id,
        },
        success() {
          vm.$message({
            message: '删除成功',
            type: 'success',
          });
          vm.getDeviceList();
        },
      });
    },
    // 复制设备
    getReList(id) {
      const vm = this;
      vm.copyId = id;
      http.api[httpList.GetResourceClassList]({
        method: 'post',
        params: {
          device_id: id,
        },
        success(response) {
          baseUtil.each(response, (el) => {
            el.selected_item = false;
            el.selected_alert = false;
            el.active = false;
          });
          vm.copyDeviceTable = response;
        },
      });
    },
    copySelect(val) {
      const vm = this;
      console.log(val);
      baseUtil.each(vm.copyDeviceTable, (ele) => {
        ele.selected_item = false;
        ele.active = false;
        baseUtil.each(val, (el) => {
          el.active = true;
          if (ele.id === el.id) {
            el.selected_item = true;
          }
        });
      });
    },
    setCopyForm(val) {
      const vm = this;
      const row = baseUtil.copy(val);
      vm.copyDeviceForm = { ...vm.copyDeviceForm, ...row };
    },
    subCopyDevice() {
      const vm = this;
      // vm.dialogVisible = false;
      vm.$refs['copy-device-form'].validate((valid) => {
        if (valid) {
          console.log(vm.copyDeviceForm, vm.copyDeviceTable);
          const class_item_content_list = [];
          baseUtil.each(vm.copyDeviceTable, (el) => {
            if (el.active) {
              el.resource_class_id = el.id;
              class_item_content_list.push(el);
            }
          });
          console.log(class_item_content_list);
          http.api[httpList.CloneDevice]({
            method: 'post',
            params: {
              device_id: vm.copyId,
              name: vm.copyDeviceForm.new_name,
              assert_number: vm.copyDeviceForm.assert_number,
              class_item_content_list,
            },
            success() {
              vm.$message({
                message: '复制成功',
                type: 'success',
              });
              vm.getDeviceList();
            },
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
  .device{
    background: #f0f0f0;
    height: 100%;
    .index{
      width: 100%;
      height: 100%;
      .nav{
        .el-breadcrumb{
          height: 40px;
          line-height: 40px;
        }
        .nav-back{
          height: 40px;
          line-height: 40px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          i{
            font-weight: 600;
            font-size: 16px;
          }
        }
        padding-left: 20px;
        width: 100%;
        font-size: 14px;
        text-align: left;
        background: #fff;
      }
      .main{
        width: calc(100% - 40px);
        margin: 0 20px;
        height: calc(100% - 100px);
        .device-count{
          height: 112px;
          background: #fff;
          margin: 20px 0;
          overflow: hidden;
          li{
            float: left;
            width: 25%;
            height: 100%;
            overflow: hidden;
            position: relative;
            cursor: pointer;
            .icon{
              width: 56px;
              height: 56px;
              text-align: center;
              line-height: 56px;
              background: #15d6ba;
              border-radius: 50%;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-150%,-50%);
              i{
                height: 56px;
                text-align: center;
                line-height: 56px;
                font-size: 36px;
                color: #fff;
              }
            }
            .num{
              color: #6C696F;
              width: 50%;
              float: right;
              text-align: left;
              margin-top: 25px;
              border-right: 1px solid #ccc;
              p:nth-child(2){
                font-size: 28px;
              }
            }
            &:last-child{
              .num{
                border: 0;
              }
            }
          }
        }
        .device-list{
          height: calc(100% - 152px);
          background: #fff;
          .handle{
            overflow: hidden;
            margin-top: 10px;
            padding: 0 20px;
            box-sizing: border-box;
            button{
              float: left;
              background: #108ee9;
              color: #f0f0f0;
              border-color: #108ee9;
            }
          }
          .seach-form{
            padding-top: 10px;
            padding-left: 25px;
            .el-form{
              overflow: hidden;
              .el-form-item{
                float: left;
                margin-bottom: 0;
                margin-right: 24px;
                .el-form-item__label{
                  padding-right: 0;
                  line-height: 30px;
                }
              }
            }
          }
          .total{
            margin: 10px 20px;
            height: 32px;
            text-indent: 32px;
            font-size: 14px;
            text-align: left;
            line-height: 32px;
            background: #E5F3FB;
            border: 1px solid rgb(212, 240, 252);
            border-radius: 4px;
            box-sizing: content-box;
            color: #6C696F;
          }
          .table{
            padding:0 20px;
            height: calc(100% - 200px);
            .el-table{
              //border-top: 1px solid #EBEBEB;
            }
          }
          .page{
            margin-top: 15px;
            padding:0 20px;
            .el-pagination{
              float: right;
              .el-pagination__sizes{
                margin-top: -3px;
              }
              .el-pagination__jump{
                margin-top: -1px;
                margin-left: 0;
              }
            }
          }
        }
      }
      .open-status,.close-status{
        color: #87D068;
        position: relative;
        &:before{
          content: '';
          position: absolute;
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #87D068;
          left: -10px;
          top: 7px;
        }
      }
      .close-status{
        color: #666;
        &:before{
          background: #999;
        }
      }
      .handle-row{
        span{
          color: rgb(16, 142, 233);
          cursor: pointer;
          padding:0 5px;
          border-right: 1px solid #ccc;
          &:last-child{
            border: 0;
          }
        }
      }
    }
  }
  .is-watch{
    >.el-form-item__content{
      .el-input{
        width: 85%;
      }
      .mark{
        float: right;
        transform: translate(-3px,5px);
        i{
          font-size: 22px;
          font-weight: 600;
          color: #108ee9;
        }
      }
    }
  }
  .device-add-edit-device{
    .el-drawer__body{
      padding: 0 20px;
      overflow-y: auto;
      >.info{
        // background: #4da7f5;
        .el-form{
          margin-top: 10px;
          .form-title{
            font-size: 14px;
            margin-bottom: 20px;
          }
          .el-form-item__content{
            .el-select,.el-cascader{
              width: 100%;
            }
          }
        }
      }
    }
  }
  .copy-device{
    .el-dialog__body{
      padding: 10px;
      .main{
        .info-form{
          height: 160px;
          .el-form{
            padding: 0 20px;
            &:after{
              content: '';
              width: 1px;
              height: 1px;
              clear: both;
              display: block;
            }
            .el-form-item{
              width: 45%;
              float: left;
              &:nth-child(even){
                margin-left: 10%;
              }
            }
          }
        }
        .info-table{
          padding: 0 10px;
        }
      }
    }
  }
  .error-image-slot{
    height: 100%;
    background: #eee;
    line-height: 222px;
    text-align: center;
    i{
      font-size: 40px;
      color: #6C696F;
    }
  }
</style>

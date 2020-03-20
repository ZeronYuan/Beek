<template>
  <div class="monitor-items">
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/ToPo' }">设备部署</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/Device' }">统计列表</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/Device' }">属性列表</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="nav-back"><router-link to="Device"><i class="el-icon-arrow-left"></i> {{ $route.query.name }}</router-link></div>
    </div>
    <div class="main">
      <div class="seach-form">
        <el-form ref="seachForm" :model="seachForm" label-position="left" label-width="82px" size="mini">
<!--          <el-form-item label="设备名称：">-->
<!--            <el-input v-model="seachForm.name" @change="seachName" />-->
<!--          </el-form-item>-->
             <el-form-item label="类别：">
               <el-select multiple
                          collapse-tags
                          @change=chooseOption
                          v-model="seachForm.resource_class_march_id_list"
                          placeholder="请选择类别">
                 <el-option v-for="(item, key) in categoryList" :label="item.name" :value="item.id" :key="key"/>
               </el-select>
             </el-form-item>
        </el-form>
      </div>
      <div class="handle">
        <el-button size="small" @click="addItemDialog(),addItemdialogVisible = true">添加监控项</el-button>
      </div>
      <div class="total">共  {{total}}  条数据</div>
      <div class="table">
        <el-table
          :data="tableData"
          border
          :lazy="true"
          :height="tableHeight"
          style="width: 100%">
          <el-table-column
            label="名称"
            prop="name"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="resource_class_name"
            label="类别"
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
            align="center"
            label="同步状态">
            <template slot-scope="scope">
              <span class="open-status" v-if="scope.row.sync_state">已启用</span>
              <span class="close-status" v-else>未启用</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="description"
            align="center"
            label="描述">
          </el-table-column>
          <el-table-column
            prop="last_value"
            align="center"
            label="当前值">
          </el-table-column>
          <el-table-column
            prop="unit"
            align="center"
            label="单位">
          </el-table-column>
          <el-table-column
            prop="last_timestamp"
            align="center"
            label="最近采集时间">
          </el-table-column>
          <el-table-column
            prop="unit"
            align="center"
            label="存储周期">
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <div class="handle-row">
                <span @click.stop="setItemForm(scope.row),editDrawerVisible = true">编辑</span>
                <span>查看</span>
                <el-popover
                  :key="scope.row.id"
                  placement="top"
                  width="160"
                  trigger="manual"
                  v-model="scope.row.tableDeleVis">
                  <p>确定删除吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="scope.row.tableDeleVis = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="deleteItem(scope.row.id),scope.row.tableDeleVis = false">确定</el-button>
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
    <div class="monitor-items-pop">
      <el-drawer
        :title.sync="itemInfoForm.title"
        custom-class="ff-drawer edit-item-drawer"
        :visible.sync="editDrawerVisible"
        :wrapperClosable=true
        :modal=true
        size="450px"
        :append-to-body=true
        :direction="direction">
        <div class="info">
          <el-form ref="item-info-form" label-width="120px" label-position="left" size="small" :model="itemInfoForm">
            <el-form-item label="监控项" prop="name">
              <el-input :disabled="true" v-model="itemInfoForm.name"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="usage_status">
              <el-switch v-model="itemInfoForm.usage_status"></el-switch>
            </el-form-item>
            <el-form-item label="描述" prop="description">
              <el-input type="textarea" v-model="itemInfoForm.description"></el-input>
            </el-form-item>
            <el-form-item class="handl">
              <el-button type="primary" @click="onSubmit">提交</el-button>
              <el-button @click="resetForm('item-info-form')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-drawer>
      <el-dialog
        title="添加监控项"
        custom-class="ff-dialog add-item-dialog"
        :modal-append-to-body=false
        :visible.sync="addItemdialogVisible"
        width="49%">
        <div class="main">
          <ul class="classify-list">
            <li @click="filterOpt(allMarchId)">全部类别<span>{{actOptSum}}</span></li>
            <li v-for="(item, key) in categoryList" :key="key" @click="filterOpt([{id: item.id}])">{{ item.name }}<span>{{item.act_num}}</span></li>
          </ul>
          <div class="table-area">
            <el-table
              :data="curOptList"
              border
              ref="add-ops-table"
              :lazy="true"
              :height="450"
              @select-all="selectOptTable"
              @select="selectOptTable"
              style="width: 100%">
              <el-table-column
                type="selection"
                align="center"
                width="48.3">
              </el-table-column>
              <el-table-column
                type="index"
                label="序号"
                align="center"
                width="50">
              </el-table-column>
              <el-table-column
                label="名称"
                prop="name"
                align="center"
                width="180">
              </el-table-column>
              <el-table-column
                align="center"
                width="80"
                label="状态">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.use_status">打开</el-checkbox>
                </template>
              </el-table-column>
              <el-table-column
                prop="description"
                align="center"
                label="描述">
              </el-table-column>
              <el-table-column
                align="center"
                label="备注">
                <template slot-scope="scope">
                  <el-input size="mini" v-model="scope.row.description" placeholder="可编辑"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="addItemdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="subAddItem">确 定</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import http from '../../plugins/http/http';
import baseUtil from '../../util/baseUtil';

const httpList = http.apiList;

export default {
  name: 'MonitorItems',
  data() {
    return {
      deviceId: Number(this.$route.query.id), // 地址栏device_id参数
      categoryList: [], // 类别
      allMarchId: [], // 所有类别的ID
      editDrawerVisible: false,
      direction: 'rtl',
      addItemdialogVisible: false,
      total: 0,
      tableData: [], // 监控项列表
      pageSize: 20,
      tableHeight: 0,
      seachForm: {
        name: '',
        resource_class_march_id_list: [],
      },
      itemInfoForm: {
        title: '编辑监控项',
        id: '',
        name: '',
        description: '',
        usage_status: false,
      },
      allOptList: [], // 全部可添加监控项
      curOptList: [], // 当前可添加监控项列表
      actOptSum: 0,
    };
  },
  created() {
    const vm = this;
    vm.getCategoryList();
  },
  mounted() {
    const vm = this;
    setTimeout(() => {
      const tableBox = document.querySelector('.table');
      vm.tableHeight = getComputedStyle(tableBox).height.toString();
    });
  },
  methods: {
    resetForm(refName) {
      this.$refs[refName].resetFields();
    },
    getCategoryList() {
      const vm = this;
      http.api[httpList.GetResourceClassList]({
        method: 'post',
        params: {
          device_id: vm.deviceId,
        },
        success(response) {
          baseUtil.each(response, (el) => {
            vm.seachForm.resource_class_march_id_list.push(el.id);
            vm.allMarchId.push({
              id: el.id,
            });
          });
          vm.categoryList = response;
          vm.getItemList();
        },
      });
    },
    getItemList(index = 1, size = 20) {
      const vm = this;
      http.api[httpList.GetMonitorItemList]({
        method: 'post',
        params: {
          device_id: vm.deviceId,
          resource_class_march_id_list: vm.seachForm.resource_class_march_id_list,
          page_index: index,
          page_size: size,
        },
        success(response) {
          vm.total = response.length;
          vm.tableData = response;
        },
      });
    },
    handleSizeChange(val) {
      const vm = this;
      vm.pageSize = val;
      vm.getItemList(0, val);
    },
    handlePageChange(val) {
      const vm = this;
      vm.getItemList(val, vm.pageSize);
    },
    chooseOption() { // 类别切换重新请求监控项列表
      const vm = this;
      vm.getItemList();
    },
    // 添加/编辑监控项
    setItemForm(obj) {
      const vm = this;
      vm.$nextTick(() => {
        vm.itemInfoForm = { ...vm.itemInfoForm, ...obj };
        vm.itemInfoForm.usage_status = !!obj.usage_status;
      });
    },
    onSubmit() {
      const vm = this;
      http.api[httpList.EditMonitorItemList]({
        method: 'post',
        params: {
          ...vm.itemInfoForm,
        },
        success() {
          vm.$message({
            type: 'success',
            message: '修改成功',
          });
          vm.getItemList(1, 20);
        },
      });
    },
    deleteItem(id) {
      const vm = this;
      http.api[httpList.DeleteMonitorItemList]({
        method: 'post',
        params: {
          id: id,
        },
        success() {
          vm.$message({
            type: 'success',
            message: '删除成功',
          });
          vm.getItemList(1, 20);
        },
      });
    },
    addItemDialog() {
      const vm = this;
      http.api[httpList.GetAvailableMonitorItemList]({
        method: 'post',
        params: {
          device_id: vm.deviceId,
          resource_class_march_list: vm.allMarchId,
        },
        success(response) {
          vm.allOptList = response;
          vm.filterOpt(vm.allMarchId);
          vm.selectOptTable([]);
        },
      });
    },
    selectOptTable(seletion) { // 可添加监控项列表选中操作
      const vm = this;
      baseUtil.each(vm.curOptList, (el) => {
        el.active = 0;
      });
      baseUtil.each(seletion, (el) => {
        el.active = 1;
      });
      vm.actOptSum = 0;
      baseUtil.each(vm.allOptList, (el) => {
        baseUtil.each(vm.categoryList, (ele) => {
          if (el.id === ele.id) {
            ele.act_num = 0;
            baseUtil.each(el.item_list, (cl) => {
              ele.act_num += cl.active;
              vm.actOptSum += ele.act_num;
            });
          }
        });
      });
    },
    filterOpt(idList) { // 根据类别过滤可添加监控项列表
      const vm = this;
      const cur = [];
      baseUtil.each(vm.categoryList, (el) => {
        if (!('act_num' in el)) {
          vm.$set(el, 'act_num', 0);
        }
      });
      baseUtil.each(idList, (el) => {
        baseUtil.each(vm.allOptList, (ele) => {
          if (el.id === ele.id) {
            baseUtil.each(ele.item_list, (eles) => {
              if (!('active' in eles)) {
                vm.$set(eles, 'use_status', false);
                vm.$set(eles, 'active', 0);
                vm.$set(eles, 'note', '');
              }
              cur.push(eles);
            });
          }
        });
      });
      vm.curOptList = cur;
      vm.$nextTick(() => {
        baseUtil.each(vm.curOptList, (el) => {
          if (el.active) {
            vm.$refs['add-ops-table'].toggleRowSelection(el, true);
          }
        });
      });
    },
    subAddItem() {
      const vm = this;
      const param = [];
      baseUtil.each(vm.allOptList, (el) => {
        baseUtil.each(el.item_list, (val) => {
          if (val.active) {
            param.push({
              ...val,
              device_id: vm.deviceId,
            });
          }
        });
      });
      http.api[httpList.AddMonitorItemList]({
        method: 'post',
        params: {
          add_items: param,
        },
        success() {
          vm.$message({
            type: 'success',
            message: '添加成功',
          });
          vm.getItemList(1, 20);
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .monitor-items{
    height: 100%;
    background: #f0f0f0;
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
      background: #fff;
      margin: 20px;
      height: calc(100% - 120px);
      .seach-form{
        padding-left: 25px;
        padding-top: 10px;
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
    & /deep/ .add-item-dialog{
      .el-dialog__body{
        padding: 0 20px;
        overflow-y: auto;
        .main{
          margin: 0;
          margin-bottom: 10px;
          overflow: hidden;
          .classify-list{
            float: left;
            height: 450px;
            width: 20%;
            border: 1px solid #eee;
            border-right: 0;
            overflow-y: auto;
            >li{
              height: 48.3px;
              line-height: 48.3px;
              color: #333;
              border-bottom: 1px solid #eee;
              cursor: pointer;
              position: relative;
              >span{
                display: block;
                margin-left: 10px;
                color: #fff;
                height: 22px;
                line-height: 22px;
                padding: 0 6px;
                background: #F88311;
                border-radius: 24px;
                position: absolute;
                right: 15px;
                top: 50%;
                transform: translateY(-11px);
              }
            }
            .active{
              background: #F88311;
            }
          }
          .table-area{
            float: left;
            width: 80%;
          }
        }
      }
    }
  }
  /deep/ .edit-item-drawer{
    .el-drawer__body{
      padding: 0 20px;
      overflow-y: auto;
      >.info{
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
</style>

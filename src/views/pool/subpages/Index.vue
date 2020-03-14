<template>
  <div class="pool-inner">
    <div class="type-list">
      <span class="title">协议类型：</span>
      <el-checkbox size="mini" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" border>全选</el-checkbox>
      <el-checkbox-group size="mini" v-model="checkedTypes" @change="handleCheckedTypeChange">
        <el-checkbox v-for="item in types" :label="item" :key="item" border>{{item}}</el-checkbox>
      </el-checkbox-group>
    </div>
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
          label="名称"
          align="center"
          width="180">
          <template slot-scope="scope">
              <el-popover
                placement="top-start"
                trigger="hover">
                <img style="width: 100%;max-width:500px;display: block" :src=scope.row.image_url alt="暂无图片">
                <el-image
                  slot="reference"
                  style="width: 40px; height: 40px;float: left;margin-left: 10px;"
                  :src=scope.row.image_url
                  fit="contain">
                  <div slot="error" style="display: inline-block;height: 40px;line-height: 40px;">
                    <i class="el-icon-picture-outline" style="font-size: 30px;margin-top: 5px"/>
                  </div>
                </el-image>
              </el-popover>
            <span style="display: inline-block;height: 40px;line-height: 40px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="简述"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="manufacturer"
          align="center"
          label="厂商">
        </el-table-column>
        <el-table-column
          prop="device_type"
          align="center"
          label="设备类型">
        </el-table-column>
        <el-table-column
          prop="protocol_type"
          align="center"
          label="协议类型">
        </el-table-column>
        <el-table-column
          prop="version"
          align="center"
          label="版本">
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
</template>

<script>
import http from '../../../plugins/http/http';

const httpList = http.apiList;
const typeOptions = ['modbus', 'i2c', 'ai', 'di', 'io-link', 'snmp', 'opc_ua'];

export default {
  name: 'Index',
  data() {
    return {
      total: 0,
      checkAll: false,
      pageSize: 20,
      checkedTypes: ['modbus'],
      types: typeOptions,
      isIndeterminate: true,
      tableHeight: 0,
      seachForm: {
        name: '',
        interface: '',
      },
      tableData: [],
    };
  },
  created() {
    // const vm = this;
  },
  mounted() {
    const vm = this;
    setTimeout(() => {
      const tableBox = document.querySelector('.table');
      vm.tableHeight = getComputedStyle(tableBox).height.toString();
      vm.getPoolData();
    });
  },
  methods: {
    getPoolData(type = 'modbus', name = '', index = 0, size = 20) {
      const vm = this;
      http.api[httpList.getDeviceList]({
        method: 'post',
        params: {
          protocol_type: type,
          name_march: name,
          page_index: index,
          page_size: size,
        },
        success(response) {
          vm.total = response.count;
          vm.tableData = response.list;
        },
      });
    },
    handleCheckAllChange(val) {
      const vm = this;
      vm.checkedTypes = val ? typeOptions : [];
      vm.isIndeterminate = false;
    },
    handleCheckedTypeChange(val) {
      const vm = this;
      const checkedCount = val.length;
      vm.checkAll = checkedCount === vm.types.length;
      vm.isIndeterminate = checkedCount > 0 && checkedCount < vm.types.length;
    },
    handleSizeChange(val) {
      const vm = this;
      vm.pageSize = val;
      vm.getPoolData(...vm.checkedTypes, vm.seachForm.name, 0, val);
    },
    handlePageChange(val) {
      const vm = this;
      vm.getPoolData(...vm.checkedTypes, vm.seachForm.name, val, vm.pageSize);
    },
    seachName(val) {
      const vm = this;
      vm.getPoolData(...vm.checkedTypes, val);
    },
    toLink(row) {
      console.log(row);
      const vm = this;
      vm.$router.push({
        name: 'PoolItemInfo',
        query: {
          id: row.id,
          name: row.name,
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.pool-inner{
  // width: 100%;
  height: calc(100% - 40px);
  background: #fff;
  margin: 20px;
  .type-list{
    padding:15px 20px;
    overflow: hidden;
    .title{
      float: left;
      width: 82px;
      height: 28px;
      line-height: 28px;
      margin-right: 5px;
    }
    label{
      float: left;
      margin-right: 10px;
    }
    .el-checkbox-group{
      float: left;
      label{
        margin-left: 0;
        margin-right: 10px;
      }
    }
  }
  .seach-form{
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
    height: calc(100% - 195px);
    .el-table{
    //border-top: 1px solid #EBEBEB;
    }
  }
  .page{
    margin-top: 10px;
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
</style>

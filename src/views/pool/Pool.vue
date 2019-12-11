<template>
  <section id="pool">
   <div class="index">
     <div class="nav">
       <el-breadcrumb separator="/">
         <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item :to="{ path: '/Pool' }">资源库</el-breadcrumb-item>
       </el-breadcrumb>
     </div>
     <div class="main">
       <div class="inner">
         <div class="type-list">
            <span class="title">协议类型：</span>
            <el-checkbox size="mini" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" border>全选</el-checkbox>
            <el-checkbox-group size="mini" v-model="checkedTypes" @change="handleCheckedTypeChange">
              <el-checkbox v-for="item in types" :label="item" :key="item" border>{{item}}</el-checkbox>
            </el-checkbox-group>
         </div>
         <div class="seach-form">
           <el-form ref="seachForm" :model="seachForm" label-width="82px" size="mini">
             <el-form-item label="设备名称：">
               <el-input v-model="seachForm.name"/>
             </el-form-item>
             <el-form-item label="物理接口：">
               <el-select v-model="seachForm.interface" placeholder="请选择接口">
                 <el-option label="1" value="shanghai"/>
                 <el-option label="2" value="beijing"/>
               </el-select>
             </el-form-item>
           </el-form>
         </div>
         <div class="table">
           <el-table
             :data="tableData"
             border
             height="620"
             style="width: 100%">
             <el-table-column
               prop="date"
               type="selection"
               align="center"
               width="50">
             </el-table-column>
             <el-table-column
               prop="date"
               label="日期"
               align="center"
               width="180">
             </el-table-column>
             <el-table-column
               prop="name"
               label="姓名"
               align="center"
               width="180">
             </el-table-column>
             <el-table-column
               prop="address"
               align="center"
               label="地址">
             </el-table-column>
           </el-table>
         </div>
         <div class="page">
           <el-pagination
             background
             layout="prev, pager, next"
             :total="1000">
           </el-pagination>
         </div>
       </div>
     </div>
   </div>
  </section>
</template>

<script>
const typeOptions = ['Modbus', 'I2C', 'AI', 'DI'];
export default {
  name: 'Pool',
  data() {
    return {
      checkAll: false,
      checkedTypes: ['Modbus'],
      types: typeOptions,
      isIndeterminate: true,
      seachForm: {
        name: '',
        interface: '',
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      }],
    };
  },
  methods: {
    handleCheckAllChange(val) {
      const vm = this;
      vm.checkedTypes = val ? typeOptions : [];
      vm.isIndeterminate = false;
    },
    handleCheckedTypeChange(value) {
      const vm = this;
      const checkedCount = value.length;
      vm.checkAll = checkedCount === vm.types.length;
      vm.isIndeterminate = checkedCount > 0 && checkedCount < vm.types.length;
    },
  },
};
</script>

<style scoped lang="scss">
#pool{
  background: #f3f3f3;
  height: 100%;
  .index{
    width: 100%;
    height: 100%;
    .nav{
      .el-breadcrumb{
        height: 40px;
        line-height: 40px;
      }
      padding-left: 20px;
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      text-align: left;
      background: #fff;
    }
    .main{
      padding:0 20px;
      padding-top: 60px;
      height: 100%;
      width: 100%;
      margin-top: -40px;
      .inner{
        width: 100%;
        height: 100%;
        background: #fff;
        .type-list{
          padding:15px 20px;
          overflow: hidden;
          .title{
            float: left;
            width: 82px;
            height: 28px;
            line-height: 28px;
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
          .el-form{overflow: hidden;
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
        .table{
          padding:0 20px;
          margin-top: 20px;
          .el-table{
            //border-top: 1px solid #EBEBEB;
          }
        }
        .page{
          margin-top: 20px;
          padding-left: 10px;
          .el-pagination{
            float: left;
          }
        }
      }
    }
  }
}
</style>

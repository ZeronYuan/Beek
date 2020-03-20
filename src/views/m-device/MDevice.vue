<template>
  <section class="MDevice">
   <div class="index">
     <div class="nav">
       <el-breadcrumb separator="/">
         <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item :to="{ path: '/ToPo' }">设备部署</el-breadcrumb-item>
         <el-breadcrumb-item v-for="(item, index) in navList" :key="index" :to="{ path: item.path }">{{item.title}}</el-breadcrumb-item>
       </el-breadcrumb>
     </div>
     <div class="main">
       <div class="pool-attr-info-inner">
         <div class="back">
           <i class="icon el-icon-arrow-left"/>
           <router-link :to="'/ToPo'">设备{{$route.query.name}}</router-link>
         </div>
         <el-tabs class="tag" v-model="activeName" @tab-click="tagChange">
           <el-tab-pane label="列表模式" name="attrItem">
             <div class="attr-info">
               <div class="seach-form">
                 <el-form ref="seachForm" :model="seachForm" label-position="left" label-width="62px" size="mini">
                   <el-form-item label="类别：">
                     <el-select
                       v-model="attrItem.activeOption"
                       multiple
                       collapse-tags
                       @visible-change=chooseOption
                       placeholder="请选择类别">
                       <el-option
                         v-for="item in options"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
                       </el-option>
                     </el-select>
                   </el-form-item>
                 </el-form>
               </div>
               <div class="total">共  {{total}}  条数据</div>
               <div class="table">
                 <el-table
                   :data="attrItem.tableData"
                   border
                   :lazy="true"
                   :height="tableHeight"
                   style="width: 100%">
                   <el-table-column
                     label="监控项"
                     prop="name"
                     align="center"
                     width="180">
                   </el-table-column>
                   <el-table-column
                     prop="meta_type"
                     label="类别"
                     align="center"
                     width="180">
                   </el-table-column>
                   <el-table-column
                     prop="descrition"
                     align="center"
                     label="描述">
                   </el-table-column>
                   <el-table-column
                     prop="value"
                     align="center"
                     label="值">
                   </el-table-column>
                   <el-table-column
                     prop="unit"
                     align="center"
                     label="单位">
                   </el-table-column>
                   <el-table-column
                     prop="data_type"
                     align="center"
                     label="数据类型">
                     <template slot-scope="scope">
                       <span v-if="scope.data_type === 0">布尔</span>
                       <span v-else-if="scope.data_type === 1">整型</span>
                       <span v-else-if="scope.data_type === 2">浮点型</span>
                       <span v-else-if="scope.data_type === 3">字符型</span>
                       <span v-else-if="scope.data_type === 4">音频</span>
                       <span v-else-if="scope.data_type === 5">视频</span>
                     </template>
                   </el-table-column>
                   <el-table-column
                     prop="alert_temp_num"
                     align="center"
                     label="告警模板数量">
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
           </el-tab-pane>
           <el-tab-pane label="展示模式" name="controlItem">
             <div class="control-info"></div>
           </el-tab-pane>
         </el-tabs>
       </div>
     </div>
   </div>
  </section>
</template>

<script>
import baseUtil from '../../util/baseUtil';
import http from '../../plugins/http/http';

const httpList = http.apiList;

export default {
  name: 'MDevice',
  data() {
    return {
      navList: [],
      activeName: 'attrItem',
      tableHeight: 0,
      options: [],
      attrItem: {
        activeOption: [],
        tableData: [],
      },
      controlItem: {},
      total: 0,
      pageSize: 20,
      seachForm: {
        name: '',
        interface: '',
      },
      tableData: [],
    };
  },
  watch: {
    $route(to, from) {
      const vm = this;
      console.log(to, from);
      baseUtil.each(vm.navList, (el, index) => {
        if (el.path === to.path) {
          vm.navList.splice(index, 1);
        }
      });
      vm.navList.push({
        path: to.path,
        title: to.meta.title,
      });
      console.log(vm.navList);
    },
  },
  created() {
    const vm = this;
    vm.navList.push({
      path: vm.$route.path,
      title: vm.$route.meta.title,
    });
    console.log(vm.navList);
    http.api[httpList.getClassList]({
      method: 'post',
      params: {
        res_id: vm.$route.query.id,
      },
      success(response) {
        vm.options = response;
        const active = [];
        baseUtil.each(response, (el) => {
          active.push(el.id);
        });
        vm.attrItem.activeOption = active;
        vm.getAttrData();
      },
    });
  },
  mounted() {
    const vm = this;
    setTimeout(() => {
      const tableBox = document.querySelector('.table');
      vm.tableHeight = getComputedStyle(tableBox).height.toString();
    });
  },
  methods: {
    getAttrData() {
      const vm = this;
      http.api[httpList.getPropertyList]({
        method: 'post',
        params: {
          class_id_list: vm.attrItem.activeOption,
        },
        success(response) {
          vm.total = response.length;
          vm.attrItem.tableData = response;
        },
      });
    },
    seachName(val) {
      const vm = this;
      vm.getPoolData(...vm.checkedTypes, val);
    },
    tagChange(tab, event) {
      console.log(tab, event);
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
    chooseOption(bool) {
      const vm = this;
      if (!bool) {
        vm.getAttrData();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.MDevice{
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
      padding-left: 20px;
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      text-align: left;
      background: #fff;
    }
    .main{
      width: 100%;
      height: calc(100% - 40px);
    }
  }
}
/deep/.pool-attr-info-inner{
  width: 100%;
  height: 100%;
  background: #fff;
  .back{
    padding-left: 18px;
    text-align: left;
    font-weight: 800;
    font-size: 16px;
    margin-bottom: 15px;
    .icon{
      font-weight: 800;
      font-size: 16px;
      margin-right: 10px;
    }
    &:hover{
      .icon,a{
        color: #F88311;
      }
    }
  }
  .tag{
    height: calc(100% - 40px);
    .el-tabs__header{
      margin-bottom: 0;
      .el-tabs__nav-wrap{
        &:after{
          display: none;
        }
        .el-tabs__nav-scroll{
          .el-tabs__nav{
            .el-tabs__item{
              padding: 0 20px;
            }
          }
        }
      }
    }
    .el-tabs__content{
      height: calc(100% - 40px);
      background: #f0f0f0;
      .el-tab-pane{
        height: 100%;
        position: relative;
        .attr-info,.control-info{
          padding:15px 20px;
          position: absolute;
          top: 20px;
          left: 20px;
          right: 20px;
          bottom: 20px;
          margin: 0 auto;
          background: #fff;
          z-index: 1;
        }
      }
    }
  }
  .seach-form{
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
    margin: 10px 0;
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
    height: calc(100% - 125px);
  }
  .page{
    margin-top: 10px;
    .el-pagination{
      float: right;
      .el-pagination__sizes{
        margin-top: -2px;
      }
      .el-pagination__jump{
        margin-top: -1px;
        margin-left: 0;
      }
    }
  }
}
</style>

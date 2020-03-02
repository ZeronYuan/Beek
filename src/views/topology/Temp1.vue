<template>
  <section id="tabulate">
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
              <p>40</p>
            </div>
          </li>
          <li>
            <div class="icon"><i class="el-icon-coin"></i></div>
            <div class="num">
              <p>M1总数量</p>
              <p>40</p>
            </div>
          </li>
          <li>
            <div class="icon"><i class="el-icon-coin"></i></div>
            <div class="num">
              <p>M1总数量</p>
              <p>40</p>
            </div>
          </li>
          <li>
            <div class="icon"><i class="el-icon-coin"></i></div>
            <div class="num">
              <p>M1总数量</p>
              <p>40</p>
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
      </div>
    </div>
  </section>
</template>

<script>
import http from '../../plugins/http/http';

const httpList = http.apiList;

export default {
  name: 'Temp1',
  data() {
    return {
      total: 0,
      pageSize: 20,
      tableHeight: 0,
      seachForm: {
        name: '',
        interface: '',
      },
      tableData: [],
    };
  },
  created() {
    http.api[httpList.GatewayViewGetDeviceList]({
      method: 'get',
      success(response) {
        console.log(response);
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
};
</script>

<style lang="scss" scoped>
  #tabulate{
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
              transform: translate(-130%,-50%);
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
              margin-top: 23px;
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
            height: calc(100% - 156px);
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
      }
    }
  }
</style>

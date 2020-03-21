<template>
  <div class="m-detail-pop">
    <div class="set-list-box">
      <ul class="set-list">
        <li v-for="item in setList" :key="item.name" :class="{active:item.active}" @click="setItem(item.name)">
          <el-tooltip class="item" effect="dark" :content=item.title placement="left">
            <div class="inner">
              <i :class=item.icon></i>
            </div>
          </el-tooltip>
        </li>
      </ul>
    </div>
    <ul class="set-content">
      <transition-group name="slide-fade">
      <li v-show="actItem === 'sys'" :key="0">
        <div class="title">
          M1系统信息
          <i class="el-icon-close" @click="closeDrawer"></i>
        </div>
        <div class="sys">
          <div class="info-list">
            <p><span>名称：</span>{{cubeInfo.name}}</p>
            <p>
              <span>设备状态：</span>
              <span v-if="cubeInfo.status === 0">离线</span>
              <span v-else-if="cubeInfo.status === 1">在线</span>
              <span v-else-if="cubeInfo.status === 2">升级中</span>
            </p>
            <p><span>序列号：</span>{{cubeInfo.serial_number}}</p>
            <p class="uuid"><span>UUID：</span><span>{{cubeInfo.uuid}}</span></p>
            <p><span>软件版本：</span>{{cubeInfo.soft_version}}</p>
            <p><span>硬件版本：</span>{{cubeInfo.hard_version}}</p>
            <p><span>最近升级时间：</span>{{cubeInfo.last_upgrade_time}}</p>
          </div>
        </div>
      </li>
      <li v-show="actItem === 'func'" :key="1">
        <div class="title">
          功能信息
          <i class="el-icon-close" @click="closeDrawer"></i>
        </div>
        <div>RS485</div>
      </li>
      <li v-show="actItem === 'card'" :key="2">
        <div class="title">
          插卡信息
          <i class="el-icon-close" @click="closeDrawer"></i>
        </div>
        <div v-show="cardList.length" class="card">
          <el-image
            style="width: 100%; height: 200px;padding: 0 20px;"
            :src= cardInfo.image_url
            fit="scale-down">
            <div slot="error" class="error-image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <el-carousel @change="changeImg" :autoplay="false" indicator-position="none" arrow="always" type="card" height="80px">
            <el-carousel-item v-for="item in cardList" :key="item.serial_number">
              <div class="mask-gray" v-if="!item.is_installed"></div>
              <el-image
                style="width: 100%; height: 100%;"
                :src= item.image_url
                fit="cover">
                <div slot="error" class="error-image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </el-carousel-item>
          </el-carousel>
          <div class="info-list">
            <p><span>型号：</span>{{cardInfo.name}}</p>
            <p><span>序列号：</span>{{cardInfo.serial_number}}</p>
            <p><span>版本号：</span>{{cardInfo.version}}</p>
            <p><span>批次：</span></p>
            <p><span>出厂时间：</span>{{cardInfo.burn_time}}</p>
            <p><span>接口详情：</span></p>
          </div>
        </div>
        <div v-show="!cardList.length" class="none-card">
          暂无插卡信息
        </div>
      </li>
      </transition-group>
    </ul>
  </div>
</template>

<script>
import baseUtil from '../../../util/baseUtil';
import http from '../../../plugins/http/http';
import format from '../../../util/format';

const httpList = http.apiList;

export default {
  name: 'MDetail',
  props: {
    cubeInfo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      setList: [
        {
          name: 'sys', title: '系统信息', icon: 'el-icon-user', active: true,
        },
        {
          name: 'func', title: '功能信息', icon: 'el-icon-s-promotion', active: false,
        },
        {
          name: 'card', title: '插卡信息', icon: 'el-icon-cpu', active: false,
        }],
      actItem: 'sys',
      cardInfo: {
        image_url: '',
        name: '',
        serial_number: '',
        version: '',
        burn_time: '',
      },
      cardList: [],
    };
  },
  methods: {
    closeDrawer() {
      this.$emit('closeDrawer');
    },
    setItem: function (name) {
      const vm = this;
      baseUtil.each(vm.setList, (el) => {
        el.active = el.name === name;
        if (el.name === name) {
          vm.actItem = 'sys';
          vm.$nextTick(() => {
            vm.actItem = name; // 为了重复选择时能重新渲染右侧内容
            if (name === 'card') {
              vm.getCardInfo();
            }
          });
        }
      });
    },
    getCardInfo() {
      const vm = this;
      http.api[httpList.GetInterfaceCard]({
        method: 'post',
        params: {
          pm_id: vm.cubeInfo.id,
        },
        success(response) {
          // console.log(response);
          vm.cardList = response;
          vm.cardInfo = { ...vm.cardInfo, ...response[0] };
          vm.cardInfo.burn_time = format.date(new Date(vm.cardInfo.burn_time * 1000), 'yyyy/MM/dd hh:mm:ss');
          // console.log(vm.cardInfo);
        },
      });
    },
    changeImg(index) {
      const vm = this;
      vm.cardInfo = { ...vm.cardInfo, ...vm.cardList[index] };
    },
  },
};
</script>

<style lang="scss" scoped>
.m-detail-pop{
  width: 100%;
  height: 100%;
  .set-list-box{
    width: 60px;
    height: 100%;
    float: left;
    background:#ECECEC;
    position: relative;
   .set-list{
      width: 60px;
      text-align: left;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      li{
        width: 60px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
        text-align: center;
        .inner{
          width: 100%;
          height: 100%;
          line-height: 66px;
          i{
            font-size: 18px;
            color: #F88311;
          }
        }
        &:hover{
          background-color: rgba(248,131,17,.1);
          /*color: #fff;*/
          /*border-bottom: 0.5px solid rgba(236,236,236,1);*/
          /*border-top: 0.5px solid rgba(236,236,236,1);*/
          .inner{
            i{
              // color: #fff;
            }
          }
        }
        /*&:first-child{*/
        /*  &:hover{*/
        /*    border-top: none;*/
        /*  }*/
        /*}*/
      }
      .active{
        background-color: #F88311;
        &:hover,.inner{
          i{
            color: #fff;
          }
        }
        &:hover{
          background-color: #F88311;
          i{
            color: #fff;
          }
        }
      }
    }
  }
  /deep/.set-content{
    float: left;
    width: calc(100% - 60px);
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    li{
      .title{
        height: 56px;
        line-height: 56px;
        text-align: left;
        padding: 0 20px;
        font-size: 16px;
        position: relative;
        i{
          position: absolute;
          font-size: 16px;
          right: 20px;
          top: 22px;
          cursor: pointer;
        }
      }
      .sys, .card{
        .info-list{
          padding: 0 20px;
          p{
            text-align: left;
            font-size: 14px;
            color: #666;
            line-height: 1.5;
            padding: 15px 0;
            word-break: break-all;
          }
        }
      }
      .card{
        .el-carousel{
          .el-carousel__item{
            .mask-gray{
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
              z-index: 1;
              background: rgba(119, 119, 119, 0.6);
            }
          }
        }
      }
      .none-card{
        height: 200px;
        line-height: 200px;
        font-size: 28px;
        color: #6C696F;
        text-align: center;
      }
    }
  }
}
/deep/ .error-image-slot{
  height: 100%;
  background: #eee;
  text-align: center;
  position: relative;
  i{
    font-size: 36px;
    color: #6C696F;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -18px;
    margin-left: -18px;
  }
}
</style>

<template>
  <div class="base-set">
    <div v-show="!auto.show && !handwork.show">
      <titles name="基础信息"/>
      <div class="item-set">
        <div>
          <span>语言</span>
          <el-select v-model="lang" size="small" @change="setLang" placeholder="请选择">
            <el-option
              v-for="(item, index) in langList"
              :key=index
              :label=item.name
              :value=item.value>
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="item-set">
        <p class="item-title">显示</p>
        <div>
          <span>分辨率</span>
          <el-select v-model="rp" size="small" placeholder="请选择">
            <el-option
              label="1920*1080"
              value="1920">
            </el-option>
            <el-option
              label="1680*1050"
              value="1680">
            </el-option>
          </el-select>
        </div>
        <div>
          <span>缩放系数</span>
          <el-select v-model="zoom" size="small" placeholder="请选择">
            <el-option
              label="100%"
              value="1">
            </el-option>
            <el-option
              label="150%"
              value="1.5">
            </el-option>
            <el-option
              label="200%"
              value="2">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="item-set">
        <p class="item-title">日期和时间</p>
        <div>
          <clock :date=date />
          <p>{{formatDate}}</p>
        </div>
        <div>
          <span>时区</span>
          <el-select v-model="actTimeZone" @change="setTimeZone" size="small" placeholder="请选择">
            <el-option
              v-for="(item, index) in timeZoneList"
              :key=index
              :label=item.description
              :value=item.name>
            </el-option>
          </el-select>
        </div>
        <div class="tool">
          自动设置
          <span v-if="auto.form.autoSync">已开启</span>
          <span v-else>已关闭</span>
          <i @click="auto.show = !auto.show" class="el-icon-arrow-right"/>
        </div>
        <div class="tool">
          手动设置
          <span v-if="!auto.form.autoSync">已开启</span>
          <span v-else>已关闭</span>
          <i @click="handwork.show = !handwork.show" class="el-icon-arrow-right"/>
        </div>
      </div>
    </div>
    <div v-if="auto.show">
      <div class="back-tool">
        <i @click="auto.show = !auto.show" class="el-icon-arrow-left"/>
        自动设置日期和时间
      </div>
      <el-form label-position="left" class="auto-form" ref="autoForm" size="small" :model="auto.form" label-width="180px">
        <el-form-item label="自动设置">
          <el-switch v-model="auto.form.autoSync"/>
        </el-form-item>
        <el-form-item label="NTP服务器地址">
          <el-input v-model="auto.form.address"/>
        </el-form-item>
        <el-form-item label="同步周期">
          <el-select v-model="auto.form.period" placeholder="">
            <el-option
              label='1个小时'
              :value=1>
            </el-option>
            <el-option
              label='12个小时'
              :value=12>
            </el-option>
            <el-option
              label='一天'
              :value=24>
            </el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="subAutoForm">提交</el-button>
      </el-form>
    </div>
    <div v-if="handwork.show">
      <div class="back-tool">
        <i @click="handwork.show = !handwork.show" class="el-icon-arrow-left"/>
        手动设置日期和时间
      </div>
      <div class="hand-switch">手动设置<el-switch @change="setAutoSync" v-model="handwork.form.autoSync"/></div>
      <el-form v-show="handwork.form.autoSync" label-position="left" class="auto-form handwork-form" ref="handworkForm" size="small" :model="handwork.form" label-width="180px">
        <el-form-item label="时间和日期">
          <el-date-picker
            popper-class="base-left-timer"
            v-model="handwork.form.timestamp"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
<!--        <el-form-item label="时区">-->
<!--          <el-select v-model="actTimeZone" @change="setTimeZone" placeholder="">-->
<!--            <el-option-->
<!--              v-for="(item, index) in timeZoneList"-->
<!--              :key=index-->
<!--              :label=item.description-->
<!--              :value=item.name>-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-button type="primary" @click="subHandworkForm">提交</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import http from '../../../plugins/http/http';
import { format, baseUtil } from '../../../util';
import Clock from './Clock.vue';
import Titles from './Title.vue';

const httpList = http.apiList;
export default {
  name: 'based',
  data() {
    return {
      auto: {
        show: false,
        form: {
          autoSync: false,
          address: '',
          period: '',
        },
      },
      handwork: {
        show: false,
        form: {
          autoSync: false,
          timestamp: format.date(new Date(), 'yyyy/MM/dd hh:mm:ss'),
        },
      },
      lang: 'zh_CN',
      langList: [],
      rp: '1920',
      zoom: '1',
      actTimeZone: '',
      timeZoneList: [],
      date: new Date().getTime().toString(),
      formatDate: '',
    };
  },
  computed: {
    ...mapState({
      systemTime: (state) => state.common.systemTime,
    }),
  },
  watch: {
    systemTime: function (val) {
      this.date = baseUtil.copy(this.systemTime);
      this.formatDate = format.date(new Date(val * 1000), 'yyyy年MM月dd日hh:mm:ss');
    },
    'auto.form.autoSync': function (val) {
      this.handwork.form.autoSync = !val;
    },
  },
  components: {
    Clock: Clock,
    Titles: Titles,
  },
  created() {
    const vm = this;
    vm.initData();
  },
  methods: {
    initData() {
      const vm = this;
      http.api[httpList.GetSupportedLanguageList]({
        success(response) {
          vm.langList = response;
        },
      });
      http.api[httpList.GetCurrentLanguage]({
        success(response) {
          vm.lang = response;
        },
      });
      http.api[httpList.GetTimeZone]({
        success(response) {
          vm.timeZoneList = response;
          baseUtil.each(response, (el) => {
            if (el.select) {
              vm.actTimeZone = el.name;
            }
          });
        },
      });
      http.api[httpList.GetNTP]({
        success(response) {
          console.log(response);
          vm.auto.form = { ...response };
          vm.handwork.form.autoSync = !response.autoSync;
          console.log(vm.handwork.form.autoSync);
        },
      });
    },
    setLang(value) {
      // const vm = this;
      http.api[httpList.SetCurrentLanguage]({
        method: 'post',
        params: {
          language: value,
        },
        success() {
          // vm.$message({
          //   message: '修改成功',
          //   type: 'success',
          // });
        },
      });
    },
    setTimeZone(val) {
      const vm = this;
      http.api[httpList.SetTimeZone]({
        method: 'post',
        params: {
          timezone: val,
        },
        success() {
          vm.$store.dispatch('GET_SYSTEMTIME');
          // vm.$message({
          //   message: '修改成功',
          //   type: 'success',
          // });
        },
      });
    },
    setAutoSync(val) {
      // console.log(val);
      const vm = this;
      vm.auto.form.autoSync = !val;
    },
    subHandworkForm() {
      const vm = this;
      const timestamp = (new Date(vm.handwork.form.timestamp).getTime() / 1000).toString();
      http.api[httpList.SetDatetime]({
        method: 'post',
        params: {
          timestamp,
        },
        success() {
          vm.$store.dispatch('GET_SYSTEMTIME');
          vm.$message({
            message: '修改成功',
            type: 'success',
          });
        },
      });
    },
    subAutoForm() {
      const vm = this;
      http.api[httpList.SetNTP]({
        method: 'post',
        params: vm.auto.form,
        success() {
          vm.$store.dispatch('GET_SYSTEMTIME');
          vm.$message({
            message: '修改成功',
            type: 'success',
          });
        },
      });
    },
  },
};
</script>

<style lang="scss">
  .base-left-timer{
    transform: translateX(-40px);
  }
</style>
<style scoped lang="scss">
.base-set{
  height: 100%;
  overflow: hidden;
  .item-set{
    padding: 20px 0;
    margin: 0 20px;
    border-bottom: 1px solid #ccc;
    &:last-child{
      border: none;
    }
    .item-title{
      margin-bottom: 15px;
    }
    div{
      overflow: hidden;
      margin-bottom: 25px;
      &:last-child{
        margin-bottom: 0;
      }
      p{
        text-align: center;
      }
      >span{
        float: left;
        height: 32px;
        line-height: 32px;
      }
      .el-select{
        float: right;
      }
    }
    .tool{
      height: 60px;
      line-height: 60px;
      margin-bottom: 0;
      position: relative;
      i{
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 0;
        display: block;
        width: 60px;
        height: 60px;
        line-height: 60px;
        text-align: center;
      }
      span{
        float: right;
        height: 60px;
        line-height: 60px;
        margin-right: 40px;
      }
    }
  }
  .back-tool{
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
  }
  .auto-form{
    padding: 30px 20px;
    .el-form-item{
      &:first-child{
        .el-form-item__content{
          .el-switch{
            float: right;
            margin-top: 6px;
          }
        }
      }
    }
    .el-button{
      width: 100%;
      height: 36px;
      line-height: 36px;
      padding: 0;
      margin-top: 20px;
    }
  }
  .hand-switch{
    padding: 0 20px;
    height: 34px;
    line-height: 34px;
    margin-bottom: 18px;
    margin-top: 30px;
    .el-switch{
      float: right;
      margin-top: 6px;
    }
  }
  .handwork-form{
    padding-top: 0;
    .el-form-item{
      .el-form-item__content{
        .el-date-editor{
          width: 100%;
        }
      }
    }
  }
}
</style>

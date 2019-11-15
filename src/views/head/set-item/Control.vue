<template>
    <div class="control-set">
      <transition-group name="slide-fade">
      <titles :key="1111" v-show="!showUpdate && !showReset" name="控制"></titles>
      <ul :key="2222" class="set-box" v-show="!showUpdate && !showReset">
        <li><span>重启</span><i @click="restart" class="el-icon-arrow-right"></i></li>
        <li><span>升级</span><i @click="showUpdate = !showUpdate" class="el-icon-arrow-right"></i><span class="version">12.1254.3</span></li>
        <li><span>恢复出厂设置</span><i @click="showReset = !showReset" class="el-icon-arrow-right"></i></li>
      </ul>
      </transition-group>
      <transition name="slide-fade">
      <div class="update" v-show="showUpdate">
        <div class="tool"><i @click="showUpdate = false" class="el-icon-arrow-left"></i>版本信息 <span class="look-up">查看新特性</span></div>
        <div class="info-item">
          <span>当前版本</span>
          <span>1.2.3.15</span>
        </div>
        <div class="info-item">
          <span>最近升级时间</span>
          <span>2019-10-01 10：20：20</span>
        </div>
        <el-button class="sub-update" type="primary">检查更新</el-button>
      </div>
      </transition>
      <transition name="slide-fade">
      <div class="reset" v-show="showReset">
        <div class="tool"><i @click="showReset = false" class="el-icon-arrow-left"></i>恢复出厂设置 <span class="look-up">全选</span></div>
        <p class="tips">选项</p>
        <el-checkbox-group class="reset-item-list" v-model="checkList">
          <el-checkbox label="账户"></el-checkbox>
          <el-checkbox label="设备属性"></el-checkbox>
          <el-checkbox label="物理视图"></el-checkbox>
          <el-checkbox label="概念视图"></el-checkbox>
          <el-checkbox label="资源库"></el-checkbox>
          <el-checkbox label="网络设置"></el-checkbox>
        </el-checkbox-group>
        <el-button class="sub-update" type="primary">提交</el-button>
      </div>
      </transition>
    </div>
</template>

<script>
import Titles from './Title.vue';

export default {
  name: 'Control',
  data() {
    return {
      showUpdate: false,
      showReset: false,
      checkList: ['1', '2'],
    };
  },
  components: {
    Titles: Titles,
  },
  methods: {
    restart() {
      this.$confirm('设备重启将重启整个FireFinch软件系统，确认重启吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message({
          type: 'success',
          message: '重启!',
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消',
        });
      });
    },
  },
};
</script>

<style scoped lang="scss">
.control-set{
  .set-box{
    li{
      padding:0 20px;
      padding-right: 0;
      height: 50px;
      line-height: 50px;
      cursor: default;
      i{
        float: right;
        height: 50px;
        padding: 0 20px 0 10px;
        line-height: 50px;
        cursor: pointer;
        text-align: center;
      }
      .version{
        float: right;
      }
    }
  }
  .update,.reset{
    .tips{
      padding:0 20px;
      margin: 10px 0;
    }
    .tool{
      height: 50px;
      line-height: 50px;
      color: #4d4d4d;
      padding:0 20px;
      padding-left: 0;
      font-size: 16px;
      i{
        padding: 0 10px 0 20px;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        text-align: center;
        cursor: pointer;
        &:hover{
          color: #FF6700;
        }
      }
      .look-up{
        font-size: 16px;
        cursor: pointer;
        color: #FF6700;
        float: right;
      }
    }
    .info-item{
      padding:20px;
      span{
        &:last-child{
          float: right;
        }
      }
    }
    .sub-update{
      width: 360px;
      display: block;
      height: 36px;
      line-height: 36px;
      margin: 35px auto;
      padding: 0;
    }
    .reset-item-list{
      padding: 0 20px;
      label{
        display: block;
        margin:15px 0;
      }
    }
  }
}
</style>

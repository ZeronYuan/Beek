<template>
  <div class="base-set">
    <p class="title">基础信息</p>
    <div class="item-set">
      <div><span>语言</span>
        <el-select v-model="lang" size="small" placeholder="请选择">
          <el-option
            label="中文"
            value="zh_CN">
          </el-option>
          <el-option
            label="英文"
            value="en_US">
          </el-option>
        </el-select></div>
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
        <clock :date="date"></clock>
      </div>
      <div>
        <span>时区</span>
        <el-select v-model="rp" disabled size="small" placeholder="请选择">
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
        <span>自动设置</span>
      </div>
      <div>
        <span>手动设置</span>
      </div>
    </div>
  </div>
</template>

<script>
import Clock from './Clock.vue';

export default {
  name: 'based',
  data() {
    return {
      lang: 'zh_CN',
      rp: '1920',
      zoom: '1',
      date: new Date().getTime().toString(),
    };
  },
  components: {
    Clock: Clock,
  },
};
</script>

<style scoped lang="scss">
.base-set{
  height: 100%;
  overflow: hidden;
  .title{
    height: 50px;
    line-height: 50px;
    text-indent: 28px;
    font-size: 16px;
    font-weight: 600;
    // background-color: #f2f2f2;
  }
  .item-set{
    padding: 20px 0;
    margin: 0 28px;
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
      >span{
        float: left;
        height: 32px;
        line-height: 32px;
      }
      .el-select{
        float: right;
      }
    }
  }
}
</style>

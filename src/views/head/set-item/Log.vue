<template>
  <div class="log">
    <titles name="日志"></titles>
    <ul class="log-list">
      <li>
        <i class="el-icon-warning-outline"></i>
        <div>
          <span>系统设置</span>
          <span>1分钟前</span>
        </div>
        <i class="el-icon-arrow-right"></i>
      </li>
      <li>
        <i class="el-icon-warning-outline"></i>
        <div>
          <span>重启操作</span>
          <span>10分钟前</span>
        </div>
        <i class="el-icon-arrow-right"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import Titles from './Title.vue';

export default {
  name: 'Log',
  components: {
    Titles: Titles,
  },
};
</script>

<style scoped lang="scss">
.log{
  .log-list{
    >li{
      overflow: hidden;
      padding: 10px 0;
      &:hover{
        background: #f2f2f2;
      }
      div{
        float: left;
        height: 50px;
        span{
          display: block;
          height: 25px;
        }
      }
      i{
        padding: 0 20px;
        line-height: 50px;
        height: 50px;
        text-align: center;
        float: left;
        &:last-child{
          cursor: pointer;
          float: right;
        }
      }
    }
  }
}
</style>

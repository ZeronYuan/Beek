<template>
  <div class="log">
    <div class="title">日志</div>
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
export default {
  name: 'Log',
};
</script>

<style scoped lang="scss">
.log{
  .title{
    height: 50px;
    line-height: 50px;
    text-indent: 28px;
    font-size: 16px;
    font-weight: 600;
  }
  .log-list{
    >li{
      overflow: hidden;
      padding: 15px 30px;
      padding-left: 0;
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
        width: 50px;
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

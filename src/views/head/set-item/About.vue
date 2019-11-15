<template>
  <div class="about">
    <titles name="关于"></titles>
    <div class="logo">
      <img src="../../../../src/assets/img/cmlogo.png" alt="">
      <p>深圳市思博创科技有限公司</p>
    </div>
    <ul class="list">
      <li><span>设备名称</span><span>FireFinch R1</span></li>
      <li><span>UUID</span><span>sdewsdfs23423sdf41</span></li>
      <li><span>序列号</span><span>--</span></li>
      <li><span>注册时间</span><span>--</span></li>
      <li><span>版本号</span><span>--</span></li>
      <li><span>CPU数量</span><span>--</span></li>
      <li><span>累计运行时间</span><span>--</span></li>
    </ul>
  </div>
</template>

<script>
import Titles from './Title.vue';

export default {
  name: 'About',
  components: {
    Titles: Titles,
  },
};
</script>

<style scoped lang="scss">
.about{
  .logo{
    width: 100%;
    margin: 40px 0;
    img{
      display: block;
      width: 50%;
      margin: 0 auto;
    }
    p{
      text-align: center;
      margin-top: 10px;
      color: #666666;
    }
  }
  .list{
    padding: 0 28px;
    li{
      margin: 20px 0;
      overflow: hidden;
      span{
        float: left;
        width: 50%;
        &:last-child{
          text-align: right;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>

<template>
  <div>
    1234567
    <div>55</div>
    <i></i>
    <audio controls="controls" autoplay="autoplay" src="./../media/song.ogg">
    </audio>
  </div>
</template>

<script>
export default {
  name: 'Test',
};
</script>

<style scoped lang="scss">
  div{
    position: absolute;
    left: 50%;
    top: 50%;
    box-sizing: border-box;
    transform: rotate(5deg);
    i{
      display: inline-block;
      height: 40px;
      width: 40px;
      background: url("./../assets/img/fingerprint.jpg");
    }
  }
</style>

<template>
  <div class="clock-box">
    <canvas id="clock" height="200" width="200"/>
  </div>
</template>

<script>
export default {
  name: 'clock',
  props: {
    date: {
      required: true,
      default: new Date(),
      type: String,
    },
  },
  data() {
    return {
      clock: '',
      ctx: '',
      width: '',
      height: '',
      r: '',
      rem: '',
    };
  },
  watch: {
    date: function () {
      this.draw();
    },
  },
  created() {
  },
  mounted() {
    const vm = this;
    const obj = document.getElementById('clock');
    vm.ctx = obj.getContext('2d');
    vm.width = vm.ctx.canvas.width;
    vm.height = vm.ctx.canvas.height;
    vm.r = vm.width / 2;
    vm.rem = vm.width / 200;
    vm.draw();
  },
  methods: {
    drawBackground() { // 绘制表盘
      const vm = this;
      const { ctx, r, rem } = vm;
      ctx.save();
      ctx.translate(r, r);
      ctx.beginPath();
      ctx.lineWidth = 1.5 * rem;
      // 以0，0为原点，r为半径，0为起始角，2*Math.PI为结束角，顺时针画圆
      ctx.arc(0, 0, r - ctx.lineWidth / 1.2, 0, 2 * Math.PI, false);
      ctx.stroke();
      const hourNumber = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
      ctx.font = `${18 * rem}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      // 画出1-12的数字
      hourNumber.forEach((number, i) => {
        // eslint-disable-next-line no-mixed-operators
        const rad = 2 * Math.PI / 12 * i;
        const x = Math.cos(rad) * (r - 30 * rem);
        const y = Math.sin(rad) * (r - 30 * rem);
        ctx.fillText(number, x, y);
      });
      // 画出秒针走动的60个点
      for (let i = 0; i < 60; i++) {
        // eslint-disable-next-line no-mixed-operators
        const rad = 2 * Math.PI / 60 * i;
        const x = Math.cos(rad) * (r - 18 * rem);
        const y = Math.sin(rad) * (r - 18 * rem);
        ctx.beginPath();
        if (i % 5 === 0) {
          ctx.fillStyle = '#666';
          ctx.arc(x, y, 2 * rem, 0, 2, 2 * Math.PI, false);
        } else {
          ctx.fillStyle = '#ccc';
          ctx.arc(x, y, 2 * rem, 0, 2, 2 * Math.PI, false);
        }
        ctx.fill();
      }
    },
    drawHour(hour, minute) { // 绘制时针
      const vm = this;
      const { ctx, r, rem } = vm;
      ctx.save();
      ctx.beginPath();
      // eslint-disable-next-line no-mixed-operators
      const rad = 2 * Math.PI / 12 * hour;
      // eslint-disable-next-line no-mixed-operators
      const mrad = 2 * Math.PI / 12 / 60 * minute;
      ctx.rotate(rad + mrad);
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.moveTo(0, 10 * rem);
      ctx.lineTo(0, -r / 2);
      ctx.stroke();
      ctx.restore();
    },
    drawMinute(minute) { // 绘制分针
      const vm = this;
      const { ctx, r, rem } = vm;
      ctx.save();
      ctx.beginPath();
      // eslint-disable-next-line no-mixed-operators
      const rad = 2 * Math.PI / 60 * minute;
      ctx.rotate(rad);
      ctx.lineWidth = 3 * rem;
      ctx.lineCap = 'round';
      ctx.moveTo(0, 10);
      ctx.lineTo(0, -r + 30 * rem);
      ctx.stroke();
      ctx.restore();
    },
    drawSecond(second) { // 绘制秒针
      const vm = this;
      const { ctx, r, rem } = vm;
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = '#c14443';
      // eslint-disable-next-line no-mixed-operators
      const rad = 2 * Math.PI / 60 * second;
      ctx.rotate(rad);
      ctx.moveTo(-2, 20 * rem);
      ctx.lineTo(2, 20 * rem);
      ctx.lineTo(1, -r + 18 * rem);
      ctx.lineTo(-1, -r + 18 * rem);
      ctx.fill();
      ctx.restore();
    },
    drawDot() { // 画时钟上的中心白色原点
      const vm = this;
      const { ctx, rem } = vm;
      ctx.beginPath();
      ctx.fillStyle = '#fff';
      ctx.arc(0, 0, 3 * rem, 0, 2 * Math.PI, false);
      ctx.fill();
    },
    draw() {
      const vm = this;
      const { ctx, width, height } = vm;
      ctx.clearRect(0, 0, width, height);
      const now = new Date(vm.date * 1000);
      const hour = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      vm.drawBackground();
      vm.drawHour(hour, minutes);
      vm.drawMinute(minutes);
      vm.drawSecond(seconds);
      vm.drawDot();
      ctx.restore();
    },
  },
};
</script>

<style scoped lang="scss">
.clock-box{
  #clock{
    display: block;
    margin: 0 auto;
  }
}
</style>

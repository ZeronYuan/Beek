<template>
  <div class="topo">
    <div id='info-cube'>
      <p class="title">设备信息</p>
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
<!--      <p class="title">当前插卡信息</p>-->
<!--      <p><span>序列号：</span></p>-->
<!--      <p><span>版本号：</span></p>-->
<!--      <p><span>批次：</span></p>-->
<!--      <p><span>功能：</span></p>-->
    </div>
    <div id="cube"></div>
    <img id="m1" src="../../assets/img/topo/M1.png" alt=""/>
    <img id="o" src="../../assets/img/topo/o.png" alt=""/>
    <img id="r1" @load="loaded" src="../../assets/img/topo/R1.png" alt=""/>
    <el-drawer
      :visible.sync="detailDrawer"
      :direction="'rtl'"
      :wrapperClosable=true
      :with-header=false
      custom-class="ff-drawer"
      size="450px"
      :destroy-on-close=true
      :modal-append-to-body=false
    >
      <m-detail @closeDrawer="closeDrawer" :cubeInfo="cubeInfo"></m-detail>
    </el-drawer>
  </div>
</template>

<script>
import mDetail from './subfunction/MDetail.vue';
import http from '../../plugins/http/http';
import baseUtil from '../../util/baseUtil';
import format from '../../util/format';

const httpList = http.apiList;
const { zrender } = window;

export default {
  name: 'ToPo',
  data() {
    return {
      topoData: {},
      cube: '',
      ZR: '',
      allGroup: '',
      R1: '',
      cubeInfo: {
        status: '',
        soft_version: '',
        hard_version: '',
        boot_version: '',
        serial_number: '',
        id: '',
        uuid: '',
        last_upgrade_time: '',
      },
      detailDrawer: false,
    };
  },
  mounted() {
  },
  created() {
  },
  components: {
    mDetail: mDetail,
  },
  methods: {
    loaded() {
      const vm = this;
      vm.init();
      vm.drawR();
      vm.listDataHandler();
      vm.initEnd();
    },
    init() {
      const vm = this;
      const r = window.devicePixelRatio || 2;
      vm.cube = document.querySelector('#cube');
      vm.ZR = zrender.init(vm.cube, {
        renderer: 'canvas',
        devicePixelRatio: r,
      });
      vm.allGroup = new zrender.Group();
    },
    initEnd() {
      const vm = this;
      let resize_time = null;
      vm.ZR.scale = 1.0;
      const zr_w = vm.ZR.getWidth();
      const zr_h = vm.ZR.getHeight();
      window.onresize = function () {
        clearTimeout(resize_time);
        resize_time = setTimeout(() => {
          vm.ZR.resize();
        }, 600);
      };
      vm.ZR.dragData = { drag: false, pos: [0, 0] };
      vm.ZR.on('mousedown', (e) => {
        vm.ZR.dragData.pos = [e.event.zrX, e.event.zrY];
        vm.ZR.dragData.drag = true;
      });
      vm.ZR.on('mouseup', () => {
        vm.ZR.dragData.drag = false;
      });
      vm.ZR.on('mousemove', (e) => {
        // console.log(e.offsetX, e.offsetY);
        // console.log(e.event.zrX, e.event.zrY);
        if (!vm.ZR.dragData.drag) return;
        const new_pos = [e.event.zrX, e.event.zrY];
        const pos = [new_pos[0] - vm.ZR.dragData.pos[0], new_pos[1] - vm.ZR.dragData.pos[1]];
        // console.log(pos);
        vm.allGroup.attr({
          position: [vm.allGroup.position[0] + pos[0], vm.allGroup.position[1] + pos[1]],
        });
        vm.ZR.dragData.pos = [e.event.zrX, e.event.zrY];
      });
      vm.ZR.on('mousewheel', (e) => {
        const newScale = vm.ZR.scale + e.wheelDelta / 10;
        if (newScale < 0.1 || newScale > 5) return;
        vm.ZR.scale = newScale;
        vm.allGroup.attr({
          scale: [vm.ZR.scale, vm.ZR.scale],
          origin: [zr_w / 2, zr_h / 2],
        });
        // vm.ZR.refresh();
      });
      vm.ZR.add(vm.allGroup);
      vm.ZR.refreshImmediately();
    },
    drawR() {
      const vm = this;
      const width = vm.cube.clientWidth;
      const height = vm.cube.clientHeight;
      const r1 = document.querySelector('#r1');
      vm.R1 = new zrender.Image({
        zlevel: 1,
        style: {
          image: r1,
          x: width / 2 - 39,
          y: height / 2 - 120,
          width: 78 * 1.2,
          height: 102 * 1.2,
        },
      });
      const n_box = vm.R1.getBoundingRect();
      const text = new zrender.Text({
        zlevel: 1,
        style: {
          x: n_box.x + n_box.width / 2,
          y: n_box.y + n_box.height + 20,
          text: 'FireFinch R1',
          textWidth: 120,
          textHeight: 36,
          fontSize: 16,
          textLineHeight: 36,
          textAlign: 'center',
          textVerticalAlign: 'middle',
          truncate: {
            outerWidth: 120,
          },
        },
      });
      vm.R1.on('click', () => {
        vm.$router.push('/RDevice');
      });
      vm.allGroup.add(text);
      vm.allGroup.add(vm.R1);
    },
    drawMainNode(x, y, name) {
      const vm = this;
      const t = new zrender.Rect({
        cursor: 'default',
        shape: {
          r: 2,
          x: x,
          y: y,
          width: 108,
          height: 30,
        },
        zlevel: 1,
        style: {
          fill: '#ddd',
          text: name,
          textWidth: 108,
          textHeight: 30,
          textLineHeight: 30,
          textOffset: [0, 0],
          textFill: '#555',
          transformText: true,
        },
      });
      vm.drawMainLine(t, vm.R1);
      vm.allGroup.add(t);
      return t;
    },
    drawMainLine(from, to) {
      const vm = this;
      const f_rect = from.getBoundingRect();
      const t_rect = to.getBoundingRect();
      const star_y = f_rect.y + f_rect.height / 2;
      const star_x = f_rect.x + f_rect.width / 2;
      const end_y = t_rect.y + t_rect.height / 2;
      const end_x = t_rect.x + t_rect.width / 2;
      const line = new zrender.Polyline({
        shape: {
          points: [
            [star_x, star_y],
            [star_x + (end_x - star_x) / 2, star_y],
            [star_x + (end_x - star_x) / 2, end_y],
            [end_x, end_y]],
        },
        zlevel: 0,
        style: {
          lineWidth: 1.5,
          stroke: '#222',
        },
      });
      vm.allGroup.add(line);
      return line;
    },
    drawDeviceM(x, y, index, key, obj) {
      // console.log(obj);
      const vm = this;
      let timer;
      const mBox = new zrender.Group();
      const imgOpts = {
        zlevel: 1,
        style: {
          image: document.querySelector('#m1'),
          x: x,
          y: y,
          opacity: 1,
          width: 38 * 1.5,
          height: 56 * 1.5,
        },
      };
      if (obj.systemInfo.status === 0) {
        imgOpts.style.opacity = 0.5;
      }
      const n = new zrender.Image(imgOpts);
      const n_box = n.getBoundingRect();
      let points = [
        [x + n_box.width / 2 + 10, n_box.y],
        [x + n_box.width / 2 + 10, n_box.y - 35],
        [x + n_box.width / 2 + 110, n_box.y - 35],
        [x + n_box.width / 2 + 110, n_box.y]];
      if (index === 0) {
        points = points.slice(0, 3);
      }
      const line = new zrender.Polyline({
        shape: {
          points: points,
        },
        zlevel: 0,
        style: {
          lineWidth: 1,
          stroke: '#222',
        },
      });
      const text = new zrender.Text({
        zlevel: 1,
        style: {
          x: n_box.x + n_box.width / 2,
          y: n_box.y + n_box.height + 20,
          text: obj.systemInfo.name,
          textWidth: 120,
          textHeight: 36,
          textLineHeight: 36,
          textAlign: 'center',
          textVerticalAlign: 'middle',
          truncate: {
            outerWidth: 100,
          },
        },
      });
      const but = vm.drawMButton(x, y);
      mBox.add(line);
      mBox.add(text);
      mBox.add(n);
      mBox.add(but);
      but.on('click', () => {
        vm.detailDrawer = true;
      });
      vm.allGroup.add(mBox);
      n.on('mousemove', (e) => {
        vm.infoCubeMove(e, obj.systemInfo.id, key);
      });
      n.on('mouseout', (e) => {
        vm.infoCubeMove(e);
      });
      n.on('click', () => {
        vm.$router.push('/MDevice');
      });
      mBox.on('mousemove', () => {
        but.show();
        clearTimeout(timer);
      });
      mBox.on('mouseout', () => {
        timer = setTimeout(() => {
          but.hide();
        }, 500);
      });
      return n;
    },
    drawMButton(x, y) {
      // const vm = this;
      const button = new zrender.Group();
      const t = new zrender.Rect({
        cursor: 'pointer',
        shape: {
          r: 2,
          x: x - 55,
          y: y,
          width: 50,
          height: 26,
        },
        zlevel: 1,
        style: {
          fill: '#ddd',
          text: '配置',
          textWidth: 108,
          textHeight: 24,
          textLineHeight: 24,
          textOffset: [0, 0],
          textFill: '#444',
          transformText: true,
        },
      });
      button.add(t);
      button.hide();
      return button;
    },
    infoCubeMove(e, id, key) {
      const vm = this;
      const info_cube = document.querySelector('#info-cube');
      const cube_style = getComputedStyle(vm.cube);
      if (e.type === 'mousemove') {
        info_cube.style.display = 'block';
        const styles = getComputedStyle(info_cube);
        const h = Number(styles.height.replace('px', ''));
        const w = Number(styles.width.replace('px', ''));
        const c_h = Number(cube_style.height.replace('px', ''));
        const c_w = Number(cube_style.width.replace('px', ''));
        if (h + e.offsetY + 20 >= c_h) {
          info_cube.style.top = `${e.offsetY - h}px`;
        } else {
          info_cube.style.top = `${e.offsetY + 20}px`;
        }
        if (h + e.offsetX + 20 >= c_w) {
          info_cube.style.left = `${e.offsetX - w}px`;
        } else {
          info_cube.style.left = `${e.offsetX + 20}px`;
        }
        baseUtil.each(vm.topoData[key], (el) => {
          if (el.systemInfo.id === id) {
            const info = baseUtil.copy(el);
            info.systemInfo.last_upgrade_time = format.date(new Date(el.systemInfo.last_upgrade_time * 1000), 'yyyy/MM/dd hh:mm:ss');
            vm.cubeInfo = { ...info.systemInfo };
          }
        });
      } else if (e.type === 'mouseout') {
        info_cube.style.display = 'none';
      }
    },
    drawDeviceO(x, y, name, node) {
      const vm = this;
      const n = new zrender.Image({
        zlevel: 1,
        style: {
          image: document.querySelector('#o'),
          x: x,
          y: y,
          width: 38 * 1.5,
          height: 56 * 1.5,
        },
      });
      const n_box = n.getBoundingRect();
      const main = node.getBoundingRect();
      const star_y = main.y + main.height / 2;
      const star_x = main.x + main.width / 2;
      const end_y = n_box.y + n_box.height / 2;
      const end_x = n_box.x + n_box.width / 2;
      const line = new zrender.Polyline({
        shape: {
          points: [
            [star_x, star_y],
            [star_x, star_y + 40],
            [end_x, star_y + 40],
            [end_x, end_y],
          ],
        },
        zlevel: 0,
        style: {
          lineWidth: 1.5,
          stroke: '#222',
        },
      });
      const text = new zrender.Text({
        zlevel: 10,
        style: {
          x: end_x,
          y: n_box.y + n_box.height + 20,
          text: name,
          textWidth: 120,
          textHeight: 36,
          textLineHeight: 36,
          textAlign: 'center',
          textVerticalAlign: 'middle',
          truncate: {
            outerWidth: 100,
          },
        },
      });
      vm.allGroup.add(line);
      vm.allGroup.add(text);
      vm.allGroup.add(n);
      return n;
    },
    listDataHandler() {
      const vm = this;
      http.api[httpList.getPhysicList]({
        success(response) {
          vm.topoData = response;
          const reg = /FF/gim;
          let ff_num = 0; // FF-BUS数量
          let o_num = 0; // 其他线路数量
          baseUtil.each(response, (el, key) => {
            reg.lastIndex = ''; // 清除正则式上一次匹配的结果
            if (reg.test(key.toString())) {
              ff_num++;
            } else {
              o_num++;
            }
          });
          const c_p = vm.R1.getBoundingRect();
          const c_x = c_p.x + c_p.width / 2;
          const c_y = c_p.y + c_p.height / 2;
          let l_y = c_y - (220 * ff_num) / 2 - 125;
          let r_y = c_y - (220 * o_num) / 2 - 125;
          baseUtil.each(response, (el, key) => {
            if (reg.test(key.toString())) {
              reg.lastIndex = '';
              l_y += 220;
              const node = vm.drawMainNode(c_x - 260, l_y, key);
              const n_box = node.getBoundingRect();
              el.forEach((item, index) => {
                const el_x = n_box.x - (index + 0.5) * 120;
                const el_y = n_box.y + 50;
                vm.drawDeviceM(el_x, el_y, index, key, item);
              });
            } else {
              r_y += 220;
              const node = vm.drawMainNode(c_x + 150, r_y, key);
              const n_box = node.getBoundingRect();
              el.forEach((item, index) => {
                const el_x = n_box.x + (index + 0.5) * 120;
                const el_y = n_box.y + 70;
                vm.drawDeviceO(el_x, el_y, item.name, node);
              });
            }
          });
        },
      });
    },
    closeDrawer() {
      this.detailDrawer = false;
    },
  },
  beforeDestroy() {
  },
};
</script>

<style scoped lang="scss">
.topo{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  #r1,#m1,#o{
    position: absolute;
    left: -2020px;
    top: -2020px;
    width:175px;
    height:231px;
    transform: scale(3);
  }
  #cube {
    width: 100%;
    height: 100%;
    background: #fff;
  }
  #info-cube{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    width: 306px;
    min-height: 380px;
    box-shadow: #aaa 1px 1px 6px;
    background: #fff;
    border-radius: 4px;
    padding:20px;
    display: none;
    transition: all .2s;
    p{
      text-align: left;
      font-size: 14px;
      color: #666;
      line-height: 1.5;
      padding: 5px 0;
      word-break: break-all;
    }
    .title{
      height: 36px;
      line-height: 36px;
      padding: 0;
      color: #333;
    }
    .uuid{
      overflow: hidden;
      span{
        float: left;
        width: 20%;
        &:last-child{
          width: 80%;
        }
      }
    }
  }
}
</style>

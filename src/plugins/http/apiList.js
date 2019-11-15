export default {
  /**
   * 接口列表
   */
  GETNODELISTINFO: '/firefinch-api/devicemanager/can', // 3-412-01 节点列表展示
  getAvaiableUnits: '/firefinch-api/templatemanager?action=getAvaiableUnits', // 获取单位
  // 系统设置
  AddNewHotpad: '/Settings/Network/WLAN/AddNewHotpad', // 连接新的热点
  GetScanResult: '/Settings/Network/WLAN/GetScanResult', // 获取扫描结果
  GetConnectedHotpad: '/Settings/Network/WLAN/GetConnectedHotpad', // 获取已连接热点列表
  IsOpened: '/Settings/Network/WLAN/IsOpened', // 查询网络状态（打开/关闭）
};

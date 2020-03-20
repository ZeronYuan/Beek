/**
 * FireFinch R1接口列表
 */
export default {
  /**
   * 关于
   */
  GetSystemInformation: '/Settings/About/GetSystemInformation', // 获取系统信息
  /**
  * 网络设置
  */
  // WLAN
  AddNewHotpad: '/Settings/Network/WLAN/AddNewHotpad', // 连接新的热点
  RemoveAddedHotpad: '/Settings/Network/WLAN/RemoveAddedHotpad', // 移除已连接的热点
  GetScanResult: '/Settings/Network/WLAN/GetScanResult', // 获取扫描结果
  GetConnectedHotpad: '/Settings/Network/WLAN/GetConnectedHotpad', // 获取已连接热点列表
  IsOpened: '/Settings/Network/WLAN/IsOpened', // 查询网络状态（打开/关闭）
  OpenWLAN: '/Settings/Network/WLAN/Open', // 打开网络
  CloseWLAN: '/Settings/Network/WLAN/Close', // 关闭网络
  ConnectWLAN: '/Settings/Network/WLAN/Connect', // 连接热点
  DisconnectWLAN: '/Settings/Network/WLAN/Disconnect', // 断开热点
  GetWLANConfigure: '/Settings/Network/WLAN/GetConfigure', // 获取热点配置
  SetWLANConfigure: 'Settings/Network/WLAN/SetConfigure', // 设置热点配置
  // 4G
  getMobileInfo: '/Settings/Network/Mobile/getMobileInfo', // 获取连接详情
  dataOpen: '/Settings/Network/Mobile/dataOpen', // 设置连接状态
  sendMessage: '/Settings/Network/Mobile/sendMessage', // 发送短信
  // ETH
  GetConnectDetailed: '/Settings/Network/ETH/GetConnectDetailed', // 获取连接详情
  GetIPV4Address: '/Settings/Network/ETH/GetIPV4Address', // 获取IPV4地址
  GetDNSAddress: '/Settings/Network/ETH/GetDNSAddress', // 获取置DNS地址
  SetIPV4Address: '/Settings/Network/ETH/SetIPV4Address', // 设置IPV4地址
  SetDNSAddress: '/Settings/Network/ETH/SetDNSAddress', // 设置DNS地址
  SetStatus: '/Settings/Network/ETH/SetStatus', // 设置状态
  // FF-BUS
  GetBusConfigure: '/Settings/Network/FFBUS/GetBusConfigure', // 获取总线配置
  SetSwitchStatus: '/Settings/Network/FFBUS/SetSwitchStatus', // 设置开启状态
  SetPowerStatus: '/Settings/Network/FFBUS/SetPowerStatus', // 设置电源状态
  SetAutoUpgprade: '/Settings/Network/FFBUS/SetAutoUpgprade', // 设置自动升级状态
  SetDistance: '/Settings/Network/FFBUS/SetDistance', // 设置距离
  /**
   * 基本设置
   */
  GetSupportedLanguageList: '/Settings/Language/GetSupportedLanguageList', // 获取支持语言列表
  GetCurrentLanguage: '/Settings/Language/GetCurrentLanguage', // 获取当前语言
  SetCurrentLanguage: '/Settings/Language/SetCurrentLanguage', // 设置当前语言
  GetDatetime: '/Settings/Datetime/GetDatetime', // 获取日期和时间
  SetDatetime: '/Settings/Datetime/SetDatetime', // 设置时间
  GetTimeZone: '/Settings/Datetime/GetTimeZone', // 获取时区配置
  SetTimeZone: '/Settings/Datetime/SetTimeZone', // 设置时区
  GetNTP: '/Settings/Datetime/GetNTP', // 获取NTP配置
  SetNTP: '/Settings/Datetime/SetNTP', // 设置NTP
  /**
   * 顶层视图
   */
  getPhysicList: '/DeviceTopology/TopView/getPhysicList', // 获取顶层物理视图
  GetInterfaceCard: '/DeviceTopology/TopView/GetInterfaceCard', // 获取插卡信息
  /*
  * 网关视图
  * */
  GatewayViewGetDeviceList: '/DeviceTopology/GatewayView/GetDeviceList', // 获取设备列表
  GetM1CollectorNumber: '/DeviceTopology/GatewayView/GetM1CollectorNumber', // 获取M1采集器总数量
  GetDeviceStatisticSpecify: '/DeviceTopology/GatewayView/GetDeviceStatisticSpecify', // 获取设备统计详情（故障数、总数量）
  GetDeviceItemsCount: '/DeviceTopology/GatewayView/GetDeviceItemsCount', // 获取总监控项数量
  GetInterfacePositionInfoList: '/DeviceTopology/GatewayView/GetInterfacePositionInfoList', // 获取接口位置信息列表
  AddDevice: '/DeviceTopology/GatewayView/AddDevice', // 添加设备
  DeleteDevice: '/DeviceTopology/GatewayView/DeleteDevice', // 删除设备
  EditDeviceInfo: '/DeviceTopology/GatewayView/EditDeviceInfo', // 编辑设备
  GetResourceClassList: '/DeviceTopology/GatewayView/GetResourceClassList', // 获取资源类别列表
  CloneDevice: '/DeviceTopology/GatewayView/CloneDevice', // 克隆设备
  GetMonitorItemList: '/DeviceTopology/GatewayView/GetMonitorItemList', // 获取监控项列表
  EditMonitorItemList: '/DeviceTopology/GatewayView/EditMonitorItemList', // 编辑监控项列表
  DeleteMonitorItemList: '/DeviceTopology/GatewayView/DeleteMonitorItemList', // 删除监控项列表
  GetAvailableMonitorItemList: '/DeviceTopology/GatewayView/GetAvailableMonitorItemList', // 获取可添加的监控项列表
  AddMonitorItemList: '/DeviceTopology/GatewayView/AddMonitorItemList', // 添加监控项列表
  /**
   * 资源库
   */
  getDeviceList: '/Resource/DeviceView/getDeviceList', // 获取设备列表
  getClassList: '/Resource/PropertiesView/getClassList', // 获取属性项类别列表
  getPropertyList: '/Resource/PropertiesView/getPropertyList', // 获取属性项列表
  checkResourceInfoByProtocol: '/Resource/Common/checkResourceInfoByProtocol', // 通过协议查询设备型号
};

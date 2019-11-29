/**
 * FireFinch R1接口列表
 */
export default {
  /**
   * 关于
   */
  GetSystemInformation: '/Settings/About/GetSystemInformation', // 获取系统信息
  /**
  * 系统设置
  */
  // WLAN
  AddNewHotpad: '/Settings/Network/WLAN/AddNewHotpad', // 连接新的热点
  GetScanResult: '/Settings/Network/WLAN/GetScanResult', // 获取扫描结果
  GetConnectedHotpad: '/Settings/Network/WLAN/GetConnectedHotpad', // 获取已连接热点列表
  IsOpened: '/Settings/Network/WLAN/IsOpened', // 查询网络状态（打开/关闭）
  // ETH
  GetConnectDetailed: '/Settings/Network/ETH/GetConnectDetailed', // 获取连接详情
  GetIPV4Address: '/Settings/Network/ETH/GetIPV4Address', // 获取IPV4地址
  GetDNSAddress: '/Settings/Network/ETH/GetDNSAddress', // 获取置DNS地址
  SetIPV4Address: '/Settings/Network/ETH/SetIPV4Address', // 设置IPV4地址
  SetDNSAddress: '/Settings/Network/ETH/SetDNSAddress', // 设置DNS地址
  SetStatus: '/Settings/Network/ETH/SetStatus', // 设置状态
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
};

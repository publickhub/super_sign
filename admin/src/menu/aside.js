// 菜单 侧边栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '用户管理',
    icon: 'folder-o',
    children: [
      { path: '/userManage', title: '用户管理' },
      { path: '/operateRecord', title: '操作记录' },
    ]
  },
  {
    title: '超级签名',
    icon: 'folder-o',
    children: [
      { path: '/appInfo', title: '应用信息管理' },
      { path: '/appIdInfo', title: 'Apple Id管理' },
      { path: '/udidInfo', title: 'UDID管理' }
    ]
  },
  {
    title: '企业签名',
    icon: 'folder-o',
    children: [
      { path: '/businessSignature', title: '企业应用管理' },
      { path: '/businessAccount', title: '企业账号管理' }
    ]
  },
  {
    title: '安卓应用',
    icon: 'folder-o',
    children: [
      { path: '/androidManage', title: '安卓应用管理' }
    ]
  },
  {
    title: '系统配置',
    icon: 'folder-o',
    children: [
      { path: '/sysConfig', title: '系统配置' }
    ]
  }
]

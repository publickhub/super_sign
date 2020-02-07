// 菜单 顶栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '超级签名',
    icon: 'folder-o',
    children: [
      { path: '/appInfo', title: '应用信息管理' },
    ]
  },
  {
    title: '企业签名',
    icon: 'folder-o',
    children: [
      { path: '/businessSignature', title: '企业应用管理' }
    ]
  },
  {
    title: '安卓应用',
    icon: 'folder-o',
    children: [
      { path: '/androidApp', title: '安卓应用' }
    ]
  },
  {
    title: '个人中心',
    icon: 'folder-o',
    children: [
      { path: '/userCenter', title: '个人中心' }
    ]
  }
]

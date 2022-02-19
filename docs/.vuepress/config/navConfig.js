module.exports = [
  {
    text: '首页',
    link: '/',
    target:'_self',
  },
  {
    text: '前端',
    link: '/frontend/',
    target:'_self',
    items: [
      {
        text: '基础',
        items: [
          {text: 'h5',link: '/frontend/base/h5/'},
          {text: 'css3',link: '/frontend/base/css3/'},
        ]
      },
      {
        text: '轮子',
        items: [
          {text: 'h5',link: '/frontend/base/h5/'},
        ]
      },
      {
        text: '小程序',
        items: [
          {text: '微信小程序',link: '/frontend/minPrograms/'},
          {text: 'uniapp',link: '/frontend/minPrograms/uniapp/'}
        ]
      },
  ]},
  {
    text: '后端',
    link: '/backend/',
    target:'_self',
    items: [
      {
        items: [
          {text: 'node',link: '/backend/node/'},
        ]
      }
  ]},
  {
    text: '面试问题',
    link: '/interview/base',
    target:'_self',
    items: [
      {
        items: [
          {text: 'Git',link: '/interview/base/Git.md'},
        ]
      }
  ]},
  {
    text: '项目经验',
    link: '/projects/',
    target:'_self',
    items: [
      {
        text: 'FE框架',
        items: [
          {text: 'vue',link: '/projects/framework/vue/'},
          {text: 'ng1',link: '/projects/framework/ng1/'}
        ]
      },
  ]},
  { text: 'GitHub', link: 'https://github.com/web-wj/docs' },
]
const moment = require('moment');

moment.locale('zh-CN');

module.exports = {
  title: "学习笔记",
  description: "前端工程师 Alex 的学习笔记",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'author', content: 'Alex Wang' }],
    ['meta', { name: 'keywords', content: 'vuepress , 前端, 学习笔记' }],
  ],
  base: "/docs/",
  themeConfig: {
    logo: '/images/favicon-theme.png',
    nav: require('./nav.js'),
    sidebar: 'auto',
    lastUpdated: '更新时间',
  },
  markdown: {
    // 为代码块添加行数
    lineNumbers: true
  },
  plugins: [
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp) => {
          return moment(timestamp).format("llll");
        }
      }
    ]
  ]
}

// .vuepress/config.js

module.exports = {
  themeConfig: {
    logo: '/images/favicon.png',
    nav: require('./nav.js'),
    sidebar: require('./sidebar.js')
  },
  markdown: {
    // 为代码块添加行数
    lineNumbers: true
  },
  plugins: ['@vuepress/active-header-links', {
    sidebarLinkSelector: '.sidebar-link',
    headerAnchorSelector: '.header-anchor'
  }]
}

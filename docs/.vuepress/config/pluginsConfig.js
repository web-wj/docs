const moment = require("moment");

moment.locale("zh-CN");

module.exports = [
  [
    "@vuepress/last-updated",
    {
      transformer: (timestamp) => {
        return moment(timestamp).format("llll");
      },
    },
  ],
  [
    "@vuepress/pwa",
    {
      serviceWorker: true,
      updatePopup: {
        message: "发现新内容可用",
        buttonText: "刷新",
      },
    },
  ],
  [
    '@vuepress/back-to-top',
  ]
];
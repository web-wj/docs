const headConfig = require('./config/headConfig');
const pluginsConfig = require('./config/pluginsConfig');
const navConfig = require("./config/navConfig.js");

module.exports = {
	title: "学习笔记",
	description: "前端工程师 Alex 的学习笔记",
	head: headConfig,
	base: "/docs/",
	themeConfig: {
		logo: "/images/favicon-theme.png",
		nav: navConfig,
		sidebar: "auto",
		lastUpdated: "更新时间",
	},
	markdown: {
		// 为代码块添加行数
		lineNumbers: true,
	},
	plugins: pluginsConfig,
};

const moment = require("moment");

moment.locale("zh-CN");

module.exports = {
	title: "学习笔记",
	description: "前端工程师 Alex 的学习笔记",
	head: [
		["link", { rel: "icon", href: "/favicon.ico" }],
		["meta", { name: "author", content: "Alex Wang" }],
		["meta", { name: "keywords", content: "vuepress , 前端, 学习笔记" }],
		["link", { rel: "manifest", href: "/manifest.json" }],
		["meta", { name: "theme-color", content: "#3eaf7c" }],
		["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
		[
			"meta",
			{ name: "apple-mobile-web-app-status-bar-style", content: "black" },
		],
		["meta", { name: "msapplication-TileColor", content: "#000000" }],
	],
	base: "/docs/",
	themeConfig: {
		logo: "/images/favicon-theme.png",
		nav: require("./nav.js"),
		sidebar: "auto",
		lastUpdated: "更新时间",
	},
	markdown: {
		// 为代码块添加行数
		lineNumbers: true,
	},
	plugins: [
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
	],
};

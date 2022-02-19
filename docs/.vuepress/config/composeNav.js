const nav = require("./nav");

let composeNav = [...nav];
composeNav.unshift({ text: "首页", link: "/", target: "_self" });
composeNav.push({text: "GitHub", link: "https://github.com/web-wj/docs"})

module.exports = composeNav;

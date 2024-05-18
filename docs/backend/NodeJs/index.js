// 深度遍历文件夹里面的 .avi 文件
import * as fs from 'fs'
function walk(path) {
  var files = fs.readdirSync(path);
  files.forEach(function (item) {
    var tmpPath = path + '/' + item;
    var stats = fs.statSync(tmpPath);
    if (stats.isDirectory()) {
      walk(tmpPath);
    } else {
      if (path.indexOf('avi') > -1) {
        console.log(tmpPath);
      }
    }
  });
}

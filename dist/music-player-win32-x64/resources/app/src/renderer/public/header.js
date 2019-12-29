const { $ } = require('../../tool/myDOM');
const { ipcRenderer } = require('electron');
let minButton = $('.min'); // 主窗口-最小化
let closeButton = $('.close'); // 主窗口-关闭
let listMin = $('.list-min'); // 音乐列表-最小化
let listClose = $('.list-close'); // 音乐列表-关闭


// 添加点击事件-向主进程发送请求
function addWindowEvent(dom, incident) {
  if(dom) {
    dom.onclick = function () {
      ipcRenderer.send(incident);
    }
  }
  
}
// 最小化
addWindowEvent(minButton, 'window-min');
// 关闭
addWindowEvent(closeButton, 'window-close');

// 音乐列表最小化
addWindowEvent(listMin, 'list-min');

// 音乐列表关闭
addWindowEvent(listClose, 'list-close');


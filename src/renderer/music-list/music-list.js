const { $ } = require('../../tool/myDOM.js');
const { ipcRenderer } = require('electron');
const renderMusicList = require('./render-music-list.js'); // 渲染音乐列表

let addMusic = $('.add'); // 添加音乐按钮
let musicList = $('.music-list'); // 存放音乐的容器




// 添加音乐到播放列表
addMusic.onclick = function (e) {
  ipcRenderer.send('add-music');
}

// 监听渲染列表事件
ipcRenderer.on('getTracks', function(event, file) {
  renderMusicList(musicList, file);
});
const {app, BrowserWindow, Menu, ipcMain, dialog} = require('electron');
const myWindow = require('./src/tool/createWindow.js'); // 快速创建窗口
const { mainWindow, subWindow } = require('./modules/button.js');  // 窗口按钮的点击事件-最大化-最小化-关闭
const dataStore = require('./src/tool/MusicDataStore.js'); // 本地保存数据
// 默认的文件名字
const myStore = new dataStore({'name': 'music Data'});

// 主窗口
let win = null;

// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', function () {
  // 隐藏窗口菜单
  Menu.setApplicationMenu(null);
  // 创建第一个窗口
  win = new myWindow({
    width: 600, 
    height: 620, 
    transparent: true, 
    frame: false,
  }, './src/renderer/home/index.html');
  // 打开控制台
  // win.webContents.openDevTools();
  // 给窗口添加事件-最大化-最小化-关闭
  mainWindow(win);
  // 主窗口加载完成之后触发
  win.webContents.on('did-finish-load', (event) => {
    // 主窗口传递数据
    win.send('getTracks', myStore.getTracks());
  });
  // 打开音乐列表
  ipcMain.on('open-music-list', function() {
    let list = new myWindow({
      width: 460,
      height: 600,
      transparent: true,
      frame: false,
      parent: win
    }, './src/renderer/music-list/music-list.html');
    // list.webContents.openDevTools();
    subWindow(list);
    // 窗口加载完成之后触发
    list.webContents.on('did-finish-load', (event) => {
      // 主窗口传递数据
      list.send('getTracks', myStore.getTracks());
    });
  });
});

// 添加音乐到播放列表
ipcMain.on('add-music', function(event) {
  dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections'],
    filters: [{ name: 'Images', extensions: ['mp3'] }]
  }).then((result) => {
    if(!result.canceled) {
      // 返回给渲染进程
      let fileData = myStore.addTracks(result.filePaths).getTracks();
      // 通知音乐列表页面渲染音乐
      event.sender.send('getTracks', fileData);
      // 主窗口获取音乐列表
      win.send('getTracks', fileData);
    }
    
  });
});

// 删除音乐
ipcMain.on('delete-music', (event, id) => {
  // 如果有数据
  if(id) {
    // console.log('删除的ID是', id);
    myStore.delTracks(id);
    let Tracks = myStore.getTracks();
    // 返回删除后的数据
    event.sender.send('getTracks', Tracks);
    // 把删除后的数据返回给播放器窗口
    win.send('getTracks', Tracks);
  }
});

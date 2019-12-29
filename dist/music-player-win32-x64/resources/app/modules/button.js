const { ipcMain } = require('electron');
/* 主窗口 */
function mainWindow(win) {
  // 最小化
  ipcMain.on('window-min', () => {
    if (win && !win.isDestroyed()) {
      win.minimize();
    }
  });
  // 最大化
  ipcMain.on('window-max', (event) => {
    if (win && !win.isDestroyed()) {
      if (win.isMaximized()) {
        win.unmaximize();
        event.preventDefault();
      } else {
        win.maximize();
        event.preventDefault();
      }
    }
  })
  // 关闭
  ipcMain.on('window-close', (event) => {
    if (win && !win.isDestroyed()) {
      win.close();
      event.preventDefault();
    }
  })
}
/* 音乐列表窗口 */
function subWindow(win) {
  // 最小化
  ipcMain.on('list-min', () => {
    if (win && !win.isDestroyed()) {
      win.minimize();
    }
  });
  // 最大化
  ipcMain.on('list-max', (event) => {
    if (win && !win.isDestroyed()) {
      if (win.isMaximized()) {
        win.unmaximize();
        event.preventDefault();
      } else {
        win.maximize();
        event.preventDefault();
      }
    }
  })
  // 关闭
  ipcMain.on('list-close', (event) => {
    if (win && !win.isDestroyed()) {
      win.close();
      event.preventDefault();
    }
  })
}

module.exports = {
  mainWindow,
  subWindow
}
const { BrowserWindow } = require('electron');

class myWindow extends BrowserWindow {
  constructor(options, file) {
    const baseOption = {
      width: 800,
      height: 600,
      // 在网页中可以使用 nodejs 的API
      webPreferences: {
        nodeIntegration: true
      }
    }
    let obj = {
      ...baseOption,
      ...options
    }
    super(obj);
    // 加载html文件
    if(file) {
      this.loadFile(file);
    }
    // 优雅地显示窗口-页面加载完成后显示窗口
    this.once('ready-to-show', () => {
      this.show();
    })
  }
}

module.exports = myWindow;
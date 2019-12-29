const Store = require('electron-store'); // 本地文件存储
const uuid = require('uuid'); // 获取一个id
const path = require('path');

class DataStore extends Store {
  constructor(options) {
    super(options);
    // 获取保存到的路径
    this.tracks = this.get('tracks') || [];
  }
  // 保存路径
  saveTracks() {
    this.set('tracks', this.tracks);
    return this;
  }
  // 获取路径
  getTracks() {
    return this.get('tracks') || [];
  }
  // 添加路径到文件
  addTracks(tracks) {
    
    // 传进来的是一个数组
    const tracksWithProps = tracks.map(track => {
      return {
        id: uuid(), 
        path: track,
        fileName: path.basename(track)
      }
    }).filter(track => {
      const currentTracksPath = this.getTracks().map(tra => tra.path);
      return !currentTracksPath.includes(track.path);
    });
    
    // 保存新的数据
    this.tracks = [...this.tracks, ...tracksWithProps];
    
    return this.saveTracks();
  }
  // 删除路径
  delTracks(id) {
    this.tracks = this.tracks.filter(item => {
      if(item.id !== id) {
        return item;
      }
      
    });
    // 保存
    return this.saveTracks();
  }
}

module.exports = DataStore;
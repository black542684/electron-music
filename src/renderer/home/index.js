const { $ } = require('../../tool/myDOM'); // 通过 获取DOM
const { ipcRenderer } = require('electron');
const computedTime = require('../public/timeFormat.js'); // 秒转换成分钟


let love = $('.\-favorite'); // 收藏按钮
let music = $('.music-list'); // 音乐列表--按钮
let play = $('.js-play'); // 播放按钮
let prev = $('.prev'); // 上一首
let next = $('.next'); // 下一首
let totalTime = $('.progress__duration'); // 总时间
let currentTime = $('.progress__time'); // 当前时间
let progress = $('.progress__current'); // 进度条
let progressBar = $('.progress__bar'); // 进度条父容器

let use = play.querySelector('use'); // 需要更改的播放标签
let musicName = $('.album-info__name'); // 音乐名字

// 音乐播放器
let audio = $('.audio');

// 保存本地的音乐路径
let musidData = [];
let musicIndex = 0;  // 播放的是第几首歌
let musicID = '';  // 保存当前播放的歌曲ID



// 添加点击事件-向主进程发送请求
function addWindowEvent(dom, incident) {
  dom.onclick = function () {
    ipcRenderer.send(incident);
  }
}

// 进度条事件
function updateBar(x) {
  let progressParent = $('.progress'); // 存放进度条容器
  let maxduration = audio.duration; // 音乐时长
  let position = x - progressParent.offsetLeft;
  let percentage = (100 * position) / progressParent.offsetWidth;
  if (percentage > 100) {
    percentage = 100;
  }
  if (percentage < 0) {
    percentage = 0;
  }
  // 进度条
  progress.style.width = percentage + "%";

  // this.circleLeft = percentage + "%";
  use.href.baseVal = '#icon-pause'; // 图标修改
  audio.currentTime = (maxduration * percentage) / 100;
  audio.play();
}

// 收藏按钮
let loveclass = love.classList;
love.onclick = function (e) {
  loveclass.toggle('active');
}
// 监听音乐列表事件--获取音乐列表
ipcRenderer.on('getTracks', function(event, file) {
  musidData = file;
});

// 播放音乐按钮
play.onclick = function (e) {
  if(!musidData.length) return alert('请添加音乐！');

  if(use.href.baseVal == '#icon-play') {
    // 播放
    use.href.baseVal = '#icon-pause';
    //  TODO： 这里是播放音乐的逻辑

    if(musidData[musicIndex]) {

      // 如果有这首歌
      let musicPath = musidData[musicIndex].path;
      // 当前歌曲ID
      let currentId = musidData[musicIndex].id
      // 这里判断是新歌-还是暂停后继续播放
      if(musicID !== currentId) {
        // 新歌
        audio.src = musicPath;
        musicID = currentId;
        // 获取音乐名字
        musicName.innerHTML = musidData[musicIndex].fileName;
        console.log('新歌');
      } 
      audio.play();
      
    }
    

  } else {
    // 暂停
    use.href.baseVal = '#icon-play';
    audio.pause();
  }
}

// 上一首
prev.onclick = function (e) {
  if(!musidData.length) return alert('请添加音乐！');

  musicIndex -= 1;

  if(musicIndex < 0) {
    musicIndex = musidData.length - 1; // 最后一首
  }
  // 播放
  use.href.baseVal = '#icon-pause';
  // 如果有这首歌
  let musicPath = musidData[musicIndex].path;
  // 当前歌曲ID
  let currentId = musidData[musicIndex].id
  musicID = currentId;
  audio.src = musicPath;
  audio.play();
  // 获取音乐名字
  musicName.innerHTML = musidData[musicIndex].fileName;

}

// 下一首
next.onclick = function (e) {
  if(!musidData.length) return alert('请添加音乐！');

  musicIndex += 1;
  if(musicIndex >= musidData.length) {
    musicIndex = 0; // 第一首
  }
  // 播放
  use.href.baseVal = '#icon-pause';
  // 如果有这首歌
  let musicPath = musidData[musicIndex].path;
  // 当前歌曲ID
  let currentId = musidData[musicIndex].id
  musicID = currentId;
  audio.src = musicPath;
  audio.play();
  // 获取音乐名字
  musicName.innerHTML = musidData[musicIndex].fileName;

}

// 点击进度条
progressBar.onclick =  function (e) {
  if(!musidData.length) return alert('请添加音乐！');
  audio.pause();
  updateBar(e.pageX);
}

// 打开音乐列表
addWindowEvent(music, 'open-music-list');

// 监听音频时间事件
audio.addEventListener('timeupdate', function () {
  
  // 总时间
  let amount = audio.duration;
  // console.log('amountTime', amountTime);
  // 当前时间
  let current = audio.currentTime;
  
  // 当前时间
  currentTime.innerHTML = computedTime(current);
  // 总时间
  totalTime.innerHTML = computedTime(amount);
  // 进度条
  progress.style.width = `${(current / amount) * 100}%`;

});
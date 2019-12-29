const { ipcRenderer } = require('electron');
// 渲染音乐列表
module.exports = function(dom, flie) {
  if(!Array.isArray(flie)) return '';

  let list = '';
  list = flie.reduce((acc, value) => {
    acc += `
      <li>
        ${value.fileName}
        <span data-id="${value.id}" class="iconfont icon-delete"></span>
      </li>
    `;
    return acc;
  }, '');
  dom.innerHTML = list ? list : `<li style="text-align: center;">请添加音乐</li>`;
  // 利用事件代理给每个删除按钮添加事件
  dom.onclick = function (e) {
    let element = e.target;
    let classlist = element.classList;
    // 只有是删除按钮点击才有效果
    if(classlist.contains('icon-delete')) {
      let id = element.dataset.id;
      // 把ID发送-删除歌曲
      ipcRenderer.send('delete-music', id);
    }
  }

}
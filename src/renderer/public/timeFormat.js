// 时间转换
function computedTime(current) {
  if(isNaN(current)) return '00:00';
  // 分钟
  let minute = Math.floor(current / 60);
  minute = '0' + minute;
  // 秒
  let sceond = Math.floor(current - minute * 60);
  sceond = '0' + sceond;
  return `${minute.substr(-2)}:${sceond.substr(-2)}`
}

module.exports = computedTime;
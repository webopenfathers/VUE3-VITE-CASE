export function getDateDiff(dateTimeStamp) {
  // 要比较的时间变量
  let compareTime = new Date(dateTimeStamp)
  let timestamp = compareTime.getTime()
  let compareMonth = compareTime.getMonth() + 1
  let compareDay = compareTime.getDate()
  let compareHour = compareTime.getHours()
  let compareMinute = compareTime.getMinutes()

  //结果
  let result
  if (isToday(timestamp)) {
    result = `今天${zeroize(compareHour)}:${zeroize(compareMinute)}`
  } else if (isYesterday(timestamp)) {
    result = `昨天${zeroize(compareHour)}:${zeroize(compareMinute)}`
  } else {
    result = `${zeroize(compareDay)}/${zeroize(compareMonth)}`
  }
  return result
}

// 补0
function zeroize(num) {
  return num < 10 ? '0' + num : num
}

// 判断是否是昨天
function isYesterday(time) {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const today = `${year}/${month}/${day}`
  const todayTime = new Date(today).getTime() // 当天凌晨的时间
  const yesterdayTime = new Date(todayTime - 24 * 60 * 60 * 1000).getTime() // 昨天凌晨的时间
  return time < todayTime && yesterdayTime <= time
}

// 判断是否是今天
function isToday(time) {
  const now = new Date()
  const todayStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).getTime()
  const tomorrowStart = new Date(todayStart + 24 * 60 * 60 * 1000).getTime()

  return time >= todayStart && time < tomorrowStart
}

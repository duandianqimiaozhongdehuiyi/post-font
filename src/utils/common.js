/*
 * @Author: your name
 * @Date: 2021-03-10 16:46:00
 * @LastEditTime: 2021-03-10 16:58:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\utils\common.js
 */
const getElementY = (elem) => {
  return window.pageYOffset + document.querySelector(elem).getBoundingClientRect().top
}

/**
 * 滚动到置顶的元素
 * @param {String} elem DOM元素
 * @param {Number} duration 滚动动画执行的时间
 * @param {Number} offset 滚动的偏移量
 */
const scrollToElement = (elem, duration, offset) => {
  // 初始位置
  const startingY = window.pageYOffset
  const elementY = getElementY(elem)
  const diff = elementY - startingY + offset
  const easing = (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 1) * (2 * t - 2) + 1)
  let start
  // diff 0
  if (!diff) return
  window.requestAnimationFrame(function step(timestamp) {
    if (!start) {
      start = timestamp
    }
    // 计算时间的差值，根据差值计算偏移量
    const time = timestamp - start
    let percent = Math.min(time / duration, 1)
    percent = easing(percent)
    window.scrollTo(0, startingY + diff * percent)
    if (time < duration) {
      window.requestAnimationFrame(step)
    }
  })
}

export { scrollToElement }

const arrowLeft =
  `<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left left-btn" title="PREV">
    <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z" /></svg></div>
  </button>`
const arrowRight =
  `<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right rgt-btn" title="NEXT">
    <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z" /></svg></div>
  </button>`
// 可翻页
// popup when click
// 可以用 fancybox
$.fn.marquee = function (options = {}) {
  const { time = 1000 } = options
  const _this = $(this)
  const $imgs = _this.find('img')
  const width = $($imgs[0]).width()
  const numOfImg = $imgs.length
  let curIndex = 0, timer = null, wrapper = null, $img_wrapper = null 
  // 初始化dom
  init()
  // 轮播
  start()
  // 右箭头事件
  $('.left-btn').on('click', (e) => {
    left()
  })
  // 左箭头事件
  $('.rgt-btn').on('click', (e) => {
    right()
  })
  // hover
  _this.on('mouseenter', (e) => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    _this.find('button').show()
  })
  // hover
  _this.on('mouseleave', (e) => {
    _this.find('button').hide()
    start()
  })
  
  function init() {
    // 处理图片结构
    _this.empty()
    const doms = Array.from($imgs).map((item, index) => {
      const tag = document.createElement('a')
      $(tag)
        .attr({
          'src': $(item).attr('src'),
          'data-fancybox': 'images',
          'data-caption': 'img'
        })
        .append(item)
      return tag
    })
    _this.append(doms)
    _this.find('a:eq(0)').clone().appendTo(_this)
    // 添加箭头
    _this.append(arrowLeft)
    _this.append(arrowRight)
    $img_wrapper = _this.find('a')
    resetPosition()
  }
  function right() {
    curIndex++
    if (curIndex > numOfImg) {
      resetPosition()
      curIndex = 1
    }
    render()
  }
  function left() {
    curIndex--
    if (curIndex < 0) {
      resetPosition(numOfImg)
      curIndex = numOfImg - 1
    }
    render()
  }
  function render() {
    Array.from($img_wrapper).forEach((item, index) => {
      renderItem(item, index)
    })
  }
  function renderItem(dom, index) {
    const $dom = $(dom)
    if ($dom.is(":animated")) {
      return;
    }
    $dom.stop(true, true).animate({left: width * (index - curIndex)}, 300)
  }
  function resetPosition(curIndex = 0) {
    Array.from($img_wrapper).forEach((item, index) => {
      $(item).css('left', width * (index - curIndex))
    })
  }
  function start() {
    timer = setTimeout(() => {
      right()
      start()
    }, time)
  }
}

Page({
  data: {
    currentImageIndex: 0,
    images: [
      '/images/伯爵旅拍-国家_地区.png',
      '/images/伯爵旅拍-国家_地区 (2).png',
      '/images/xunzhang.png',
      '/images/古今并序.gif',
      '/images/三脉交辉.gif'
    ],
    currentImage: '/images/伯爵旅拍-国家_地区.png',
    touchStartY: 0, // 记录触摸开始时的纵坐标
    touchEndY: 0,   // 记录触摸结束时的纵坐标
  },

  // 触摸开始事件
  touchStart: function(e) {
    this.setData({
      touchStartY: e.changedTouches[0].pageY
    });
  },

  // 触摸结束事件
  touchEnd: function(e) {
    const touchEndY = e.changedTouches[0].pageY;
    const Y = this.data.touchStartY - touchEndY;

    // 判断滑动方向，Y 大于一定值时认为是向上滑动
    if (Y > 50) {
      this.nextImage();
    } else if (Y < -50) {
      this.prevImage();
    }
  },

  // 切换到下一张图片
  nextImage: function() {
    const nextIndex = (this.data.currentImageIndex + 1) % this.data.images.length;
    this.setData({
      currentImageIndex: nextIndex,
      currentImage: this.data.images[nextIndex]
    });
  },

  // 切换到上一张图片
  prevImage: function() {
    const prevIndex = (this.data.currentImageIndex - 1 + this.data.images.length) % this.data.images.length;
    this.setData({
      currentImageIndex: prevIndex,
      currentImage: this.data.images[prevIndex]
    });
  },
});

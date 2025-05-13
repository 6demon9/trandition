Page({
  onReady: function() {
    const ctx = wx.createCanvasContext('myCanvas', this);

    // 图片路径
    const imagePath = '/images/海珠广场.png';

    // 绘制背景图片
    ctx.drawImage(imagePath, 0, 0, 300, 400); // 这里假设图片尺寸是300x400px

    // 绘制标记（假设标记位置的坐标是 (150, 200)）
    const markerX = 150;
    const markerY = 100;
    ctx.beginPath();
    ctx.arc(markerX, markerY, 10, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();

    // 渲染
    ctx.draw();
  }
});

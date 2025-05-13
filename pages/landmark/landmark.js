Page({
  data: {
    redLineAnimation: {},  // 用于存储动画对象
  },

  // 定义一个函数来创建和执行红线动画
  createRedLineAnimation: function(delayTime = 0, targetHeight = '120%') {
    const animation = wx.createAnimation({
      duration: 14000,  // 动画持续时间 6秒
      timingFunction: 'linear',  // 动画均匀变化
    });

    // 设置延迟时间后执行动画
    setTimeout(() => {
      animation.height(targetHeight).step();  // 设置动画的目标高度
      this.setData({
        redLineAnimation: animation.export(),  // 导出动画并更新数据
      });
    }, delayTime);  // 延迟时间（单位：毫秒）
  },

  onLoad: function() {
    this.showImagesInSequence();
  },

  
  
    onLoad: function() {
      this.showImagesInSequence();
    },
  
    onLoad: function() {
      // 先设置所有图片的初始状态
      this.initImages();
      
      // 等待一小段时间后开始动画
      setTimeout(() => {
        this.showImagesInSequence();
        this.createRedLineAnimation(1000, '90%');  // 延迟 2000 毫秒，目标高度 60%
      }, 1000);

      
  
    },
    
    initImages: function() {
      const imageIds = [
        'image1', 'image2', 'image3', 'image4', 'image5',
        'image6', 'image7', 'image8', 'image9', 'image10',
        'image11'
      ];
      
      // 创建初始动画
      let initAnimation = wx.createAnimation({
        duration: 0,  // 立即执行
        timingFunction: 'ease',
      });
      initAnimation.opacity(0).scale(0.5).step();
      
      // 设置所有图片的初始状态
      const dataToUpdate = {};
      imageIds.forEach(id => {
        dataToUpdate[`${id}.animation`] = initAnimation.export();
      });
      this.setData(dataToUpdate);
    },
  
    showImagesInSequence: function() {
      const imageIds = [
        'image1', 'image2', 'image3', 'image4', 'image5',
        'image6', 'image7', 'image8', 'image9', 'image10',
        'image11'
      ];
  
      imageIds.forEach((id, index) => {
        let animation = wx.createAnimation({
          duration: 1000,
          timingFunction: 'ease',
        });
        
        // 延迟设置显示和放大的动画
        setTimeout(() => {
          animation.opacity(1).scale(1).step();
          this.setData({
            [`${id}.animation`]: animation.export(),
          });
        }, index * 1500);  // 每个图片的动画间隔
      });
    }
  });
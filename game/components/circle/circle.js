Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    bg: {            // 属性名
      type: String,   // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: 'bg'     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    draw: {
      type: String,
      value: 'draw' 
    },

  },
  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: { 
    size: 0, /* 圆环盒子大小 size >= 2*x ( x 为canvas的绘制半径)*/
    step:1,
    num: 100  
  },
  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    /*
     * 公有方法
     */
    drawCircleBg: function (id, x, w) {
      // 设置圆环外面盒子大小 宽高都等于圆环直径
      this.setData({
        size: 2*x
      });
      // 使用 wx.createContext 获取绘图上下文 ctx  绘制背景圆环
      var ctx = wx.createCanvasContext(id)
      ctx.setLineWidth(w / 2);
      ctx.setStrokeStyle('#20183b');
      ctx.setLineCap('round')
      ctx.beginPath();//开始一个新的路径
      //设置一个原点(x,y)，半径为r的圆的路径到当前路径 此处x=y=r
      ctx.arc(x, x, x - w, 0, 2 * Math.PI, false);
      ctx.stroke();//对当前路径进行描边
      ctx.draw();
    },
    drawCircle: function (id, x, w, step) {
      // 使用 wx.createContext 获取绘图上下文 context  绘制彩色进度条圆环
      var context = wx.createCanvasContext(id);
      // 设置渐变
      var gradient = context.createLinearGradient(2*x, x, 0);
      gradient.addColorStop("0", "#2661DD");
      gradient.addColorStop("0.5", "#40ED94");
      gradient.addColorStop("1.0", "#5956CC");
      context.setLineWidth(w);
      context.setStrokeStyle(gradient);
      context.setLineCap('round')
      context.beginPath();//开始一个新的路径
      // step 从0到2为一周
      context.arc(x, x, x - w, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
      context.stroke();//对当前路径进行描边
      context.draw()

    },
     /*
     * 内部私有方法建议以下划线开头
     * triggerEvent 用于触发事件
     */
    _runEvent(){
      //触发回调
      this.triggerEvent("runEvent")
    }
  },
  onReady: function () {
    
  }
})
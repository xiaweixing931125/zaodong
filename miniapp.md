## 微信小程序分享与禁止分享相关API

### - onShareAppMessage
  - 只有定义了此事件处理函数，右上角菜单才会显示“转发”按钮
  - 页面不注册这个监听函数,点击右上角的三个点是不会有转发功能的.
  - 需要注意的是: 百度移动统计的sdk.js代码里面含有onShareAppMessage这个函数,会把分享功能调起;可以通过wx.hideShareMenu来关闭分享功能
   
```
 wx.hideShareMenu({
       menus: ['shareAppMessage', 'shareTimeline']
 })
```

### - updateShareMenu
 - 在小程序插件中使用时，只能在当前插件的页面中调用
 - withShareTicket
    - boolean 默认false 
    - 若为true,转发出去的小程序被二次打开的时候能够获取到一些信息，例如群的标识。
    - shareTicket这个参数的获取只有在发送到群里,在群内打开才会获取到,发送到个人并打开是获取不到这个参数的.
    - 可以在 App.onLaunch 或 App.onShow 获取到一个 shareTicket。通过调用 wx.getShareInfo 接口传入此 shareTicket 可以获取到转发信息
    - 这个参数的true和false是不影响是否私密转发的功能.
        
```
onShow(e) {
    console.log(e.shareTicket)
    wx.getShareInfo({
      shareTicket: e.shareTicket,
      success(res){
        console.log(res)
      }
    })
  }
```

- isPrivateMessage
    - boolean 默认false
    - 通过 wx.updateShareMenu 接口声明本次分享的消息为私密消息，私密消息具有不可二次转发性(在群内和个人均不能长按分享出来的卡片再次进行分享)。

#### - 设置私密消息代码如下
        
```
    wx.updateShareMenu({
        isPrivateMessage: true,
    })
```
- 长按分享卡片可以分享的示例
- ![image](https://alicdn.herdsric.com/revp-2021-0120-test/share1.jpg)
- 长按分享卡片不可以分享的示例
- ![image](https://alicdn.herdsric.com/revp-2021-0120-test/share2.jpg)
 

# 小程序 修改第一页page命令行工具

参见：[setpage](https://github.com/keyboard3/setpage)
快速查看指定页效果的命令行工具

### 安装
```bash
npm install -g wx-setpage
```
###使用
 - 命令行进入小程序目录（支持wepy）
 - setpage page参数
###注意
page参数即在app.json中设置的path路径。这里支持正则匹配，所以只需要简写page名称就行</br>
执行结果会将匹配的path路径从app.json中调整至首位来改变小程序显示的第一页显示效果
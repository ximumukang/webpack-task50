## 百度前端技术学院2016年task50,-问卷系统
### 使用
  ```
  git clone https://github.com/ximumukang/webpack-task50.git
  cd webpack-task50
  npm install
  npm run start/build
  ```
---
该项目是自学前端2个半月后，开始做的。那时正好学完jQuery，看了一半的高程。
 
下载GitHub上已完成该任务的一位前辈的代码，本想模仿学习，可是他用的模块化开发，那时的我根本看不懂。因此只能将他的作品当做ui效果，用jQuery去实现。这是第一次做比较复杂的项目，一开始根本不知道怎么下手，慢慢完成一部分，一部分。半个月既然给完成。独立开发完成，这项目给了我很大的成就感。
 
那时急于去完成，也没在乎优化、怎么可维护、解耦合方面，并且当初也不懂。
 
日历插件也没有思路，就在网上随便找了个。

---
回过头来，看当初写的代码，惨不忍睹，现打算慢慢优化。

---

### To-do List

- [x] 自己实现日历插件
- [x] 将模态框分离出来
- [x] 编辑页和编辑保存页中相同的方法分出来，有利于维护
- [x] 使用font awesome增强用户体验
- [x] 模块化开发，使用webpack工具进行打包优化
- [x] 加入tooltip,鼠标放在查看数据页上的饼图，可以看到相应的比例

 ---
### 疑问
- 照着[webpack2.x开发实践](https://zhuanlan.zhihu.com/p/26645496)
实现的webpack多页面开发的配置。自己使用一些插件时总是报错。
- webpack打包生成的网页，会出现内容无样式闪烁。还不知道问题出在哪里，该怎么弄。
---
### 小技巧
- 手机测试电脑上网页效果

    先下载一个草料二维码插件，下载地址 http://cli.im/news/6527 ，
    下载好了就安装在chrome浏览器上。
    再用node.js建立本地服务器。

    node.js 建立本地服务器具体流程和 方法:
    1、先下载安装node.js 下载地址 https://nodejs.org/en/ 无脑点击安装、下一步就好了，安装好了 就进行下面第二步
    2、用Node.js 建立本地服务器方法步骤 http://jingyan.baidu.com/article/19020a0a02ff67529c28425f.html?qqpfto=pcqq.discussion
    服务器和二维码插件安装好了，就可以用你的手机扫描服务器上的html文件，
    用手机看电脑上的页面效果，杠杠的

    来源：http://www.imooc.com/wenda/detail/340507




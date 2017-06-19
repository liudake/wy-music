## Vue-QiGeMusic
#### 简介：
没事的时候自己喜欢听听歌，然后自己就定义写一个仿音乐的WEBAPP<br>
顺便进一步加深下自己对移动端的知识。我会在每个核心组件和部分都加下注解大致说明原理，争取提供一个良好的代码阅读环境<br>
欢迎大家的star啦😄~<br>
下面将分享我的DIY之路-Vue音乐播放器。<br>

#### 原理简介：
首先这里通过Jsonp来进行跨域获取QQ音乐API数据，在[API Hanler](https://github.com/liudake/qiqi-music/blob/master/src/api/recommend.js)对API进行处理导出统一的方法来获取数据。
vuex状态管理 核心文件则是在[Store](https://github.com/liudake/qiqi-music/tree/master/src/store)<br>APP灵魂所在，在这里使用Vuex统一管理页面歌手列表，歌曲播放状态，播放是否展开，播放列表，播放模式，播放当前歌曲等信息，然后对相应的变化做出全局改变。

## 技术栈
- Vue全家桶（使用Vue-cli作为构建工具）
- Webpack
- Mint-Ui
- Es6
- Stylus
- Promise
- 移动端经典布局（flex）
- sessionStorage、localStorage（本地存储)
- jsonp, Bscroll等第三方库

#### 运行截图：
<div align="space-between">
    <img src="https://github.com/liudake/wy-music/blob/master/src/assets/index.gif" width="375" height="667">
    <img src="https://github.com/liudake/wy-music/blob/master/src/assets/singer.gif" align="right" width="375" height="667">
    <img src="https://github.com/liudake/wy-music/blob/master/src/assets/search.gif" align="right" width="375" height="667">
</div>

## 项目组件
- [x] 首页 -- 完成
- [x] 轮播图 -- 完成
- [X] 歌手信息 -- 完成
- [X] 歌手列表 -- 完成
- [x] 歌曲排行 -- 完成
- [x] 歌曲列表 -- 完成
- [x] 热门推荐 -- 完成
- [x] 歌曲搜索 -- 完成
- [x] 本地缓存 -- 完成
- [x] 歌曲播放 -- 完成
- [x] 懒加载 -- 完成
- [ ] 个人中心 -- 未完成
- [x] 底部固定歌曲播放条 -- 完成

## 项目结构 ##
```

|-- build                            	// webpack配置文件
|-- config                           	// 项目打包路径
|-- src                              	// 源码目录
|   |-- api                          	// QQ音乐Api分析文件
|       |-- recommend.js                
|   |-- assets                       	// 图片资源文件
|   |-- base                            // 全局组件
|   |-- common                       	// 全局配置
|       |-- fonts                       // 图标
|       |-- image                       // 懒加载图片
|       |-- js                          // 常用业务逻辑
|       |-- stylus                      // 常用CSS样式
|   |-- components                   	// 组件
|       |-- disc.vue                    // 公用后退组件
|       |-- m-header.vue                // 头部组件
|       |-- music-list.vue              // 音乐列表组件
|       |-- player.vue                  // 音乐播放器组件
|       |-- playlist.vue                // 音乐播放器列表组件
|       |-- rank.vue                    // 歌曲排行榜组件
|       |-- recomlist.vue               // 首页推荐播放列表组件
|       |-- recommended.vue             // 首页轮播图
|       |-- search.vue                  // 搜索界面组件
|       |-- singer.vue                  // 歌手界面组件
|       |-- singer-detail.vue           // 歌手详情界面组件
|       |-- suggest.vue                 // 搜索页面上拉加载组件
|       |-- tab.vue                     // tab选项组件
|       |-- toplist.vue                 // 排行榜详情页面组件       
|   |-- router                       	// Vue 路由
|       |-- index.js
|   |-- store                        	// Vuex Store文件，APP核心所在
|       |-- actions.js                  // 所有的异步操作管理
|       |-- getters.js                  // 所有的映射管理
|       |-- index.js                    // 状态管理入口
|       |-- mutation-type.js            // 配置相关的名称
|       |-- mutations.js                // 需要更改的操作管理 
|       |-- state.js                    // 所有状态管理
|   |-- App.vue                      	// App入口文件
|   |-- main.js                      	// 程序入口文件，加载Vuex,Vue-router等插件
|-- .babelrc                         	// ES6语法编译配置
|-- .editorconfig                    	// 代码编写规格
|-- .eslintignore                    	// Eslint 忽略的文件
|-- .eslintrc.js                     	// EsLint 配置 暂未使用
|-- .gitignore                       	// git ingnore
|-- .postcssrc.js                    	// post css 配置文件
|-- README.md                        	// README
|-- index.html                       	// 入口html文件
`-- package.json                     	// 项目及工具的依赖配置文件

```
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

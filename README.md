# my-project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 功能
- 1、页面适配
- 2、登录、注册、忘记密码前后端
- 3、引用了百度地图
### 学习点

- 1、获取div高度不能直接使用document.getElementClassName('').clientHeight来获取，要通过定时器来获取
     1） 回调函数 
             回调函数不一定是异步 , 但异步一定有回调函数 
     2） 事件
     3） promise 承诺对象
- 2、百度地图的使用，点击时间，信息弹框的显示与隐藏
- 3、>>>深度选择器,在原生<style scoped>中才起作用
可以使用组合/deep/或::v-deep组合 - 两者都是别名，>>>并且工作完全相同
- 4、背景颜色渐变 linear-gradient(red, yellow, blue)
background: linear-gradient(to bottom,  #A46E92 0%,#27455D 100%);（左上角到右下角的线性渐变）
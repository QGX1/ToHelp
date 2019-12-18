import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './plugins/rem.js'

// rem
import "./js/flexible"
//导入字体样式
import "./assets/stylus/styles/fontstyle.css"
import "./assets/stylus/styles/index.styl"
// 引入图片查看器
// 移动端Vue.js图片预览插件
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview, {
  fullscreenEl: false, // 关闭全屏按钮
  zoomEl: false, //控制是否显示放大缩小按钮
})
Vue.use(ElementUI);
Vue.use(MintUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

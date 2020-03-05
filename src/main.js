import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './plugins/rem.js'
import VueLazyload from 'vue-lazyload';//图片懒加载
import Vconsole from'vconsole';
// 真机调试
const vConsole =new Vconsole();

// Vue.use(vConsole);
// rem
import "./js/flexible"
//导入字体样式
import "./assets/stylus/styles/fontstyle.css"
import "./assets/stylus/styles/index.styl"
// 引入图片查看器
// 移动端Vue.js图片预览插件
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
// 自定义插件
import {getRequest,postRequest,putRequest,deleteRequest} from './api/ajax';
Vue.prototype.getRequest=getRequest;
Vue.prototype.postRequest=postRequest;
Vue.prototype.putRequest=putRequest;
Vue.prototype.deleteRequest=deleteRequest;
// 时间轴组件
import hzqingVueTimeline from 'hzqing-vue-timeline'
Vue.use(hzqingVueTimeline)
Vue.use(preview, {
  fullscreenEl: false, // 关闭全屏按钮
  zoomEl: false, //控制是否显示放大缩小按钮
})
Vue.use(ElementUI);
Vue.use(MintUI);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  loading: 'dist/loading.gif',
  attempt: 1
})
Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

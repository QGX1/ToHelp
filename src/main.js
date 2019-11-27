import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'lib-flexible'
import './plugins/rem.js'

// rem
import "./js/flexible"
//导入字体样式
import "./assets/stylus/styles/fontstyle.css"
import "./assets/stylus/styles/index.styl"

Vue.use(ElementUI);
Vue.use(MintUI);
Vue.config.productionTip = false;

// window.onresize = setHtmlFontSize;
// function setHtmlFontSize(){
//     const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
//     const htmlDom = document.getElementsByTagName('html')[0];
//     htmlDom.style.fontSize = htmlWidth / 10 + 'px';
// };
// setHtmlFontSize();
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

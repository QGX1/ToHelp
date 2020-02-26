<template>
  <div id="app">
    <!-- <keep-alive>
      <router-view v-if="isRouterAlive&&$route.meta.keepAlive"></router-view>
    </keep-alive> -->
    <router-view v-if="isRouterAlive"></router-view>
    <footer-guide v-show="$route.meta.showFooter"></footer-guide>
  </div>
</template>
<script>
import FooterGuide from './components/footer'
export default {
  name:'app',
  provide(){
    return {
      reload:this.reload
    }
  },
  components:{
    FooterGuide
  },
data() {
  return {
    isRouterAlive:true
  }
},
created(){
  // 解决数据刷新vueX数据丢失的问题
  //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    } 
    // Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
},
mounted() {
    //window.onscroll = this.justifyPos;

  },
methods: {
  // 配置页面强制刷新
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
  }
}
</script>

<style lang="stylus">

#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 0px
</style>
<style lang='scss'>

//  /* rem 单位换算：定为 75px 只是方便运算，750px-75px、640-64px、1080px-108px，如此类推 */
// $vm_fontsize: 75; 
// /* // iPhone 6尺寸的根元素大小基准值 */
// @function rem($px) {
//      @return ($px / $vm_fontsize ) * 1rem;
// }
// // 根元素大小使用 vw 单位 
// $vm_design: 750;
// html {
//     font-size: ($vm_fontsize / ($vm_design / 2)) * 100vw; 
//     // 同时，通过Media Queries 限制根元素最大最小值
//     @media screen and (max-width: 320px) {
//         font-size: 64px;
//     }
//     @media screen and (min-width: 540px) {
//         font-size: 108px;
//     }
// }
//  /* body 也增加最大最小宽度限制，避免默认100%宽度的 block 元素跟随 body 而过大过小 */
// // body {
// //     max-width: 1024px;
// //     min-width: 320px;
// // }
</style>

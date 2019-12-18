<template>
   <!-- 底部路由 -->
  <footer class="footer_guide border-1px"> 
    <!-- :class="{on:isCurrent("/miste")}"监听路径, 修改样式-->

      <div class="guide_item" @click="goto('/home')" :class="{on: isCurrent('/home')}">
      <span class="item_icon">
        <i class="iconfont icon-1"></i>
      </span>
      <span>首页</span>
    </div>

    <div class="guide_item" @click="goto('/clockin')" :class="{on:isCurrent('/clockin')}">
      <span class="item_icon">
        <i class="iconfont icon-gongzuotai"></i>
      </span>
      <span>动态</span>
    </div>

    <div class="guide_item" @click="goto('/news')" :class="{on:isCurrent('/news')}">
      <span class="item_icon">
        <i class="iconfont icon-xiaoxi"></i>
      </span>
      <span>消息</span>
    </div>

    <div class="guide_item" @click="goto('/mine')" :class="{on:isCurrent('/mine')}">
      <span class="item_icon">
        <i class="iconfont icon-wode"></i>
      </span>
      <span>我</span>
    </div>
  </footer>
</template>

<script>
  export default {
    methods: {
      goto(path) {
        this.$router.replace(path)
      },
      isCurrent(path) {
        // console.log(this.$route.path)
        return this.$route.path === path

      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../assets/stylus/mixins.styl"
  .footer_guide
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    bottom 0px
    width 100%
    display: flex;
    background #ffffff
    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      margin 5px
      color #999999
      &.on
        color #02a774
      span
        font-size: 0.2rem;
        margin-top: 0rem;
        margin-bottom 2px
          .iconfont
            font-size 22px
    .iconfont
        font-size 0.7rem
</style>
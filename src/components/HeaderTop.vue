<template>
    <div>
        <header class="header">
            <slot name="left"></slot>
             <span class="header_title_text ellipsis">{{title}}</span>
            <slot  name="right" class="right"></slot>
        </header>
    </div>
</template>

<script>
export default {
    props:{
        // 父组件传值给子组件使用props
        title:String
    }
}
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
    .header
        background-color:#5bc5a4;
        height: 1rem;
        position fixed
        z-index 100
        left 0
        top 0
        width 100%
    .header_title_text 
        display: block;
        font-size: 0.6rem;
        margin-top: 0.2rem;
        color: #fff;
</style>



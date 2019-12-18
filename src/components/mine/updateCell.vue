<template>
    <div>
        <div class="cell-wrapper">
            <span class="cell-title">{{title}}</span>
            <slot name="left"></slot>
            <slot  name="right"></slot>
        </div>
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
    .cell-wrapper {
        width: 100%;
        border-bottom: 1px solid #e9e9e9;
        height: 1.2rem;
        text-align: left;
        font-size: 0.5rem;
        padding-top: 0.3rem;
    }
        
</style>



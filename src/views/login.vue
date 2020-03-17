<template>
    <div class="loginContainer login-bg" :style="contentStyleObj">
        <div class="loginInner">
            <div class="login_hearder">
                <h2 class="login_logo">互助</h2>
                <div class="login_hearder_title">
                    <a href="javascript:;" @click="setLoginWay(true)" :class="{on:loginWay}" >登录</a>
                    <a href="javascript:;" @click="setLoginWay(false)" :class="{on:!loginWay}">注册</a>
                </div>
            </div>
            <comlogin v-if="loginWay"></comlogin>
            <comregister v-else class="comregister" @listenRegisterEvent="showLogin"></comregister>
        </div>
    </div>
</template>

<script>
import comlogin from "../components/admin/comlogin.vue"
import comregister from "../components/admin/comregister.vue"
export default {
    data(){
        return{
            loginWay:true,
            // 页面宽度
            contentStyleObj:{
                height:'',
                width:''
            },
        }
    },
    components:{
        comlogin,
        comregister
    },
    methods: {
        getHeight(){
        // 获取浏览器高度
            this.contentStyleObj.height=window.innerHeight+'px';
            this.contentStyleObj.width=window.innerWidth+'px';
        },
        setLoginWay(loginWay){
            this.loginWay=loginWay
        },
        showLogin(data){
            // console.log(data)
            this.loginWay=data
        }
    },
    created(){
        window.addEventListener('resize', this.getHeight);
        this.getHeight()
        // console.log(this.contentStyleObj);
    },
    destroyed(){
        window.removeEventListener('resize', this.getHeight)
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../assets/stylus/mixins.styl"
    .loginContainer
        overflow hidden
        background-color #ffffff
        // background-image url('../assets/images/loginImg.jpg')
        background-size: cover
        height: 100%;
        width: 100%;
        position: page;
        top:0px;
        left:0px;
        right:0px;
        bottom:0px;
        .loginInner
            padding-top 15%
            width 80%
            text-align center
            margin 0 auto
            margin-left: 1rem;
            .login_hearder
                .login_logo
                    font-size 40px
                    font-weight bold 
                    color #8ba99f  
                    text-align center
                    margin-bottom 0px
                .login_hearder_title
                    padding-top 10%
                    text-align center      
                    >a
                        color #8ba99f
                        font-size 16px
                        margin-bottom 4px
                        &:first-child
                            margin-right 40px
                        &.on
                            color #02a774
                            font-weight 700
                            padding-bottom 5rpx
                            border-bottom 2px solid #02a774

</style>





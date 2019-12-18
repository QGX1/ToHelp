<template>
      <div class="login_content">
        <form @submit.prevent="login">
            <div>
                <section class="login_message">
                    <el-input
                        placeholder="邮箱"
                        v-model="user_email"
                        clearable
                        >
                    </el-input>
                </section>
                <section class="login_message">
                    <el-input type="password" placeholder="密码" v-model="user_password" v-if="!showPassword" ></el-input>
                    <el-input type="text" placeholder="密码" v-model="user_password" v-else></el-input>
                    <div class="switch_button" :class="showPassword? 'on': 'off'"
                        @click="changePasswordType">
                        <div class="switch_circle" :class="{right:showPassword}"></div>
                    </div>
                </section>
                <section class="login_message">
                    <el-input type="text" maxlength="11" placeholder="验证码" v-model="captcha"></el-input>
                    <!-- <img ref="captcha" class="get_verification" src=" http://172.16.221.16:7001/api/verify" @click="getCaptchaCode"> -->
                </section>
            </div>
            <input type="submit" value="登录" class="login_submit">
        </form>
        <br/>
        <a href="javascript:;" class="about_us" @click="inputEmail">忘记密码</a>
    </div>
</template>

<script>
import {MessageBox,Loading} from 'element-ui'
export default {
    data(){
        return{
            user_email:"",
            user_password:"",
            showPassword:false,
            captcha:""

        }
    },
    methods: {
        // 输入邮箱
        inputEmail(){
            this.$prompt('请输入邮箱', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
            inputErrorMessage: '邮箱格式不正确'
            }).then(({ value }) => {
                // 发送请求邮箱请求
                // 返回状态
            this.$message({
                type: 'success',
                message: '你的邮箱是: ' + value
            });
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '取消输入'
            });       
            });
        },
        // 消息提示弹框
        open(msg) {
            MessageBox({
                title: '提示',
                message: msg
            });
        },
        changePasswordType(){
          this.showPassword=!this.showPassword  
        },
        login(){
            let that=this;
            // 登录成功后跳转到主页面
            // try{
            //      // 发送登录请求
            //     that.$store.dispatch("toLogin",{
            //             user_email:that.user_email,
            //             user_password:that.user_password,
            //             captcha:that.captcha
            //         })
            //         // 请求成功
            //         .then(res=>{
            //             console.log(res)
            //             if(res.data.code===1){
            //                 that.$options.methods.open(res.data.msg)
            //             }                   
            //             // 存储用户信息到状态管理
            //             that.$store.dispatch('getUser',{
            //                 info:res.data.info
            //             })
            //             // 路由跳转到首页
            //             .then((res)=>{
            //                 console.log(res)
                            let redirectUrl = decodeURIComponent(that.$route.query.redirect || '/home');
            //                 // 跳转到指定的路由
                            that.$router.push({
                                path: redirectUrl
                            })
            //             })
            //     })
                
            // }catch(err){
            //     console.log(err)
            // }
        },
        // 点击获取验证码
        getCaptchaCode(){
            // this.$refs.captcha.src=' http://172.16.221.16:7001/api/verify?time='+new Date();
        }

    },
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    a.about_us {
        font-size: 16px;
    }
    .login_content
        width 100%
        height 100%
        >form
            >div
                display block
                >section 
                    margin-top 10px
                    .switch_button
                        font-size 12px
                        border 1px solid #dddddd
                        border-radius 8px
                        height: 15px;
                        width: 38px;
                        margin-top: -20px;
                        right: 12vw;
                        transition background-color .3s,border-color .03s
                        padding 0,6px
                        line-height 16px
                        color #fff
                        position absolute              
                        transform translateY(-50%)
                        &.off
                            background #fff                                                                                   
                        &.on
                            background #02a774
                        > .switch_circle
                            position absolute
                            top -1px
                            left -3px
                            width: 15px;
                            height: 15px;
                            border 1px solid #ddd
                            border-radius 50%
                            background #fff
                            box-shadow 0 2px 4px 0 rgba(0, 0, 0, .1)
                            transition transform .3s
                            &.right
                                transform translateX(32px)
                    .get_verification
                        position absolute
                        right 40px
                        top 50%
                        border 0
                        color #ccc
                        font-size 14px
                        background transparent
                        height 35px
            input 
                width 100%
                height 40px
                padding-left 10px
                box-sizing border-box
                border 1px solid #dddddd
                border-radius 4px
                outline 0
                font 400 14px inherit
                font-size inherit
                margin-top 20px
            .login_submit
                display block
                margin-top 30px
                background #4cd96f
                color #fff
                text-align center
                font-size 16px
                line-height 40px
                border 0 

    ins, a {
        text-decoration: none;
        color: #8ba99f;
    }                    
</style>

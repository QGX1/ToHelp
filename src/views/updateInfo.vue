<template>
    <div id="updateInfo">
            <HeaderTop title="个人信息">
            <!-- title为岗位 -->
                <div  slot="left" class="left" @click="toMine">
                    <span>
                        <i class="iconfont icon-fanhui1"></i>
                    </span>
                </div>
            </HeaderTop>
            <br/>
            <br/>
            <br/>
            <div class="userInfo" >
                <section class="userAvatar">
                    <span class="cell-title">头像</span>
                    <i class="iconfont icon-icon-test2 infoContent" ></i>
                    <img class="avatar infoContent" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573017585034&di=73d85c084764c80e5eac6d0f76abf5d4&imgtype=0&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201610%2F03%2F20161003145053_X25ky.jpeg" alt="用户头像" />  
                </section>
                <section class="userContent">
                    <div @click="$router.push({name:'updateusername'})">
                        <update-cell title='昵称'>
                            <i class="iconfont icon-icon-test2 infoContent" slot="left"></i>
                            <span slot="right" class="infoContent">小胖子</span>
                        </update-cell>
                    </div>
                    <div  @click="updateStatus">
                        <update-cell title='在职状态'>
                            <span slot="right" class="infoContent">{{jobStatus}}</span>
                        </update-cell>
                    </div>
                    
                </section>
                
            </div>
            <mt-actionsheet
                :actions="actions"
                v-model="userStatusVisible"
                > 
            </mt-actionsheet>
    </div>
</template>

<script>
import HeaderTop from "../components/HeaderTop";
import updateCell from "../components/mine/updateCell";
export default {
    name:'updateInfo',
    components:{
        HeaderTop,
        updateCell
    },
    data() {
        return {
            userStatusVisible:false,//用户状态
            jobStatus:'',
            userName:'',
            actions: [{
                name: '随时到岗',
                method : this.getUserStatus	// 修改用户的在职状态并存入数据库
             },
            {
                name: '在职',
                method : this.getUserStatus2	// 修改用户的在职状态并存入数据库
             }
        ],
        }
    },
    // 下一步：页面初始化，将用户信息渲染
    methods: {
        // 更新用户姓名
        updateUserName(){

        },
        updateStatus(){
            this.userStatusVisible=true;
        },
        getUserStatus(){ 
            console.log("用户状态:随时到岗")
            // 下一步：修改用户状态
            this.jobStatus='随时到岗'
        },
        getUserStatus2(){ 
            console.log("用户状态：在职")
            // 下一步：修改用户状态
            this.jobStatus='在职'
        },
        toMine(){
            // 下一步：将用户的在值状态存入数据库
            this.$router.push({path:'/mine'});
        }

    },
}
</script>
<style lang="stylus" scoped>
#updateInfo{
    position: fixed;
    width: 100%;
}
    .userInfo{
        width: 95%;
        margin: 0 auto;
        background-color: white;
        border-radius: 0.1rem;
    }
    .avatar{
        width: 1.3rem;
        height: 1.3rem;
        border-radius: 0.2rem;
        margin-top:0.1rem
    }
    .userAvatar{
        text-align: left;
        height: 1.5rem;
        border-bottom: 1px solid #e9e9e9;
        font-size: 0.5rem;
    }
        .userAvatar span
        .userAvatar i {
            display: inline-block;
            margin-top: 0.4rem;
        }
    .userContent i{
        margin-top 0.1rem
    }
</style>


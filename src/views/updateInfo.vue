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
                <section class="userAvatar" @click="$router.push({name:'updataUserAvatar'})">
                    <span class="cell-title" >头像</span>
                    <i class="iconfont icon-icon-test2 infoContent" ></i>
                    <img class="avatar infoContent" 
                        :src="userInfo.user_avatar?'http://192.168.43.177:8081/'+userInfo.user_avatar:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'"
                     alt="用户头像" />  
                </section>
                <section class="userContent">
                    <div @click="$router.push({name:'updateusername'})">
                        <update-cell title='昵称'>
                            <i class="iconfont icon-icon-test2 infoContent" slot="left"></i>
                            <span slot="right" class="infoContent">{{userInfo.user_name}}</span>
                        </update-cell>
                    </div>
                    <div  @click="updateStatus">
                        <update-cell title='在职状态'>
                            <span slot="right" class="infoContent">{{userInfo.user_incumbency===1?'随时到岗':'在职'}}</span>
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
import {mapActions,mapState} from 'Vuex';
import {updateUserInfo} from '../api/index'
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
    mounted() {
      //  console.log(this)
    },
    computed: {
        ...mapState(['userInfo']),
    },
    // 下一步：页面初始化，将用户信息渲染
    methods: {
        ...mapActions(['getUser']),
        
        // 更新用户姓名
        updateUserName(){

        },
        updateStatus(){
            this.userStatusVisible=true;
        },
        async getUserStatus(){ 
            // 下一步：修改用户在职状态
            let newUser=this.userInfo;
            if(newUser.user_incumbency!=1){
                newUser.user_incumbency=1;
            }
            let resUpdata=await updateUserInfo(newUser);
          //  console.log(resUpdata)
        },
        async getUserStatus2(){ 
            // 下一步：修改用户在职状态
            let newUser=this.userInfo;
          //  console.log(newUser.user_incumbency)
            if(newUser.user_incumbency!=2){
                newUser.user_incumbency=2;   
            }
            // console.log(newUser)
            let resUpdata=await updateUserInfo(newUser);
          //  console.log(resUpdata)
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


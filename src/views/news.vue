<template>
    <div id="contacts" style="margin-bottom: 1.2rem;">
        <!-- 头部 -->
        <HeaderTop title="消息"></HeaderTop>
        <!-- 搜索框 -->
        <div class="search_wrap">
            <div class="sear_content">
                <i class="iconfont icon-chazhaobiaodanliebiao"></i>
                <input type="text" placeholder="搜索" v-model="search_value"/>
            </div>
        </div>
        <!-- 中间联系人 -->
        <div class="content_wrap">
            <contactsCom v-for="item of friendsList"
               :key="item._id"
               :friend='item.user_id==user_id?item.target_users:item.users'
               :infor_count="item.user_id==user_id?item.infor_count:item.infor_count2"
            ></contactsCom>
        </div>
        <!-- 尾部 -->
        <div class="count_wrap">
            <span>{{friendsList.length}}位联系人</span>
        </div>
        
    </div>
</template>
<script>
import {getFriends,getMsgRecord} from '../api/news';
import contactsCom from "../components/news/contactsCom.vue";
import HeaderTop from "../components/HeaderTop";
import WSocket from "../../socket";
import {mapState,mapActions} from 'Vuex';
import {showLoading,hideLoading} from '../api/loading';
export default {
    name:"contacts",
    components:{
        contactsCom,
        HeaderTop
    },
    data(){
        return{
            friendsList:[],
            search_value:'',
            allFriends:[],
            user_id:''
        }
    },
    created(){
        
    },
    mounted(){
        showLoading()
        this.user_id=this.userInfo._id?this.userInfo._id:this.userInfo.id
        this.getFriendsList(this.user_id).then(res=>{
            hideLoading()//隐藏加载框
        });
        WSocket.init(
            {user:this.user_id},
            message=>{
                this.setMsgCount(message);
            },
            err=>{
                console.loe(err);
            })
    },
    computed: {
        ...mapState(["userInfo"])
    },
    methods:{
        
        setMsgCount(message){
            // 判断消息列表中是否存在该用户
            this.friendsList.forEach((item,index)=>{
                if((item.target_users._id==message.from)||(item.user_id==message.from)){
                    if(this.user_id==item.user_id){
                        item.infor_count++
                    }else{
                        item.infor_count2++
                    }
                }else{
                    // 该用户为新用户，不存在列表中
                }
            })
            // let chartUser=this.friendsList.filter((item,index)=>{
            //     return (item.target_users._id==message.from)||(item.user_id==message.from);
            // });
            // 如果存在，count+1,并将消息保存在列表中
            // console.log('bv',chartUser)
            // if(chartUser.length>0){
            //     // 用户存在，修改消息通知，
            //     this.friendsList.forEach((item,index)=>{
            //         if(item.user_id==this.user_id){

            //         }
            //     })
            //     console.log('ldhdh',chartUser)
            // }else{
            //     // 如果不存在,客户端新增一条数据
            //     console.log('ldhdh',"不存在该用户")
            // }
        },
        // 修改消息提醒未读数量
        // saveMsg(value){

        // },
        async getFriendsList(value){
            let newUser=value;
            await getMsgRecord(newUser).then(res=>{
                console.log(222,res)
                this.friendsList=res.data.msg;
                this.allFriends=res.data.msg;
                console.log('eee',this.friendsList);
                return 1;
            })
        },
        filterData(){
            this.friendsList=this.allFriends.filter(item=>{
                // console.log(333,item)
                return item.target_users.user_name.indexOf(this.search_value) !=-1
            })
        },
    },
    watch:{
        search_value(){
            this.filterData();
        }
    }
}
</script>
<style lang="stylus" scoped>
    .content_wrap{
        //margin-top 0.1rem;
        min-height: 50px;
        background-color: #fff;
        box-sizing: border-box;
        color: #888;
        font-size: 16px;
        width: 100%;
        text-align: center;
    }
    .search_wrap {
        margin-top: 1rem;
        background-color: #f1f1f16e;
        padding: 8px;
        box-sizing: border-box;
        width: 100%;
    }
        .sear_content {
            height 1.1rem;
            background: #fff;
            padding: 0 10px;
            box-sizing: border-box;
            font-size: 16px;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
        }
        .sear_content i {
            color: #888;
            margin-right: 10px;
        }
        .sear_content input {
            height: 1rem;
            width: 90%;
            outline: none;
            border: none;
            font-size: 14px;
        }
</style>





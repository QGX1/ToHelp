<template>
    <div id="dynamic" @click="hide">
        <HeaderTop title="分享">
            <router-link slot="right" class="writeDynamic" to='/writeDynamic'>
                <span>
                    <i class="iconfont icon-fabiaoyouji2-copy"></i>
                </span>
            </router-link>
        </HeaderTop>
        <div class="issue mui-table-view" 
            v-infinite-scroll="loadMore" infinite-scroll-disabled="true" 
            infinite-scroll-distance="0" infinite-scroll-immediate-check="false">
            <div class="userIssue" v-for="(item,index) of dynamicLists2" :key="index">
                <div class="userAvatar">
                    <img 
                    :src="item.users.user_avatar?'http://192.168.43.177:8081/'+item.users.user_avatar:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'"
                    alt="用户头像"> 
                </div>
                <div class="userJoinContent"> 
                    <div class="jionContent">
                        <span>{{item.users.user_name}}</span>
                        <article>
                            <div>{{item.dynamic_text}}</div>
                            <div class="jobImg" >
                                <img v-for='(items,index) in item.dynamic_imgs ' :key='index' v-lazy="'http://192.168.43.177:8081/'+items"
                                :class='item.dynamic_imgs.length==1?"kbimgbox0":"kbimgbox1"'
                                :preview='item.dynamic_imgs'
                                :preview-text='item.dynamic_text'
                                />
                            </div>
                        </article>
                    </div>
                    
                </div>
                <div class="toMore">
                    <div class="moreArea" @click.stop="isShow(index)">
                        <i class="iconfont icon-gengduo"></i>
                    </div>
                    <transition name="showLikeArea" >
                        
                        <div class="right" v-if='item.isShowLike'>
                        <!-- <div> -->
                            <span @click.stop="iLike(index)">
                                <!-- <img src="../assets/images/like.png" alt="点赞"> -->
                                <i class="iconfont icon-dianzan"></i>
                                <span v-if="item.i_like" style="color:#ffffff">赞</span>
                                <span v-else style="color:#ffffff">取消</span>
                            </span>
                            <span @click.stop="userComment(index)">
                                <!-- <img src="../assets/images/comment.png" alt="评论"/> -->
                                <i class="iconfont icon-pinglun1"></i>
                                评论
                            </span>
                        <!-- </div> -->
                        </div>
                    </transition>
                    <div style="clear: both;width: 100%;">
                        <div class="likeTotal" v-if="item.is_like_lists">
                            <span><i class="iconfont icon-dianzan"></i></span>
                            <span v-for="listItem of item.likes.like_list" :key='listItem.id'>
                                {{listItem.users.user_name}},
                            </span>
                        </div>
                        <div class="likeTotal" v-if="item.is_comments_lists">
                            <div v-for="commentItem in item.comments.comment_list" 
                            :key='commentItem._id'
                            @click.stop="userComment2(commentItem,index)"
                            style="line-height: 130%;margin-top: 0.1rem"
                            >
                                <span>
                                    {{commentItem.user_name}}
                                </span>
                                <span class='commentText' v-if="commentItem.comment_reply_id">
                                    回复
                                </span>
                                <span v-if="commentItem.comment_reply_id">
                                    {{commentItem.comment_reply_name}}
                                </span>
                                <span class='commentText'>
                                    :{{commentItem.comment_text}}
                                </span>
                                
                            </div>
                            
                        </div>
                        <div class="likeTotal" v-show="item.showComment">
                            <SendComment
                                :dynamicId='dynamicId'
                                :reply='reply'
                                @hideShow='hideShow'
                            ></SendComment>
                        </div>
                    </div>
                    <!--底部判断是加载图标还是提示“全部加载”-->
                </div>
            </div>
            <div class="more_loading" v-show="!queryLoading">
                <mt-spinner type="fading-circle" color="#40b490" :size="30" v-show="moreLoading&&!allLoaded"></mt-spinner>
                <span v-show="allLoaded">已全部加载</span>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState,mapActions} from 'Vuex';
import HeaderTop from "../components/HeaderTop";
import SendComment2 from "../components/comment/sendComment2";
import {addLike,deleteLike} from '../api/index'
import Vue from "vue";
// import func from './vue-temp/vue-editor-bridge';
export default {
    name:'dynamic',
    inject:['reload'],//注入依赖
    components:{
        HeaderTop,
        SendComment:SendComment2
    },
    data() {
        return {
            dynamicLists2:[],
            showComment:false,
            dynamicId:'',
            reply:{},
            // 初始化无限加载的全部数据
            moreLoading:false,//正在加载
            allLoaded:false,//已全部加载
            queryLoading:false,
            totalNum: 0,
            pageSize: 10,
            preNum: 0,
            nextNum:1,
            id:'',
            user_id:''
        }
    },
    created() {
        // console.log(this.userInfo)
        this.user_id=this.userInfo._id?this.userInfo._id:this.userInfo.id;
        this.handleDynamicData({nextNum:this.nextNum,preNum:this.preNum,_id:''})
    },
    computed: {
        ...mapState(['dynamicLists','userInfo']),
        params(){
            return{
            // 先定义传递给后台的数据
            // 然后将每次请求的20条参数一起提交给后台
            pageSize:this.pageSize
            }
        }
    },
    methods: {
        // 获取动态列表
        ...mapActions(['getDynamicList']),
        // 无限加载函数
        loadMore(){
            if(this.allLoaded){
                return this.moreLoading=true
            }
            if(this.queryLoading) return;
            this.moreLoading=!this.queryLoading;
            this.preNum=this.nextNum;
            this.nextNum++;
            if(this.dynamicLists2.length>0){
                this.id=this.dynamicLists2[this.dynamicLists2.length-1]._id
                // 后端请求数据
                this.handleDynamicData({nextNum:this.nextNum,preNum:this.preNum,_id:this.id});
            }
        },
        // 处理动态数据
        handleDynamicData(value){
            console.log(900,value)
            let value1=value;
            this.getDynamicList(value).then(res=>{
                this.totalNum=res;
                // console.log(this.totalNum)
                let newDynamicList=this.dynamicLists.map((item,index)=>{
                item.showComment=false;
                item.isShowLike=false;
                item.is_like_lists=false;
                item.is_comments_lists=item.comments&&item.comments.comment_list.length>0? true:false
                if(item.likes&&item.likes.like_list.length>0){
                    item.likes.like_list.forEach(items=>{
                        //    console.log(555,items.users)
                        //    console.log(this.userInfo)
                        if((items.users._id==this.userInfo._id)||(items.users._id==this.userInfo.id)){
                            item.i_like=false;
                            //    console.log(444)
                        }else{
                            item.i_like=true;
                        }
                    })
                }else{
                    item.i_like=true;
                }
                return item;
            },);
                this.dynamicLists2=this.dynamicLists2.concat(newDynamicList);
                this.allLoaded=this.dynamicLists2.length>=this.totalNum?true:false;
                this.getUserLikeLists();
            });
        },
        // 点击显示点赞和评论区块
        isShow(classId){
            Vue.set(this.dynamicLists2[classId],'isShowLike',!this.dynamicLists2[classId].isShowLike)
            this.dynamicLists2.splice(classId,1,this.dynamicLists2[classId])
            this.dynamicLists2.forEach((item,index)=>{ 
                if(index!=classId){
                    item.isShowLike=false;
                }
            })
        },
        // 点击隐藏点赞-评论区块 
        hide(){
            let index=this.dynamicLists2.findIndex(item=>{
                return item.isShowLike==true;
            })
            // console.log(111,index)
            if(index>=0){
                Vue.set(this.dynamicLists2[index],'isShowLike',false);
                this.dynamicLists2.splice(index,1,this.dynamicLists2[index]);
            }
        },
        //控制评论区输入框
        userComment(value){
            //  console.log('kkk',value)
             Vue.set(this.dynamicLists2[value],'isShowLike',false)
             Vue.set(this.dynamicLists2[value],'showComment',true)
             this.dynamicLists2.splice(value,1,this.dynamicLists2[value])
            this.dynamicLists2.forEach((item,index)=>{ 
                if(index!=value){
                    item.showComment=false;
                }
            })
             this.dynamicId=this.dynamicLists2[value]._id;
        },
        userComment2(value,index){
            // console.log(888,value,index)
             this.dynamicId=this.dynamicLists2[index]._id;
             let newIndex=index;
             this.reply={
                 comment_reply_id:value.user_id,
                 comment_reply_name:value.user_name
             }
             this.userComment(newIndex);
        },
        // 1、【完成】控制显示‘赞’或‘取消’
        // 2、【完成】将用户的的id、动态id存入数据库中，或push到user_like_lists中
        async iLike(classId){
            //console.log("点赞",this.dynamicLists2)
            this.dynamicLists2[classId].i_like=!this.dynamicLists2[classId].i_like;
            this.dynamicLists2.splice(classId,1,this.dynamicLists2[classId]);
            let value={
                    users:this.userInfo._id?this.userInfo._id:this.userInfo.id,
                    dynamic_id:this.dynamicLists2[classId]._id
                }
            let result;
            // 异步修改点赞列表
            if(this.dynamicLists2[classId].i_like){
                //console.log("取消")
                //取消点赞，从数据库删除对应数据
                this.dynamicLists2[classId].likes.like_list.forEach((item,index)=>{
                    if((item.users.id==this.user_id)||(item.users._id==this.user_id)){
                        this.dynamicLists2[classId].likes.like_list.splice(index,1);
                    }
                })
                if(this.dynamicLists2[classId].likes.like_list.length<=0){
                    Vue.set(this.dynamicLists2[classId],'is_like_lists',false)
                }
                //console.log(this.dynamicLists2[classId])
                result=await deleteLike(value);
                // if(result.data.code==0){

                    // this.reload();   
                    // this.dynamicLists2[classId].is_like_lists=false;
               // }
            }else{
                //增加点赞，在数据库中增加某条数据
                //console.log("点赞")
                let users=this.userInfo;
                if(this.dynamicLists2[classId].likes){
                    this.dynamicLists2[classId].likes.like_list.push({users:users});
                }else{
                    let newLikes={
                        dynamic_id:this.dynamicLists2[classId]._id,
                        like_list:[
                            {users}
                        ]
                    }
                    //console.log('gdgd',newLikes)
                    Vue.set(this.dynamicLists2[classId],'likes',newLikes)
                    // 修改显示列表的数据
                }
                if(this.dynamicLists2[classId].likes.like_list.length>0){
                    Vue.set(this.dynamicLists2[classId],'is_like_lists',true)
                }
                //console.log(this.dynamicLists2[classId])
                result=await addLike(value);
                // 数据修改成功(不能重新请求数据接口[要不然有些数据处理要重新做一遍]，只能强制页面刷新)
                //console.log(222,result)
               // if(result.data.code==0){
                   // this.reload();  
                    // Vue.set(this.dynamicLists2[classId],'is_like_lists',true)
                    // this.dynamicLists2.splice(classId,1,this.dynamicLists2[classId])
                    //  console.log(333,this.dynamicLists2)

               // }
            }
        },
        // 获取点赞列表
        getUserLikeLists(){
            // console.log(222)
            //  console.log(this.dynamicLists2);
            //1【完成】遍历每一项，控制点赞列表区域是否显示2
            // 2【完成】遍历每一项，控制“赞”与“取消”的显示【匹配当前用户的id，与列表中用户的id是否有相同的】
            this.dynamicLists2.forEach((item)=>{
                if(item.likes&&item.likes.like_list.length>0){
                    item.is_like_lists=true;
                }
                
            }) 
        },
        /**
         * @hideShow  自定义事件，父组件响应子组件传值的自定义方法
         * 此函方法的参数是用来接收从子组件传递来的数据
         */
        hideShow(value){
            let sendValue=value.value;
            console.log(777,sendValue.dynamic_id);
            this.dynamicLists2.forEach((item,index)=>{
                console.log(item._id,sendValue.dynamic_id)
                if(item._id==sendValue.dynamic_id){
                    console.log(111);
                    Vue.set(this.dynamicLists2[index],'showComment',false);
                    if(item.comments&&item.comments.comment_list.length){
                        console.log(222)
                        Vue.set(this.dynamicLists2[index],'showComment',false);
                        item.comments.comment_list.push(sendValue.comment_list);
                    }else{
                        //console.log(333)
                        let newValue=sendValue.comment_list;
                        console.log(444,newValue)
                        let comments={
                            dynamic_id:sendValue.dynamic_id,
                            comment_list:[
                                newValue
                            ]
                        }
                        Vue.set(this.dynamicLists2[index],'is_comments_lists',true);
                        Vue.set(this.dynamicLists2[index],'comments',comments);
                        Vue.set(this.dynamicLists2[index],'showComment',false);
                        this.dynamicLists2.splice(index,1,this.dynamicLists2[index]);
                        // console.log(this.dynamicLists2[index])                     
                    }
                }
            })
            this.reply={};
            console.log(this.dynamicLists2)
        }

    },
}
</script>


<style lang="stylus" scoped>
    .userAvatar{   
            float: left;
            width: 20%;
        }
            .userAvatar &:first-child{
                // 上述意思为.userAvatar img
                width: 1.3rem;
                height: 1.3rem;
                border-radius: 0.1rem;
            }
        .userJoinContent{
            float: left;
            text-align: left;
            width: 79%;
        }
            .jionContent{
                width 90%
            }
                .jobImg{
                    margin-top 0.2rem
                }
                &span{
                    color: #505f76;
                    font-size: 0.4rem;
                    font-weight: bold;
                }
                &article{
                    margin-top: 0.1rem;
                    font-size: 0.4rem;
                    font-family: auto;
                    color: black;
                }
                    .kbimgbox0{
                        width: 90%;
                        height 4rem
                        margin-bottom: 0.2rem;
                        margin-right: 0.2rem;
                    }
                    .kbimgbox1{
                        width: 29%;
                        height: 3rem;
                        margin-bottom: 0.2rem;
                        margin-right: 0.1rem;
                        float: left;
                    }
    .toMore{
        
    }
        .moreArea{
            margin-right: 0.6rem;
            width: 0.7rem;
            border-radius: 0.1rem;
            color: rgba(4,64,64,0.729);
            float: right;
            margin-top: 0.4rem;
            margin-bottom: 0.5rem;
            text-align: right;
            clear: both;
        }
        .right{    
           min-height: 1.3rem;
            position: relative;
            left: 0.2rem;
            border-radius: 7px;
            background-color: rgba(46, 46, 46, 1);
            float: right;
            margin-right: 0.7rem;
            width: 50%;
            // display: none
        }
        .right:after{   /*用伪类写出小三角形*/
            content: '';
            display: block;
            width: 0;
            height: 0;
            border: 0.2rem solid transparent;
            position: absolute;
            margin-right: 0.3rem;
            margin-top: 0.4rem;
        }
        /*分别给左右两边的小三角形定位*/
        .right:after{    
            border-left: 12px solid rgba(46, 46, 46, 1);
            right: -30px;
        }
        .right>span{
            margin-top: 0.3rem;
            display: block;
            width: 50%;
            float: left;
            color #fff
        }
        .right>span:first-child{
            border-right 1px solid rgb(78, 68, 68)
        }
        .right>span>i{
            font-size: 0.6rem;
        }
        .sendCom
            z-index 1000
        .commentText
            color: black;
            font-weight: 300;
            font-size: 16px
        .writeDynamic
            float: right;
            margin-right: 0.2rem;
            font-size: rem;
            margin-top: -0.9rem;
            .icon-fabiaoyouji2-copy
                color #fff;
                font-size: 1rem;
        .more_loading
            float: left;
            vertical-align: middle;
            text-align: center;
            height 1rem;
            width 100%;
           
</style>
<style>
/* vue动画效果 */
    .showLikeArea-enter-active {
        transition: all .3s ease;
        }
        .showLikeArea-leave-active {
        transition: all .3s cubic-bezier(1.0, 1.0, 1.0, 1.0);
        }
     .showLikeArea-enter, .showLikeArea-leave-to {
        transform: translateX(20px);
        opacity: 0;
    }
</style>

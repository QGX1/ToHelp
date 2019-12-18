<template>
    <div id="clockIn">
        <HeaderTop title="动态"/>
        <div class="issue">
            <div class="userIssue" v-for="(item) of dynamicLists" :key="item.id">
                <div class="userAvatar">
                    <img :src='item.user_avatar' alt="用户头像"> 
                </div>
                <div class="userJoinContent"> 
                    <div class="jionContent">
                        <span>{{item.user_name}}</span>
                        <article>
                            <div>{{item.user_dynamic_text}}</div>
                            <div class="jobImg" >
                                <img v-for="(items,index) of item.user_dynamic_imgs " :key='index' :src='items' 
                                :class='item.imgType==0?"kbimgbox0":"kbimgbox1"'
                                :preview='item.user_dynamic_imgs'
                                :preview-text='item.user_dynamic_text'
                                />
                            </div>
                        </article>
                    </div>
                    
                </div>
                <div class="toMore">
                    <div class="moreArea" @click="isShow(item.id,'right')">
                        <i class="iconfont icon-gengduo"></i>
                    </div>
                    <transition name="showLikeArea" >
                        <div class="right" v-show="item.isShowLike">
                        <!-- <div> -->
                            <span @click.stop="iLike(item.id)">
                                <!-- <img src="../assets/images/like.png" alt="点赞"> -->
                                <i class="iconfont icon-dianzan"></i>
                                <span v-if="item.i_like" style="color:#ffffff">赞</span>
                                <span v-else style="color:#ffffff">取消</span>
                            </span>
                            <span>
                                <!-- <img src="../assets/images/comment.png" alt="评论"/> -->
                                <i class="iconfont icon-pinglun1"></i>
                                评论
                            </span>
                        <!-- </div> -->
                        </div>
                    </transition>
                    <div class="likeTotal" v-show="item.is_like_lists">
                        <span><i class="iconfont icon-dianzan"></i></span>
                        <span v-for="listItem of item.user_like_lists" :key='listItem.id'>
                            {{listItem.user_name}},
                        </span>
                    </div>
                    
                </div>
            </div>
           <div style="height:2rem"></div>
        </div>
        
    </div>
</template>

<script>
import HeaderTop from "../components/HeaderTop";
export default {
    name:'clockin',
    components:{
        HeaderTop
    },
    data() {
        return {
            is_like:true,
            isShowLike:false,
            dynamicLists:[
                {
                    id:0,
                    user_name:'昵称',
                    isShowLike:false,//控制点赞区块是否显示，不存入数据库[前端遍历加入]
                    is_like_lists:false,//控制点赞列表是否显示，当无用户点赞时不显示[前端遍历加入]
                    i_like:true,//我是否有点赞，遍历数据查询是否有相同的用户id在点赞列表中,不存入数据库中[前端遍历加入]
                    user_avatar:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573017585034&di=73d85c084764c80e5eac6d0f76abf5d4&imgtype=0&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201610%2F03%2F20161003145053_X25ky.jpeg',
                    user_dynamic_text:'HTML 字体在HTML 中,字体标签是不被支持的。一般都认为,在今后版本的 HTML 中...size="+number" size="+1" 增加字体的大小。 size="-number" size="-1"...',
                    user_dynamic_imgs:[
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573017585034&di=73d85c084764c80e5eac6d0f76abf5d4&imgtype=0&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201610%2F03%2F20161003145053_X25ky.jpeg',
                        'http://img12.3lian.com/gaoqing02/02/93/37.jpg',
                        'http://file02.16sucai.com/d/file/2014/0704/e53c868ee9e8e7b28c424b56afe2066d.jpg',
                        'http://img12.3lian.com/gaoqing02/02/93/37.jpg',
                        'http://img12.3lian.com/gaoqing02/02/93/37.jpg'
                    ],
                    user_like_lists:[
                        {id:0,user_name:"张三"},
                        {id:1,user_name:"李四"},
                        {id:2,user_name:"丘桂娴"},
                        {id:3,user_name:"谢梓文"},
                    ],
                    imgType:1//图片显示方式 1为多张 0为一张
                },
                {
                    id:1,
                    user_name:'昵称',
                    isShowLike:false,//是否显示
                    is_like_lists:false,
                    i_like:true,
                    user_avatar:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573017585034&di=73d85c084764c80e5eac6d0f76abf5d4&imgtype=0&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201610%2F03%2F20161003145053_X25ky.jpeg',
                    user_dynamic_text:'开心',
                    user_dynamic_imgs:[
                       'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573017585034&di=73d85c084764c80e5eac6d0f76abf5d4&imgtype=0&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201610%2F03%2F20161003145053_X25ky.jpeg',
                        'http://file02.16sucai.com/d/file/2014/0704/e53c868ee9e8e7b28c424b56afe2066d.jpg'
                    ],
                    user_like_lists:[],
                    imgType:1
                },
                {
                    id:2,
                    user_name:'昵称',
                    isShowLike:false,//是否显示
                    is_like_lists:false,
                    i_like:true,
                    user_avatar:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573017585034&di=73d85c084764c80e5eac6d0f76abf5d4&imgtype=0&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201610%2F03%2F20161003145053_X25ky.jpeg',
                    user_dynamic_text:'HTML 字体在HTML 中,字体标签是不被支持的。一般都认为,在今后版本的 HTML 中...size="+number" size="+1" 增加字体的大小。 size="-number" size="-1"...',
                    user_dynamic_imgs:[
                       'http://file02.16sucai.com/d/file/2014/0704/e53c868ee9e8e7b28c424b56afe2066d.jpg',
                    ],
                    user_like_lists:[],
                    imgType:0
                }
            ]
        }
    },
    mounted() {
        this.getUserLikeLists();
    },
    methods: {
        // 获取图片列表
        getJobImgList(){
           
        },
        isShow(classId,classDom){
            this.dynamicLists[classId].isShowLike=!this.dynamicLists[classId].isShowLike;
             this.dynamicLists.forEach((item)=>{
                if(item.id!=classId){
                    item.isShowLike=false;
                }
            })
        },
        // 1、【完成】控制显示‘赞’或‘取消’
        // 2、【未完成】将用户的的id、动态id存入数据库中，或push到user_like_lists中
        iLike(classId){
            this.dynamicLists[classId].i_like=!this.dynamicLists[classId].i_like
        },
        // 获取点赞列表
        getUserLikeLists(){
            console.log(this.dynamicLists);
            //1【完成】遍历每一项，控制点赞列表区域是否显示2
            // 2【未完成】遍历每一项，控制“赞”与“取消”的显示【匹配当前用户的id，与列表中用户的id是否有相同的】
            this.dynamicLists.forEach((item)=>{
                if(item.user_like_lists.length>0){
                    item.is_like_lists=true;
                }
                
            })
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
                margin-right: 0.4rem;
                background-color: #eee;
                width: 0.7rem;
                border-radius: 0.1rem;
                color: rgba(4,64,64,0.729);
                float: right;
                margin-top: 0.4rem;
                margin-bottom: 0.5rem;
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

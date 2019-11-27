<template>
    <div id="home">
        <HeaderTop title="首页">
             <router-link to="/" slot="left" class="left">
                <span>
                    <i class="iconfont icon-fanhui"></i>
                </span>
             </router-link>
        </HeaderTop>
        <ul
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10"
            @click="toDetailHome">
            <li v-for="item in list" :key="item" >
                <section class="job_information">
                    <div class="job_information_top">
                         <h1 class="job_title ellipsis">
                            {{item.post}}
                        </h1>
                        <div class="job_salary">
                            {{item.salary}}
                        </div>
                    </div>
                   
                    <div class="job_company ellipsis">
                        {{item.company}}
                    </div>
                    <div class="job_sist">
                        <span>{{item.sist}}</span>
                        <span>{{item.ask_for}}</span>
                        <span>{{item.ask_educat}}</span>
                    </div>
                </section>
                <section class="hr_information">
                    <div class="job_hr_img">
                        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573017585034&di=73d85c084764c80e5eac6d0f76abf5d4&imgtype=0&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201610%2F03%2F20161003145053_X25ky.jpeg">
                    </div>
                     <div class="job_hr_information">
                        {{item.hr_name}}.{{item.hr_duty}}
                    </div>
                </section>
            </li>
        </ul>
        <!-- <ul class="mui-table-view" v-infinite-scroll="loadMore" infinite-scroll-disabled="moreLoading" infinite-scroll-distance="0" infinite-scroll-immediate-check="false"> -->
            <!--li数据遍历循环部分-->
            <!-- <li class="mui-table-view-cell" v-for="item in list">
                <a class="mui-navigate-right">
                <span class="mui-pull-left">{{item.name}}</span>
                <span class="mui-pull-right">{{item.date.substring(0,10)}}</span>
                </a>
            </li> -->
            <!--底部判断是加载图标还是提示“全部加载”-->
            <!-- <li class="more_loading" v-show="!queryLoading">
                <mt-spinner type="snake" color="#00ccff" :size="20" v-show="moreLoading&&!allLoaded"></mt-spinner>
                <span v-show="allLoaded">已全部加载</span>
            </li>
        </ul> -->
    </div>
</template>

<style lang="stylus" scoped>
    .left
        left: 0.2rem;
        position: absolute;
        top: 0.1rem;
        i.iconfont.icon-fanhui {
            font-size: 0.8rem;
            color: white;
        }
    ul{
        border: 2px solid;
        margin-top: 1rem;
        background-color #cccccc2b
        height: 15.1rem;
        overflow-x: hidden;
        overflow-y: scroll;
        position: fixed;
        width: 99%;
    }
    ul::-webkit-scrollbar{
        display: none;
    }
        li {
            height: 3.5rem;
            width: 100%;
            background-color: #ffffffa8
            margin-bottom: 0.3rem;
        }
           .job_information_top {
                display: flex;
                justify-content: space-between;
            }
                .job_title {
                       font-size: 0.5rem;
                        font-weight: bold;
                        padding-left: 0.6rem;
                        padding-top: 0.4rem;
                        width: 50%;
                        height: 0.8rem;
                        text-align: left;
                        color: #101f1fd4;
                }
                .job_salary {
                    font-size: 0.4rem;
                    font-weight: bold;
                    padding-right: 0.4rem;
                    padding-top: 0.4rem;
                    color: #35d8a5;
                }
                .job_company{
                    font-size: 0.4rem;
                    padding-left: 0.5rem;
                    text-align: left;
                }
                .job_sist {
                    text-align: left;
                    margin-left: 0.5rem;
                    margin-top: 0.1rem;
                    height: 0.7rem;
                }
                    span{
                        background-color: rgba(191, 191, 191, 0.07);
                        border-radius: 0.1rem;
                        display: block;
                        float: left;
                        margin-right: 0.15rem;
                        text-align: center;
                        color: rgba(8, 8, 10, 0.45);
                        height: 0.4rem;
                        padding: 0.1rem;
                    }
            section.hr_information {
                text-align: left;
                margin-left: 0.5rem;
                    display: flex;
                    margin-top: 0.1rem;
            }
                img {
                    width: 0.7rem;
                    height: 0.7rem;
                    border-radius: 50%;
                }
                .job_hr_information {
                    margin-top: 0.2rem;
                    margin-left: 0.1rem;
                    font-weight: 400;
                    color: #000910bf;
                }
    .ellipsis{
        white-space nowrap
        overflow hidden
        text-overflow ellipsis        
    }
</style>

<script>
import HeaderTop from "../components/HeaderTop"
export default {
    components:{
        HeaderTop
    },
    data() {
        return {
            //初始化无限加载相关参数
            queryLoading: false,
            moreLoading: false,//加载更多
            allLoaded: false,//全部加载
            totalNum: 0,//总数
            pageSize: 10,//页面长度
            pageNum: 1,//从页面为1的开始
            list:[
                {
                    post:"前端开发1111222222",
                    company:"公司名称",
                    salary:"6元/小时",
                    sist:"地点1111111",
                    ask_for:"要求",
                    ask_educat:"本科",
                    hr_img:"招聘者头像",
                    hr_name:"招聘者名称",
                    hr_duty:"招聘者职务"
                },
                {
                    post:"前端开发",
                    company:"公司名称",
                    salary:"工资",
                    sist:"地点",
                    ask_for:"要求",
                    ask_educat:"本科",
                    hr_img:"招聘者头像",
                    hr_name:"招聘者名称",
                    hr_duty:"招聘者职务"
                },
            ]
        }
    },
    methods:{
        // 路由跳转
        toDetailHome(){
            this.$router.push({path:'/home/detailHome'})
        },
        //无限加载函数
      loadMore() {
        if(this.allLoaded){
          this.moreLoading = true;
          return;
        }
        if(this.queryLoading){
          return;
        }
        this.moreLoading = !this.queryLoading;
        this.pageNum++;
        // this.$http.post("请求后台数据的接口",Object.assign({pageNum:this.pageNum},this.params)).then((res) => {
        //   if(res.sData && res.sData.list){
        //     this.list = this.list.concat(res.sData.list);
        //     this.allLoaded = this.debtList.length==this.totalNum;
        //   }
        //   this.moreLoading = this.allLoaded;
        // });
          if(list){
            this.list = this.list.concat(res.sData.list);
            this.allLoaded = this.debtList.length==this.totalNum;
          }
          else{
            this.moreLoading = this.allLoaded;
          }
         
      }
    },
    
}
</script>



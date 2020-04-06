<template>
    <div id="home">
        <HeaderTop title="首页"></HeaderTop>
        <div
            style="margin-bottom:1.5rem;"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="true"
            infinite-scroll-distance="0"
            infinite-scroll-immediate-check="false"
        >
            <ul>
                <li v-for="item in list" :key="item.index" @click="toDetailHome(item)">
                    <section class="job_information">
                        <div class="job_information_top">
                            <h1 class="job_title ellipsis">{{item.job_post}}</h1>
                            <div class="job_salary">{{item.job_salary}}</div>
                        </div>
                        <div class="job_company ellipsis">{{item.users.user_company}}</div>
                        <div class="job_sist">
                            <span class="ellipsis textlimit">{{item.job_site}}</span>
                            <span>{{item.job_ask_for}}</span>
                            <span>{{item.job_educat}}</span>
                        </div>
                    </section>
                    <section class="hr_information">
                        <div class="job_hr_img">
                            <img
                                :src="item.users?'http://39.101.193.187:8080/pictures/'+item.users.user_avatar:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'"
                            >
                        </div>
                        <div
                            class="job_hr_information"
                        >{{item.users.user_name}}.{{item.users.user_company_position}}</div>
                    </section>
                </li>
            </ul>
            <div v-show="!allLoaded" class="page-infinite-loading">
                <mt-spinner type=""></mt-spinner>
                {{loadingText}}...
            </div>
            <div v-show="allLoaded" class="page-infinite-loading">已全部加载</div>
        </div>
    </div>
</template>


<style lang="stylus" scoped>
#home {
    background: #e9efef;
}

.left {
    left: 0.2rem;
    position: absolute;
    top: 0.1rem;

    i.iconfont.icon-fanhui {
        font-size: 0.8rem;
        color: white;
    }
}

ul {
    margin-top: 1rem;
    overflow-x: hidden;
    overflow-y: scroll;
    position: relative;
    width: 100%;
}

ul::-webkit-scrollbar {
    display: none;
}

li {
    height: 3.5rem;
    width: 100%;
    background-color: #ffffff;
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

.job_company {
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

span {
    background-color: rgba(191, 191, 191, 0.07);
    border-radius: 0.1rem;
    display: block;
    float: left;
    margin-right: 0.15rem;
    text-align: center;
    color: rgba(8, 8, 10, 0.67);
    // height: 0.4rem;
    padding: 0.1rem;
    font-size: 0.3rem;
    letter-spacing: 0.03rem;
}

section.hr_information {
    text-align: left;
    margin-right: 0.5rem;
    margin-left: 0.5rem;
    margin-top: 0.1rem;
    padding-top: 0.1rem;
    display: flex;
    border-top: 1px solid #e4e4e4;
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
.textlimit{
  width 50%;
  display block;
}
.ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>

<script>
import HeaderTop from "../components/HeaderTop";
import { getAllJob } from "../api/job";
import { mapState } from "Vuex";
export default {
  components: {
    HeaderTop
  },
  data() {
    return {
      //初始化无限加载相关参数
      queryLoading: false,
      moreLoading: false, //加载更多
      allLoaded: false, //全部加载
      loading: false, //控制加载显示
      temp: [], //获取加载更多工作数据
      list: [],
      loadingText: "正在努力加载中",
      //分页处理，传到服务端的数据
      totalNum: 0, //总数
      pageNum: 0, //从页面为1的开始
      nextNum: 1, //下一页
      limit: 8 //限制显示页面的长度
    };
  },
  mounted() {
    // 获取所有岗位数据
    let value = {
      preNum: this.pageNum,
      limit: this.limit,
      nextNum: this.nextNum
    };
    this.getJobVal(value);
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    //   加载数据
    getJobVal(value) {
      this.getRequest(`/api/job/`, value).then(res => {
        console.log(res);
        this.list = res.data.msg;
        this.totalNum = res.data.total;
        if(this.list.length==this.totalNum) this.allLoaded=true;
      });
    },
    // 路由跳转
    toDetailHome(item) {
      this.$router.push({ name: "detailHome", params: { job: item } });
    },
    //无限加载函数
    loadMore() {
      console.log("加载222");
      this.allLoaded = this.list.length == this.totalNum;
      console.log(44,this.allLoaded);
      if (this.allLoaded) {
        this.moreLoading = false;
        return;
      }
      if (this.queryLoading) return; //加载查询
      this.moreLoading = !this.queryLoading;
      this.pageNum = this.nextNum;
      this.nextNum++;
      console.log(this.list[this.list.length - 1]);
      let id =
        this.list.length > 0 ? this.list[this.list.length - 1]._id : null;
      let value = {
        preNum: this.pageNum,
        limit: this.limit,
        nextNum: this.nextNum,
        _id: id
      };

      //   向服务端请求加载更多数据
      this.getRequest(`/api/job/`, value).then(res => {
        if (res.data.code == 0) {
          this.list = this.list.concat(res.data.msg); //拼接数据
          this.allLoaded = this.list.length == this.totalNum;
        }
        this.moreLoading = this.allLoaded;
      });
    }
  }
};
</script>



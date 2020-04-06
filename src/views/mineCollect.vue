<template>
    <div id="home">
        <HeaderTop title="我的收藏">
            <router-link slot="left" class="left" to="/mine">
                <span>
                    <i class="iconfont icon-fanhui1"></i>
                </span>
            </router-link>
        </HeaderTop>
        <div style="margin-bottom:1.5rem;">
            <ul
                v-infinite-scroll="loadMore2"
                infinite-scroll-disabled="true"
                infinite-scroll-distance="0"
                infinite-scroll-immediate-check="false"
            >
                <li
                    v-for="(item,index) in list"
                    :key="item._id"
                    @click="toDetailHome(item.jobs)"
                    @touchstart.stop="touchin(item,index)"
                    @touchend.stop="cleartime(item)"
                >
                    <section class="job_information">
                        <div class="job_information_top">
                            <h1 class="job_title ellipsis">{{item.jobs.job_post}}</h1>
                            <div class="job_salary">{{item.jobs.job_salary}}</div>
                        </div>
                        <div class="job_company ellipsis">{{item.jobs.users.user_company}}</div>
                        <div class="job_sist">
                            <span class="ellipsis textlimit">{{item.jobs.job_site}}</span>
                            <span>{{item.jobs.job_ask_for}}</span>
                            <span>{{item.jobs.job_educat}}</span>
                        </div>
                    </section>
                    <section class="hr_information">
                        <div class="job_hr_img">
                            <img
                                :src="item.jobs.users.user_avatar?'http://39.101.193.187:8080/pictures/'+item.jobs.users.user_avatar:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'"
                            >
                        </div>
                        <div
                            class="job_hr_information"
                        >{{item.jobs.users.user_name}}.{{item.jobs.users.user_company_position}}</div>
                    </section>
                </li>
            </ul>
            <div v-show="loading" class="page-infinite-loading">
                <mt-spinner type="fading-circl"></mt-spinner>
                {{loadingText}}...
            </div>
            <div v-show="!loading" class="page-infinite-loading">加载完成</div>
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

.ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.textlimit{
  width 50%;
  display block;
}
</style>

<script>
import HeaderTop from "../components/HeaderTop";
import { getAllJob } from "../api/job";
import { mapState } from "Vuex";
import { MessageBox, Toast } from "mint-ui";
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
      totalNum: 0, //总数
      pageSize: 10, //页面长度
      pageNum: 1, //从页面为1的开始
      loading: false, //控制加载显示
      temp: [], //获取加载更多工作数据
      list: [],
      loadingText: "正在努力加载中",
      loop: "" //定时器
    };
  },
  mounted() {
    // 获取所有岗位数据
    // console.log(this.getRequest(`/api/job/allJob`))
    this.getRequest(`/api/collect/allCollect/${this.userInfo.id}`).then(res => {
      console.log(res);
      this.list = res.data.msg;
    });
    // getAllJob();
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    //   长按删除
    touchin(item, index) {
      //console.log(item,index)
      clearTimeout(this.loop); //再次清空定时器，防止重复注册定时器
      this.loop = setTimeout(() => {
        MessageBox.confirm("确认取消收藏吗？")
          .then(res => {
            let value = {
              users: this.userInfo.id,
              _id: item._id
            };
            this.list.splice(index, 1);
            // console.log('已删除')
            this.deleteRequest("/api/collect/deleteCollect", value).then(
              res => {
                console.log(res);
                Toast(res.data.msg);
              }
            );
          })
          .catch(() => {});
      }, 1000);
    },
    cleartime(item) {
      clearTimeout(this.loop);
    },
    // 模擬無限下拉加載
    loadMore2() {
      this.loading = true;
      setTimeout(() => {
        this.list = this.list.concat(this.temp);
        this.loading = false;
        // console.log(this.jobs);
      }, 2500);
    },
    // 路由跳转
    toDetailHome(item) {
      this.$router.push({ name: "detailHome", params: { job: item } });
    }
  }
};
</script>



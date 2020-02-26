<template>
  <div class="me-info">
    <div class="head">
      <div class="head-t">
        <div class="clear">
          <span class="iconfont icon-shezhi pull-right seting" @click="actionSheet"></span>
        </div>
        <mt-actionsheet :actions="actions" v-model="sheetVisible">
        </mt-actionsheet>
        <div class="my-info clear" @click="$router.push({path:'/mine/updateInfo'})">
          <div class="pull-left my-l">
            <img :src="userInfo.user_avatar?'http://192.168.43.177:8081/'+userInfo.user_avatar:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'">
          </div>
          <div class="pull-left my-m">
            <span>{{userInfo.user_name}}</span>
            <span>在职-{{userInfo.user_incumbency===1?'随时到岗':'在职'}}</span>
          </div>
          <div class="pull-right my-r">
            <div class="clear">
              <div class="pull-left my-r-l">
                <span class="icon-right"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mineCell">
      <mine-cell v-for="(mineItem) in mineLists" 
      :key='mineItem.id' 
      :mineItem='mineItem'
      @click="$router.push({name:mineItem.name})"
      ></mine-cell>
    </div>
  </div>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'Vuex';
  import mineCell from "../components/mine/mineCell";
  export default {
    name: "hello",
    components: {
      mineCell,
    },
    data() {
      return {
        msg: "Welcome to Your Vue.js App",
        // action sheet 选项内容
           actions: [{    
          name: '退出登录',
              method: this.logOut2 // 调用methods中的函数
             
        }],
            // action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏
        sheetVisible: false,
        mineLists: [{
            id: 1,
            content: "我的收藏",
            avatar: 'icon-gongzuojingli',
            name:'mineCollect'
          },
          {
            id: 2,
            content: "我的分享",
            avatar: 'icon-fengcai',
            name:'mineDynamic'
          },
          {
            id: 3,
            content: "我的考勤",
            avatar: 'icon-tubiaozhizuomobankuozhan-',
            name:'mineWork'
          }
        ]
      };
    },
    watch: {},
    computed: {
      ...mapState(['userInfo']),
      session_id() {
        return this.$store.state.logIn.session_id;
      }
    },
    methods: {
      ...mapActions(['getUser', 'logOut']),
      actionSheet() {
        this.sheetVisible = true;
      },
      // 退出登录
      logOut2() {
        // console.log("退出登录")
        this.logOut().then(res => {
          // console.log(res)
          this.$router.replace('/login')
        })
      }
    },
    // 創建后挂载到root之后调用该钩子函数
    mounted() {
      this.getUser();
      console.log(this.userInfo)
    },
    // 该实例被创建还没挂载root之前，ajax可以在这里
    created() {}
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.me-info {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #E9EFEF;
}
  .mineCell {
      margin-top: 0.5rem;
      border-top: 1px solid #d9d9d9;
  }
.head {
  .head-t {
    height: 4rem;
    background: #51bd9c;

    .seting {
      padding: 10px;
      font-size: 0.5rem;
      color: #FFFFFF;
      font-weight: bold;
    }

    .my-info {
      margin: 0.533333rem 0.466666rem 0 0.333333rem;
      height: 1.733333rem;
      color: #fff;
      font-weight: normal;

      img {
        width: 1.733333rem;
        height: 1.733333rem;
        border-radius: 0.866666rem;
      }

      .my-m {
        padding: 0.4rem 0.32rem;

        span {
          display: block;
        }

        span:nth-child(1) {
          font-size: 0.4rem;
          margin-bottom: 0.3rem
        }
      }

      .my-r {
        padding: 0.4rem 0.32rem;
      }

      .my-r {
        span {
          display: block;
          text-align: right;
        }

        .my-r-l {
          padding: 0.4rem 0.066666rem;
        }
      }
    }
  }

  .head-b {
    background: #fff;

    ul {
      list-style: none;

      li {
        float: left;
        width: 33.33%;
        text-align: center;
        padding: 0.466666rem 0 0.4rem 0;

        span {
          display: block;
        }

        span:nth-child(1) {
          font-weight: bold;
          font-size: 0.5rem;
        }

        span:nth-child(2) {
          color: #B3B3B3;
        }
      }
    }
  }
}

.main {
  margin-top: 0.24rem;
  color: #333;

  ul {
    list-style: none;
    background: #FFFFFF;

    li {
      width: 25%;
      float: left;
      text-align: center;
      border-right: 1px solid #E5E5E5;
      border-bottom: 1px solid #E5E5E5;
      padding: 0.613333rem 0 0.506666rem 0;

      span {
        display: block;
      }

      span:nth-child(1) {
        margin-bottom: 0.266666rem;
        font-size: 0.7rem;
      }
    }

    li:nth-child(4n+0) {
      border-right: none;
    }
  }
}

.bottom {
  a {
    color: #333;
    display: block;
    position: relative;
  }

  a:after {
    content: '\e90a';
    position: absolute;
    right: 0;
    top: 0;
  }

  margin-top: 0.24rem;

  ul {
    list-style: none;
    background: #fff;

    li {
      padding: 0.4rem 0.266666rem;
      border-bottom: 1px solid #F4F4F4;
      font-size: 0.48rem;
    }

    .icon {
      font-family: 'iconfont' !important;
      font-style: normal;
      font-size: 0.506666rem;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      padding: 0.453333rem;
      /* vertical-align: middle; */
    }
  }
}

.vuex {
  margin-top: 0.24rem;
  padding: 0.4rem 0.266666rem;
  background-color: #b5b5b5;

  p {
    font-size: 0.48rem;
    text-align: center;
  }
}


  .mineCell icon-tubiaozhizuomobankuozhan-{
    color: #0edde4;
  }
  .mineCell icon-fengcai{
    color: #ff303080;
  }
</style>

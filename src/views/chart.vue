<template>
    <div id="chart">
        <!--头部  -->
        <HeaderTop :title="targetUser.user_name">
            <!-- 查看个人信息 -->
            <div slot="left" class="left" @click.prevent="cancelCom">
                <span>
                    <i class="iconfont icon-fanhui1"></i>
                </span>
            </div>
            <router-link slot="right" class="writeDynamic" to="/writeDynamic">
                <span>
                    <i class="iconfont icon-gengduo"></i>
                </span>
            </router-link>
        </HeaderTop>
        <!-- 显示聊天记录 -->
        <div
            style="margin: 1.2rem 0.1rem 1.5rem;font-size: 0.4rem;overflow-y: scroll;overflow-x: hidden;"
            
        >
            <div class="content_wrap" v-for="item in msgRecordList" :key="item._id">
                <!-- 其他人的聊天内容 -->
                <div class="left_msg" v-if="item.infor_source==2">
                    <img 
                     :src="targetUser.user_avatar?'http://192.168.43.177:8081/'+targetUser.user_avatar:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'"
                     alt="头像">
                    <span>{{item.infor_msg}}</span>
                </div>
                <!-- 我的聊天内容 -->
                <div class="right_msg" v-if="item.infor_source==1">
                    <span>{{item.infor_msg}}</span>
                    <img 
                     :src="userInfo.user_avatar?'http://192.168.43.177:8081/'+userInfo.user_avatar:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'"
                     alt="头像">
                </div>
            </div>
            <div id="myData"></div>
        </div>
        <!-- 显示输入框 -->
        <footer id="sendComment">
            <input type="text" class="commentText" placeholder="" v-model="newsText">
            <input
                type="button"
                class="commentBtn"
                :disabled="newsText==''"
                @click="sendNews"
                value="发送"
            >
        </footer>
    </div>
</template>

<script>
import HeaderTop from "../components/HeaderTop";
import { getMsgRecord, saveInfoRecord, updateInfoRecord } from "../api/news";
import { mapState, mapActions } from "Vuex";
import WSocket from "../../socket";
import vue from 'vue';
import { connect } from 'tls';
export default {
  name: "chart",
  components: {
    HeaderTop
  },
  data() {
    return {
      targetUser: this.$route.params.targetUser,
      commentBtn2: false,
      newsText: "",
      msgRecordList: [],
      user_id: "",
      firse_user_id: "",
      infor_count: 0,
      infor_count2: 0,
      infor_id: ""
    };
  },
  // created(){
  //     this.getMsg();
  //     console.log('ccc',this.userInfo)
  // },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.targetUser = to.params.targetUser;
      vm.getMsg();
    });
  },
  mounted() {
    // 服务端推送消息给客户端
    // console.log('mnmn',this.targetUser)
    // console.log('mkmk',this.msgRecordList)
    this.user_id = this.userInfo._id ? this.userInfo._id : this.userInfo.id;
    WSocket.init(
      { user: this.user_id },
      message => {
        // 收到消息后，判断用户列表中是否存在该用户
        if (this.user_id != message.from) {
          this.msgRecordList.push({
            infor_msg: message.msg,
            infor_source: 2
          });
        }
      },
      error => {
        console.error();
      }
    );
  },
  computed: {
    ...mapState(["userInfo"])
  },
  watch: {
    msgRecordList(newVlu, oldVlu) {
      this.$nextTick(() => {
        //   滚动条到底部,在底部加一个锚点 
        document.getElementById("myData").scrollIntoView(); 
      });
    }
  },
  methods: {
    cancelCom() {
      // console.log('popo');
      if (this.user_id == this.firse_user_id) {
        this.infor_count = 0;
      } else {
        this.infor_count2 = 0;
      }
      let updataValue = {
        user_id: this.user_id,
        infor_id: this.infor_id,
        infor_count: this.infor_count,
        infor_count2: this.infor_count2
      };
      updateInfoRecord(updataValue).then(res => {
        // console.log(res)
      });
      this.$router.push({ name: "news" });
    },
    sendNews() {
      // 需要发送的消息对象
      const msgObj = {
        msg: this.newsText,
        target: this.targetUser._id,
        current: this.user_id
      };
      WSocket.send(msgObj);
      // 本地客户端显示
      this.msgRecordList.push({
        infor_msg: this.newsText,
        infor_source: 1
      });
      // 保存消息到服务端
      this.savaInfo();
      // 清除输入框内容
      this.newsText = "";
    },
    async savaInfo() {
      let infor_source;
      //console.log('8989',this)
      //console.log(this.firse_user_id)
      if (this.firse_user_id == this.user_id) {
        this.infor_count = 0;
        this.infor_count2++;
      } else {
        this.infor_count++;
        this.infor_count2 = 0;
      }
      if (this.firse_user_id) {
        if (this.user_id == this.firse_user_id) {
          infor_source = 1; //第一人
        } else {
          infor_source = 2; //第二人
        }
      } else {
        // 数据库中不存在有关于这两个人之间的通讯消息
        infor_source = 1;
      }
      let msgObj = {
        target_users: this.targetUser._id,
        user_id: this.user_id,
        infor_message: {
          infor_msg: this.newsText,
          infor_source: infor_source
        },
        infor_count: this.infor_count, //未读信息数
        infor_count2: this.infor_count2
      };
      saveInfoRecord(msgObj).then(res => {
        //console.log(8989,res)
      });
    },
    // 获取消息列表
    getMsg() {
      let user_id = this.userInfo._id ? this.userInfo._id : this.userInfo.id;

      //console.log(user_id)
      //console.log(this.targetUser.user_id)
      getMsgRecord(user_id).then(res => {
        // let result=res.data.msg;
        // console.log(555,result)
        // 过滤与当前目标对象的聊天数据
        //console.log(888,res)

        let result = res.data.msg.filter(data => {
          return (
            (data.user_id == user_id &&
              data.target_users._id == this.targetUser._id) ||
            (this.targetUser._id == data.user_id &&
              data.target_users._id == user_id)
          );
        });
        // if(user_id==result[0].user_id){
        // 当前用户的infor_count消息未读数
        this.infor_count = result[0].infor_count;
        // }
        this.infor_count2 = result[0].infor_count2;
        this.infor_id = result[0]._id;
        this.firse_user_id = result[0] ? result[0].user_id : "";
        console.log(777, result);
        // 加入当前用户为user_id，则为1，插入数据时当前用户为user_id，infor_source为，
        // infor_source用于区分自己和他人的消息\以及谁是第一个发起交流的人
        if (result.length > 0 && result[0].user_id != user_id) {
          // 不等于则为目标用户，要修改数据的infor_source值将2改成2
          let newResult = result[0].infor_message.map(item => {
            // console.log('ccc')
            if (item.infor_source == 1) {
              item.infor_source = 2;
            } else {
              item.infor_source = 1;
            }
            return item;
          });
          this.msgRecordList = newResult;
        } else if (result.length > 0 && result[0].user_id == user_id) {
          this.msgRecordList = result[0].infor_message;
        }
        // console.log(result[0].user_id)
        // console.log(user_id)
        // console.log('sss',this.msgRecordList)
      });
    }
    // 实时接收消息

    // 实时发送消息
  }
};
</script>
<style lang="stylus" scoped>
.writeDynamic {
    float: right;
    margin-right: 0.2rem;
    font-size: rem;
    margin-top: -0.6rem;
    color: #fff;
}

#sendComment {
    height: 1.5rem;
    position: fixed;
    bottom: 0rem;
    background-color: #f7f7f7;
    width: 100%;
}

.commentText {
    height: 1rem;
    border-radius: 0.1rem;
    float: left;
    margin-top: 0.2rem;
    margin-left: 0.5rem;
    width: 75%;
    font-size: 0.4rem;
    border: 1px solid #eee;
}

.commentBtn {
    height: 1rem;
    border-radius: 0.1rem;
    float: left;
    margin-top: 0.2rem;
    margin-left: 0.3rem;
    width: 15%;
    background-color: #1fb385fc;
    border: 1px solid rgb(228, 228, 228);
    color: #fff;
    font-size: 0.4rem;
}

.content_wrap {
    img {
        width: 1.5rem;
        height: 1.5rem;
        border: 1px solid #eee;
        border-radius: 10%;
    }

    .left_msg, .right_msg {
        display: flex;
        width: 100%;
        margin: 0.1rem 0.1rem;
    }

    .left_msg {
        justify-content: flex-start;

        span {
            background-color: #fff;
        }
    }

    .right_msg {
        justify-content: flex-end;

        span {
            background-color: #0fce0d;
        }
    }

    span {
        display: inline-block;
        max-width: 65%;
        border: 1px solid #d9d9d9;
        border-radius: 0.1rem;
        margin: 0 0.1rem;
        padding: 0.5rem;
        box-sizing: border-box;
        word-break: break-all;
        text-align: left;
        letter-spacing: 0.02rem;
    }
}
</style>



<template>
    <div id="mineWork" style="background:#d1e0dd">
        <HeaderTop title="我的考勤">
            <router-link slot="left" class="left" to="/mine">
                <span>
                    <i class="iconfont icon-fanhui1"></i>
                </span>
            </router-link>
        </HeaderTop>
        <!-- 中间用户考勤 -->
        <div class="timeAxis">
            <timeLine
                timelineColor="#d1e0dd"
                timeContentColor="#fff"
                :dataList="dataList"
            ></timeLine>
        </div>
        <!-- 提示 -->
        <!-- <footer style="position: fixed;bottom: 0px;">
            <ul>
                <li style="transition: all 1s;color: red; font-size: 0.3rem;letter-spacing: 0.03rem;" >{{animate?message[1]:message[0]}}</li>
            </ul>
        </footer> -->
    </div>
</template>

<script>
import HeaderTop from "../components/HeaderTop";
import { mapState } from "Vuex";
import timeLine from "../components/timeline";
import { MessageBox } from "mint-ui";
export default {
  components: {
    HeaderTop,
    timeLine
  },
  data() {
    return {
      dataList: [],
      message:['考勤如有问题请及时联系负责人员',''],
      animate :false
    };
  },
  mounted() {
    document.getElementById("mineWork").style.height =window.screen.availHeight + "px";
    //console.log(this.userInfo);
    // 获取考勤数据
    let value = {
      user_email: this.userInfo.user_email,
      users: this.userInfo.id
    };
    let newData = [];
    this.getRequest(`/api/attendance/getStaffAttendance`, value).then(res => {
      if (res.data.code == 0) {
        this.dataList = res.data.msg;
      }
    });
    MessageBox({
        message: '考勤如有问题请及时联系负责人员',
    });
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods:{

    //   showTips(){
    //     //   console.log("执行")
    //       this.animate=true;
    //       setTimeout(()=>{
    //         this.message.push(this.message[0]);
    //         this.message.shift();
    //         this.animate=false
    //       },1000);
    //   }
  }
};
</script>

<style lang="stylus" scoped>
.timeAxis {
    margin-top: 1rem;
}
</style>



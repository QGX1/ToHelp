<template>
    <div id="updateUserName">
        <HeaderTop title="修改昵称">
            <!-- title为岗位 -->
            <router-link slot="left" class="left" to="/mine/updateInfo">
                <span>
                    <i class="iconfont icon-fanhui1"></i>
                </span>
            </router-link>
        </HeaderTop>
        <form class="updateUserName"  @submit.prevent="submit">
            <input type='text' maxlength="20" value="" v-model='userInfo.user_name' class="inputName"/>
            <input type="submit" value="提交" class="canUserNameSubmit">
        </form>
    </div>
</template>

<script>
import HeaderTop from "../components/HeaderTop";
import {mapState} from 'Vuex';
import {updateUserInfo} from '../api/index'
export default {
  name: "updateUserName",
  components: {
    HeaderTop
  },
  data() {
    return {
    };
  },
  mounted() {
     // console.log(this.userInfo)
    //   console.log(this.$route.params)
  },
  computed: {
      ...mapState(['userInfo'])
  },
  methods: {
      async submit(){
        let resUpdata=await updateUserInfo(this.userInfo);
        // 弹出提示框，修改成功
       // console.log(resUpdata)
      }
  },
};
</script>
<style lang="stylus" scoped>
    .updateUserName{
        margin-top: 1.6rem;
    }
        .inputName{
            background-color: white;
            font-size: 0.5rem;
            width: 90%;
            border: 1px solid #ccc;
            height: 1.5rem;
            text-align: left;
            padding-left: 0.5rem;
            border-radius: 0.2rem;
            margin: 0rem auto;
            display: block;
        }
        .userNameSubmit{
                margin-top: 0.5rem;
                height: 1.5rem;
                width: 90%;
                border-radius: 0.2rem;
                font-size: 0.6rem;
        }
        .canUserNameSubmit{
                margin-top: 0.5rem;
                height: 1.5rem;
                width: 90%;
                border-radius: 0.2rem;
                font-size: 0.6rem;
                background: linear-gradient(to bottom, #5bc5a4 0%,#a1d4c7 100%);
        }
</style>



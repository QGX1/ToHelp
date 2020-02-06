<template>
    <div id="updateUserAvatar">
        <HeaderTop title="头像">
            <!-- title为岗位 -->
            <router-link slot="left" class="left" to="/mine/updateInfo">
                <span>
                    <i class="iconfont icon-fanhui1"></i>
                </span>
            </router-link>
            <div slot="right" class="right" @click="toMore">
                <i class="iconfont icon-gengduo"></i>
            </div>
        </HeaderTop>
        <div class="userAvatar"
            v-bind:style="{
                'background-image':'url('+userInfo.user_avatar+')',
                'background-repeat':'no-repeat',
                'background-size':'contain',
                'background-origin':'content-box'
            }"
        >
        </div>
        <div class="mineCell">
            <!-- <mt-button @click.native="flag = true" size="large">选择用户头像</mt-button> -->
		    <mt-actionsheet :actions="actions" v-model="userStatusVisible"></mt-actionsheet>

        </div>
    </div>
</template>

<script>
import HeaderTop from "../components/HeaderTop";
import {mapState} from 'Vuex';
import {updateUserInfo} from '../api/index'
import mineCell from "../components/mine/mineCell";
export default {
  name: "updateUserAvatar",
  components: {
    HeaderTop,
  },
  data() {
    return {
        userStatusVisible:false,
        actions: [
            {
                name: `从手机相册选择`,
                method : this.galleryImg	// 调用methods中的函数
             }
    ],
    };
  },
  mounted() {
      //console.log(this.userInfo)
    //   console.log(this.$route.params)
  },
  computed: {
      ...mapState(['userInfo'])
  },
  methods: {
      toMore(){
          this.userStatusVisible=true;
      },
      galleryImg(){
        //   判断是否存在plus
        if(window.plus){
            plusReady();
        }else{
            document.addEventListener('plusready',plusReady,false);
        }
        console.log(2222,'从手机获取图片')
        let This=this
       // console.log("从相册中选择图片:");
        plus.gallery.pick( function(path){//从相册中选择图片
          This.imgSrc=path
          alert(path);
        }, function ( e ) {//取消选择图片
        //  console.log( "取消选择图片" );
        }, {filter:"image"} );
      },
      async submit(){
        let resUpdata=await updateUserInfo(this.userInfo);
        // 弹出提示框，修改成功
      //  console.log(resUpdata)
      }
  },
};
</script>
<style lang="stylus" scoped>
    .updateUserAvatar{
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
        .right {
            float: right;
            margin-top: -0.6rem;
            margin-right: 0.2rem;
            width: 1rem;
            height: 1rem;
        } 
            .icon-gengduo{
                font-size: 0.6rem;
                color: #fff;
            }
    .userAvatar{
        width: 100%;
        height: 8rem;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>



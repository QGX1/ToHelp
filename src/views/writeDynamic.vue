<template>
    <div id='writeDynamic' >
        <HeaderTop >
           <router-link slot="left" class="left" to='/dynamic'>
                <span>
                    <i class="iconfont icon-fanhui1"></i>
                </span>
                <span class="titleText2">发表动态</span>
           </router-link>
           <div slot="right">
               <input type='button' class="commentBtn" :class="{commentBtn2:commentBtn2}" @click="sendDynamic" value="发表">
           </div>
        </HeaderTop>
        <div>
            <section class="dynamicText">
                <textarea rows="4" wrap="hard"  placeholder="这一刻的想法..." class="inputText" v-model="dynamic_text"></textarea>
                <AddImg @getFiles='getImageList' @removeFiles='removeImage'></AddImg>
            </section>
        </div>
    </div>
</template>
<script>
import HeaderTop from "../components/HeaderTop";
import AddImg from "../components/comment/addImg";
import {uploadImg,uploadDynamic} from '../api/index';
import {showLoading,hideLoading} from '../api/loading';
import { Indicator, Toast } from "mint-ui";
import {mapState,mapActions} from 'Vuex';
export default {
    name:'writeDynamic',
    components:{
        HeaderTop,
        AddImg
    }, 
    data(){
        return{
            imgList:[],//照片
            imgSrcList:[],//本地端照片地址
            dynamic_text:'',
            commentBtn2:false
        }
    },
    methods:{
        async sendDynamic(){
            showLoading();//显示加载
            if(this.commentBtn2==true){
                let value={
                    dynamic_text:this.dynamic_text,
                    dynamic_imgs:this.imgSrcList,
                    user_id:this.userInfo.id?this.userInfo.id:this.userInfo._id,
                }
                let result= await uploadDynamic(value).then(res=>{
                    console.log(111,res)
                    if(res.data.code==0){
                        this.$router.push({name:'Dynamic'})
                        hideLoading()
                    }
                })
                
            }
        },
        // 父组件接收子组件传递过来的事件，
        getImageList(files){
            this.$nextTick(()=>{
                files.forEach(item => {
                    // console.log(item.src)
                    // console.log(item.src.split("base64,"))
                    this.imgList.push(item.src.split("base64,")[1]);
                    // 上传图片
                    this._getFileCode({
                        Base64Str: item.src.split("base64,")[1]
                    }).then(res=>{
                        // console.log(9090,res)
                        this.imgSrcList.push(res.imgSrc)
                    })
                });
            })
            // console.log("imgSrcList",this.imgSrcList)
        },
        // 父组件接收子组件传递过来的事件，删除图片
        removeImage(index){
            this.imgList.splice(index, 1);
            this.imgSrcList.splice(index, 1);
            console.log('www',this.imgSrcList)
        },
        // 上传图片到服务端
        async _getFileCode(obj){
            console.log(obj)
            let result = await uploadImg(obj)
            // console.log("result",result.data)
            return  result.data;
        }
    },
    computed:{
        dynamic(){
            const {dynamic_text,imgSrcList} =this;
            return {dynamic_text,imgSrcList}
        },
        ...mapState(['userInfo'])
    },
    watch:{
       dynamic(newVal,oldVal){
           if(newVal.dynamic_text!=''||newVal.imgSrcList.length>0){
               this.commentBtn2=true;
           }else{
               this.commentBtn2=false;
           };
       }
    }
}
</script>

<style lang="stylus" scoped>
    #writeDynamic
        text-align: left;
        margin: 1.3rem 0.4rem 0rem;
        .inputText 
            width: 100%;
            font-size: 0.5rem;
            font-family: none;
            letter-spacing: 0.03rem;
        .commentBtn
            height: 0.8rem;
            border-radius: 0.1rem;
            float: right;
            margin-top: -0.1rem;
            margin-right: 0.3rem;
            width: 15%;
            background-color: #f7f7f7;
            border: 1px solid #e4e4e4;
            color: #ddd;
            font-size: 0.4rem;
        .commentBtn2
            background-color: #1fb385fc;
        .titleText2 
                display: block;
                float: right;
                font-size: 0.5rem;
                margin-top: 0.08rem;
                color: #fff;
</style>




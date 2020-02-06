<template>
    <div id="sendComment">
        <section>
            <input type="text" class="commentText" placeholder="评论" v-model="commentText">
            <input type='button' class="commentBtn" :class="{commentBtn2:commentBtn2}" @click="sendCom" value="发送">
        </section>
    </div>
</template>

<script>
import {addComment} from '../../api/index';
import {mapState,mapActions} from 'Vuex';
export default {
    props:{
        dynamicId:String,
        reply:Object
    },
    data(){
        return{
            commentBtn2:false,
            commentText:''
        }
    },
    mounted(){
        console.log(111,this.reply)
    },
    methods:{
        async sendCom(){
            if(this.commentBtn2){
                let value={
                    dynamic_id:this.dynamicId,
                    comment_list:{
                        user_id:this.userInfo.id?this.userInfo.id:this.userInfo._id,
                        user_name:this.userInfo.user_name,
                        comment_text:this.commentText,
                        comment_reply_id:this.reply?this.reply.comment_reply_id:undefined,
                        comment_reply_name:this.reply?this.reply.comment_reply_name:undefined
                    }
                };
                console.log(333,value)
                let result=await addComment(value).then(res=>{
                    this.$emit('hideShow',{showComment:false})
                    this.commentText=''
                })
            }
        }
    },
    computed:{
        ...mapState(['userInfo'])
    },
    watch:{
        commentText(newVal,oldVal){
            if(newVal!=''){
                this.commentBtn2=true;
            }else{
                this.commentBtn2=false;
            }
        }
    }

}
</script>

<style lang="stylus" scoped>
    #sendComment{
        height: 1.5rem;
        position: fixed;
        bottom: 0rem;
        background-color: #f7f7f7;
        width: 100%;
    } 
        .commentText
            height: 1rem;
            border-radius: 0.1rem;
            float: left;
            margin-top: 0.2rem;
            margin-left: 0.5rem;
            width: 75%;
            font-size: 0.4rem;
        .commentBtn
            height: 1rem;
            border-radius: 0.1rem;
            float: left;
            margin-top: 0.2rem;
            margin-left: 0.3rem;
            width: 15%;
            background-color: rgb(247,247,247);
            border: 1px solid rgb(228,228,228);
            color: rgb(221,221,221);
            font-size: 0.4rem;
        .commentBtn2
            background-color: #1fb385fc;
</style>


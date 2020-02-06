<template>
    <div id="contactsCom" @click.stop="$router.push({name:'chart',params:{targetUser:friend}})">
        <div class="contacts-container" >
            <img :src='friend.user_avatar' class="userAvatar"/>
            <span class="count" v-show="infor_count">{{infor_count}}</span>
            <span class="userName">{{friend.user_name}}</span>
        </div>
    </div>
</template>
<script>
//import {getFriends} from '../api/news'
export default {
    name:"contactsCom",
    props:{
       friend:Object,
       infor_count:Number
    },
    data(){
        return{
            
        }
    },
    created(){
        // console.log('ddd',this.infor_count)
    },
    methods:{
       
    }
}
</script>
<style lang="stylus" scoped>
#contactsCom {
    background-color: #fff;
    box-sizing: border-box;
    color: inherit;
    min-height: 50px;
    //display: flex;
    font-size: 16px;
    overflow: hidden;
    padding: 0 8px;
    width: 100%;
    border-bottom: 1px solid #d9d9d9;
    height 2rem
}
.contacts-container
        flex 1
    .contacts-container img 
        width: 1.5rem;
        height: 1.5rem;
        vertical-align: middle;
        margin-left: 0.2rem;
        margin-top: 0.3rem;
        border-radius: 10%;
        border: 1px solid #ccc;
        float left
        span 
            display: inline-block;
            vertical-align: middle;
    .count
        background-color: #ff0a0a;
        border-radius: 50%;
        height: 0.6rem;
        width: 0.6rem;
        text-align: center;
        color: #fff;
        /* display: inline-block; */
        border: 1px solid #fff;
        left: 1.5rem;
        position: absolute;
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        vertical-align: middle;
        padding: 0.15rem;
        text-overflow: ellipsis;
        display: inline-block;
        margin-top 0.1rem
    .userName
        margin-top: 0.4rem;
        margin-left: 2rem;
        font-size: 0.5rem;
        margin-left: -3.5rem;
        font-size: 0.5rem;
        font-weight: 500;
        position: absolute;
</style>





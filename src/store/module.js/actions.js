import * as types from "./types";
import decode from 'jwt-decode';//解析token
import{
    instance,
    register,
    login,
    reqUserInfo,
    forgetPwd,
    getDynamic
} from '../../api'

export default {
    toRegister({commit},info){
        return new Promise((resolve,reject)=>{
            register(info).then(res=>{
                // 注册成功
                resolve(res)
            })
            .catch(err=>{
                reject(err)
            })
        })
    },
    toLogin({commit},info){
        return new Promise((resolve,reject)=>{
            login(info).then(res=>{
                if(res.status===200&&res.data.code===0){
                    console.log(res)
                    commit(types.LOGIN,res.data.token);//存储token到mutation
                    commit(types.USERINFO,res.data.rule);
                    commit(types.LOGINSTATUS,true)
                    // window.sessionStorage.setItem('token',res.data.token);
                    instance.defaults.headers = {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: res.data.token
                      };
                    // instance.defaults.headers.common['Authorization'] = res.data.token // 请求头添加 token          
                    window.sessionStorage.setItem('token', res.data.token)  // 存储进 localStroage  
                    return resolve(types.USERINFO);
                }
               return resolve(res)
            })
        })
        .catch(err=>{
            reject(err)
        })
    },
    getUser ({ commit }) {    
        return new Promise((resolve, reject) => {      
            let user_id=decode(window.sessionStorage.getItem('token')).id;
            console.log(user_id)
            reqUserInfo(user_id).then(res => {        
                if (res.status === 200) {          
                    commit(types.USERINFO, res.data.msg) // 把 userInfo 存进 Vuex        
                }      
            }).catch((error) => {        
                reject(error)      
            })       
        })  
    },
    // 异步获取用户信息
    // async getUser({commit}){
    //     let result = await reqUserInfo();
    //     console.log(result)
    //     if(result.data.code===0){
    //         const userInfo=result.data.msg;
    //         commit(types.USERINFO,userInfo)
    //     }
    // },
    // 异步查询用户密码
    async checkEmail({commit},value){
        let result = await forgetPwd(value);
    },
    //异步获取动态列表
    async getDynamicList({commit},value){
        let dynamicLists=await getDynamic(value);
        let count=dynamicLists.data.count
        dynamicLists=dynamicLists.data.msg
        // console.log(dynamicLists)
        commit(types.DYNAMICLISTS,dynamicLists);
        return count;
    },

    logOut ({ commit }) { 
        // 退出登录    
        return new Promise((resolve, reject) => {      
            commit(types.USERINFO, null)        // 情况 userInfo  
            commit(types.DYNAMICLISTS, null)        // 情况 动态列表       
            commit(types.LOGINSTATUS, false)  // 登录状态改为 false    
            commit(types.LOGIN, '')          // 清除 token      
            window.sessionStorage.removeItem('token')   
            resolve({code:1})
         }).catch(err=>reject(err)) 
    }
}
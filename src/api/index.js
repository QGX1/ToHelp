import Axios from 'axios';
import router from '../router'
import * as types from '../store/module.js/types'
import vuex from '../store'
import Qs from 'qs'
// 设置跨域请求
if(window.sessionStorage.getItem('token')){
    Axios.defaults.headers={
        // 默认请求头
        'Content-type':'application/json',
        'Authorization':window.sessionStorage.getItem('token'),//指令
    }
}
// 设置路由拦截器
export let instance = Axios.create({
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      'Authorization':window.sessionStorage.getItem('token')//指令
    },
     baseURL: ""
  });

//使用 respone 拦截器，对 2xx 状态码以外的结果进行拦截。
instance.interceptors.response.use(response=>{
    return response;
},error=>{
    if(error.response){
        switch (error.response.status){
            case 401:
                router.replace({
                    path:'login',
                    query:{
                        redirect:router.currentRoute.fullPath
                    }//将跳转的路由path作为参数，登陆成功后跳转到该路由
                })
        }
    }
    return Promise.reject(error.response)//返回错误接口信息
})
// 登录
export const login = ({ user_email, user_password,captcha,user_limit }) => {
    let data = {
        "user_email": user_email,
        "user_password": user_password,
        "captcha":captcha,
        "user_limit":user_limit
    }
  
    console.log(Qs.stringify(data));
    
    return instance({
      method: 'post',
        url: '/api/user/login',
        data: Qs.stringify(data)
    });
  
  }

// 注册
export const register = ({ user_name,phone_code,user_password,user_email ,user_phone,
    user_limit,user_incumbency
}) => {
    let data = {
      'user_name':user_name,
      'user_password':user_password,
      'user_email':user_email,
      'user_phone':user_phone,
      'phone_code':phone_code,
      'user_limit':user_limit,
      'user_incumbency':user_incumbency
    }
    console.log(Qs.stringify(data)+"数据传递");
    
    return instance({
      method: 'post',
        url: '/api/user/register',
        data: Qs.stringify(data)
    });
  
  }
  // 获取手机验证码
  export const phoneCode=(user_phone) =>{
    console.log("手机验证码");
    console.log(user_phone)
    return instance({
      method: 'get',
      url: `/api/user/phoneCode/${user_phone}`
    });
  }
  //获取用户信息
  export const reqUserInfo=(user_id) =>{
    return instance({
      method: 'get',
      url: `/api/user/${user_id}`
    });
  }

  export const forgetPwd=(value) =>{
    let data={
      email:value.email,
      user_limit:value.user_limit
    }
    return instance({
      method: 'post',
      url: `/api/user/forgetPwd`,
      data:Qs.stringify(data)
    });
  }
  // 获取所有动态
  export const getDynamic=(value)=>{
    //console.log(111,value)
    return instance({
      method:'get',
      url:`/api/dynamic/getDynamic`,
      params:{value}
    })
  };
  // 获取个人动态
  export const getMineDynamic=(value,user_id)=>{
    //console.log(111,value)
    return instance({
      method:'get',
      url:`/api/dynamic/getDynamic/${user_id}`,
      params:{value}
    })
  };
    // 删除个人动态
    export const deleteMineDynamic=(value)=>{
      //console.log(111,value)
      return instance({
        method:'DELETE',
        url:`/api/dynamic/deleteDynamic`,
        data:Qs.stringify(value)
      })
    };
  // 修改用户信息
  export const updateUserInfo=(value)=>{
    // console.log(5656)
    // console.log(value)
    return instance({
      method:'PUT',
      url:'/api/user/updateUserInfor',
      data:Qs.stringify(value)
    })
  }
  // 添加点赞
  export const addLike=(value)=>{
    // console.log('value1',value)
    return instance({
      method:'POST',
      url:'/api/like/addLike',
      data:Qs.stringify(value)
    })
  }
  // 取消点赞
  export const deleteLike=(value)=>{
    // console.log('value2',value)
    return instance({
      method:'DELETE',
      url:'/api/like/deleteLike',
      data:Qs.stringify(value)
    })
  }
    // 新增评论
    export const addComment=(value)=>{
      // console.log('value2',value)
      return instance({
        method:'POST',
        url:'/api/comment/addComment',
        data:Qs.stringify(value)
      })
    }
    // 上传图片到服务端
    export const uploadImg=(value)=>{
      // console.log('value2',value)
      return instance({
        method:'POST',
        url:'/api/sendImg/uploadImg',
        data:Qs.stringify(value)
      })
    }
      // 上传动态
    export const uploadDynamic=(value)=>{
      // console.log('value2',value)
      return instance({
        method:'POST',
        url:'/api/dynamic/addDynamic',
        data:Qs.stringify(value)
      })
    }

// import Axios from 'axios';
// import router from '../router'
import Qs from 'qs'
import {instance} from './index';

// 获取联系人
export const getFriends=()=>{
    //console.log(333)
    return instance({
        method:'get',
        url:'/api/user/all'
    })
}
// 获取所有消息记录
export const getMsgRecord=(user_id)=>{
    console.log(444)
    return instance({
        method:'GET',
        url:`/api/infor/msg/${user_id}`
    })
}

// 保存消息记录
export const saveInfoRecord=(value)=>{
    console.log(444,value)
    return instance({
        method:'POST',
        url:`/api/infor/addInfor`,
        data:Qs.stringify(value)
    })
}
// 修改消息记录
export const updateInfoRecord=(value)=>{
    console.log(444,value)
    return instance({
        method:'PUT',
        url:`/api/infor/updateMsg`,
        data:Qs.stringify(value)
    })
}
// //获取通讯录联系人 
// export const getMsgUser=(value)=>{
//     console.log(444,value)
//     return instance({
//         method:'GET',
//         url:`/api/infor/msgUser/${user_id}`,
//     })
// }
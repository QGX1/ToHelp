import Qs from 'qs'
import {instance} from './index';

// 获取联系人
export const getAllJob=()=>{
    console.log(333)
    return instance({
        method:'get',
        url:'/api/job/allJob'
    })
}
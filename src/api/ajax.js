import Qs from 'qs'
import {instance} from './index';
// 封装ajax接口

export const getRequest=(url,value) =>{
    return instance({
      method: 'get',
      url: url,
      params:value
    });
  }
  export const postRequest=(url,data) =>{
    return instance({
      method: 'POST',
      url: url,
      data:Qs.stringify(data)
    });
  }
  // 更新数据
  export const putRequest=(url,data) =>{
    return instance({
      method: 'PUT',
      url: url,
      data:Qs.stringify(data)
    });
  }
  //删除数据
  export const deleteRequest=(url,data) =>{
    return instance({
      method: 'DELETE',
      url: url,
      data:Qs.stringify(data)
    });
  }
import * as types from "./types";
// import states from './states'
export default  {
    [types.USERINFO]:(state,value)=>{
        state.userInfo=value
    },
    [types.LOGIN]:(state,value)=>{
        state.token=value
    },
    [types.LOGINSTATUS]:(state,value)=>{
        state.loginstatus=value
    },
    [types.DYNAMICLISTS]:(state,value)=>{
        state.dynamicLists=value
    }
};

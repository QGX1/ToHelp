<template>
    <div class="login_content">
        <div class="register_form">
            <el-form
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm"
                label-width="0px"
                class="demo-ruleForm"
            >
                <el-form-item prop="user_name">
                    <el-input
                        type="text"
                        v-model="ruleForm.user_name"
                        placeholder="用户名"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="user_password">
                    <el-input
                        type="password"
                        v-model="ruleForm.user_password"
                        placeholder="密码不少于6个字符"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="check_user_password">
                    <el-input
                        type="password"
                        v-model="ruleForm.check_user_password"
                        placeholder="确认密码"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="user_email">
                    <el-input
                        type="text"
                        v-model="ruleForm.user_email"
                        placeholder="邮箱"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="user_phone" class="user_phone">
                    <el-input type="text" v-model="ruleForm.user_phone" placeholder="联系电话"></el-input>
                </el-form-item>
                <el-form-item prop="phone_code" class="user_phone">
                    <el-input type="text" v-model="ruleForm.phone_code" placeholder="验证码"></el-input>
                    <button
                        class="get_verification"
                        :disabled='dis'
                        :class="{right_phone_number:rightPhoneNumber}"
                        @click.prevent="getVerifyCode"
                    >{{computedTime>0?`已发送(${computedTime})s`:'获取验证码'}}</button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { phoneCode } from "../../api/index.js";
import { MessageBox, Loading } from "element-ui";
export default {
  data() {
    // 验证用户名
    var check_user_name = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("输入用户名"));
      } else {
        callback();
      }
    };
    // 验证用户邮箱
    var check_user_email = (rule, value, callback) => {
      let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      } else if (!reg.test(value)) {
        return callback(new Error("邮箱错误"));
      } else {
        callback();
      }
    };
    // 验证用户输入手机号码是否规范
    var check_user_phone = (rule, value, callback) => {
      let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
      if (!value) {
        return callback(new Error("联系电话不能为空"));
      } else if (!phoneReg.test(value)) {
        return callback(new Error("联系电话错误"));
      } else {
        callback();
      }
    };
    //  验证用户输入密码
    var validate_user_password = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不少于6个字符"));
      } else {
        if (this.ruleForm.check_user_password !== "") {
          this.$refs.ruleForm.validateField("check_user_password"); //部分表单校验，关联确认密码的输入，进行两个密码的验证
        }
        callback();
      }
    };
    // 验证用户重新输入密码是否正确
    var validate_check_user_password = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.user_password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    // 验证用户发送验证码
    var validate_check_phone_code = (rule, value, callback) => {
      if (value.length != 6) {
        callback(new Error("验证码错误"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        user_name: "",
        user_password: "",
        check_user_password: "",
        user_email: "",
        user_phone: "",
        phone_code: ""
      },
      // es6,验证表单变量，光标失去时，验证输入信息
      rules: {
        user_name: [{ validator: check_user_name }],
        user_password: [{ validator: validate_user_password }],
        check_user_password: [{ validator: validate_check_user_password }],
        user_email: [{ validator: check_user_email }],
        user_phone: [{ validator: check_user_phone }],
        phone_code: [{ validator: validate_check_phone_code }]
      },
      computedTime: 0,
      dis: true
    };
  },
    computed: {
            // 判断手机号码
            rightPhoneNumber:function(){
                let that=this
                if(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.ruleForm.user_phone)){
                  //  console.log(this)
                    that.dis=false;
                    return true;
                }else{
                    that.dis=true;
                    return false;
                };
                
            }
        },
  methods: {
    // 消息提示弹框
    open(msg) {
      MessageBox({
        title: "提示",
        message: msg
      });
    },
    submitForm(formName) {
      let that = this;
      //对整个表单进行校验,表单验证结果只有true或false
      that.$refs[formName].validate(valid => {
        if (valid) {
         // console.log(this);

          //1、 向服务器发出注册请求
          try {
            that.$store
              .dispatch("toRegister", {
                user_name: that.ruleForm.user_name,
                user_password: that.ruleForm.user_password,
                user_email: that.ruleForm.user_email,
                user_phone: that.ruleForm.user_phone,
                phone_code:that.ruleForm.phone_code,
                user_limit: 1,
                user_incumbency: 1
              })
              .then(res => {
             //   console.log(12343);
             //   console.log(res.data.msg);
                if(res.data.code===0){
                    this.$options.methods.open(res.data.msg);
                    // 2、注册成功以后跳转到登录页面
                     this.$emit("listenRegisterEvent", valid);
                }else if(res.data.code===1){
                    this.$options.methods.open(res.data.msg);
                }
              });
          } catch (err) {
          //  console.log("注册失败");
          //  console.log(err);
          }
        } else {
         // console.log("error submit!!");
          return false;
        }
      });
    },
    //   表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //   获取短信验证码倒计时
    getVerifyCode() {
     // console.log("wwww");
      // 如果当前没有计时
      if (!this.computedTime) {
        this.computedTime = 30;
        const intervalId = setInterval(() => {
          this.computedTime--;
          if (this.computedTime == 0) {
            clearInterval(intervalId);
          }
        }, 1000);
        // 向后端发送请求，获取验证码
        const user_phone = this.ruleForm.user_phone;
        phoneCode(user_phone).then(res => {
         // console.log(res.data);
          if (res.data.msg) {
            this.$options.methods.open(res.data.msg);
          } else {
            this.$options.methods.open(res.data.msg);
          }
        });
      }
    }
  },
  mounted() {
    //   this.getVerifyCode()
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.login_content {
    width: 100%;
    height: 100%;
    text-align: center;
    margin: 0 auto;
    overflow-y: scroll;
    .register_form {
        margin-top: 10px;
    }
}

/deep/ .el-input__suffix {
    color: #57d419 !important;
}

.user_phone {
    /deep/ .el-input__suffix {
        color: #ffffff !important;
    }

    /deep/ .el-input__validateIcon {
        color: #ffffff;
    }
}

/deep/ .el-button--primary {
    background-color: #4cd96f;
    border-color: #4cd96f;
}

/deep/ .el-form-item__error {
    color: #6cf570d1;
}

.get_verification {
    border: 0px;
    float: right;
    color: #cccccc;
    font-size: 14px;
    background: transparent;
    position: relative;
    right: 10px;
    height: 20px;
    z-index: 10;
    margin-top: -30px;

    // transform translateY(-50%)//垂直居中
    &.right_phone_number {
        color: #000;
        z-index: 10;
    }
}
</style>

<style>
.el-message-box__wrapper {
  position: fixed;
  top: 40% !important;
  left: 6% !important;
  text-align: center;
  width: 300px !important;
}
.el-message-box {
  display: inline-block;
  width: 320px !important ;
  padding-bottom: 10px;
  vertical-align: middle;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  font-size: 18px;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: left;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
</style>


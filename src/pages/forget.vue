<template>
    <div class="restContainer">
        <headTop head-title="重置密码" goBack="true" class="headTop"></headTop>
        <form class="restForm">
            <section class="input_container phone_number">
                <input type="text" placeholder="账号" name="phone" maxlength="11" v-model="phoneNumber" @input ="inputPhone">
                <!-- <button @click.prevent="getVerifyCode" :class="{right_phone_number:rightPhoneNumber}" v-show="!computedTime">获取验证码</button>
                <button @click.prevent  v-show="computedTime">已发送({{computedTime}}s)</button> -->
                 <button v-show="!computedTime" @click.prevent="getVerifyCode" :class="{right_phone_number:rightPhoneNumber}">获取验证码</button>
                <button v-show="computedTime" @click.prevent>已发送{{computedTime}}s</button>
            </section>
             <section class="input_container">
                <input type="text" placeholder="旧密码" name="oldPassWord" v-model="oldPassWord">
            </section>
            <section class="input_container">
                <input type="text" placeholder="请输入新密码" name="newPassWord" v-model="newPassWord">
            </section>
            <section class="input_container">
                <input type="text" placeholder="请确认密码" name="confirmPassWord" v-model="confirmPassWord">
            </section>
            <section class="input_container captcha_code_container">
                <input type="text" placeholder="验证码" name="mobileCode" maxlength="6" v-model="mobileCode">
                <div class="img_change_img">
                    <img v-show="captchaCodeImg" :src="captchaCodeImg">
                    <div class="change_img" @click="getCaptchaCode">
                        <p>看不清</p>
                        <p>换一张</p>
                    </div>
                </div>
            </section>
        </form>
        <div class="login_container" @click="resetButton">确认修改</div>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
import { getcaptchas ,changePassword,checkExsis} from '../service/getData.js'
import headTop from '../components/header/head'
import alertTip from '../components/common/alertTip'
import { setInterval } from 'timers';
export default {
  components:{ headTop ,alertTip},
  data(){
    return {
      phoneNumber:'',
      oldPassWord:'',  
      newPassWord:'',
      confirmPassWord:'',
      mobileCode:'',
      captchaCodeImg:'',
      showAlert:false,
      alertText:'',
      computedTime:0,
      rightPhoneNumber:false,
       accountType: 'mobile',
    }
  },
  methods:{
    //保证账号非空
    inputPhone(){
      if(/.+/ig.test(this.phoneNumber)){
        this.rightPhoneNumber = true;
      }else{
        this.rightPhoneNumber = false;
      }
    },
    async getCaptchaCode(){
      let res = await getcaptchas();
      this.captchaCodeImg = res.data.code;
    },
     async getVerifyCode(){
       if(this.rightPhoneNumber){
         this.computedTime = 30;
         this.timer = setInterval(()=>{
           this.computedTime--;
           if(this.computedTime<=0){
             clearInterval(this.timer);
             this.timer = null;
           }
         },200)
          // let res = await checkExsis(this.phoneNumber, this.accountType);
          // console.log(res.data);
       }
     },
    async resetButton(){
      if(!this.phoneNumber){
        this.showAlert = true;
        this.alertText = "请输入账号 ";
        return;
      }else if(!this.oldPassWord){
        this.showAlert = true;
        this.alertText = "请输入旧密码 ";
        return;
      }else if(!this.newPassWord){
        this.showAlert = true;
        this.alertText = "请输入新密码 ";
        return;
      }else if(!this.confirmPassWord){
        this.showAlert = true;
        this.alertText = "请确认密码 ";
        return;
      }else if(this.newPassWord!==this.confirmPassWord){
        this.showAlert = true;
        this.alertText = "密码不一致";
        return;
      }
      else if(!this.mobileCode){
        this.showAlert = true;
        this.alertText = "请输入验证码 ";
        return;
      }
      //发送重置信息
      let res = await changePassword(this.phoneNumber, this.oldPassWord, this.newPassWord, this.confirmPassWord, this.mobileCode);
      console.log(res.data)
      if(res.data.message){
        this.showAlert = true;
        this.alertText = "验证码错误 ";
        return;
      }else{
        this.showAlert = true;
        this.alertText = res.data.success;
        return;
      }
    },
    closeTip(v){
      this.showAlert = v;
    }
  },
  created(){
    this.getCaptchaCode();
  },
  beforeDestroy() {
    clearInterval(this.timer);        
    this.timer = null;
}
}

</script>

<style lang="scss" scoped>
.restContainer{
  padding-top: 0.42rem;
  line-height: 0.42rem;
  .headTop{
    justify-content: flex-start;
  }
}
.restForm{
  background-color: #fff;
  margin-top: .06rem;
  .input_container{
      display: flex;
      justify-content: space-between;
      padding: .08rem .08rem;
      border-bottom: 1px solid #f1f1f1;
      input{
        width:1.75rem;
        line-height:0.3rem;
      }
      button{
          font-size:0.16rem;
          color:#fff;
          font-family: Helvetica Neue,Tahoma,Arial;
          padding: .028rem .04rem;
          border: 1px;
          border-radius: 0.06rem;
      }
      .right_phone_number{
          background-color: #4cd964;
      }
  }
  .phone_number{
      padding: .03rem .08rem;
  }
  .captcha_code_container{
      
      .img_change_img{
          display: flex;
          align-items: center;
          img{
            width:0.85rem;
            height:0.33rem;
            margin-right: .06rem;
          }
          .change_img{
              display: flex;
              flex-direction: column;
              flex-wrap: wrap;
              width: 0.8rem;
              justify-content: center;
              p{
                font-size:0.12rem;
                color:#000;
                line-height: 0.2rem;
              }
              p:nth-of-type(2){
                  color: #3b95e9;
                  margin-top: .02rem;
              }
          }
      }
  }
}
.captcha_code_container{
  .img_change_img{
      display: flex;
      align-items: center;
      img{
          width:0.85rem;
          height:0.33rem;
          margin-right: .02rem;
      }
      .change_img{
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          width: 1rem;
          justify-content: center;
          p{
            font-size:0.16rem;
            color:#fff;
          }
          p:nth-of-type(2){
              color: #3b95e9;
              margin-top: .02rem;
          }
      }
  }
}
.login_container{
  margin: 0.1rem .05rem;
  font-size:0.16rem;
  color:#fff;
  background-color: #4cd964;
  // padding: .08rem 0;
  border: 1px;
  border-radius: 0.05rem;
  text-align: center;
}
</style>

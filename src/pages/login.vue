<template>
    <div class="loginContainer">
        <headTop  goBack="true" class="headTop" :head-title="loginWay?'短信登录':'密码登录'">
            <div slot="changeLogin" class="change_login" @click="changeLoginWay">{{loginWay?'密码登录':'短信登录'}}</div>
        </headTop>
        <form class="loginForm" v-if="loginWay">
            <section class="input_container phone_number">
                <input type="text" placeholder="账号密码随便输入" name="phone" maxlength="11">
                <button>获取验证码</button>
                <!-- <button>已发送()</button> -->
            </section>
            <section class="input_container">
                <input type="text" placeholder="验证码" name="mobileCode" maxlength="6" >
            </section>
        </form>
        <form class="loginForm" v-else>
            <section class="input_container">
                <input type="text" placeholder="账号" v-model="userAccount">
            </section>
            <section class="input_container">
                <input  v-if="!changePassWord" type="password" placeholder="密码"  v-model="passWord">
                <input  v-else type="text" placeholder="密码"  v-model="passWord">
                <div class="button_switch" :class="{change_to_text:changePassWord}">
                    <div class="circle_button" :class="{trans_to_right:changePassWord}" @click="changePassWordType"></div>
                    <span class="cir_span">abc</span>
                    <span class="cir_span">...</span>
                </div>
            </section>
            <section class="input_container captcha_code_container">
                <input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber">
                <div class="img_change_img">
                  <img :src="captchaCodeImg" alt="">
                    <div class="change_img" @click="getCaptchaCode">
                        <p>看不清</p>
                        <p>换一张</p>
                    </div>
                </div>
            </section>
        </form>
        <p class="login_tips">
            温馨提示：未注册过的账号，登录时将自动注册
        </p>
        <p class="login_tips">
            注册过的用户可凭账号密码登录
        </p>
        <div class="login_container" @click="mobileLogin">登录</div>
        <router-link to="/forget" class="to_forget" v-if="!loginWay">重置密码？</router-link>
        <alertTip v-if="showAlert" :showAlert="showAlert" :alertText="alertText" @closeTip="closeTip"></alertTip>
    </div>
</template>

<script>
  // import { mapState,mapMutations } from 'vuex'
    import {mapState, mapMutations} from 'vuex'
  import headTop from '../components/header/head.vue'
  import alertTip from '../components/common/alertTip.vue'
  import { getcaptchas,accountLogin } from '../service/getData.js'
  // import { setStorage } from '../config/comutils.js'
  export default {
    components:{headTop,alertTip},
    data(){
      return{
        loginWay:false,
        changePassWord:false,
        captchaCodeImg:'',
        passWord:'',
        userAccount:'',
        codeNumber:'',
        userInfo:'',
        showAlert:false,
        alertText:''
      }
    },

    mounted(){
      // getcaptchas().then((res)=>{
      //   this.captchaCodeImg = res.data.code;
      // })
      this.getCaptchaCode();
    },
    methods:{
       ...mapMutations([
            'RECORD_USERINFO',
        ]),
      changeLoginWay(){
        this.loginWay = !this.loginWay;
      },
      changePassWordType(){
        this.changePassWord = !this.changePassWord;
      },
      closeTip(v){
        this.showAlert = v;
      },
      //获取验证码
    //   getCaptchaCode(){
    //   getcaptchas().then((res)=>{
    //     this.captchaCodeImg = res.data.code;
    //   })
    // }
    //promise是从then中拿数据
      async getCaptchaCode(){
        let res = await getcaptchas();
        this.captchaCodeImg = res.data.code;
      },
      //发送登录信息
      async mobileLogin(){
        if(!this.userAccount){
          this.showAlert = true;
          this.alertText = "请输入账户号";
          return
        }else if(!this.passWord){
          this.showAlert = true;
          this.alertText = "请输入用户密码";
          return
        }else if(!this.codeNumber){
          this.showAlert = true;
          this.alertText = "请输入验证码";
          return
        }
        this.userInfo = await accountLogin(this.userAccount, this.passWord, this.codeNumber);
        //将用户信息存在本地
         //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
          if(this.userInfo.data.message){
            this.showAlert = true;
            this.alertText =  this.userInfo.data.message;
          }else{
            this.RECORD_USERINFO(this.userInfo.data);
            this.$router.go(-1);
          }
      }
    }
   }
</script>

<style lang="scss" scoped>
.loginContainer{
  width:100%;
  .headTop{
      position: fixed;
      z-index: 100;
      left: 0;
      top: 0;
      background: #3190e8;
      color:#fff ;
          line-height:0.42rem;
    .change_login{
      padding-right:0.1rem;
      font-size:0.16rem;
    }
  }
  .loginForm{
    margin-top:0.48rem;
    .input_container{
      justify-content: space-between;
      padding: .1rem .08rem;
      border-bottom: 1px solid #f1f1f1;
      display:flex;
      .img_change_img{
        display: -webkit-flex;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .change_img{
          display: flex;
          flex-wrap: wrap;
          width: 0.4rem;
          font-size:0.12rem;

        }
      }
      .button_switch{
        background-color: #ccc;
        display: -webkit-flex;
        display: flex;
        -webkit-justify-content: center;
        justify-content: center;
        width: 0.8rem;
        height: 0.2rem;
        padding: 0.02rem;
        border: 1px;
        border-radius: 0.8rem;
        position: relative;
        .circle_button{
        transition: all .3s;
        position: absolute;
        top: -0.04rem;
        z-index: 1;
        left: -0.03rem;
        width: .3rem;
        height: .3rem;
        box-shadow: 0 0.02667rem 0.05333rem 0 rgba(0, 0, 0, 0.1);
        background-color: #f1f1f1;
        border-radius: 50%;
        }
        .cir_span{
          font-size: 0.12rem;
          color: #fff;
          line-height: .4rem;
          margin-top:-0.1rem;
        }
      }
       .change_to_text{
        background-color: #4cd964;
      }
       .trans_to_right{
            transform: translateX(0.6rem);
        }
      input{
        font-size: 0.16rem;
        color: #666;
        width:40%;
      }
      button{
        font-size: 0.14rem;
        color: #fff;
        font-family: Helvetica Neue,Tahoma,Arial;
        padding: .04rem .08rem;
        border: 1px;
        border-radius: 0.06rem;
      }
    }
   
  }
  .login_tips{
      font-size: 0.12rem;
      color: red;
      padding: .04rem .06rem;
      line-height: .24rem;
  }
  .login_container{
    margin: 0 .05rem .1rem;
    font-size: 0.18rem;
    color: #fff;
    background-color: #4cd964;
    padding: .08rem 0;
    border: 1px;
    border-radius: 0.06rem;
    text-align: center;
  }
  .to_forget{
    float: right;
    font-size: 0.16rem;
    color: #3b95e9;
    margin-right: .03rem
  }
}
</style>
 

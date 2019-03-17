<template>
    <header id='head_top'>
        <slot name="logo"></slot>
        <slot name='search'></slot>
        <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1" class="arrow_right ">
                <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
            </svg>
        </section>
        <router-link  to="/login" class="head_login" v-if="signinUp" >
            <svg class="user_avatar" v-if="userInfo">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
            </svg>
            <span class="login_span" to="/login" v-else>登录|注册</span>
        </router-link>
        <section class="title_head ellipsis" v-if="headTitle">
            <span class="title_text">{{headTitle}}</span>
        </section>
        <slot name="changecity"></slot>
        <slot name="msite-title"></slot>
        <slot name="changeLogin"></slot>
        
    </header>
</template>

<script>
import { mapState, mapActions }  from 'vuex'
export default {
  props:[ 'goBack' ,'headTitle','signinUp'],
  data(){
    return{
      ...mapState(['userInfo'])
    }
  },
  methods:{
    ...mapActions(['getUserInfo'])
  },
  mounted(){
    this.getUserInfo();
  }
}

</script>

<style lang="scss" scoped>
    #head_top{
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        width:100%;
        height:0.42rem;
        background: #3190e8;
        display: flex;
        justify-content: space-between;
        .arrow_right{
        width:0.18rem;
        height:0.18rem;
        fill: #999;
        margin-left:0.1rem;
      }
      .head_login{
          width:100%;
          line-height: 0.42rem;
          display: flex;
          margin-left: 2.8rem;
          margin-top: 0.1rem;
          .login_span{
            color:#fff;
            width:50%;
            font-size:0.16rem;
          }
          .user_avatar{
            width:0.18rem;
            height:0.18rem;
            fill: #fff;
          }
      }
      .title_head{
          width:100%;
          .title_text{
            position:relative;
            left:1.4rem;
            color:#fff;
            font-size:0.18rem;
         }
     }
    }
 
</style>

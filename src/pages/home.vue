<template>
  	<div class="home">
        <headTop signin-up='home' class="headTop">
            <span slot='logo' class="head_logo"  @click="reload">ele.me</span>
        </headTop>
        <nav class="city_nav">
            <div class="city_tip">
                <span>当前定位城市：</span>
                <span>定位不准时，请在城市列表中选择</span>
            </div>
            <router-link class="guess_city" :to="'/city/' + guessCityid">
                <span>{{guessCity}}</span>
                <svg class="arrow_right">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>    
            </router-link>
        </nav>
        <section id="hot_city_container">
            <h4 class="city_title">热门城市</h4>
            <ul class="citylistul clear">
                <router-link tag="li" v-for="item in hotcity" :key="item.id" :to="'/city/'+item.id">
                    {{item.name}}
                </router-link>
            </ul>
        </section>
        <section class="group_city_container">
            <ul class="letter_classify">
                <li class="letter_classify_li" v-for="(value,key,index) in sortgroupcity" :key="key">
                    <h4 class="city_title"> {{key}}
                        <span v-if="index===0">（按字母排序）</span>
                    </h4>
                    <ul class="groupcity_name_container citylistul clear">
                        <router-link tag="li" class="ellipsis" v-for="item in value" :key="item.id" :to="'/city/'+item.id">
                            {{item.name}}
                        </router-link>
                    </ul>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
import headTop from "../components/header/head";
import {cityGuess, hotcity, groupcity} from '../service/getData.js'
export default {
   components:{headTop},
   data(){
       return {
        guessCity:'',
        guessCityid: '', 
        hotcity: [],     
        groupcity: {}, 
       }
   },
   methods:{
       reload(){
           location.reload();
       }
   },
    
    computed:{
      //将获取的数据按照A-Z进行排序
      sortgroupcity(){
        let sortobj ={};
        for(let i=65;i<=90;i++){
          if(this.groupcity[String.fromCharCode(i)]){
            sortobj[String.fromCharCode(i)] = this.groupcity[String.fromCharCode(i)];
          }
        }
        return  sortobj;
      }
    },
   mounted(){
    cityGuess().then((res) => {
        this.guessCity = res.data.name;
        this.guessCityid = res.data.id;
    });
    hotcity().then((res) => {
        this.hotcity = res.data;
    });
    groupcity().then((res) => {
        this.groupcity = res.data;
    });
   }
}

</script>

<style lang="scss" scoped>
.home{
    display: flex;
    flex-direction: column;
    box-sizing:border-box;
    font-size:0.14rem;
    .head_logo{
      display: block;
      width:3.75rem;
      height:0.46rem;
      line-height: 0.46rem;;
      color:#fff;
      font-size:0.16rem;
      padding:0 0.06rem;
    }
  .city_nav{
    margin:0.46rem 5px 0px 5px;
    font-size:0.14rem;
    line-height:0.42rem;
    .city_tip{
      display: flex;
      justify-content: space-between;
    }
    .guess_city{
      width:100%;
      line-height:0.42rem;
      border-bottom:1px solid #ccc;
      border-top:1px solid #ccc;
      display: flex;
      justify-content: space-between;
      align-items:center;
      font-size:0.16rem;
      .arrow_right{
        width:0.18rem;
        height:0.18rem;
        fill: #999;
      }
    }
  }
  #hot_city_container{
      
      .citylistul{
          border-bottom:1px solid #ccc;
          line-height: 0.42rem;
          padding-bottom:0.05rem ;
          li{
            color: #3190e8;
            float:left;
            width:25%;
            border-right:1px solid #ccc;
            border-bottom:1px solid #ccc;
            line-height: 0.42rem;
            text-align:center;
          }
          li:nth-of-type(4n){
              border-right:none;
          }
      }
  }
  .city_title{
      border-bottom:1px solid #ccc;
       line-height: 0.42rem;
       padding:0 0.06rem;
  }
  .group_city_container{
     
      .groupcity_name_container{
          overflow: hidden;
           padding-bottom:0.05rem ;
          border-bottom:1px solid #ccc;
        li{
            float:left;
            width:25%;
            border-right:1px solid #ccc;
            border-bottom:1px solid #ccc;
            line-height: 0.42rem;
            text-align:center;
        }
        li:nth-of-type(4n){
              border-right:none;
          }
      }
  }
}


</style>

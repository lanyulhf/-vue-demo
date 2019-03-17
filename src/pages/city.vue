<template>
   <div class="city_container">
        <head-top  class="headTop" goBack="true" :head-title="cityname">
            <router-link to="/home" slot="changecity" class="change_city">切换城市</router-link>
        </head-top>
        <form class="city_form" >
            <div>
                <input type="search"  placeholder="输入学校、商务楼、地址" class="city_input input_style" required v-model="inputVaule">
            </div>
            <div>
                <input type="button" name="submit" class="city_submit input_style" @click="postpois" value="提交">
            </div>
        </form>
        <header class="pois_search_history" v-if="historytitle">搜索历史</header>
        <ul class="getpois_ul" >
            <router-link tag="li" v-for="(item, index) in placelist" :key="index"
             @click.native="nextpage(index, item.geohash)" :to="'/msite/'+item.geohash">
                <h4 class="pois_name ellipsis">{{item.name}}</h4>
                <p class="pois_address ellipsis">{{item.address}}</p>
            </router-link>
        </ul>
        <footer v-if="historytitle&&placelist.length" @click="clearAll">清空所有</footer>
        <div class="search_none_place"  v-if="placeNone">很抱歉！无搜索结果</div>
    </div>
</template>

<script type="text/ecmascript-6">
import headTop from '../components/header/head'
import { searchplace,currentcity } from '../service/getData.js'
import { setStorage, getStorage,removeStorage} from '../config/comutils.js'
export default {
   name: '',
   data() {
       return {
         placeNone:false,
         inputVaule:'',
         cityid:'',
         cityname:'',
         historytitle:false,
         placelist:[],
         placeHistory:[]
       }
   },
   mounted(){
      this.cityid = this.$route.params.id;
      currentcity(this.cityid).then(res => {
      this.cityname = res.data.name;
    })
   this.initData();
   this.historytitle = true;
  },
   methods:{
    //初始化搜索历史
    initData(){
        if(getStorage('placeHistory')){
            this.placelist = JSON.parse(getStorage('placeHistory'));
                //  console.log(this.placelist[0].geohash)
        }else{
          this.placelist = [];
            // console.log(this.placelist[0].geohash)
        }
    },
    //跳转到每一个地方详情时本地保存该地方
    nextpage(index,geohash){
        console.log(111)
      let history = getStorage("placeHistory");
           console.log(history+"history");
      if(history){
        let flag = false;
        this.placeHistory = JSON.parse(history);
        this.placeHistory.forEach((item)=>{
            if(item.geohash===geohash){
                flag = true;
            }
        })
        if(flag===false){
        this.placeHistory.push(this.placelist[index]);

        }
      }else{
        this.placeHistory.push(this.placelist[index]);
      }
      setStorage("placeHistory",this.placeHistory);
    //    this.$router.push({path:'/msite', query:{geohash}})
    //   this.$router.push({name:'msite', params:{geohash}})
    },
  
    postpois(){
    //输入值不为空时才发送信息
    if (this.inputVaule) {
        searchplace(this.cityid,this.inputVaule).then((res) =>{
          this.placelist = res.data;
          this.historytitle = false;
          this.placeNone = res.data.length?false:true;
        })
     } 
    },
     clearAll(){
       this.placelist = [];
       removeStorage("placeHistory");
     }
   },
  components: { headTop },
  
}
</script>

<style scoped lang="scss">
.city_container{
    width:100%;
   .headTop{
       position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        width:100%;
        line-height:0.42rem;
        color:#fff;
        background: #3190e8;
        .change_city{
            padding-right:0.1rem;
            color:#fff;
            font-size:0.16rem;
         }
   }
   .city_form{
       margin-top:0.48rem;
       border-top:1px solid #ccc;
       border-bottom:1px solid #ccc;
       .city_input{
        width:80%;
        height:0.34rem;
        margin:0.1rem 10%;
        border: 1px solid #e4e4e4;
        padding: 0 0.04rem;
        font-size: 0.16rem;
        color: #333;
       }
       .city_submit{
        width:80%;
        height:0.36rem;
        margin:0 10% 0.1rem 10%;
        border: 1px solid #e4e4e4;
        font-size: 0.16rem;
        background-color: #3190e8;
        border-radius: 0.05rem;
       } 
   }
   .pois_search_history{
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    padding-left: 0.05rem;
    font: 0.14rem/0.26rem "Microsoft YaHei";
   }
    .getpois_ul{
        li{
        padding-top: 0.1rem;
        border-bottom: 1px solid #e4e4e4;
        .pois_name{
          margin: 0 auto 0.1rem;
          width: 90%;
          font-size: 0.14rem;
          color: #333;
        }
        .pois_address{
          width: 90%;
          margin: 0 auto 0.1rem;
          font-size: 0.12rem;
          color: #999;
        }
       }
    }   
  footer{
    font-size: 0.18rem;
    color: #666;
    text-align: center;
    line-height: 0.24rem;
    background-color: #fff;
  }
  .search_none_place{
    margin: 0 auto;
    font-size:0.16rem/0.24rem;
    color: #333;
    background-color: #fff;
    text-indent: 0.05rem;
  }
 }
</style>

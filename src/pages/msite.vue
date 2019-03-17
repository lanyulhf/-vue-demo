<template>
    <div>
    	<headTop signin-up='msite'>
    		<router-link :to="'/search/34.251834'" class="link_search" slot="search">
	    		<svg width="0.2rem" height="0.2rem" xmlns="http://www.w3.org/2000/svg" version="1.1">
	    			<circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
	    			<line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
	    		</svg>
    		</router-link>
			<router-link to="/home" slot="msite-title" class="msite_title">
				<span class="title_text ellipsis">{{msiteTitle}}</span>
			</router-link>
    	</headTop>
    	<nav class="msite_nav">
    		<div class="swiper-container" v-if="foodTypes.length">
		        <div class="swiper-wrapper">      
            <div class="swiper-slide food_types_container" v-for="(item, index) in foodTypes" :key="index">
              <router-link  :to="{path:'/food',query: {geohash, title: foodItem.title, restaurant_category_id: getCategoryId(foodItem.link)}}"
							 v-for="foodItem in item" :key="foodItem.id" class="link_to_food">
                <figure>
                  <img :src="imgBaseUrl + foodItem.image_url">
                  <figcaption>{{foodItem.title}}</figcaption>
                </figure>
              </router-link>
            </div> 
		        </div>
		        <div class="swiper-pagination"></div>
		    </div>
				<!-- 五轮播图数据时显示图片 -->
		    <img src="../images/fl.svg" class="fl_back animation_opactiy" v-else>
    	</nav>
    	<div class="shop_list_container">
	    	<header class="shop_header">
	    		<svg class="shop_icon">
	    			<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
	    		</svg>
	    		<span class="shop_header_title">附近商家</span>
	    	</header>
	    	<shopList v-if="hasGetData" :geohash="geohash" ></shopList>
    	</div>
    	<footGuide></footGuide>
    </div>    
</template>

<script>
import Swiper from "swiper"
import 'swiper/dist/css/swiper.min.css'
import { mapMutations} from 'vuex'
import headTop from '../components/header/head'
import {msiteAddress, msiteFoodTypes, cityGuess} from '../service/getData.js'
import { SAVE_GEOHASH ,RECORD_ADDRESS} from '../store/mutations.js'
import footGuide from '../components/common/footGuide'
import shopList from '../components/common/shoplist'

export default {
	data(){
    return {
      geohash: '', // city页面传递过来的地址geohash
      msiteTitle: '请选择地址...', // msite页面头部标题
      foodTypes: [], // 食品分类列表
      hasGetData: false, //是否已经获取地理位置数据，成功之后再获取商铺列表信息
			imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
    }
    },
   components:{ headTop, shopList, footGuide},
   async beforeMount(){
	   if(!this.$route.params.geohash){
       const address = await cityGuess();
       this.geohash = address.data.latitude + ',' + address.data.longitude;
	   }else{
			 this.geohash = this.$route.params.geohash;
     }
     //保存geohash 到vuex
		  this.SAVE_GEOHASH(this.geohash);
    	//获取位置信息
      let res = await msiteAddress(this.geohash);
    	this.msiteTitle = res.data.name;
    	// 记录当前经度纬度
    	this.RECORD_ADDRESS(res.data);
      this.hasGetData = true;
      
    },
   mounted(){
      msiteFoodTypes(this.geohash).then((res)=>{
        let arrTemp = res.data,
        foodArr = [],
        len = arrTemp.length;
        console.log(arrTemp);
        for(var i =0,j=0;i<len;i+=8,j++){
          foodArr[j] = arrTemp.splice(0,8);
        }
				this.foodTypes = foodArr;
     }).then(()=>{
       new Swiper('.swiper-container', {
			    direction: 'horizontal',
			    loop: true,
          autoplay:true,
          pagination: {
          el: '.swiper-pagination',
          },
        });
		 });
		 
   },
   methods:{
		...mapMutations(['SAVE_GEOHASH','RECORD_ADDRESS']),
		getCategoryId(url){
			let urlData = decodeURIComponent(url.split('=')[1].replace(/&target_name/ig,''));
			if(/restaurant_category_id/ig.test(urlData)){
				this.restaurant_category_id = JSON.parse(urlData).restaurant_category_id.id;
				return this.restaurant_category_id;
			}else{
				return;
			}
		}
   }
}

</script>

<style lang="scss" scoped>
	.link_search{
        height:0.42rem;
       padding-left:0.1rem;
        margin-top:0.1rem; 
	}
	.msite_title{
		// @include center;
        color: #fff;
        text-align: center;
        margin-left:-3.5rem;
        margin-top:0.1rem;
        width: 80%;
        .title_text{
            font-size:0.16rem;
            color:#fff;
            // @include sc(0.8rem, #fff);
            text-align: center;
            display: block;
            width:2rem;
            overflow: hidden;
        }
	}
	.msite_nav{
		padding-top: 0.1rem;
		background-color: #fff;
		height: 0.6rem;
		.swiper-container{
			width:100%;
      padding-top:0.42rem;
			// @include wh(100%, auto);
			padding-bottom: 0.06rem;
			.swiper-pagination{
				bottom: 0.02rem;
			}
		}
		.fl_back{
      width:3.75rem;
      height:3rem;
			// @include wh(100%, 100%);
		}
	}
	.food_types_container{
		display:flex;
		flex-wrap: wrap;
		.link_to_food{
			width: 25%;
			padding: 0.03rem 0rem;
			// @include fj(center);
			figure{
				img{
          margin-bottom: 0.03rem;
          width:.6rem;
          height:.6rem;
					// @include wh(1.8rem, 1.8rem);
				}
				figcaption{
          text-align: center;
          font-size:0.12rem;
          color:#666;
					// @include sc(0.55rem, #666);
				}
			}
		}
	}
	.shop_list_container{
		margin-top: 2.2rem;
		border-top: 0.025rem solid #ccc;
		background-color: #fff;
		.shop_header{
			.shop_icon{
				fill: #999;
				margin-left: 0.06rem;
				vertical-align: middle;
				width:.2rem;
				height:.2rem;
				// @include wh(0.6rem, 0.6rem);
			}
			.shop_header_title{
        color: #999;
        font-size:0.14rem;
        line-height:0.22rem;
				// @include font(0.55rem, 1.6rem);
			}
		}
	}

</style>
